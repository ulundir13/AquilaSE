KEYWORDS = {
    "performance": [
        "latency", "throughput", "response time", "bandwidth",
        "real-time", "speed", "seconds", "milliseconds", "ms"
    ],
    "interface": [
        "interface", "api", "protocol", "lte", "nodeb",
        "ethernet", "fiber", "connect", "integration"
    ],
    "safety": [
        "fail-safe", "hazard", "safety", "shutdown",
        "emergency", "critical", "redundant"
    ],
    "functional": [
        "shall", "must", "provide", "perform",
        "enable", "allow", "support"
    ],
}


def classify_requirement(text: str) -> str:
    t = text.lower()

    for category, words in KEYWORDS.items():
        for word in words:
            if word in t:
                return category

    return "unclassified"