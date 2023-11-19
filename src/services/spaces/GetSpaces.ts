import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters){
        if('id' in event.queryStringParameters){
            const spaceId = event.queryStringParameters['id'];
            const spaceResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    id: {S: spaceId}
                }
            }));
            if(spaceResponse.Item){
                const marshallSpaceResponse = unmarshall(spaceResponse.Item)
                return {
                    statusCode: 200,
                    body: JSON.stringify(marshallSpaceResponse)
                }
            }else {
                return {
                    statusCode: 404,
                    body: JSON.stringify(`Space with id ${spaceId} not found!`)
                }
            }
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify("Id required!")
            }
        }
    }

    const result = await ddbClient.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
      })
    );
    const unmarshallResponse = result.Items?.map(item => unmarshall(item))
    console.log(unmarshallResponse);

    return {
        statusCode: 201,
        body: JSON.stringify(unmarshallResponse)
    }
}
