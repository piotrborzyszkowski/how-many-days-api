import {MongoReminder} from "./MongoReminder";
import {Reminder} from "./Reminder";

export const mapReminderToMongo = (reminder: Reminder): MongoReminder => {
    return {
        _id: reminder.id,
        date: reminder.date,
        eventId: reminder.eventId,
        fired: reminder.fired,
        daysBefore: reminder.daysBefore,
    };
}