import {Reminder} from "../../../../src/data/reminder/Reminder";
import {Event} from "../../../../src/data/event/Event";
import {createReminderAfterFiring} from "../../../../src/data/reminder/operations";

describe("Test createReminderAfterFiring", () => {
    it("Creates a new reminder", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "YEAR", [1]);

        const newReminder = createReminderAfterFiring(firedReminder, event);

        expect(newReminder).toBeTruthy();
        expect(newReminder.id).toBeUndefined();
        expect(newReminder.fired).toEqual(false);
        expect(newReminder.eventId).toEqual("a");
        expect(newReminder.daysBefore).toEqual(1);
    });

    it("Throws on missing non-optional params", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "YEAR", [1]);

        expect(() => createReminderAfterFiring(firedReminder, <Event><any>null)).toThrow();
        expect(() => createReminderAfterFiring(<Reminder><any>null, event)).toThrow();
    });

    it("Sets new date in a day", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "DAY", [1]);

        const newReminder = createReminderAfterFiring(firedReminder, event);

        expect(newReminder.date).toBeTruthy();
        expect(newReminder.date.getFullYear()).toEqual(2022);
        expect(newReminder.date.getMonth()).toEqual(0);
        expect(newReminder.date.getDate()).toEqual(1);
    });

    it("Sets new date in a week", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "WEEK", [1]);

        const newReminder = createReminderAfterFiring(firedReminder, event);

        expect(newReminder.date).toBeTruthy();
        expect(newReminder.date.getFullYear()).toEqual(2022);
        expect(newReminder.date.getMonth()).toEqual(0);
        expect(newReminder.date.getDate()).toEqual(7);
    });

    it("Sets new date in a day month", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "MONTH", [1]);

        const newReminder = createReminderAfterFiring(firedReminder, event);

        expect(newReminder.date).toBeTruthy();
        expect(newReminder.date.getFullYear()).toEqual(2022);
        expect(newReminder.date.getMonth()).toEqual(0);
        expect(newReminder.date.getDate()).toEqual(31);
    });

    it("Sets new date in a day year", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "YEAR", [1]);

        const newReminder = createReminderAfterFiring(firedReminder, event);

        expect(newReminder.date).toBeTruthy();
        expect(newReminder.date.getFullYear()).toEqual(2022);
        expect(newReminder.date.getMonth()).toEqual(11);
        expect(newReminder.date.getDate()).toEqual(31);
    });

    it("Doesn't modify the existing reminder", () => {
        const firedReminder = new Reminder("1", new Date(2021, 11, 31, 11), "a", true, 1);
        const event = new Event("a", "", "", new Date(2022, 0, 1, 11), "YEAR", [1]);

        const newReminder = createReminderAfterFiring(firedReminder, event);

        expect(newReminder.date).toBeTruthy();
        expect(newReminder.fired).toEqual(false);
        expect(newReminder.eventId).toEqual("a");
        expect(newReminder.daysBefore).toEqual(1);
        expect(newReminder.date.getFullYear()).toEqual(2022);
        expect(newReminder.date.getMonth()).toEqual(11);
        expect(newReminder.date.getDate()).toEqual(31);

        expect(firedReminder.fired).toEqual(true);
        expect(firedReminder.id).toEqual("1");
        expect(firedReminder.date.getFullYear()).toEqual(2021);
        expect(firedReminder.date.getMonth()).toEqual(11);
        expect(firedReminder.date.getDate()).toEqual(31);
    });
});
