import { SNSEvent } from "aws-lambda";
import { handler } from "../src/services/monitor/handler";


const snsEvent: SNSEvent = {
    Records: [{
        Sns: {
            Message: 'This is a test'
        }
    }]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

handler(snsEvent, {});