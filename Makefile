build:
	docker build -t purch1/subby-server .

push:
	docker push purch1/subby-server

run:
	docker-compose up
