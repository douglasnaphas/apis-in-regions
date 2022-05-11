# APIs in Regions

## Overview
This repo contains an answer to the [question](https://twitter.com/QuinnyPig/status/1524254819560550401):

> Hmm. I have a small, self contained deploy; at this point it's a Lambda function and an attendant API Gateway; the end. 
>
> Will the CDK let me deploy this thing simultaneously to an arbitrary list of regions, or do I get to write some kind of wrapper around it to handle that part?

## Deploy
To deploy API Gateway APIs to multiple regions using this repo's single CDK app:

    1. Deploy from this template repo.
    2. Go to <your repo's url>/settings/secrets/actions and add Repository Secrets for `PROD_AWS_ACCESS_KEY_ID`, `PROD_AWS_SECRET_ACCESS_KEY`, `TEST_AWS_ACCESS_KEY_ID`, and `TEST_AWS_SECRET_ACCESS_KEY` with IAM user credentials for users that can deploy to prod and test accounts.
    3. Run the CI Action from <your repo's url>/actions.

## Validate
To validate that the multi-region deployment worked, go in your Actions CI output to the _Deploy to the test account_ step, and locate the two CloudFormation stack outputs (one for East, one for West) whose names end with _APIEndpoint_. Open each in a browser and observe that they announce different regions. You can verify in your AWS console that deployments happened in the desired regions.

## Docs
[These docs](https://docs.aws.amazon.com/cdk/v2/guide/stack_how_to_create_multiple_stacks.html) explain how to deploy multiple stacks from one CDK app.