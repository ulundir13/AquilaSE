from fastapi import APIRouter, UploadFile, File
import pandas as pd
from io import BytesIO
from app.services.quality import find_ambiguity

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

    analysis = [
        {"text": r, "ambiguous_terms": find_ambiguity(r)}
        for r in preview_items
    ]

    return {
        "filename": file.filename,
        "rows": len(df),
        "columns": list(df.columns),
        "analysis_preview": analysis
    }