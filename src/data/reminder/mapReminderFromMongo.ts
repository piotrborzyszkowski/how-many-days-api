import {MongoReminder} from "./MongoReminder";
import {Reminder} from "./Reminder";

export const mapReminderFromMongo = (mongoReminder: MongoReminder | null): Reminder | null =>
    mongoReminder == null ? null :
        new Reminder(
            `${mongoReminder._id}`,
            mongoReminder.date,
            `${mongoReminder.eventId}`,
            mongoReminder.fired,
            mongoReminder.daysBefore,
        );
