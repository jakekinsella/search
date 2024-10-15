#! /bin/bash

export VERSION=${1:-latest}

echo "Pushing to ${CONTROL_PLANE_IP} @ $VERSION"

export IMAGE="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/search:$VERSION"
export IMAGE_POLICY="IfNotPresent"
export HOST="search.jakekinsella.com"
export HOST2="duckduckgo.com"
export CENTRAL_BASE="http://central-server:8080/api"
export NODE_SELECTOR="      nodeSelector:
        node: \"1\""

rm -rf tmp/
mkdir -p tmp/deploy/cluster/

for f in deploy/cluster/*.yaml; do envsubst < $f > tmp/$f; done

ssh ubuntu@"${CONTROL_PLANE_IP}" "mkdir -p ~/cluster/search/"

scp -r tmp/deploy/cluster/* ubuntu@"${CONTROL_PLANE_IP}":~/cluster/search/
