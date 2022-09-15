"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../../../../../src/data/reminder/queries");
describe("Test findRemindersToBeFiredQuery", () => {
    const reminder1 = {
        _id: "123",
        date: new Date(),
        eventId: "a",
        fired: false,
        daysBefore: 7,
    };
    const reminder2 = {
        _id: "456",
        date: new Date(),
        eventId: "b",
        fired: false,
        daysBefore: 10,
    };
    const today = new Date(2022, 5, 1);
    const model = {
        findById: jest.fn(),
        find: jest.fn((filter) => ({
            exec: () => new Promise(resolve => resolve([reminder1, reminder2])),
        })),
    };
    it("should find not-fired reminders by event id in mongo", async () => {
        await (0, queries_1.findRemindersToBeFiredQuery)(today, model);
        expect(model.findById.mock.calls.length).toEqual(0);
        expect(model.find.mock.calls.length).toEqual(1);
        expect(model.find.mock.lastCall[0]).toEqual({ fired: false, date: { $lt: new Date(2022, 5, 1) } });
    });
    it("should return mongo objects", async () => {
        const result = await (0, queries_1.findCurrentRemindersByEventIdQuery)("a", model);
        expect(result).toBeTruthy();
        expect(result.length).toEqual(2);
        expect(result.find(r => r._id === reminder1._id
            && r.date === reminder1.date
            && r.eventId === reminder1.eventId
            && r.fired === reminder1.fired
            && r.daysBefore === reminder1.daysBefore)).toBeTruthy();
        expect(result.find(r => r._id === reminder2._id
            && r.date === reminder2.date
            && r.eventId === reminder2.eventId
            && r.fired === reminder2.fired
            && r.daysBefore === reminder2.daysBefore)).toBeTruthy();
    });
});
