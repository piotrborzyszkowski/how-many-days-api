"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markReminderFiredCommand = exports.insertRemindersCommand = exports.deleteReminderCommand = void 0;
const deleteReminderCommand = async (id, mongooseReminderModel) => {
    await mongooseReminderModel.findByIdAndDelete(id);
};
exports.deleteReminderCommand = deleteReminderCommand;
const insertRemindersCommand = async (mongoReminders, mongooseReminderModel) => {
    await mongooseReminderModel.insertMany(mongoReminders);
};
exports.insertRemindersCommand = insertRemindersCommand;
const markReminderFiredCommand = async (id, mongooseReminderModel) => {
    await mongooseReminderModel.findByIdAndUpdate(id, { fired: true });
};
exports.markReminderFiredCommand = markReminderFiredCommand;
