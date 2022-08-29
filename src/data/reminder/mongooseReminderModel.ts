import {model, Schema, Types} from "mongoose";
import {MongoReminder} from "./MongoReminder";

const reminderCollectionName = 'Reminders';

const reminderSchema = new Schema({
    date: {type: Date, required: true},
    eventId: {type: Types.ObjectId, required: true},
    fired: {type: Boolean, required: false},
    daysBefore: {type: Number, required: false},
});
export const mongooseReminderModel = model<MongoReminder>(reminderCollectionName, reminderSchema, reminderCollectionName);
