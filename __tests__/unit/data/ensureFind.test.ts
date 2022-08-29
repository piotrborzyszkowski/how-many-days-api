import {ensureFindSingle} from "../../../src/data/ensureFind";

interface Entity {
    a: string;
}

describe("Test ensureFind", () => {
    it("should return the only found entity", async () => {
        async function find(id: string): Promise<Entity | null> {
            return <Entity>{
                a: "1",
            };
        }

        const result = await ensureFindSingle(find, "1");
        expect(result).toBeTruthy();
        expect(result.a).toBe("1");
    });

    it("should throw when the is no entity found", async () => {
        async function find(id: string): Promise<Entity | null> {
            return null;
        }

        await expect(ensureFindSingle(find, "1")).rejects.toThrow();
    });
});