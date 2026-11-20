"""
Design Critique AI — Starlette ASGI Backend (pydantic-free)
Gemini 2.0 Flash Vision × 15-Category Comprehensive UI Audit
Real-time SSE streaming of structured JSON critique.
Uses raw Starlette + Uvicorn + Gemini REST API (via requests) to avoid
pydantic DLL restriction on this machine.
"""
import base64
import json
import os
import io
import requests as _requests
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route
from starlette.responses import JSONResponse, StreamingResponse
from PIL import Image

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

# ---------------------------------------------------------------------------
# Critique Categories (15 total)
# ---------------------------------------------------------------------------
CATEGORIES = [
    "Visual Hierarchy",
    "Color & Contrast",
    "Typography",
    "Spacing & Layout",
    "Accessibility (WCAG)",
    "CTA Clarity",
    "Navigation & Wayfinding",
    "Consistency & Design System",
    "Mobile Responsiveness",
    "Touch Target Sizing",
    "Information Architecture",
    "Loading & Empty States",
    "Error Handling UX",
    "Micro-interactions & Feedback",
    "Overall Brand Alignment",
]

# ---------------------------------------------------------------------------
# System Prompt
# ---------------------------------------------------------------------------
SYSTEM_PROMPT = """You are an expert senior UI/UX design critic with 15+ years of experience in product design, design systems, accessibility auditing (WCAG 2.1 AA/AAA), and conversion rate optimization.

You will receive a UI screenshot and must perform a comprehensive 15-category design audit.

You MUST respond ONLY with a valid JSON object in this EXACT format:
{
  "overall_score": <integer 1-100>,
  "overall_grade": "<A|B|C|D|F>",
  "summary": "<2-3 sentence executive summary>",
  "categories": [
    {
      "name": "<category name>",
      "score": <integer 1-10>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue 1>", "<specific issue 2>"],
      "suggestions": ["<actionable fix 1>", "<actionable fix 2>"]
    }
  ],
  "priority_fixes": [
    {
      "priority": <1-5>,
      "title": "<fix title>",
      "impact": "<high|medium|low>",
      "description": "<specific actionable description>"
    }
  ],
  "positive_highlights": ["<what works well 1>", "<what works well 2>"]
}

The 15 categories MUST be evaluated in this exact order:
1. Visual Hierarchy
2. Color & Contrast
3. Typography
4. Spacing & Layout
5. Accessibility (WCAG)
6. CTA Clarity
7. Navigation & Wayfinding
8. Consistency & Design System
9. Mobile Responsiveness
10. Touch Target Sizing
11. Information Architecture
12. Loading & Empty States
13. Error Handling UX
14. Micro-interactions & Feedback
15. Overall Brand Alignment

Be specific, honest, and professional. Reference exact UI elements you can see. Never fabricate details you cannot observe."""

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
async def health(request):
    return JSONResponse({"status": "online", "service": "Design Critique AI", "version": "1.0.0"})


async def critique_stream(request):
    """Accept multipart image upload → stream JSON critique via SSE."""
    if not GEMINI_API_KEY:
        return JSONResponse({"detail": "GEMINI_API_KEY not configured."}, status_code=500)

    form = await request.form()
    upload = form.get("file")
    if upload is None:
        return JSONResponse({"detail": "No file uploaded."}, status_code=400)

    content_type = upload.content_type or ""
    if not content_type.startswith("image/"):
        return JSONResponse({"detail": "Only image files are accepted."}, status_code=400)

    raw = await upload.read()
    if len(raw) > 10 * 1024 * 1024:
        return JSONResponse({"detail": "Image must be under 10MB."}, status_code=413)

    # Compress image
    img = Image.open(io.BytesIO(raw))
    if img.width > 1920 or img.height > 1920:
        img.thumbnail((1920, 1920), Image.LANCZOS)
    buf = io.BytesIO()
    if img.mode == "RGBA":
        img.save(buf, format="PNG")
        mime_type = "image/png"
    else:
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(buf, format="JPEG", quality=85)
        mime_type = "image/jpeg"
    buf.seek(0)
    encoded = base64.standard_b64encode(buf.read()).decode("utf-8")

    async def stream_critique():
        try:
            yield f"data: {json.dumps({'event': 'start', 'message': 'Analyzing design...'})}\n\n"

            payload = {
                "contents": [
                    {
                        "parts": [
                            {"inline_data": {"mime_type": mime_type, "data": encoded}},
                            {"text": SYSTEM_PROMPT + "\n\nPlease perform a comprehensive 15-category design audit of the uploaded UI screenshot."}
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.3,
                    "maxOutputTokens": 8192,
                }
            }

            yield f"data: {json.dumps({'event': 'progress', 'tokens': 0})}\n\n"

            resp = _requests.post(
                GEMINI_URL,
                params={"key": GEMINI_API_KEY},
                json=payload,
                timeout=120,
            )
            resp.raise_for_status()
            resp_json = resp.json()

            full_text = resp_json["candidates"][0]["content"]["parts"][0]["text"]

            yield f"data: {json.dumps({'event': 'progress', 'tokens': len(full_text)})}\n\n"

            # Extract JSON
            json_start = full_text.find("{")
            json_end = full_text.rfind("}") + 1
            if json_start == -1 or json_end == 0:
                yield f"data: {json.dumps({'event': 'error', 'message': 'Could not parse critique JSON from model response.'})}\n\n"
                return

            critique_json = full_text[json_start:json_end]
            critique = json.loads(critique_json)

            # Stream header
            yield f"data: {json.dumps({'event': 'header', 'overall_score': critique.get('overall_score'), 'overall_grade': critique.get('overall_grade'), 'summary': critique.get('summary')})}\n\n"

            # Stream categories one by one
            for cat in critique.get("categories", []):
                yield f"data: {json.dumps({'event': 'category', 'data': cat})}\n\n"

            # Stream fixes
            for fix in critique.get("priority_fixes", []):
                yield f"data: {json.dumps({'event': 'fix', 'data': fix})}\n\n"

            # Stream highlights
            yield f"data: {json.dumps({'event': 'highlights', 'data': critique.get('positive_highlights', [])})}\n\n"

            yield f"data: {json.dumps({'event': 'done'})}\n\n"

        except json.JSONDecodeError as e:
            yield f"data: {json.dumps({'event': 'error', 'message': f'JSON parse error: {str(e)}'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'event': 'error', 'message': str(e)})}\n\n"

    return StreamingResponse(
        stream_critique(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


app = Starlette(
    routes=[
        Route("/", health, methods=["GET"]),
        Route("/api/critique/stream", critique_stream, methods=["POST"]),
    ]
)

app = CORSMiddleware(
    app,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
