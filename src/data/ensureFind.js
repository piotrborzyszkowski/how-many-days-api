"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFindSingle = void 0;
async function ensureFindSingle(func, id) {
    const result = await func(id);
    if (!result) {
        const error = `Unable to find entity with id ${id}`;
        console.log(error);
        throw new Error(error);
    }
    return result;
}
exports.ensureFindSingle = ensureFindSingle;
