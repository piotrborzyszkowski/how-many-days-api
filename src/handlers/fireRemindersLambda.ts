import {ScheduledEvent} from "aws-lambda";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {findRemindersToBeFiredQuery} from "../data/reminder/queries";
import {SNS} from "aws-sdk";
import {mapReminderFromMongo} from "../data/reminder/mapReminderFromMongo";
import * as dotenv from "dotenv";
import {getEndOfToday} from "../getEndOfToday";
import {snsPublish} from "../aws/snsPublish";
import {ensure} from "../ensure";
import {mongooseReminderModel} from "../data/reminder/mongooseReminderModel";

export async function fireReminders(scheduledEvent: ScheduledEvent): Promise<void> {
    console.log(`Received scheduledEvent: ${JSON.stringify(scheduledEvent)}`);
    ensure(process.env.TOPIC_REMINDER_DUE, "process.env.TOPIC_REMINDER_DUE");
    ensure(process.env.MESSAGE_GROUP_ID_REMINDER_DUE, "process.env.MESSAGE_GROUP_ID_REMINDER_DUE");

    const today = getEndOfToday(Date);
    console.log(`Looking for all reminders due by ${today}`);

    dotenv.config();
    const sns = new SNS();
    await dbConnect(getConnectionString);
    try {
        const reminders = (await findRemindersToBeFiredQuery(today, mongooseReminderModel)).map(mapReminderFromMongo);
        for (const reminder of reminders) {
            const reminderDueMessage: ReminderDueMessage = {
                reminderId: reminder?.id!,
                eventId: reminder?.eventId!,
            };

            await snsPublish(reminderDueMessage, process.env.TOPIC_REMINDER_DUE!, process.env.MESSAGE_GROUP_ID_REMINDER_DUE!, sns);
        }

        console.log(`Successfully published ${reminders.length} reminders`);
    } finally {
        await dbDisconnect();
    }
};
