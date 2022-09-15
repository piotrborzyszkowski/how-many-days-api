import {SQSEvent} from "aws-lambda";
import {SES, SQS} from "aws-sdk";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {PublishInput, PublishResponse} from "aws-sdk/clients/sns";
import {findEventByIdQuery} from "../data/event/queries";
import {findUserByIdQuery} from "../data/user/queries";
import {findReminderByIdQuery} from "../data/reminder/queries";
import * as dotenv from "dotenv";
import {rotateReminders} from "../data/reminder/operations";
import {ensureFindSingle} from "../data/ensureFind";
import {sendEmail} from "../aws/sendEmail";
import {ensure} from "../ensure";
import {deleteQueueMessage} from "../aws/deleteQueueMessage";
import {mongooseReminderModel} from "../data/reminder/mongooseReminderModel";
import {mongooseEventModel} from "../data/event/mongooseEventModel";
import {mongooseUserModel} from "../data/user/mongooseUserModel";

type TopicMessage = PublishInput & PublishResponse;

export async function fireReminder(sqsEvent: SQSEvent): Promise<void> {
    console.log(`SQS event received: ${JSON.stringify(sqsEvent)}`);
    ensure(process.env.QUEUE_REMINDER_DUE, "process.env.QUEUE_REMINDER_DUE");

    dotenv.config();
    const ses = new SES();
    const sqs = new SQS();
    await dbConnect(getConnectionString);

    try {
        for (const record of sqsEvent.Records) {
            const topicMessage: TopicMessage = JSON.parse(record.body);
            const reminderDueMessage: ReminderDueMessage = JSON.parse(topicMessage.Message);
            console.log(`reminderDueMessage ${JSON.stringify(reminderDueMessage)}`);

            const reminder = await ensureFindSingle(findReminderByIdQuery, mongooseReminderModel ,reminderDueMessage.reminderId!);
            const event = await ensureFindSingle(findEventByIdQuery, mongooseEventModel, reminderDueMessage.eventId!);
            const user = await ensureFindSingle(findUserByIdQuery, mongooseUserModel, event?.userId!);

            await sendEmail(user!, event, reminder, ses);
            await rotateReminders(reminder, event, mongooseReminderModel);
            await deleteQueueMessage(record, process.env.QUEUE_REMINDER_DUE!, sqs);
        }
    } finally {
        await dbDisconnect();
    }
}
