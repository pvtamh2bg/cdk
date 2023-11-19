import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "ap-northeast-1";
process.env.TABLE_NAME = 'SpacesTable-0641493fd859'
process.env.AWS_PROFILE = 'tampv'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
handler({
    httpMethod: 'DELETE',
    queryStringParameters: {
        id: '79b6390e-3aff-4040-a683-9e86a4f6ff74'
    },
    body: JSON.stringify({
        location: 'London update'
    })
} as any, {} as any)