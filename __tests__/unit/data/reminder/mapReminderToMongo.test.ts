import {Reminder} from "../../../../src/data/reminder/Reminder";
import {mapReminderToMongo} from "../../../../src/data/reminder/mapReminderToMongo";

describe("Test mapReminderToMongo", () => {
    it("should return a mapped reminder", () => {
        const result = mapReminderToMongo(new Reminder(
            "xyz",
            new Date(2020, 10, 20, 1, 2, 3),
            "abc",
            true,
            32,
        ));
        expect(result).toEqual({
            _id: "xyz",
            eventId: "abc",
            date: new Date(2020, 10, 20, 1, 2, 3),
            fired: true,
            daysBefore: 32,
        });
    });
});
