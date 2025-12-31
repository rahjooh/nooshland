.PHONY: help install dev build start lint db-init db-migrate db-seed test clean

# Default target
help:
	@echo "Nooshland Cafe - Makefile Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make install      - Install all dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make start        - Start production server"
	@echo "  make lint         - Run ESLint"
	@echo "  make db-init      - Initialize database (migrate + seed)"
	@echo "  make db-migrate   - Run database migrations"
	@echo "  make db-seed      - Seed database with sample data"
	@echo "  make test         - Run tests (if available)"
	@echo "  make clean        - Clean build artifacts and node_modules"
	@echo ""

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Development server
dev:
	@echo "Starting development server..."
	npm run dev

# Build for production
build:
	@echo "Building for production..."
	npm run build

# Start production server
start:
	@echo "Starting production server..."
	npm run start

# Run linter
lint:
	@echo "Running ESLint..."
	npm run lint

# Initialize database (migrate + seed)
db-init:
	@echo "Initializing database..."
	npm run db:init

# Run database migrations
db-migrate:
	@echo "Running database migrations..."
	npm run db:migrate

# Seed database
db-seed:
	@echo "Seeding database..."
	npm run db:seed

# Run tests
test:
	@echo "Running tests..."
	@echo "No tests configured yet"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf .next
	rm -rf out
	rm -rf node_modules
	rm -rf data/*.db
	rm -rf data/*.db-journal
	@echo "Clean complete"

# Full setup (install + db-init)
setup: install db-init
	@echo "Setup complete!"

# Quick start (install + db-init + dev)
quick-start: install db-init
	@echo "Starting development server..."
	npm run dev

