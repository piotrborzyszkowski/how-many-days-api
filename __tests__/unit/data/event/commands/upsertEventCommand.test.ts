import {upsertEventCommand} from "../../../../../src/data/event/commands";
import {MongoEvent} from "../../../../../src/data/event/MongoEvent";

describe("Test upsertEventCommand", () => {
    it("should insert if id is empty and return id of the inserted element", async () => {
        const mongoEvent = <MongoEvent>{
            _id: undefined,
        };

        const fakeModel = {
            insertMany: jest.fn(() => {
                return {insertedIds: ["abc"]};
            }),
            findByIdAndUpdate: jest.fn(),
        }

        const result = await upsertEventCommand(mongoEvent, <any>fakeModel);

        expect(result).toEqual("abc");
        expect(fakeModel.insertMany.mock.calls.length).toEqual(1);
        expect(fakeModel.findByIdAndUpdate.mock.calls.length).toEqual(0);
    });

    it("should update if id is not empty and return id of the updated element", async () => {
        const mongoEvent = <MongoEvent>{
            _id: "123",
        };

        const fakeModel = {
            insertMany: jest.fn(() => {
                return {insertedIds: ["abc"]};
            }),
            findByIdAndUpdate: jest.fn(),
        }

        const result = await upsertEventCommand(mongoEvent, <any>fakeModel);

        expect(result).toEqual("123");
        expect(fakeModel.insertMany.mock.calls.length).toEqual(0);
        expect(fakeModel.findByIdAndUpdate.mock.calls.length).toEqual(1);
    });
});
