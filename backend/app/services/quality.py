AMBIGUOUS_TERMS = {
    "fast", "user friendly", "easy", "robust", "optimize", "secure",
    "as needed", "as appropriate", "near real-time", "sufficient",
    "high performance", "minimal", "quickly"
}

def find_ambiguity(text: str):
    t = text.lower()
    hits = [term for term in AMBIGUOUS_TERMS if term in t]
    return hits