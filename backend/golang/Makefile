.PHONY: run build clean test up-mongo

run:
	@go run main.go

build:
	@go build -o myapp

clean:
	@rm -f myapp

up-mongo:
	docker-compose up -d

down-mongo:
	docker-compose down -v