import {MongoReminder} from "./MongoReminder";
import {mongooseReminderModel} from "./mongooseReminderModel";

export const deleteReminderCommand = async (id: string): Promise<void> => {
    await mongooseReminderModel.findByIdAndDelete(id);
}

export const insertRemindersCommand = async(mongoReminders: MongoReminder[]): Promise<void> => {
    await mongooseReminderModel.insertMany(mongoReminders);
}

export const markReminderFiredCommand = async (id: string): Promise<void> => {
    await mongooseReminderModel.findByIdAndUpdate(id, {fired: true});
}