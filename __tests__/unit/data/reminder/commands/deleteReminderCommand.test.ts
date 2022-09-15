import {deleteReminderCommand} from "../../../../../src/data/reminder/commands";
import {MongoReminder} from "../../../../../src/data/reminder/MongoReminder";

describe("Test deleteReminderCommand", () => {
    const model = {
        findByIdAndDelete: jest.fn((id) => {
        }),
        findByIdAndUpdate: jest.fn((id, changes) => {
        }),
        insertMany: jest.fn((mongoReminders: MongoReminder[]) => {
        }),
    };

    it("Should delete in mongo", async () => {
        await deleteReminderCommand("1", <any>model);
        expect(model.findByIdAndDelete.mock.calls.length).toEqual(1);
        expect(model.findByIdAndDelete.mock.lastCall[0]).toEqual("1");

        expect(model.findByIdAndUpdate.mock.calls.length).toEqual(0);
        expect(model.insertMany.mock.calls.length).toEqual(0);
    });
});
