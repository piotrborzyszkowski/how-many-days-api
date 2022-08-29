import {mapReminderFromMongo} from "../../../../src/data/reminder/mapReminderFromMongo";
import {Reminder} from "../../../../src/data/reminder/Reminder";

describe("Test mapReminderFromMongo", () => {
    it("should return a mapped reminder", () => {
        const result = mapReminderFromMongo({
            _id: "xyz",
            eventId: "abc",
            date: new Date(2020, 10, 20, 1, 2, 3),
            fired: true,
            daysBefore: 32,
        });
        expect(result).toEqual(new Reminder(
            "xyz",
            new Date(2020, 10, 20, 1, 2, 3),
            "abc",
            true,
            32,
        ));
    });
});
