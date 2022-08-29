"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRemindersToBeFiredQuery = exports.findCurrentRemindersByEventIdQuery = exports.findReminderByIdQuery = void 0;
const mongooseReminderModel_1 = require("./mongooseReminderModel");
const findReminderByIdQuery = async (id) => await mongooseReminderModel_1.mongooseReminderModel
    .findById(id)
    .exec();
exports.findReminderByIdQuery = findReminderByIdQuery;
const findCurrentRemindersByEventIdQuery = async (eventId) => await mongooseReminderModel_1.mongooseReminderModel
    .find({
    eventId,
    fired: false
})
    .exec();
exports.findCurrentRemindersByEventIdQuery = findCurrentRemindersByEventIdQuery;
const findRemindersToBeFiredQuery = async (today) => await mongooseReminderModel_1.mongooseReminderModel
    .find({
    fired: false,
    date: { $lt: today },
})
    .exec();
exports.findRemindersToBeFiredQuery = findRemindersToBeFiredQuery;
