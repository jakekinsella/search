cluster-publish:
	yarn build
	make -f deploy/Makefile publish

cluster-deploy:
	make -f deploy/Makefile deploy VERSION=$(VERSION)

cluster-teardown:
	make -f deploy/Makefile teardown

aws-init:
	cd deploy/aws && make init

aws-repo:
	cd deploy/aws && make repository
