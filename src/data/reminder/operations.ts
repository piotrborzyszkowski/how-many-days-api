import {Reminder} from "./Reminder";
import {Event} from "../event/Event";
import {MongoReminder} from "./MongoReminder";
import {MongoEvent} from "../event/MongoEvent";
import {insertRemindersCommand, markReminderFiredCommand} from "./commands";
import {mapReminderFromMongo} from "./mapReminderFromMongo";
import {mapEventFromMongo} from "../event/mapEventFromMongo";
import {mapReminderToMongo} from "./mapReminderToMongo";
import {Model} from "mongoose";

export function createReminderAfterFiring(oldReminder: Reminder, event: Event): Reminder {
    if (!oldReminder)
        throw "oldReminder is required";
    if (!event)
        throw "event is required";

    // MVP date calculation, to be fixed
    const newDate = new Date(oldReminder.date);
    if (event.repeatEvery == "DAY")
        newDate.setDate(oldReminder.date.getDate() + 1);
    else if (event.repeatEvery == "WEEK")
        newDate.setDate(oldReminder.date.getDate() + 7);
    else if (event.repeatEvery == "MONTH")
        newDate.setMonth(oldReminder.date.getMonth() + 1);
    else if (event.repeatEvery == "YEAR")
        newDate.setFullYear(oldReminder.date.getFullYear() + 1);

    const newReminder: Reminder = {
        ...oldReminder,
        id: undefined,
        fired: false,
        date: newDate,
    };

    return newReminder;
}

export async function rotateReminders(reminder: MongoReminder, event: MongoEvent, mongooseReminderModel: Model<MongoReminder>): Promise<void> {
    await markReminderFiredCommand(reminder._id!, mongooseReminderModel);

    const newReminder = createReminderAfterFiring(mapReminderFromMongo(reminder)!, mapEventFromMongo(event)!);
    await insertRemindersCommand([mapReminderToMongo(newReminder)], mongooseReminderModel);
}
