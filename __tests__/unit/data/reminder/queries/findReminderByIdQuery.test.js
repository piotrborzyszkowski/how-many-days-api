"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../../../../../src/data/reminder/queries");
describe("Test findReminderByIdQuery", () => {
    const reminder = {
        _id: "123",
        date: new Date(),
        eventId: "a",
        fired: true,
        daysBefore: 7,
    };
    const model = {
        findById: jest.fn(() => ({
            exec: () => new Promise(resolve => resolve(reminder)),
        })),
        find: jest.fn(),
    };
    it("should find by id in mongo", async () => {
        await (0, queries_1.findReminderByIdQuery)("1", model);
        expect(model.findById.mock.calls.length).toEqual(1);
        expect(model.find.mock.calls.length).toEqual(0);
    });
    it("should return mongo object", async () => {
        const result = await (0, queries_1.findReminderByIdQuery)("1", model);
        expect(result).toBe(reminder);
    });
});
