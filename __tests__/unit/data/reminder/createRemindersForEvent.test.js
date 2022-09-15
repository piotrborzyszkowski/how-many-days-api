"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../../../src/data/event/Event");
const createRemindersForEvent_1 = require("../../../../src/data/reminder/createRemindersForEvent");
const Reminder_1 = require("../../../../src/data/reminder/Reminder");
describe("Test createRemindersForEvent", () => {
    it("should fail on non-existing id", () => {
        const event = new Event_1.Event(undefined, "a", "a", new Date(), "WEEK");
        expect(() => (0, createRemindersForEvent_1.createRemindersForEvent)(event, [])).toThrow();
    });
    it("should crete reminders based on reminder days", () => {
        const event = new Event_1.Event("x", "a", "a", new Date(2029, 11, 31), "YEAR", [1, 2, 365]);
        const result = (0, createRemindersForEvent_1.createRemindersForEvent)(event, []);
        expect(result).toBeTruthy();
        expect(result.toBeInsertedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders.length).toEqual(0);
        expect(result.toBeInsertedReminders.length).toEqual(3);
        expect(result.toBeInsertedReminders.find(r => r.date.getFullYear() == 2029
            && r.date.getMonth() == 11
            && r.date.getDate() == 30)).toBeTruthy();
        expect(result.toBeInsertedReminders.find(r => r.date.getFullYear() == 2029
            && r.date.getMonth() == 11
            && r.date.getDate() == 29)).toBeTruthy();
        expect(result.toBeInsertedReminders.find(r => r.date.getFullYear() == 2028
            && r.date.getMonth() == 11
            && r.date.getDate() == 31)).toBeTruthy();
        expect(result.toBeInsertedReminders.find(r => r.date.getFullYear() == 2000
            && r.date.getMonth() == 0
            && r.date.getDate() == 1)).toBeFalsy();
    });
    it("should not crete reminders if they already exist", () => {
        const event = new Event_1.Event("x", "a", "a", new Date(2029, 11, 31), "YEAR", [1, 2]);
        const result = (0, createRemindersForEvent_1.createRemindersForEvent)(event, [
            new Reminder_1.Reminder("1", new Date(2029, 11, 30), "x", false, 1),
            new Reminder_1.Reminder("1", new Date(2029, 11, 29), "x", false, 2),
        ]);
        expect(result).toBeTruthy();
        expect(result.toBeInsertedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders.length).toEqual(0);
        expect(result.toBeInsertedReminders.length).toEqual(0);
    });
    it("should delete reminders which are not valid any more", () => {
        const event = new Event_1.Event("x", "a", "a", new Date(2029, 11, 31), "YEAR", [2]);
        const result = (0, createRemindersForEvent_1.createRemindersForEvent)(event, [
            new Reminder_1.Reminder("1", new Date(2029, 11, 30), "x", false, 1),
            new Reminder_1.Reminder("1", new Date(2029, 11, 29), "x", false, 2),
        ]);
        expect(result).toBeTruthy();
        expect(result.toBeInsertedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders).toBeTruthy();
        expect(result.toBeInsertedReminders.length).toEqual(0);
        expect(result.toBeDeletedReminders.length).toEqual(1);
        expect(result.toBeDeletedReminders.find(r => r.date.getFullYear() == 2029
            && r.date.getMonth() == 11
            && r.date.getDate() == 30)).toBeTruthy();
    });
});
