"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(id, name, userId, date, repeatEvery, remindDaysBefore) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.date = date;
        this.repeatEvery = repeatEvery;
        this.remindDaysBefore = remindDaysBefore;
    }
}
exports.Event = Event;
