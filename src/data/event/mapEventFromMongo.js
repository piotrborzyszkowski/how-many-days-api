"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEventFromMongo = void 0;
const Event_1 = require("./Event");
const mapEventFromMongo = (mongoEvent) => mongoEvent == null ? null :
    new Event_1.Event(mongoEvent._id ? `${mongoEvent._id}` : undefined, mongoEvent.name, mongoEvent.userId, mongoEvent.date, mongoEvent.repeatEvery, mongoEvent.remindDaysBefore ? [...mongoEvent.remindDaysBefore] : undefined);
exports.mapEventFromMongo = mapEventFromMongo;
