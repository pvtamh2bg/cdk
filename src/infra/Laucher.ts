import { App } from "aws-cdk-lib";
import { 
    ApiStack, 
    AuthStack, 
    DataStack, 
    LambdaStack, 
    MonitorStack 
} from "./stacks";

const app = new App();

const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    spacesTable: dataStack.spacesTable
});
const authStack = new AuthStack(app, 'AuthStack');
new ApiStack(app, 'ApiStack', {
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration,
    userPool: authStack.userPool
});
new MonitorStack(app, 'MonitorStack')