import {SNSEvent} from "aws-lambda";
import {findEventByIdQuery} from "../data/event/queries";
import {findCurrentRemindersByEventIdQuery} from "../data/reminder/queries";
import {createRemindersForEvent} from "../data/reminder/createRemindersForEvent";
import {mapEventFromMongo} from "../data/event/mapEventFromMongo";
import {mapReminderFromMongo} from "../data/reminder/mapReminderFromMongo";
import {deleteReminderCommand, insertRemindersCommand} from "../data/reminder/commands";
import {mapReminderToMongo} from "../data/reminder/mapReminderToMongo";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {mongooseEventModel} from "../data/event/mongooseEventModel";
import {mongooseReminderModel} from "../data/reminder/mongooseReminderModel";

export async function prepareRemindersByEventId(snsEvent: SNSEvent): Promise<void> {
    console.log(`SNS event received: ${JSON.stringify(snsEvent)}`);

    await dbConnect(getConnectionString);
    try {
        for (const record of snsEvent.Records) {
            const message = <EventUpsertedMessage>JSON.parse(record.Sns.Message);
            const event = mapEventFromMongo(await findEventByIdQuery(message.eventId, mongooseEventModel));
            console.log(`found event: ${JSON.stringify(event)}`);

            if (!event) {
                console.error(`Event ${message.eventId} not found`);
                return;
            }
            if (!event.remindDaysBefore) {
                console.error(`Reminders are not set for event ${event.id}`);
                return;
            }

            const existingReminders = (await findCurrentRemindersByEventIdQuery(message.eventId, mongooseReminderModel)).map(mr => mapReminderFromMongo(mr)!);
            const {toBeDeletedReminders, toBeInsertedReminders} = createRemindersForEvent(event, existingReminders);

            console.log(`existingReminders ${JSON.stringify(existingReminders)}`);
            console.log(`toBeDeletedReminders ${JSON.stringify(toBeDeletedReminders)}`);
            console.log(`toBeInsertedReminders ${JSON.stringify(toBeInsertedReminders)}`);

            for (const reminder of toBeDeletedReminders) {
                await deleteReminderCommand(reminder.id!, mongooseReminderModel);
            }
            await insertRemindersCommand(toBeInsertedReminders.map(mapReminderToMongo), mongooseReminderModel);
            console.log(`reminders updated for event ${event.id}`);
        }
    } finally {
        await dbDisconnect();
    }
}
