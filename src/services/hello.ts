import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let message = "";
    switch(event.httpMethod) {
        case "GET":
            message = "Hello Lambda From GET"
            break;
        case "POST":
            message = "Hello Lambda From GET"
            break; 
        default:
            break;      
    }
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    return response;
}

export { handler }