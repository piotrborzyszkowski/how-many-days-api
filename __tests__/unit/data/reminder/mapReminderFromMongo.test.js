"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapReminderFromMongo_1 = require("../../../../src/data/reminder/mapReminderFromMongo");
const Reminder_1 = require("../../../../src/data/reminder/Reminder");
describe("Test mapReminderFromMongo", () => {
    it("should return a mapped reminder", () => {
        const result = (0, mapReminderFromMongo_1.mapReminderFromMongo)({
            _id: "xyz",
            eventId: "abc",
            date: new Date(2020, 10, 20, 1, 2, 3),
            fired: true,
            daysBefore: 32,
        });
        expect(result).toEqual(new Reminder_1.Reminder("xyz", new Date(2020, 10, 20, 1, 2, 3), "abc", true, 32));
    });
});
