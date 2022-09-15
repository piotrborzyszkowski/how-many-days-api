"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQueueMessage = void 0;
async function deleteQueueMessage(record, queueUrl, sqs) {
    const deleteMessageRequest = {
        QueueUrl: queueUrl,
        ReceiptHandle: record.receiptHandle,
    };
    console.log(`Deleting message ${JSON.stringify(deleteMessageRequest)}`);
    await sqs.deleteMessage(deleteMessageRequest).promise();
}
exports.deleteQueueMessage = deleteQueueMessage;
