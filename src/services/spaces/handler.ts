import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { getSpaces } from "./GetSpaces";
import { postSpaces } from "./PostSpaces";
// import { postSpacesWithDoc } from "./PostSpacesWithClient";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";

import { MissingFieldError } from "../shared/validation";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let message: string
    try {
        switch(event.httpMethod) {
            case "GET":{
                const getResponse = await getSpaces(event, ddbClient);
                console.log(getResponse)
                return getResponse;
            }
            case "POST":{
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse;
            }
            case "PUT":{
                const updateRepsonse = await updateSpaces(event, ddbClient);
                console.log(updateRepsonse)
                return updateRepsonse;
            }
            case "DELETE":{
                const deleteRepsonse = await deleteSpaces(event, ddbClient);
                console.log(deleteRepsonse)
                return deleteRepsonse;
            }
            default:
                break;
        }
    } catch(error) {
        if(error instanceof MissingFieldError){
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    return response;
}

export { handler }