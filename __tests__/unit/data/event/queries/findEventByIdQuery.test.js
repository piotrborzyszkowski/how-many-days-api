"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../../../../../src/data/event/queries");
describe("Test findEventByIdQuery", () => {
    const event = {
        _id: "123",
        name: "a",
        userId: "x",
        date: new Date(),
        repeatEvery: "DAY",
    };
    const model = {
        findById: jest.fn(() => ({
            exec: () => new Promise(resolve => resolve(event)),
        })),
        find: jest.fn(),
    };
    it("should find by id in mongo", async () => {
        await (0, queries_1.findEventByIdQuery)("1", model);
        expect(model.findById.mock.calls.length).toEqual(1);
        expect(model.find.mock.calls.length).toEqual(0);
    });
    it("should return mongo object", async () => {
        const result = await (0, queries_1.findEventByIdQuery)("1", model);
        expect(result).toBe(event);
    });
});
