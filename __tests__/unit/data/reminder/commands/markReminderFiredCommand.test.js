"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../../../../src/data/reminder/commands");
describe("Test markReminderFiredCommand", () => {
    const model = {
        findByIdAndDelete: jest.fn((id) => {
        }),
        findByIdAndUpdate: jest.fn((id, changes) => {
        }),
        insertMany: jest.fn((mongoReminders) => {
        }),
    };
    it("Should set fired to true in mongo", async () => {
        await (0, commands_1.markReminderFiredCommand)("1", model);
        expect(model.findByIdAndDelete.mock.calls.length).toEqual(0);
        expect(model.findByIdAndUpdate.mock.calls.length).toEqual(1);
        expect(model.findByIdAndUpdate.mock.lastCall[0]).toEqual("1");
        expect(model.findByIdAndUpdate.mock.lastCall[1]).toEqual({ fired: true });
        expect(model.insertMany.mock.calls.length).toEqual(0);
    });
});
