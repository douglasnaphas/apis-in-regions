#!/bin/bash
set -e
STACKNAME=$(npx @cdk-turnkey/stackname@1.1.0 --suffix East)
EAST_URL=$(aws cloudformation describe-stacks \
  --stack-name ${STACKNAME} | \
  jq '.Stacks[0].Outputs | map(select(.OutputKey == "APIEndpoint"))[0].OutputValue' | \
  tr -d \")
EAST_DATA="$(curl ${EAST_URL})"
EXPECTED_EAST_DATA='{"region":"us-east-1"}'
if [[ "${EAST_DATA}" != "${EXPECTED_EAST_DATA}" ]]
then
  echo "Integration test failed. Expected content data:"
  echo "${EXPECTED_EAST_DATA}"
  echo "Got:"
  echo "${EAST_DATA}"
  exit 2
fi
