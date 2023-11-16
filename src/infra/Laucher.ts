import { App } from "aws-cdk-lib";
import { ApiStack, DataStack, LambdaStack } from "./stacks";

const app = new App();

const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    spacesTable: dataStack.spacesTable
});
new ApiStack(app, 'ApiStack', {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration
});