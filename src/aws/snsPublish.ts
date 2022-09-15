import {SNS} from "aws-sdk";

export async function snsPublish(message: any, topicArn: string, messageGroupId: string | undefined, sns: SNS): Promise<void> {
    const publish = {
        Message: JSON.stringify(message),
        TopicArn: topicArn,
    };

    const publishResult = await sns.publish(publish).promise();
    console.log(`published ${JSON.stringify(publish)} with result ${JSON.stringify(publishResult)}`);
}