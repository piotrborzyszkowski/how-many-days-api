import {mapUserFromMongo} from "../../../../src/data/user/mapUserFromMongo";
import {User} from "../../../../src/data/user/User";

describe("Test mapUserFromMongo", () => {
    it("should return a mapped user", () => {
        const result = mapUserFromMongo({
            _id: "xyz",
            authenticationId: "abc",
            email: "whiterabbit@example.com",
        });
        expect(result).toEqual(new User(
            "xyz",
            "abc",
            "whiterabbit@example.com",
        ));
    });
});
