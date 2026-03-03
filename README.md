## AquilaSE

AI-Powered Systems Engineering Requirements Intelligence Platform

## OVERVIEW

AquilaSE is a full-stack AI-powered platform designed to analyze, validate, and enhance systems engineering requirements. It applies natural language processing (NLP) techniques to detect ambiguous language, classify requirement types, and support traceability and risk awareness in complex engineered systems.

Built using FastAPI, Next.js, PostgreSQL, and Docker, AquilaSE demonstrates modern full-stack architecture, data engineering workflows, AI integration, and production-ready containerization.

This project simulates a digital engineering tool aligned with aerospace, defense, telecom, and large-scale infrastructure systems development practices.

## FEATURES

- CSV-based requirements ingestion
- Automated ambiguity detection (rule-based NLP)
- REST API built with FastAPI
- Interactive Swagger API documentation
- Next.js full-stack frontend dashboard
- Dockerized PostgreSQL database
- Requirement classification (in progress)
- Traceability matrix generation (planned)
- Risk scoring \& visualization heatmap (planned)
- Embedding-based similarity mapping (planned)

## TECH STACK

Backend:
- FastAPI
- Python 3.14
- Pydantic
- SQLAlchemy (planned)
- Rule-based NLP engine (extensible to ML models)

Frontend:
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS

Database:
- PostgreSQL (Docker container)

DevOps:
- Docker
- Docker Compose
- Git version control

API Documentation:
- OpenAPI / Swagger

## HOW TO RUN LOCALLY

1. Clone Repository
git clone https:https://github.com/ulundir13/AquilaSE
cd AquilaSE

2. Start PostgreSQL with Docker
docker compose up -d
Verify container is running:
docker ps

3. Start Backend
cd backend
python -m venv .venv
..venv\\Scripts\\activate (Windows)
pip install -r requirements.txt (if created)
uvicorn app.main:app --reload --port 8000

Backend runs at:
http://127.0.0.1:8000

Swagger documentation:
http://127.0.0.1:8000/docs

4. Start Frontend
Open a new terminal:

cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:3000



## EXAMPLE CSV INPUT

requirement
The system shall be fast and user friendly.
The system shall encrypt data at rest.
The interface shall be robust and secure.

The output preview includes detected ambiguous terms.



## ROADMAP

Phase 1 – Foundation (Completed)

- Backend API scaffold
- CSV ingestion
- Ambiguity detection service
- Frontend API connectivity
- Dockerized database



Phase 2 – Intelligence Layer

- Requirement type classification
- Risk scoring model
- Confidence metrics



Phase 3 – Systems Engineering Expansion

- Requirements Traceability Matrix (RTM)
- Embedding-based similarity analysis
- Verification method suggestions

Phase 4 – Production Hardening

- Authentication
- Database persistence
- CI/CD pipeline
- Cloud deployment



## ENGINEERING FOCUS

This project emphasizes:

- Separation of concerns (API vs services vs domain logic)
- Containerized infrastructure
- Extensible AI architecture
- Systems engineering workflow modeling
- Clean, modular code organization



Author:
Joshua Harrison
Telecommunications \& Network Engineer
AI / Data / Full-Stack Systems Development

