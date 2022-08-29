"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reminder_1 = require("../../../../src/data/reminder/Reminder");
const mapReminderToMongo_1 = require("../../../../src/data/reminder/mapReminderToMongo");
describe("Test mapReminderToMongo", () => {
    it("should return a mapped reminder", () => {
        const result = (0, mapReminderToMongo_1.mapReminderToMongo)(new Reminder_1.Reminder("xyz", new Date(2020, 10, 20, 1, 2, 3), "abc", true, 32));
        expect(result).toEqual({
            _id: "xyz",
            eventId: "abc",
            date: new Date(2020, 10, 20, 1, 2, 3),
            fired: true,
            daysBefore: 32,
        });
    });
});
