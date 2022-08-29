"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReminderToMongo = void 0;
const mapReminderToMongo = (reminder) => {
    return {
        _id: reminder.id,
        date: reminder.date,
        eventId: reminder.eventId,
        fired: reminder.fired,
        daysBefore: reminder.daysBefore,
    };
};
exports.mapReminderToMongo = mapReminderToMongo;
