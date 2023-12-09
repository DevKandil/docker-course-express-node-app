build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
watchtower:
	docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_POLL_INTERVAL=30 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower docker-course-express-node-app_node-app_1
scale:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --scale node-app=3