#!/bin/bash
docker stop backend || true && docker rm backend || true
docker stop frontend || true && docker rm frontend || true

docker run -d -p 5000:5000 --name backend dejdocka/backend:latest
docker run -d -p 3000:3000 --name frontend dejdocka/frontend:latest
