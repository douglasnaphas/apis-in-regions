import { App, Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";

export interface AppStackProps extends StackProps {
  customProp?: string;
}
export class AppStack extends Stack {
  constructor(scope: App, id: string, props: AppStackProps = {}) {
    super(scope, id, props);
    const { customProp } = props;
    const defaultBucketProps = {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    };
    const bucket = new s3.Bucket(this, "Bucket", {
      ...defaultBucketProps,
      versioned: true,
    });
    new CfnOutput(this, "BucketName", {
      value: bucket.bucketName,
    });
    const fn = new lambda.Function(this, "Function", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      environment: {
        REGION: this.region,
      },
      code: lambda.Code.fromInline(
        `exports.handler = function(event, ctx, cb) {\n` +
          `  console.log("function running...")` +
          `  return cb(null, {\n` +
          `    statusCode: 200,\n` +
          `    body: JSON.stringify({\n` +
          `      region: process.env.REGION\n` +
          `    })\n` +
          `  });\n` +
          `};`
      ),
    });
    const lambdaRestApi = new apigateway.LambdaRestApi(this, "API", {
      handler: fn,
    });
    const api = new CfnOutput(this, "APIEndpoint", {
      value: lambdaRestApi.url,
    });
  }
}
