#!/bin/sh
# COMMANDS
# ./build.sh dev - run the app in development mode
# ./build.sh prod - run the app in production mode
# ./build.sh prod --no-attach - run the app in production mode without attaching to the logs (probably what you want if you're running it on a server)

if [ "$1" = "dev" ]; then
    cd frontend
    npm run build
    cd ../backend
    cp settings_dev.json settings.json
    python3 main.py

elif [ "$1" = "prod" ]; then
    cd backend
    cp settings_prod.json settings.json
    cd ..
    if ! docker info > /dev/null 2>&1; then
        echo "Docker is not running or not installed"
        exit 1
    fi
    if ! command -v docker-compose > /dev/null 2>&1; then
        echo "Docker-compose is not installed"
        exit 1
    fi
    if [ "$2" = "--no-attach" ]; then
        docker-compose build
        docker-compose up -d
    else
        docker-compose build
        docker-compose up
    fi
fi