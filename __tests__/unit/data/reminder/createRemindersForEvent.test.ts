import {Event} from "../../../../src/data/event/Event";
import {createRemindersForEvent} from "../../../../src/data/reminder/createRemindersForEvent";
import {Reminder} from "../../../../src/data/reminder/Reminder";

describe("Test createRemindersForEvent", () => {
    it("should fail on non-existing id", () => {
        const event = new Event(undefined, "a", "a", new Date(), "WEEK");
        expect(() => createRemindersForEvent(event, [])).toThrow();
    });

    it("should crete reminders based on reminder days", () => {
        const event = new Event("x", "a", "a", new Date(2029, 11, 31), "YEAR", [1, 2, 365]);
        const result = createRemindersForEvent(event, []);

        expect(result).toBeTruthy();
        expect(result.toBeInsertedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders).toBeTruthy();

        expect(result.toBeDeletedReminders.length).toBe(0);
        expect(result.toBeInsertedReminders.length).toEqual(3);
        expect(result.toBeInsertedReminders.find(r =>
            r.date.getFullYear() == 2029
            && r.date.getMonth() == 11
            && r.date.getDate() == 30)
        ).toBeTruthy();
        expect(result.toBeInsertedReminders.find(r =>
            r.date.getFullYear() == 2029
            && r.date.getMonth() == 11
            && r.date.getDate() == 29)
        ).toBeTruthy();
        expect(result.toBeInsertedReminders.find(r =>
            r.date.getFullYear() == 2028
            && r.date.getMonth() == 11
            && r.date.getDate() == 31)
        ).toBeTruthy();
    });

    it("should not crete reminders if they already exist", () => {
        const event = new Event("x", "a", "a", new Date(2029, 11, 31), "YEAR", [1, 2]);
        const result = createRemindersForEvent(event, [
            new Reminder("1", new Date(2029, 11, 30), "x", false, 1),
            new Reminder("1", new Date(2029, 11, 29), "x", false, 2),
        ]);

        expect(result).toBeTruthy();
        expect(result.toBeInsertedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders).toBeTruthy();

        expect(result.toBeDeletedReminders.length).toBe(0);
        expect(result.toBeInsertedReminders.length).toEqual(0);
    });

    it("should delete reminders which are not valid any more", () => {
        const event = new Event("x", "a", "a", new Date(2029, 11, 31), "YEAR", [2]);
        const result = createRemindersForEvent(event, [
            new Reminder("1", new Date(2029, 11, 30), "x", false, 1),
            new Reminder("1", new Date(2029, 11, 29), "x", false, 2),
        ]);

        expect(result).toBeTruthy();
        expect(result.toBeInsertedReminders).toBeTruthy();
        expect(result.toBeDeletedReminders).toBeTruthy();

        expect(result.toBeInsertedReminders.length).toEqual(0);
        expect(result.toBeDeletedReminders.length).toBe(1);

        expect(result.toBeDeletedReminders.find(r =>
            r.date.getFullYear() == 2029
            && r.date.getMonth() == 11
            && r.date.getDate() == 30)
        ).toBeTruthy();
    });
});
