"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../../../../../src/data/event/queries");
describe("Test findEventsByUserIdQuery", () => {
    const event1 = {
        _id: "123",
        name: "a",
        userId: "x",
        date: new Date(),
        repeatEvery: "DAY",
    };
    const event2 = {
        _id: "xyz",
        name: "b",
        userId: "y",
        date: new Date(),
        repeatEvery: "MONTH",
    };
    const model = {
        findById: jest.fn(),
        find: jest.fn((filter) => ({
            exec: () => new Promise(resolve => resolve([event1, event2])),
        })),
    };
    it("should find by user id in mongo", async () => {
        await (0, queries_1.findEventsByUserIdQuery)("a", model);
        expect(model.findById.mock.calls.length).toEqual(0);
        expect(model.find.mock.calls.length).toEqual(1);
        expect(model.find.mock.lastCall[0]).toEqual({ userId: "a" });
    });
    it("should return mongo objects", async () => {
        const result = await (0, queries_1.findEventsByUserIdQuery)("a", model);
        expect(result).toBeTruthy();
        expect(result.length).toEqual(2);
        expect(result.find(r => r._id === event1._id
            && r.date === event1.date
            && r.name === event1.name
            && r.userId === event1.userId
            && r.repeatEvery === event1.repeatEvery)).toBeTruthy();
        expect(result.find(r => r._id === event2._id
            && r.date === event2.date
            && r.name === event2.name
            && r.userId === event2.userId
            && r.repeatEvery === event2.repeatEvery)).toBeTruthy();
    });
});
