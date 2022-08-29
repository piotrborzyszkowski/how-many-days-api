"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEventToMongo_1 = require("../../../../src/data/event/mapEventToMongo");
const Event_1 = require("../../../../src/data/event/Event");
describe("Test mapEventToMongo", () => {
    it("should return a mapped event", () => {
        const result = (0, mapEventToMongo_1.mapEventToMongo)(new Event_1.Event("xyz", "def", "abc", new Date(2020, 10, 20, 1, 2, 3), "MONTH", []));
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
        const input = new Event_1.Event("xyz", "def", "abc", new Date(2020, 10, 20, 1, 2, 3), "MONTH", [1, 2, 3]);
        const result = (0, mapEventToMongo_1.mapEventToMongo)(input);
        expect(result).toBeTruthy();
        expect(result.remindDaysBefore).toEqual([1, 2, 3]);
        input.remindDaysBefore.push(4, 5, 6);
        expect(result.remindDaysBefore).toEqual([1, 2, 3]);
        result.remindDaysBefore.push(7, 8, 9);
        expect(input.remindDaysBefore).toEqual([1, 2, 3, 4, 5, 6]);
    });
});
