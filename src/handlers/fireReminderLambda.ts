import {SQSEvent, SQSRecord} from "aws-lambda";
import {SES, SQS} from "aws-sdk";
import {DeleteMessageRequest} from "aws-sdk/clients/sqs";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {PublishInput, PublishResponse} from "aws-sdk/clients/sns";
import {findEventByIdQuery} from "../data/event/queries";
import {findUserByIdQuery} from "../data/user/queries";
import {SendEmailRequest} from "aws-sdk/clients/ses";
import {findReminderByIdQuery, findCurrentRemindersByEventIdQuery} from "../data/reminder/queries";
import * as dotenv from "dotenv";
import {MongoUser} from "../data/user/MongoUser";
import {MongoEvent} from "../data/event/MongoEvent";
import {MongoReminder} from "../data/reminder/MongoReminder";
import {insertRemindersCommand, markReminderFiredCommand} from "../data/reminder/commands";
import {createReminderAfterFiring} from "../data/reminder/createReminderAfterFiring";
import {mapReminderFromMongo} from "../data/reminder/mapReminderFromMongo";
import {mapEventFromMongo} from "../data/event/mapEventFromMongo";
import {mapReminderToMongo} from "../data/reminder/mapReminderToMongo";
import {ensureFindSingle} from "../data/ensureFind";

type TopicMessage = PublishInput & PublishResponse;

export async function fireReminder(sqsEvent: SQSEvent): Promise<void> {
    console.log(`SQS event received: ${JSON.stringify(sqsEvent)}`);

    dotenv.config();
    const ses = new SES();
    await dbConnect(getConnectionString);

    try {
        for (const record of sqsEvent.Records) {
            const topicMessage: TopicMessage = JSON.parse(record.body);
            const reminderDueMessage: ReminderDueMessage = JSON.parse(topicMessage.Message);
            console.log(`reminderDueMessage ${JSON.stringify(reminderDueMessage)}`);

            const reminder = await ensureFindSingle(findReminderByIdQuery, reminderDueMessage.reminderId!);
            const event = await ensureFindSingle(findEventByIdQuery, reminderDueMessage.eventId!);
            const user = await ensureFindSingle(findUserByIdQuery, event?.userId!);

            await sendEmail(user!, event, reminder, ses);
            await rotateReminders(reminder, event);
            await deleteQueueMessage(record);
        }
    } finally {
        await dbDisconnect();
    }
}

async function sendEmail(user: MongoUser, event: MongoEvent, reminder: MongoReminder, ses: SES) {
    const sendEmailRequest: SendEmailRequest = {
        Source: process.env.EMAIL_FROM!,
        Destination: {
            ToAddresses: [user?.email!]
        },
        Message: {
            Body: {
                Text: {
                    Data: `${event.name} is in ${reminder!.daysBefore} days!`,
                },
            },
            Subject: {
                Data: `Reminder: ${event.name}`,
            },
        },
    };

    console.log(`Sending email ${JSON.stringify(sendEmailRequest)}`);
    await ses.sendEmail(sendEmailRequest).promise();
}

async function rotateReminders(reminder: MongoReminder, event: MongoEvent): Promise<void> {
    await markReminderFiredCommand(reminder._id!);

    const newReminder = createReminderAfterFiring(mapReminderFromMongo(reminder)!, mapEventFromMongo(event)!);
    await insertRemindersCommand([mapReminderToMongo(newReminder)]);
}

async function deleteQueueMessage(record: SQSRecord): Promise<void> {
    const deleteMessageRequest = <DeleteMessageRequest>{
        QueueUrl: process.env.QUEUE_REMINDER_DUE,
        ReceiptHandle: record.receiptHandle,
    };
    console.log(`Deleting message ${JSON.stringify(deleteMessageRequest)}`);
    await new SQS().deleteMessage(deleteMessageRequest).promise();
}
