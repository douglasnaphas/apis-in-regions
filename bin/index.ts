#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AppStack } from "../lib";
const stackname = require("@cdk-turnkey/stackname");

(async () => {
  const app = new App();
  [
    { stackId: "East", region: "us-east-1" },
    { stackId: "West", region: "us-west-1" },
  ].forEach((stackInfo) => {
    new AppStack(app, stackname(stackInfo.stackId), {
      env: { region: stackInfo.region },
    });
  });
})();
