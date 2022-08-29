"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reminder = void 0;
class Reminder {
    constructor(id, date, eventId, fired, daysBefore) {
        this.id = id;
        this.date = date;
        this.eventId = eventId;
        this.fired = fired;
        this.daysBefore = daysBefore;
    }
}
exports.Reminder = Reminder;
