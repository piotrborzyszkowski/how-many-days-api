"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../../../../../src/data/user/queries");
describe("Test findUserByAuthenticationIdQuery", () => {
    const user1 = {
        _id: "123",
        authenticationId: "a",
        email: "john@example.com",
    };
    const user2 = {
        _id: "456",
        authenticationId: "b",
        email: "jane@example.com",
    };
    const modelFactory = (returnUsers) => {
        return {
            findById: jest.fn(),
            find: jest.fn((filter) => ({
                exec: () => new Promise(resolve => resolve(returnUsers)),
            })),
        };
    };
    it("should find by authentication id in mongo", async () => {
        const model = modelFactory([user1]);
        await (0, queries_1.findUserByAuthenticationIdQuery)("x", model);
        expect(model.findById.mock.calls.length).toEqual(0);
        expect(model.find.mock.calls.length).toEqual(1);
        expect(model.find.mock.lastCall[0]).toEqual({ userId: "x" });
    });
    it("should return mongo object if exactly one is returned", async () => {
        const model = modelFactory([user1]);
        const result = await (0, queries_1.findUserByAuthenticationIdQuery)("x", model);
        expect(result).toEqual(user1);
    });
    it("should return null if none found", async () => {
        const model = modelFactory([]);
        const result = await (0, queries_1.findUserByAuthenticationIdQuery)("x", model);
        expect(result).toBeNull();
    });
    it("should throw if multiple users found", async () => {
        const model = modelFactory([user1, user2]);
        expect(() => (0, queries_1.findUserByAuthenticationIdQuery)("x", model)).rejects.toThrow();
    });
});
