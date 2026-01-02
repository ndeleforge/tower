# Makefile

init:
	cd backend && python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
	cd frontend && npm install
	touch .env
	echo "APP_ENV=dev" > .env

dev:
	cd backend && . .venv/bin/activate && python app.py & \
	BACKEND_PID=$$!; \
	trap "kill $$BACKEND_PID" INT TERM EXIT; \
	cd frontend && npm run dev

prod:
	docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

stop:
	docker compose down

clean:
	rm -rf backend/.venv backend/__pycache__ 
	rm -rf frontend/dist frontend/node_modules
	rm .env
	docker volume prune -f
	docker container prune -f
	docker network prune -f