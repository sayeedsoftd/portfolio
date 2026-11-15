"""
Abu Sayeed Portfolio Backend API
Built with FastAPI & Python
Provides contact handling, status monitoring, and profile data services.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import json
import os
import uuid
import re

app = FastAPI(
    title="Abu Sayeed Portfolio API",
    description="Backend API for Abu Sayeed - AI Automation Expert & Web Developer",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONTACTS_FILE = os.path.join(os.path.dirname(__file__), "contacts_inbox.json")
EMAIL_REGEX = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Sender's full name")
    email: str = Field(..., min_length=5, max_length=150, description="Valid email address")
    subject: str = Field(..., min_length=3, max_length=150, description="Message subject or project type")
    message: str = Field(..., min_length=10, max_length=5000, description="Detailed message or project brief")


class ContactResponse(BaseModel):
    success: bool
    message: str
    ticket_id: str
    timestamp: str


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "developer": "Abu Sayeed",
        "role": "AI Automation Expert & Web Developer",
        "server_time": datetime.utcnow().isoformat() + "Z",
        "uptime": "99.99%",
        "version": "1.0.0"
    }


@app.get("/api/profile")
def get_profile_summary():
    return {
        "name": "Abu Sayeed",
        "tagline": "I turn boring work into smart automation",
        "location": "Comilla, Bangladesh",
        "availability": "Open for high-impact AI Automation & Full-Stack Web Projects",
        "email": "abusayeedt202@gmail.com",
        "phone": "+880 1762-525468"
    }


@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest):
    if not re.match(EMAIL_REGEX, payload.email):
        raise HTTPException(status_code=400, detail="Invalid email address format.")

    ticket_id = f"TICK-{uuid.uuid4().hex[:8].upper()}"
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    entry = {
        "ticket_id": ticket_id,
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "timestamp": timestamp,
        "status": "new"
    }

    # Save to local records storage
    try:
        data = []
        if os.path.exists(CONTACTS_FILE):
            with open(CONTACTS_FILE, "r", encoding="utf-8") as f:
                try:
                    data = json.load(f)
                except Exception:
                    data = []
        data.append(entry)
        with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Notice: Failed to persist contact locally: {e}")

    return ContactResponse(
        success=True,
        message=f"Thank you, {payload.name}! Your message has been received. Abu Sayeed will get back to you within 24 hours.",
        ticket_id=ticket_id,
        timestamp=timestamp
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
