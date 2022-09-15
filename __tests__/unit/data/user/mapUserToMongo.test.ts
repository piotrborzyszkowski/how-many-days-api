import {User} from "../../../../src/data/user/User";
import {mapUserToMongo} from "../../../../src/data/user/mapUserToMongo";

describe("Test mapUserToMongo", () => {
    it("should return a mapped user", () => {
        const result = mapUserToMongo(new User(
            "xyz",
            "abc",
            "whiterabbit@example.com",
        ));
        expect(result).toEqual({
            _id: "xyz",
            authenticationId: "abc",
            email: "whiterabbit@example.com",
        });
    });
});