import {insertRemindersCommand, markReminderFiredCommand} from "../../../../../src/data/reminder/commands";
import {MongoReminder} from "../../../../../src/data/reminder/MongoReminder";

describe("Test insertRemindersCommand", () => {
    const reminder1 = <MongoReminder>{
        _id: "123",
        date: new Date(),
        eventId: "a",
        fired: false,
        daysBefore: 7,
    };
    const reminder2 = <MongoReminder>{
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
        insertMany: jest.fn((mongoReminders: MongoReminder[]) => {
        }),
    };

    it("Should insert in mongo", async () => {
        await insertRemindersCommand([reminder1, reminder2], <any>model);
        expect(model.findByIdAndDelete.mock.calls.length).toEqual(0);
        expect(model.findByIdAndUpdate.mock.calls.length).toEqual(0);
        expect(model.insertMany.mock.calls.length).toEqual(1);
        expect(model.insertMany.mock.lastCall[0].length).toEqual(2);
        expect(model.insertMany.mock.lastCall[0][0]).toEqual(reminder1);
        expect(model.insertMany.mock.lastCall[0][1]).toEqual(reminder2);
    });
});
