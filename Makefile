# Makefile

local-init:
	cd backend && python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
	cd frontend && npm install

local-dev:
	cd backend && . .venv/bin/activate && python app.py & \
	BACKEND_PID=$$!; \
	trap "kill $$BACKEND_PID" INT TERM EXIT; \
	cd frontend && npm run dev

local-clean:
	rm -rf backend/.venv backend/__pycache__ 
	rm -rf frontend/dist frontend/node_modules

build-dev:
	docker compose up -d --build
	@echo "Available at : http://localhost:5000"

build-stop:
	docker compose down

build-prod:
	docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

build-clean:
	docker volume prune -f
	docker container prune -f
	docker network prune -f