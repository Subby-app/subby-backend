build:
	docker buildx build --platform linux/amd64 -t purch1/subby-server .

push:
	docker push purch1/subby-server

run:
	docker-compose up
