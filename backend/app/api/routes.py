from fastapi import APIRouter, UploadFile, File
import pandas as pd
from io import BytesIO

from app.services.quality import find_ambiguity
from app.services.classifier import classify_requirement
from app.services.risk import compute_risk_score
from app.services.traceability import build_traceability_matrix

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/requirements/upload")
async def upload_requirements(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".csv"):
        return {"error": "Please upload a CSV file."}

    content = await file.read()
    df = pd.read_csv(BytesIO(content))

    if "requirement" not in df.columns:
        return {"error": "CSV must include a 'requirement' column."}

    preview_items = df["requirement"].head(5).tolist()

    analysis = []
    for r in preview_items:
        ambiguous = find_ambiguity(r)
        classification = classify_requirement(r)
        risk = compute_risk_score(r, ambiguous, classification)

        analysis.append({
            "text": r,
            "ambiguous_terms": ambiguous,
            "classification": classification,
            "risk_score": risk["risk_score"],
            "risk_level": risk["risk_level"],
        })

    return {
        "filename": file.filename,
        "rows": len(df),
        "columns": list(df.columns),
        "analysis_preview": analysis,
    }

@router.post("/traceability/rtm")
async def generate_rtm(file: UploadFile = File(...), top_k: int = 3, min_similarity: float = 0.20):
    if not file.filename.lower().endswith(".csv"):
        return {"error": "Please upload a CSV file."}

    content = await file.read()
    df = pd.read_csv(BytesIO(content))

    if "requirement" not in df.columns:
        return {"error": "CSV must include a 'requirement' column."}

    reqs = df["requirement"].dropna().astype(str).tolist()

    rtm = build_traceability_matrix(reqs, top_k=top_k, min_similarity=min_similarity)

    return {
        "filename": file.filename,
        "rows": len(reqs),
        "top_k": top_k,
        "min_similarity": min_similarity,
        "rtm": rtm
    }