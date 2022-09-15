import {SQSRecord} from "aws-lambda";
import {SQS} from "aws-sdk";
import {DeleteMessageRequest} from "aws-sdk/clients/sqs";

export async function deleteQueueMessage(record: SQSRecord, queueUrl: string, sqs: SQS): Promise<void> {
    const deleteMessageRequest = <DeleteMessageRequest>{
        QueueUrl: queueUrl,
        ReceiptHandle: record.receiptHandle,
    };
    console.log(`Deleting message ${JSON.stringify(deleteMessageRequest)}`);
    await sqs.deleteMessage(deleteMessageRequest).promise();
}
