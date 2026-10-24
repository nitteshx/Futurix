
import os

import ollama
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FUTURIX AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = os.getenv("OLLAMA_MODEL", "gemma3:1b")


@app.get("/")
def home():
    return {"status": "FUTURIX backend running"}


@app.get("/api/health")
def health():
    return {"status": "ok", "model": MODEL}


@app.post("/api/simulation")
def simulation(payload: dict):
    scenario = str(payload.get("scenario", "Career decision"))
    answer = str(
        payload.get("answer")
        or payload.get("response")
        or payload.get("choice")
        or ""
    )

    prompt = f"""
You are FUTURIX, a friendly career simulation coach.
Scenario: {scenario}
User's response: {answer or str(payload)}

Give practical, supportive feedback.
Explain what the user did well, what to improve,
and one concrete next step. Keep it concise.
"""

    try:
        result = ollama.chat(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
        )
        return {"feedback": result["message"]["content"]}
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=f"AI unavailable. Check Ollama and model {MODEL}.",
        ) from exc
