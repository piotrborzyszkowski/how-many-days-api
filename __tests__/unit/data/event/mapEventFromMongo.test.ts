import {mapEventFromMongo} from "../../../../src/data/event/mapEventFromMongo";
import {Event} from "../../../../src/data/event/Event";
import {MongoEvent} from "../../../../src/data/event/MongoEvent";

describe("Test mapEventFromMongo", () => {
    it("should return a mapped event", () => {
        const result = mapEventFromMongo({
            _id: "xyz",
            userId: "abc",
            name: "def",
            date: new Date(2020, 10, 20, 1, 2, 3),
            repeatEvery: "MONTH",
        });
        expect(result).toEqual(new Event(
            "xyz",
            "def",
            "abc",
            new Date(2020, 10, 20, 1, 2, 3),
            "MONTH",
            undefined
        ));
    });

    it("should deep copy the remindBeforeDays array", () => {
        const input: MongoEvent = {
            _id: "xyz",
            userId: "abc",
            name: "def",
            date: new Date(2020, 10, 20, 1, 2, 3),
            repeatEvery: "YEAR",
            remindDaysBefore: [1, 2, 3]
        };

        const result = mapEventFromMongo(input);
        expect(result).toBeTruthy();
        expect(result!.remindDaysBefore).toEqual([1, 2, 3]);
        input.remindDaysBefore!.push(4, 5, 6);
        expect(result!.remindDaysBefore).toEqual([1, 2, 3]);
        result!.remindDaysBefore!.push(7, 8, 9);
        expect(input.remindDaysBefore).toEqual([1, 2, 3, 4, 5, 6]);
    });
});
