from dataclasses import dataclass
from typing import List, Dict, Any

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def build_traceability_matrix(
    requirements: List[str],
    top_k: int = 3,
    min_similarity: float = 0.20
) -> List[Dict[str, Any]]:
    """
    Builds a simple RTM by linking each requirement to its most similar peers
    using TF-IDF + cosine similarity.

    Returns a list of rows:
    [
      {
        "requirement": "...",
        "links": [{"to": "...", "score": 0.43}, ...]
      },
      ...
    ]
    """
    if not requirements:
        return []

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform(requirements)

    sim = cosine_similarity(tfidf)

    results: List[Dict[str, Any]] = []

    for i, req in enumerate(requirements):
        candidates = []
        for j, score in enumerate(sim[i]):
            if i == j:
                continue  # skip self
            if score >= min_similarity:
                candidates.append((j, float(score)))

        candidates.sort(key=lambda x: x[1], reverse=True)
        top = candidates[:top_k]

        links = [{"to": requirements[j], "score": round(s, 3)} for j, s in top]

        results.append({
            "requirement": req,
            "links": links
        })

    return results