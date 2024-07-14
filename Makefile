SHELL=/bin/bash
RED=\033[0;31m
GREEN=\033[0;32m
BG_GREY=\033[48;5;237m
YELLOW=\033[38;5;202m
BOLD_ON=\033[1m
BOLD_OFF=\033[21m
NC=\033[0m # No Color

ifneq (,$(wildcard ./.env))
	include ./.env
endif

IMAGE_VERSION := $(shell jq -r '.version' package.json)
IMAGE_NAME := $(shell jq -r '.name' package.json)

.PHONY: help

help:
	@echo Automation commands:
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

check-node-env:
ifndef NODE_ENV
	@printf "${YELLOW}NODE_ENV not provided. Using ${BOLD_ON}'NODE_ENV=development'${BOLD_OFF} as default${NC}\n"
  export NODE_ENV = development
endif

docker-build: check-node-env ## build docker image
	docker build --load -f ./Dockerfile --build-arg IMAGE_VERSION=$(IMAGE_VERSION) --build-arg IMAGE_NAME=$(IMAGE_NAME) -t $(IMAGE_NAME):$(IMAGE_VERSION) .

docker-run: check-node-env ## build docker image
	docker run --rm -p 9000:9000 $(IMAGE_NAME):$(IMAGE_VERSION)

logs-restart: ## restart logs stack
	@docker compose -f ./ops/grafana-logs/docker-compose.logs.yaml down
	@docker compose -f ./ops/grafana-logs/docker-compose.logs.yaml up -d

logs-stop: ## stop logs stack
	@docker compose -f ./ops/grafana-logs/docker-compose.logs.yaml down

logs-logs: ## display logs from logs stack
	@docker compose -f ./ops/grafana-logs/docker-compose.logs.yaml logs -f