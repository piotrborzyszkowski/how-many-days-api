"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../../src/data/user/User");
const mapUserToMongo_1 = require("../../../../src/data/user/mapUserToMongo");
describe("Test mapUserToMongo", () => {
    it("should return a mapped user", () => {
        const result = (0, mapUserToMongo_1.mapUserToMongo)(new User_1.User("xyz", "abc", "whiterabbit@example.com"));
        expect(result).toEqual({
            _id: "xyz",
            authenticationId: "abc",
            email: "whiterabbit@example.com",
        });
    });
});
