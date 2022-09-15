"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snsPublish = void 0;
async function snsPublish(message, topicArn, messageGroupId, sns) {
    const publish = {
        Message: JSON.stringify(message),
        TopicArn: topicArn,
    };
    const publishResult = await sns.publish(publish).promise();
    console.log(`published ${JSON.stringify(publish)} with result ${JSON.stringify(publishResult)}`);
}
exports.snsPublish = snsPublish;
