"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapUserFromMongo_1 = require("../../../../src/data/user/mapUserFromMongo");
const User_1 = require("../../../../src/data/user/User");
describe("Test mapUserFromMongo", () => {
    it("should return a mapped user", () => {
        const result = (0, mapUserFromMongo_1.mapUserFromMongo)({
            _id: "xyz",
            authenticationId: "abc",
            email: "whiterabbit@example.com",
        });
        expect(result).toEqual(new User_1.User("xyz", "abc", "whiterabbit@example.com"));
    });
});
