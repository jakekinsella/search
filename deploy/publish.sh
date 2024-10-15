#! /bin/bash

export VERSION=$(git rev-parse --short HEAD)

echo $VERSION

export ARCH="arm64v8/"

mkdir -p tmp/deploy/docker/search

envsubst < deploy/docker/search/Dockerfile > tmp/deploy/docker/search/Dockerfile

make release
docker buildx build --platform linux/arm64/v8 . -f tmp/deploy/docker/search/Dockerfile -t "search-arm:$VERSION"

aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
docker tag $(docker images | grep search-arm | head -n1 | awk '{print $3}') $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/search:$VERSION
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/search:$VERSION
