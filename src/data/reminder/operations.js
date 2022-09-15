"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateReminders = exports.createReminderAfterFiring = void 0;
const commands_1 = require("./commands");
const mapReminderFromMongo_1 = require("./mapReminderFromMongo");
const mapEventFromMongo_1 = require("../event/mapEventFromMongo");
const mapReminderToMongo_1 = require("./mapReminderToMongo");
function createReminderAfterFiring(oldReminder, event) {
    if (!oldReminder)
        throw "oldReminder is required";
    if (!event)
        throw "event is required";
    // MVP date calculation, to be fixed
    const newDate = new Date(oldReminder.date);
    if (event.repeatEvery == "DAY")
        newDate.setDate(oldReminder.date.getDate() + 1);
    else if (event.repeatEvery == "WEEK")
        newDate.setDate(oldReminder.date.getDate() + 7);
    else if (event.repeatEvery == "MONTH")
        newDate.setMonth(oldReminder.date.getMonth() + 1);
    else if (event.repeatEvery == "YEAR")
        newDate.setFullYear(oldReminder.date.getFullYear() + 1);
    const newReminder = {
        ...oldReminder,
        id: undefined,
        fired: false,
        date: newDate,
    };
    return newReminder;
}
exports.createReminderAfterFiring = createReminderAfterFiring;
async function rotateReminders(reminder, event, mongooseReminderModel) {
    await (0, commands_1.markReminderFiredCommand)(reminder._id, mongooseReminderModel);
    const newReminder = createReminderAfterFiring((0, mapReminderFromMongo_1.mapReminderFromMongo)(reminder), (0, mapEventFromMongo_1.mapEventFromMongo)(event));
    await (0, commands_1.insertRemindersCommand)([(0, mapReminderToMongo_1.mapReminderToMongo)(newReminder)], mongooseReminderModel);
}
exports.rotateReminders = rotateReminders;
