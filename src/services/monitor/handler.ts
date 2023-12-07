import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Tam, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}


export { handler }