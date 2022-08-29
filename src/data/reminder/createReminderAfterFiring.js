"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReminderAfterFiring = void 0;
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
