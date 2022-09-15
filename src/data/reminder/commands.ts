import {MongoReminder} from "./MongoReminder";
import {Model} from "mongoose";

export const deleteReminderCommand = async (id: string, mongooseReminderModel: Model<MongoReminder>): Promise<void> => {
    await mongooseReminderModel.findByIdAndDelete(id);
}

export const insertRemindersCommand = async(mongoReminders: MongoReminder[], mongooseReminderModel: Model<MongoReminder>): Promise<void> => {
    await mongooseReminderModel.insertMany(mongoReminders);
}

export const markReminderFiredCommand = async (id: string, mongooseReminderModel: Model<MongoReminder>): Promise<void> => {
    await mongooseReminderModel.findByIdAndUpdate(id, {fired: true});
}
