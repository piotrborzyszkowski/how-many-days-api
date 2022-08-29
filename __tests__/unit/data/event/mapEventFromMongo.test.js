"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEventFromMongo_1 = require("../../../../src/data/event/mapEventFromMongo");
const Event_1 = require("../../../../src/data/event/Event");
describe("Test mapEventFromMongo", () => {
    it("should return a mapped event", () => {
        const result = (0, mapEventFromMongo_1.mapEventFromMongo)({
            _id: "xyz",
            userId: "abc",
            name: "def",
            date: new Date(2020, 10, 20, 1, 2, 3),
            repeatEvery: "MONTH",
        });
        expect(result).toEqual(new Event_1.Event("xyz", "def", "abc", new Date(2020, 10, 20, 1, 2, 3), "MONTH", undefined));
    });
    it("should deep copy the remindBeforeDays array", () => {
        const input = {
            _id: "xyz",
            userId: "abc",
            name: "def",
            date: new Date(2020, 10, 20, 1, 2, 3),
            repeatEvery: "YEAR",
            remindDaysBefore: [1, 2, 3]
        };
        const result = (0, mapEventFromMongo_1.mapEventFromMongo)(input);
        expect(result).toBeTruthy();
        expect(result.remindDaysBefore).toEqual([1, 2, 3]);
        input.remindDaysBefore.push(4, 5, 6);
        expect(result.remindDaysBefore).toEqual([1, 2, 3]);
        result.remindDaysBefore.push(7, 8, 9);
        expect(input.remindDaysBefore).toEqual([1, 2, 3, 4, 5, 6]);
    });
});
