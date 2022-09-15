import {findEventByIdQuery} from "../../../../../src/data/event/queries";
import {MongoEvent} from "../../../../../src/data/event/MongoEvent";

describe("Test findEventByIdQuery", () => {
    const event = <MongoEvent>{
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
        await findEventByIdQuery("1", <any>model);
        expect(model.findById.mock.calls.length).toEqual(1);
        expect(model.find.mock.calls.length).toEqual(0);
    });

    it("should return mongo object", async () => {
        const result = await findEventByIdQuery("1", <any>model);
        expect(result).toBe(event);
    });
});
