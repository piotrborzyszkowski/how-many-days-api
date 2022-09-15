"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../../../../src/data/reminder/commands");
describe("Test deleteReminderCommand", () => {
    const model = {
        findByIdAndDelete: jest.fn((id) => {
        }),
        findByIdAndUpdate: jest.fn((id, changes) => {
        }),
        insertMany: jest.fn((mongoReminders) => {
        }),
    };
    it("Should delete in mongo", async () => {
        await (0, commands_1.deleteReminderCommand)("1", model);
        expect(model.findByIdAndDelete.mock.calls.length).toEqual(1);
        expect(model.findByIdAndDelete.mock.lastCall[0]).toEqual("1");
        expect(model.findByIdAndUpdate.mock.calls.length).toEqual(0);
        expect(model.insertMany.mock.calls.length).toEqual(0);
    });
});
