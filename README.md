# AquilaSE



AquilaSE is a systems engineering framework that helps turn ideas or mission goals into working systems. It organizes the process of defining requirements, designing architecture, building components, integrating them, and testing the final system to make sure it works as intended.



### OVERVIEW



AquilaSE is a full-stack AI-assisted platform designed to analyze, validate, and visualize systems engineering requirements.



The platform applies natural language processing (NLP) and similarity analysis to:



• detect ambiguous language

• classify requirement types

• calculate risk scores

• generate traceability relationships

• visualize requirement quality and risk



AquilaSE simulates a modern digital engineering toolchain aligned with practices used in:



• aerospace

• telecom

• defense

• large-scale infrastructure systems



The project demonstrates AI engineering, data engineering, and modern full-stack architecture using containerized services and production-style API design.



### CORE FEATURES



##### Requirements Analysis



Upload CSV requirements and automatically analyze:



• ambiguity detection

• requirement classification

• risk scoring



##### Requirement Classification



Requirements are automatically categorized as:



• Functional

• Performance

• Interface

• Safety



##### Risk Scoring Engine



Each requirement receives a risk score based on:



• ambiguous language

• requirement complexity

• classification context



Results are displayed through a visual heatmap dashboard.



##### Traceability Matrix (RTM)



The platform generates similarity-based requirement relationships.



This helps engineers identify requirement dependencies and relationships within complex systems.



##### Interactive Dashboard



The frontend dashboard displays:



• requirements analysis table

• risk heatmap visualization

• traceability matrix relationships



##### Secure API Access



API endpoints are protected using:



X-API-Key authentication



This simulates a production-style secured engineering API.



### ARCHITECTURE



Frontend (Next.js + React)

│

│ REST API

▼

Backend (FastAPI)

│

│ Data Services

▼

PostgreSQL Database



Container orchestration is handled with Docker Compose.



### TECHNOLOGY STACK



##### Backend



Python 3.14

FastAPI

Pydantic

Uvicorn

NLP rule engine

Similarity matching for traceability



##### Frontend



Next.js (App Router)

React

TypeScript

TailwindCSS



##### Database



PostgreSQL

Docker container



##### DevOps



Docker

Docker Compose

Git version control



##### API Documentation



Automatically generated using:



OpenAPI / Swagger



Available at:



http://127.0.0.1:8000/docs



### RUNNING THE PROJECT



##### Clone Repository



git clone https://github.com/ulundir13/AquilaSE



cd AquilaSE



##### OPTION 1 — FULL STACK (DOCKER)



Start the entire stack:



docker compose up --build



Services will run at:



Frontend

http://localhost:3000



Backend API

http://127.0.0.1:8000



API Documentation

http://127.0.0.1:8000/docs



##### OPTION 2 — LOCAL DEVELOPMENT



###### Start Backend



cd backend

python -m venv .venv

.venv\\Scripts\\activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000



Backend runs at:



http://127.0.0.1:8000



###### Start Frontend



Open a new terminal:



cd frontend

npm install

npm run dev



Frontend runs at:



http://localhost:3000



### EXAMPLE CSV INPUT



requirement

The system shall encrypt data at rest using AES-256.

The system shall encrypt data in transit using TLS 1.3.

The system shall manage encryption keys using a key management service.

The system shall log all encryption failures for audit purposes.



### PROJECT ROADMAP



##### Phase 1 — Foundation (Completed)



Backend API scaffold

CSV ingestion

Ambiguity detection service

Frontend API connectivity

Dockerized database



##### Phase 2 — Intelligence Layer (Completed)



Requirement classification

Risk scoring engine

Traceability similarity analysis

Risk heatmap visualization



##### Phase 3 — Systems Engineering Expansion (Planned)



Requirement verification suggestions

Requirement coverage analysis

Machine learning based requirement classification

Embedding-based semantic traceability



##### Phase 4 — Production Hardening



Database persistence layer

CI/CD pipeline

Cloud deployment

Enterprise authentication



##### ENGINEERING DESIGN PRINCIPLES



AquilaSE emphasizes:



• modular service architecture

• separation of API and domain logic

• containerized infrastructure

• extensible AI/ML architecture

• production-style API design



The project models digital engineering workflows used in complex systems development programs.



### AUTHOR



Joshua Harrison



Telecommunications \& Network Engineer

AI Engineering • Data Engineering • Full-Stack Systems Development

