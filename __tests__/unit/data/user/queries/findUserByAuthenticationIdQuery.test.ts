import {findUserByAuthenticationIdQuery} from "../../../../../src/data/user/queries";
import {MongoUser} from "../../../../../src/data/user/MongoUser";

describe("Test findUserByAuthenticationIdQuery", () => {
    const user1 = <MongoUser>{
        _id: "123",
        authenticationId: "a",
        email: "john@example.com",
    };
    const user2 = <MongoUser>{
        _id: "456",
        authenticationId: "b",
        email: "jane@example.com",
    };

    const modelFactory = (returnUsers: MongoUser[]) => {
        return {
            findById: jest.fn(),
            find: jest.fn((filter: any) => ({
                exec: () => new Promise(resolve => resolve(returnUsers)),
            })),
        }
    };

    it("should find by authentication id in mongo", async () => {
        const model = modelFactory([user1]);
        await findUserByAuthenticationIdQuery("x", <any>model);
        expect(model.findById.mock.calls.length).toEqual(0);
        expect(model.find.mock.calls.length).toEqual(1);
        expect(model.find.mock.lastCall[0]).toEqual({userId: "x"});
    });

    it("should return mongo object if exactly one is returned", async () => {
        const model = modelFactory([user1]);
        const result = await findUserByAuthenticationIdQuery("x", <any>model);
        expect(result).toEqual(user1);
    });

    it("should return null if none found", async () => {
        const model = modelFactory([]);
        const result = await findUserByAuthenticationIdQuery("x", <any>model);
        expect(result).toBeNull()
    });

    it("should throw if multiple users found", async () => {
        const model = modelFactory([user1, user2]);
        expect(() => findUserByAuthenticationIdQuery("x", <any>model)).rejects.toThrow();
    });
});