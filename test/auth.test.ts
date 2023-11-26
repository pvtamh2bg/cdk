import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";
import { Credentials } from '@aws-sdk/types';


async function testAuth(){
    const service = new AuthService();
    const loginResult = await service.login(
        'tampv',
        'D7j]!rnxh2RC2'
    )
    // console.log(loginResult)
    const credentials = await service.generateTemporaryCredentials(loginResult);
    // console.log(credentials);
    const buckets = await listBuckets(credentials);
    console.log(buckets);
}

async function listBuckets(credentials: Credentials){
    const client = new S3Client({
        credentials
    });
    const command = new ListBucketsCommand({});
    const result = await client.send(command);
    return result;
}

testAuth();