import {MongoUser} from "../../../../../src/data/user/MongoUser";
import {findUserByIdQuery} from "../../../../../src/data/user/queries";

describe("Test findUserByIdQuery", () => {
    const user = <MongoUser>{
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
        await findUserByIdQuery("1", <any>model);
        expect(model.findById.mock.calls.length).toEqual(1);
        expect(model.findById.mock.lastCall[0]).toEqual("1");
        expect(model.find.mock.calls.length).toEqual(0);
    });

    it("should return mongo object", async () => {
        const result = await findUserByIdQuery("1", <any>model);
        expect(result).toEqual(user);
    });
});
