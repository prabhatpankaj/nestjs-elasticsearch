docker build -t nestjs-es-api .

kind load docker-image nestjs-es-api:v1 --name one-master-one-node-cluster

helm install nestjs-es-api nestjs-es-api/ --values nestjs-es-api/values.yaml
helm upgrade nestjs-es-api nestjs-es-api/ --values nestjs-es-api/values.yaml