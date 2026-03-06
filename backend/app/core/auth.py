import os
from fastapi import Header, HTTPException


def require_api_key(x_api_key: str | None = Header(default=None)) -> None:
    expected = os.getenv("AQUILASE_API_KEY")
    if not expected:
        raise RuntimeError("AQUILASE_API_KEY is not set in environment variables.")

    if x_api_key != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")