"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../../../../src/data/event/commands");
describe("Test upsertEventCommand", () => {
    it("should insert if id is empty and return id of the inserted element", async () => {
        const mongoEvent = {
            _id: undefined,
        };
        const fakeModel = {
            insertMany: jest.fn(() => {
                return { insertedIds: ["abc"] };
            }),
            findByIdAndUpdate: jest.fn(),
        };
        const result = await (0, commands_1.upsertEventCommand)(mongoEvent, fakeModel);
        expect(result).toEqual("abc");
        expect(fakeModel.insertMany.mock.calls.length).toEqual(1);
        expect(fakeModel.findByIdAndUpdate.mock.calls.length).toEqual(0);
    });
    it("should update if id is not empty and return id of the updated element", async () => {
        const mongoEvent = {
            _id: "123",
        };
        const fakeModel = {
            insertMany: jest.fn(() => {
                return { insertedIds: ["abc"] };
            }),
            findByIdAndUpdate: jest.fn(),
        };
        const result = await (0, commands_1.upsertEventCommand)(mongoEvent, fakeModel);
        expect(result).toEqual("123");
        expect(fakeModel.insertMany.mock.calls.length).toEqual(0);
        expect(fakeModel.findByIdAndUpdate.mock.calls.length).toEqual(1);
    });
});
