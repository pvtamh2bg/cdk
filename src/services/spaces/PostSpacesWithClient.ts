import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
export interface marshallOptions {
    /**
     * Whether to automatically convert empty strings, blobs, and sets to `null`
     */
    convertEmptyValues?: boolean;
    /**
     * Whether to remove undefined values while marshalling.
     */
    removeUndefinedValues?: boolean;
    /**
     * Whether to convert typeof object to map attribute.
     */
    convertClassInstanceToMap?: boolean;
    /**
     * Whether to convert the top level container
     * if it is a map or list.
     *
     * Default is true when using the DynamoDBDocumentClient,
     * but false if directly using the marshall function (backwards compatibility).
     */
    convertTopLevelContainer?: boolean;
  }
  
export interface unmarshallOptions {
    /**
     * Whether to return numbers as a string instead of converting them to native JavaScript numbers.
     * This allows for the safe round-trip transport of numbers of arbitrary size.
     */
    wrapNumbers?: boolean;
  
    /**
     * When true, skip wrapping the data in `{ M: data }` before converting.
     *
     * Default is true when using the DynamoDBDocumentClient,
     * but false if directly using the unmarshall function (backwards compatibility).
     */
    convertWithoutMapWrapper?: boolean;
  }
export async function postSpacesWithDoc(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const marshallOptions: marshallOptions = {};
    const unmarshallOptions: unmarshallOptions = {};

    const translateConfig = { marshallOptions, unmarshallOptions };

    const ddbDocClient = DynamoDBDocument.from(ddbClient, translateConfig);

    const randomId = v4();
    const item = JSON.parse(event.body);
    item.id = randomId
    const result = await ddbDocClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: item
    }));
    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}