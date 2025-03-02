.PHONY: run install install-frontend install-backend

run: install
	@echo "Starting backend..."
	@cd backend && npm run dev & \
	echo "Starting frontend..." && \
	cd frontend && npm run dev

install: install-frontend install-backend

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && npm install