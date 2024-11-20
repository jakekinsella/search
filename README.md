# Search

Search _somewhere_, disaggregate the internet.

## Cloud Deploy
Deploy a single node Kubernetes cluster in AWS.  

### Dependencies
 - [Packer](http://packer.io)
 - [Terraform](https://www.terraform.io)

### Initial Setup
  
Environment variables:
```
export AWS_ACCESS_KEY_ID=???
export AWS_SECRET_ACCESS_KEY=???
export AWS_ACCOUNT_ID=???
export AWS_DEFAULT_REGION=us-east-1
```
  
Initialize the build depedencies:  
`make aws-init`

### AWS Setup
Set up the ECR repo:  
`make aws-repo`

### Cluster Deploy

Export the Control Plane IP:  
`export CONTROL_PLANE_IP=???`  

Deploy the cluster:  
`make cluster-publish`  
`make cluster-deploy VERSION=???`  

... wait \~10minutes time (until `sudo kubectl get pods` shows all the containers running) ...  

## To-Do
 - ???
