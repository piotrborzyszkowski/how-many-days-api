import {findCurrentRemindersByEventIdQuery} from "../../../../../src/data/reminder/queries";
import {MongoReminder} from "../../../../../src/data/reminder/MongoReminder";

describe("Test findCurrentRemindersByEventIdQuery", () => {
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
        findById: jest.fn(),
        find: jest.fn((filter: any) => ({
            exec: () => new Promise(resolve => resolve([reminder1, reminder2])),
        })),
    };

    it("should find not-fired reminders by event id in mongo", async () => {
        await findCurrentRemindersByEventIdQuery("a", <any>model);
        expect(model.findById.mock.calls.length).toEqual(0);
        expect(model.find.mock.calls.length).toEqual(1);
        expect(model.find.mock.lastCall[0]).toEqual({eventId: "a", fired: false});
    });

    it("should return mongo objects", async () => {
        const result = await findCurrentRemindersByEventIdQuery("a", <any>model);
        expect(result).toBeTruthy();
        expect(result.length).toEqual(2);
        expect(result.find(r =>
            r._id === reminder1._id
            && r.date === reminder1.date
            && r.eventId === reminder1.eventId
            && r.fired === reminder1.fired
            && r.daysBefore === reminder1.daysBefore
        )).toBeTruthy();
        expect(result.find(r =>
            r._id === reminder2._id
            && r.date === reminder2.date
            && r.eventId === reminder2.eventId
            && r.fired === reminder2.fired
            && r.daysBefore === reminder2.daysBefore
        )).toBeTruthy();
    });
});
