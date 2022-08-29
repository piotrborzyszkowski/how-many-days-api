"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseReminderModel = void 0;
const mongoose_1 = require("mongoose");
const reminderCollectionName = 'Reminders';
const reminderSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    eventId: { type: mongoose_1.Types.ObjectId, required: true },
    fired: { type: Boolean, required: false },
    daysBefore: { type: Number, required: false },
});
exports.mongooseReminderModel = (0, mongoose_1.model)(reminderCollectionName, reminderSchema, reminderCollectionName);
