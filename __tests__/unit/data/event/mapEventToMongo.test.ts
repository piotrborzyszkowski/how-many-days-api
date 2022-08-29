import {mapEventToMongo} from "../../../../src/data/event/mapEventToMongo";
import {Event} from "../../../../src/data/event/Event";

describe("Test mapEventToMongo", () => {
    it("should return a mapped event", () => {
        const result = mapEventToMongo(new Event(
            "xyz",
            "def",
            "abc",
            new Date(2020, 10, 20, 1, 2, 3),
            "MONTH",
            [],
        ));
        expect(result).toEqual({
            _id: "xyz",
            userId: "abc",
            name: "def",
            date: new Date(2020, 10, 20, 1, 2, 3),
            repeatEvery: "MONTH",
            remindDaysBefore: [],
        });
    });

    it("should deep copy the remindBeforeDays array", () => {
        const input = new Event(
            "xyz",
            "def",
            "abc",
            new Date(2020, 10, 20, 1, 2, 3),
            "MONTH",
            [1, 2, 3],
        );

        const result = mapEventToMongo(input);
        expect(result).toBeTruthy();
        expect(result!.remindDaysBefore).toEqual([1, 2, 3]);
        input.remindDaysBefore!.push(4, 5, 6);
        expect(result!.remindDaysBefore).toEqual([1, 2, 3]);
        result!.remindDaysBefore!.push(7, 8, 9);
        expect(input.remindDaysBefore).toEqual([1, 2, 3, 4, 5, 6]);
    });
});
