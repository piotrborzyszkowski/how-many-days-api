import {mongooseReminderModel} from "./mongooseReminderModel";
import {MongoReminder} from "./MongoReminder";

export const findReminderByIdQuery = async (id: string): Promise<MongoReminder | null> =>
    await mongooseReminderModel
        .findById(id)
        .exec();

export const findCurrentRemindersByEventIdQuery = async (eventId: string): Promise<MongoReminder[]> =>
    await mongooseReminderModel
        .find({
            eventId,
            fired: false
        })
        .exec();

export const findRemindersToBeFiredQuery = async (today: Date): Promise<MongoReminder[]> =>
    await mongooseReminderModel
        .find({
            fired: false,
            date: {$lt: today},
        })
        .exec();
