"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ensureFind_1 = require("../../../src/data/ensureFind");
describe("Test ensureFind", () => {
    it("should return the only found entity", async () => {
        async function find(id) {
            return {
                a: "1",
            };
        }
        const result = await (0, ensureFind_1.ensureFindSingle)(find, "1");
        expect(result).toBeTruthy();
        expect(result.a).toBe("1");
    });
    it("should throw when the is no entity found", async () => {
        async function find(id) {
            return null;
        }
        await expect((0, ensureFind_1.ensureFindSingle)(find, "1")).rejects.toThrow();
    });
});
