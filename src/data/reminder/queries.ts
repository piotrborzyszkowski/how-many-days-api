import {MongoReminder} from "./MongoReminder";
import {Model} from "mongoose";

export const findReminderByIdQuery = async (id: string, mongooseReminderModel: Model<MongoReminder>): Promise<MongoReminder | null> =>
    await mongooseReminderModel
        .findById(id)
        .exec();

export const findCurrentRemindersByEventIdQuery = async (eventId: string, mongooseReminderModel: Model<MongoReminder>): Promise<MongoReminder[]> =>
    await mongooseReminderModel
        .find({
            eventId,
            fired: false
        })
        .exec();

export const findRemindersToBeFiredQuery = async (today: Date, mongooseReminderModel: Model<MongoReminder>): Promise<MongoReminder[]> =>
    await mongooseReminderModel
        .find({
            fired: false,
            date: {$lt: today},
        })
        .exec();
