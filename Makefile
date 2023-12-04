build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
