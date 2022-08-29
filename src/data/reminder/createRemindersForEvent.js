"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemindersForEvent = exports.CreateRemindersForEventResult = void 0;
const Reminder_1 = require("./Reminder");
class CreateRemindersForEventResult {
    constructor(toBeDeletedReminders, toBeInsertedReminders) {
        this.toBeDeletedReminders = toBeDeletedReminders;
        this.toBeInsertedReminders = toBeInsertedReminders;
    }
}
exports.CreateRemindersForEventResult = CreateRemindersForEventResult;
function generateReminders(event) {
    const generatedReminders = event.remindDaysBefore.map(days => {
        const date = new Date(event.date);
        date.setDate(date.getDate() - days);
        return new Reminder_1.Reminder(undefined, date, event.id, false, days);
    });
    return generatedReminders;
}
function filterReminders(event, toBeDeletedReminders, generatedReminders, toBeInsertedReminders) {
    event.remindDaysBefore.forEach(days => {
        const toBeDeletedIndex = toBeDeletedReminders.findIndex(r => r.daysBefore === days);
        const newIndex = generatedReminders.findIndex(r => r.daysBefore === days);
        if (newIndex < 0)
            throw new Error(`Reminder for ${days} days not generated`);
        if (toBeDeletedIndex >= 0)
            toBeDeletedReminders.splice(toBeDeletedIndex, 1);
        else
            toBeInsertedReminders.push(generatedReminders[newIndex]);
    });
}
const createRemindersForEvent = (event, existingReminders) => {
    if (event.id === undefined)
        throw "id is required";
    if (!event.remindDaysBefore || !event.remindDaysBefore.length)
        return new CreateRemindersForEventResult(existingReminders, []);
    const generatedReminders = generateReminders(event);
    const toBeDeletedReminders = [...existingReminders];
    const toBeInsertedReminders = [];
    filterReminders(event, toBeDeletedReminders, generatedReminders, toBeInsertedReminders);
    return new CreateRemindersForEventResult(toBeDeletedReminders, toBeInsertedReminders);
};
exports.createRemindersForEvent = createRemindersForEvent;
