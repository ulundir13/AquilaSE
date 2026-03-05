def compute_risk_score(text: str, ambiguous_terms: list[str], classification: str) -> dict:
    ...
    score = 0

    score += 2 * len(ambiguous_terms)

    if classification == "performance":
        score += 1
    elif classification == "safety":
        score += 2

    if len(text) > 120:
        score += 1

    if score >= 4:
        level = "high"
    elif score >= 2:
        level = "medium"
    else:
        level = "low"

    return {"risk_score": score, "risk_level": level}