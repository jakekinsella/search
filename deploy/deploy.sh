#! /bin/bash

export VERSION=${1:-latest}

echo "Deploying to ${CONTROL_PLANE_IP} @ $VERSION"

./deploy/push.sh $VERSION

PASSWORD=$(ssh ubuntu@"${CONTROL_PLANE_IP}" "aws ecr get-login-password --region us-east-1")
NODES=$(ssh ubuntu@"${CONTROL_PLANE_IP}" "sudo kubectl get nodes -owide" | grep -v NAME | awk '{print $6}')
for node in $NODES
do
  echo $node
  ssh -A ubuntu@"${CONTROL_PLANE_IP}" ssh -o "StrictHostKeyChecking=no" ubuntu@"${node}" "sudo ./ecr_refresh.sh $PASSWORD"
done

ssh ubuntu@"${CONTROL_PLANE_IP}" "sudo kubectl apply -f ~/cluster/search/"
