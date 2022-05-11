#!/bin/bash
set -e
STACKNAME_EAST=$(npx @cdk-turnkey/stackname@1.1.0 --suffix East)
EAST_URL=$(aws --region us-east-1 cloudformation describe-stacks \
  --stack-name ${STACKNAME_EAST} | \
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

STACKNAME_WEST=$(npx @cdk-turnkey/stackname@1.1.0 --suffix West)
WEST_URL=$(aws --region us-west-1 cloudformation describe-stacks \
  --stack-name ${STACKNAME_WEST} | \
  jq '.Stacks[0].Outputs | map(select(.OutputKey == "APIEndpoint"))[0].OutputValue' | \
  tr -d \")
WEST_DATA="$(curl ${WEST_URL})"
EXPECTED_WEST_DATA='{"region":"us-west-1"}'
if [[ "${WEST_DATA}" != "${EXPECTED_WEST_DATA}" ]]
then
  echo "Integration test failed. Expected content data:"
  echo "${EXPECTED_WEST_DATA}"
  echo "Got:"
  echo "${WEST_DATA}"
  exit 3
fi