import {Reminder} from "./Reminder";
import {Event} from "../event/Event";

export class CreateRemindersForEventResult {
    constructor(
        public toBeDeletedReminders: Reminder[],
        public toBeInsertedReminders: Reminder[]) {
    }
}

function generateReminders(event: Event) {
    const generatedReminders = event.remindDaysBefore!.map(days => {
        const date = new Date(event.date);
        date.setDate(date.getDate() - days);

        return new Reminder(undefined, date, event.id!, false, days)
    });
    return generatedReminders;
}

function filterReminders(event: Event, toBeDeletedReminders: Reminder[], generatedReminders: Reminder[], toBeInsertedReminders: Reminder[]) {
    event.remindDaysBefore!.forEach(days => {
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

export const createRemindersForEvent = (event: Event, existingReminders: Reminder[]): CreateRemindersForEventResult => {
    if (event.id === undefined)
        throw "id is required";

    if (!event.remindDaysBefore || !event.remindDaysBefore.length)
        return new CreateRemindersForEventResult(existingReminders, []);

    const generatedReminders = generateReminders(event);

    const toBeDeletedReminders: Reminder[] = [...existingReminders];
    const toBeInsertedReminders: Reminder[] = [];
    filterReminders(event, toBeDeletedReminders, generatedReminders, toBeInsertedReminders);

    return new CreateRemindersForEventResult(toBeDeletedReminders, toBeInsertedReminders);
};
