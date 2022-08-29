"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReminderFromMongo = void 0;
const Reminder_1 = require("./Reminder");
const mapReminderFromMongo = (mongoReminder) => mongoReminder == null ? null :
    new Reminder_1.Reminder(`${mongoReminder._id}`, mongoReminder.date, `${mongoReminder.eventId}`, mongoReminder.fired, mongoReminder.daysBefore);
exports.mapReminderFromMongo = mapReminderFromMongo;
