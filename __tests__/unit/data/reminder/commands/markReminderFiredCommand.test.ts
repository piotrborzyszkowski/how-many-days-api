import {markReminderFiredCommand} from "../../../../../src/data/reminder/commands";
import {MongoReminder} from "../../../../../src/data/reminder/MongoReminder";

describe("Test markReminderFiredCommand", () => {
    const model = {
        findByIdAndDelete: jest.fn((id) => {
        }),
        findByIdAndUpdate: jest.fn((id, changes) => {
        }),
        insertMany: jest.fn((mongoReminders: MongoReminder[]) => {
        }),
    };

    it("Should set fired to true in mongo", async () => {
        await markReminderFiredCommand("1", <any>model);
        expect(model.findByIdAndDelete.mock.calls.length).toEqual(0);
        expect(model.findByIdAndUpdate.mock.calls.length).toEqual(1);
        expect(model.findByIdAndUpdate.mock.lastCall[0]).toEqual("1");
        expect(model.findByIdAndUpdate.mock.lastCall[1]).toEqual({fired: true});

        expect(model.insertMany.mock.calls.length).toEqual(0);
    });
});
