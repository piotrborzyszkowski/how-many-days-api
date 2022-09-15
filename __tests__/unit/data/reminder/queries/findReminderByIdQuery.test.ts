import {findReminderByIdQuery} from "../../../../../src/data/reminder/queries";
import {MongoReminder} from "../../../../../src/data/reminder/MongoReminder";

describe("Test findReminderByIdQuery", () => {
    const reminder = <MongoReminder>{
        _id: "123",
        date: new Date(),
        eventId: "a",
        fired: true,
        daysBefore: 7,
    };

    const model = {
        findById: jest.fn(() => ({
            exec: () => new Promise(resolve => resolve(reminder)),
        })),

        find: jest.fn(),
    };

    it("should find by id in mongo", async () => {
        await findReminderByIdQuery("1", <any>model);
        expect(model.findById.mock.calls.length).toEqual(1);
        expect(model.find.mock.calls.length).toEqual(0);
    });

    it("should return mongo object", async () => {
        const result = await findReminderByIdQuery("1", <any>model);
        expect(result).toBe(reminder);
    });
});
