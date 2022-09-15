"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../../../../../src/data/user/queries");
describe("Test findUserByIdQuery", () => {
    const user = {
        _id: "123",
        authenticationId: "a",
        email: "john@example.com",
    };
    const model = {
        findById: jest.fn((id) => ({
            exec: () => new Promise(resolve => resolve(user)),
        })),
        find: jest.fn(),
    };
    it("should find by id in mongo", async () => {
        await (0, queries_1.findUserByIdQuery)("1", model);
        expect(model.findById.mock.calls.length).toEqual(1);
        expect(model.findById.mock.lastCall[0]).toEqual("1");
        expect(model.find.mock.calls.length).toEqual(0);
    });
    it("should return mongo object", async () => {
        const result = await (0, queries_1.findUserByIdQuery)("1", model);
        expect(result).toEqual(user);
    });
});
