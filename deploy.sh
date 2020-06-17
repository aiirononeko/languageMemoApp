#!/bin/bash
# Exit on any error
set -e
for f in k8s/*.yml
do
    envsubst < $f > "generated-$(basename $f)"
done
gcloud docker -- push asia.gcr.io/poeta-276706/poeta-api:latest
gcloud docker -- push asia.gcr.io/poeta-276706/poeta-front:latest
kubectl apply -f generated-deployment.yml --record
