"""
Design Critique AI — Production Starlette ASGI Backend
Google Gemini 2.0 Flash Vision × 15-Category Comprehensive UI Audit
Real-time SSE streaming of structured JSON critique.
"""
import base64
import json
import os
import io
import asyncio
import requests as _requests
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route
from starlette.responses import JSONResponse, StreamingResponse
from PIL import Image

# ---------------------------------------------------------------------------
# Config & .env Auto-Loader
# ---------------------------------------------------------------------------
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

def load_dotenv():
    global GEMINI_API_KEY
    for env_path in [
        os.path.join(os.path.dirname(__file__), ".env"),
        os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    ]:
        if os.path.exists(env_path):
            try:
                with open(env_path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip("'\"")
                            os.environ[k] = v
                            if k == "GEMINI_API_KEY" and v:
                                GEMINI_API_KEY = v
            except Exception:
                pass

load_dotenv()

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
# System Prompt for Gemini 2.0 Flash Vision
# ---------------------------------------------------------------------------
SYSTEM_PROMPT = """You are an expert senior UI/UX design critic and accessibility auditor with 15+ years of experience in product design, design systems, and conversion rate optimization.

Analyze the uploaded UI screenshot and perform a rigorous 15-category design audit.

You MUST respond ONLY with a valid JSON object in this EXACT structure (no markdown fences, just pure JSON):
{
  "overall_score": <integer 1-100>,
  "overall_grade": "<A+|A|A-|B+|B|B-|C+|C|D|F>",
  "summary": "<2-3 sentence executive summary explaining primary strengths and core remediation areas>",
  "categories": [
    {
      "name": "Visual Hierarchy",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Color & Contrast",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Typography",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Spacing & Layout",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Accessibility (WCAG)",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "CTA Clarity",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Navigation & Wayfinding",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Consistency & Design System",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Mobile Responsiveness",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Touch Target Sizing",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Information Architecture",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Loading & Empty States",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Error Handling UX",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Micro-interactions & Feedback",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    },
    {
      "name": "Overall Brand Alignment",
      "score": <float 1.0-10.0>,
      "status": "<excellent|good|needs_work|critical>",
      "issues": ["<specific issue observed>"],
      "suggestions": ["<actionable fix>"]
    }
  ],
  "priority_fixes": [
    {
      "priority": 1,
      "title": "<concise fix title>",
      "impact": "<high|medium|low>",
      "description": "<actionable description citing specific elements>"
    },
    {
      "priority": 2,
      "title": "<concise fix title>",
      "impact": "<high|medium|low>",
      "description": "<actionable description citing specific elements>"
    },
    {
      "priority": 3,
      "title": "<concise fix title>",
      "impact": "<high|medium|low>",
      "description": "<actionable description citing specific elements>"
    }
  ],
  "positive_highlights": [
    "<what works well 1>",
    "<what works well 2>",
    "<what works well 3>"
  ]
}

Be specific, honest, and professional. Reference exact UI elements you can observe in the image."""

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
async def health(request):
    return JSONResponse({
        "status": "online",
        "service": "Design Critique AI",
        "has_api_key": bool(GEMINI_API_KEY),
        "version": "2.0.0"
    })


async def get_config(request):
    return JSONResponse({
        "has_api_key": bool(GEMINI_API_KEY),
        "model": "gemini-2.0-flash",
        "masked_key": f"{GEMINI_API_KEY[:4]}...{GEMINI_API_KEY[-4:]}" if len(GEMINI_API_KEY) > 8 else ""
    })


async def save_key(request):
    global GEMINI_API_KEY
    try:
        body = await request.json()
        key = body.get("api_key", "").strip()
        if not key:
            return JSONResponse({"error": "API key cannot be empty"}, status_code=400)
        
        GEMINI_API_KEY = key
        os.environ["GEMINI_API_KEY"] = key
        
        # Save to backend/.env
        env_file = os.path.join(os.path.dirname(__file__), ".env")
        with open(env_file, "w", encoding="utf-8") as f:
            f.write(f"GEMINI_API_KEY={key}\n")
            
        return JSONResponse({"status": "saved", "has_api_key": True})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


async def critique_stream(request):
    """Accept multipart image upload → execute Gemini 2.0 Flash Vision → stream JSON critique via SSE."""
    global GEMINI_API_KEY
    form = await request.form()
    upload = form.get("file")
    client_key = form.get("api_key") or request.headers.get("x-gemini-api-key")

    active_key = client_key or GEMINI_API_KEY

    if upload is None:
        return JSONResponse({"detail": "No file uploaded."}, status_code=400)

    content_type = upload.content_type or ""
    if not content_type.startswith("image/"):
        return JSONResponse({"detail": "Only image files are accepted."}, status_code=400)

    raw = await upload.read()
    if len(raw) > 10 * 1024 * 1024:
        return JSONResponse({"detail": "Image must be under 10MB."}, status_code=413)

    # Compress & format image
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
            yield f"data: {json.dumps({'event': 'start', 'message': 'Connecting to Gemini 2.0 Flash Vision...'})}\n\n"
            await asyncio.sleep(0.3)

            if not active_key:
                yield f"data: {json.dumps({'event': 'error', 'message': 'GEMINI_API_KEY required. Please configure your Gemini API Key in Settings to run live AI vision audits.'})}\n\n"
                return

            # Live Multimodal Gemini 2.0 Flash Vision REST API call
            payload = {
                "contents": [
                    {
                        "parts": [
                            {"inline_data": {"mime_type": mime_type, "data": encoded}},
                            {"text": SYSTEM_PROMPT + "\n\nAnalyze this uploaded UI screenshot and perform the comprehensive 15-category design audit. Return only the JSON."}
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.2,
                    "maxOutputTokens": 8192,
                    "responseMimeType": "application/json"
                }
            }

            yield f"data: {json.dumps({'event': 'progress', 'tokens': 0})}\n\n"

            loop = asyncio.get_event_loop()
            resp = await loop.run_in_executor(
                None,
                lambda: _requests.post(
                    GEMINI_URL,
                    params={"key": active_key},
                    json=payload,
                    timeout=120,
                )
            )

            if resp.status_code != 200:
                err_text = resp.text
                try:
                    err_json = resp.json()
                    err_text = err_json.get("error", {}).get("message", resp.text)
                except Exception:
                    pass
                yield f"data: {json.dumps({'event': 'error', 'message': f'Gemini API error ({resp.status_code}): {err_text}'})}\n\n"
                return

            resp_json = resp.json()
            full_text = resp_json["candidates"][0]["content"]["parts"][0]["text"]

            json_start = full_text.find("{")
            json_end = full_text.rfind("}") + 1
            if json_start == -1 or json_end == 0:
                yield f"data: {json.dumps({'event': 'error', 'message': 'Could not parse JSON from Gemini response.'})}\n\n"
                return

            critique = json.loads(full_text[json_start:json_end])

            # Stream header
            yield f"data: {json.dumps({'event': 'header', 'overall_score': critique.get('overall_score', 85), 'overall_grade': critique.get('overall_grade', 'A-'), 'summary': critique.get('summary', '')})}\n\n"
            await asyncio.sleep(0.2)

            # Stream categories
            for cat in critique.get("categories", []):
                yield f"data: {json.dumps({'event': 'category', 'data': cat})}\n\n"
                await asyncio.sleep(0.05)

            # Stream priority fixes
            for fix in critique.get("priority_fixes", []):
                yield f"data: {json.dumps({'event': 'fix', 'data': fix})}\n\n"
                await asyncio.sleep(0.05)

            # Stream positive highlights
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
        Route("/api/config", get_config, methods=["GET"]),
        Route("/api/settings/key", save_key, methods=["POST"]),
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
