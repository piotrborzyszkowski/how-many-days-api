"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../../../../src/data/reminder/commands");
describe("Test insertRemindersCommand", () => {
    const reminder1 = {
        _id: "123",
        date: new Date(),
        eventId: "a",
        fired: false,
        daysBefore: 7,
    };
    const reminder2 = {
        _id: "456",
        date: new Date(),
        eventId: "b",
        fired: false,
        daysBefore: 10,
    };
    const model = {
        findByIdAndDelete: jest.fn((id) => {
        }),
        findByIdAndUpdate: jest.fn((id, changes) => {
        }),
        insertMany: jest.fn((mongoReminders) => {
        }),
    };
    it("Should insert in mongo", async () => {
        await (0, commands_1.insertRemindersCommand)([reminder1, reminder2], model);
        expect(model.findByIdAndDelete.mock.calls.length).toEqual(0);
        expect(model.findByIdAndUpdate.mock.calls.length).toEqual(0);
        expect(model.insertMany.mock.calls.length).toEqual(1);
        expect(model.insertMany.mock.lastCall[0].length).toEqual(2);
        expect(model.insertMany.mock.lastCall[0][0]).toEqual(reminder1);
        expect(model.insertMany.mock.lastCall[0][1]).toEqual(reminder2);
    });
});
