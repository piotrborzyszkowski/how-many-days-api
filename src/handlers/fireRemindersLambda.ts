import {ScheduledEvent} from "aws-lambda";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {findRemindersToBeFiredQuery} from "../data/reminder/queries";
import {SNS} from "aws-sdk";
import {mapReminderFromMongo} from "../data/reminder/mapReminderFromMongo";
import {PublishInput} from "aws-sdk/clients/sns";
import * as dotenv from "dotenv";

export async function fireReminders(scheduledEvent: ScheduledEvent): Promise<void> {
    console.log(`Received scheduledEvent: ${JSON.stringify(scheduledEvent)}`);

    let today = new Date();
    today.setHours(23, 59, 59, 999);
    console.log(`Looking for all reminders due by ${today}`);

    dotenv.config();
    const sns = new SNS();
    await dbConnect(getConnectionString);
    try {
        const reminders = (await findRemindersToBeFiredQuery(today)).map(mapReminderFromMongo);
        for (const reminder of reminders) {
            const reminderDueMessage: ReminderDueMessage = {
                reminderId: reminder?.id!,
                eventId: reminder?.eventId!,
            };

            const publish = <PublishInput>{
                Message: JSON.stringify(reminderDueMessage),
                TopicArn: process.env.TOPIC_REMINDER_DUE,
                MessageGroupId: process.env.MESSAGE_GROUP_ID_REMINDER_DUE,
            };

            const publishResult = await sns.publish(publish).promise();
            console.log(`published ${JSON.stringify(publish)} with result ${JSON.stringify(publishResult)}`);
        }

        console.log(`Successfully published ${reminders.length} reminders`);
    } finally {
        await dbDisconnect();
    }
};
