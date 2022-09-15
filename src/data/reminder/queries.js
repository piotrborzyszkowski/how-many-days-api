"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRemindersToBeFiredQuery = exports.findCurrentRemindersByEventIdQuery = exports.findReminderByIdQuery = void 0;
const findReminderByIdQuery = async (id, mongooseReminderModel) => await mongooseReminderModel
    .findById(id)
    .exec();
exports.findReminderByIdQuery = findReminderByIdQuery;
const findCurrentRemindersByEventIdQuery = async (eventId, mongooseReminderModel) => await mongooseReminderModel
    .find({
    eventId,
    fired: false
})
    .exec();
exports.findCurrentRemindersByEventIdQuery = findCurrentRemindersByEventIdQuery;
const findRemindersToBeFiredQuery = async (today, mongooseReminderModel) => await mongooseReminderModel
    .find({
    fired: false,
    date: { $lt: today },
})
    .exec();
exports.findRemindersToBeFiredQuery = findRemindersToBeFiredQuery;
