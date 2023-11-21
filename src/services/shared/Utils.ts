import { JsonError } from "./Validator";
import { randomUUID } from "crypto";
import { APIGatewayProxyEvent } from "aws-lambda";

export function createRandomId(){
    return randomUUID();
}

export function parseJSON(arg: string){
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JsonError(error.message)
    }
}

export function hasAdminGroup(event: APIGatewayProxyEvent){
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    }
    return false;
}