from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from services.pdf_service import extract_text_from_pdf
from services.ai_service import analyze_contract_risk

load_dotenv()

app = FastAPI(title="ClauseGuard API")

# Explicit CORS settings for local dev and production deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://*.vercel.app",  # Matches all Vercel deployment URLs
        "*"  # Fallback wildcard to ensure smooth frontend connections
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "ClauseGuard API is running successfully!"}

@app.post("/analyze")
async def analyze_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    text = await extract_text_from_pdf(file)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
        
    analysis = analyze_contract_risk(text)
    return analysis