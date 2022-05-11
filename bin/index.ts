#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AppStack } from "../lib";
const stackname = require("@cdk-turnkey/stackname");

(async () => {
  const app = new App();
  new AppStack(app, stackname("East"), { env: { region: "us-east-1" } });
})();
