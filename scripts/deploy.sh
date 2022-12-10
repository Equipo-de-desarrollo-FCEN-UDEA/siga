docker-compose -f pull
docker-compose up -d --remove-orphans
yes | docker image prune