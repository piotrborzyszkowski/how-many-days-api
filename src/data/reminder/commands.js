"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markReminderFiredCommand = exports.insertRemindersCommand = exports.deleteReminderCommand = void 0;
const mongooseReminderModel_1 = require("./mongooseReminderModel");
const deleteReminderCommand = async (id) => {
    await mongooseReminderModel_1.mongooseReminderModel.findByIdAndDelete(id);
};
exports.deleteReminderCommand = deleteReminderCommand;
const insertRemindersCommand = async (mongoReminders) => {
    await mongooseReminderModel_1.mongooseReminderModel.insertMany(mongoReminders);
};
exports.insertRemindersCommand = insertRemindersCommand;
const markReminderFiredCommand = async (id) => {
    await mongooseReminderModel_1.mongooseReminderModel.findByIdAndUpdate(id, { fired: true });
};
exports.markReminderFiredCommand = markReminderFiredCommand;
