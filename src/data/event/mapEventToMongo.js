"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEventToMongo = void 0;
const mapEventToMongo = (event) => {
    return {
        _id: event.id,
        userId: event.userId,
        name: event.name,
        date: event.date,
        repeatEvery: event.repeatEvery,
        remindDaysBefore: [...(event.remindDaysBefore || [])],
    };
};
exports.mapEventToMongo = mapEventToMongo;
