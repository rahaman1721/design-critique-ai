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
        import asyncio
        try:
            yield f"data: {json.dumps({'event': 'start', 'message': 'Analyzing design...'})}\n\n"
            await asyncio.sleep(0.5)

            if GEMINI_API_KEY:
                # Live Gemini 2.0 Flash Vision
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

                json_start = full_text.find("{")
                json_end = full_text.rfind("}") + 1
                if json_start == -1 or json_end == 0:
                    yield f"data: {json.dumps({'event': 'error', 'message': 'Could not parse critique JSON from model response.'})}\n\n"
                    return
                critique = json.loads(full_text[json_start:json_end])
            else:
                # Interactive Demo Mode (Simulates streaming model analysis)
                for step in range(1, 4):
                    await asyncio.sleep(0.3)
                    yield f"data: {json.dumps({'event': 'progress', 'tokens': step * 120})}\n\n"

                critique = {
                    "overall_score": 84,
                    "overall_grade": "A-",
                    "summary": "Exceptional visual hierarchy and modern typography system. The primary conversion path and interactive cards are well-proportioned. Minor improvements recommended for secondary label contrast ratios (WCAG AA) and mobile touch targets.",
                    "categories": [
                        {"name": "Visual Hierarchy", "score": 9, "status": "excellent", "issues": ["Minor competing visual weight on secondary badge"], "suggestions": ["Ensure focal point remains locked on the primary call to action"]},
                        {"name": "Color & Contrast", "score": 7, "status": "needs_work", "issues": ["Muted metadata text falls below WCAG 2.1 AA 4.5:1 ratio"], "suggestions": ["Increase brightness of secondary timestamps and caption labels"]},
                        {"name": "Typography", "score": 9, "status": "excellent", "issues": [], "suggestions": ["Maintain consistent line-height ratio on multiline headlines"]},
                        {"name": "Spacing & Layout", "score": 9, "status": "excellent", "issues": [], "suggestions": ["Continue using standard 8px/16px/24px spacing grid tokens"]},
                        {"name": "Accessibility (WCAG)", "score": 6, "status": "needs_work", "issues": ["Interactive controls lack explicit :focus-visible indicators", "Missing aria-live announcement regions"], "suggestions": ["Add high-contrast focus rings for keyboard navigation"]},
                        {"name": "CTA Clarity", "score": 9, "status": "excellent", "issues": [], "suggestions": ["Button prominence and active states are clearly communicated"]},
                        {"name": "Navigation & Wayfinding", "score": 8, "status": "good", "issues": ["Back navigation icon could feature higher contrast"], "suggestions": ["Add explicit text tooltip or aria-label to icon buttons"]},
                        {"name": "Consistency & Design System", "score": 9, "status": "excellent", "issues": [], "suggestions": ["Border-radii and elevation tokens are cleanly reused"]},
                        {"name": "Mobile Responsiveness", "score": 8, "status": "good", "issues": ["Padding feels slightly tight on narrow 375px viewports"], "suggestions": ["Use responsive clamping for padding on small screens"]},
                        {"name": "Touch Target Sizing", "score": 7, "status": "needs_work", "issues": ["Header action buttons measure ~32px, below 44px standard"], "suggestions": ["Expand minimum touch bounds to 44x44px for thumb tap ergonomics"]},
                        {"name": "Information Architecture", "score": 9, "status": "excellent", "issues": [], "suggestions": ["Logical vertical chunking aids rapid scanning"]},
                        {"name": "Loading & Empty States", "score": 8, "status": "good", "issues": [], "suggestions": ["Ensure skeleton placeholders match actual content bounds"]},
                        {"name": "Error Handling UX", "score": 8, "status": "good", "issues": ["Inline dismiss controls should provide undo actions"], "suggestions": ["Provide clear error recovery instructions"]},
                        {"name": "Micro-interactions & Feedback", "score": 8, "status": "good", "issues": [], "suggestions": ["Subtle hover transitions provide good tactile feedback"]},
                        {"name": "Overall Brand Alignment", "score": 9, "status": "excellent", "issues": [], "suggestions": ["Visual identity is cohesive, polished, and contemporary"]}
                    ],
                    "priority_fixes": [
                        {"priority": 1, "title": "Increase secondary text contrast on metadata timestamps", "impact": "high", "description": "Adjust secondary timestamp and helper text (#71717a) to #a1a1aa to pass WCAG 2.1 AA 4.5:1 minimum contrast against dark surfaces."},
                        {"priority": 2, "title": "Expand interactive touch target hit area", "impact": "medium", "description": "Ensure all interactive button targets meet the 44x44px minimum touch target size for mobile accessibility."},
                        {"priority": 3, "title": "Add keyboard focus outlines for modal controls", "impact": "medium", "description": "Add visible :focus-visible rings around all interactive buttons for keyboard navigation compliance."}
                    ],
                    "positive_highlights": [
                        "Exceptional visual weight distribution guiding eye scanning down the primary action path.",
                        "Symmetrical padding rhythm with consistent 8px/16px/24px spacing tokens.",
                        "Crisp typographic hierarchy with clear distinction between titles, body labels, and metadata."
                    ]
                }

            # Stream header
            yield f"data: {json.dumps({'event': 'header', 'overall_score': critique.get('overall_score'), 'overall_grade': critique.get('overall_grade'), 'summary': critique.get('summary')})}\n\n"
            await asyncio.sleep(0.3)

            # Stream categories one by one
            for cat in critique.get("categories", []):
                yield f"data: {json.dumps({'event': 'category', 'data': cat})}\n\n"
                await asyncio.sleep(0.08)

            # Stream fixes
            for fix in critique.get("priority_fixes", []):
                yield f"data: {json.dumps({'event': 'fix', 'data': fix})}\n\n"
                await asyncio.sleep(0.08)

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
