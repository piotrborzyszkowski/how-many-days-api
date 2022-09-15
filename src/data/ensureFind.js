"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFindSingle = void 0;
async function ensureFindSingle(func, mongooseModel, id) {
    const result = await func(id, mongooseModel);
    if (!result) {
        const error = `Unable to find entity with id ${id}`;
        console.log(error);
        throw new Error(error);
    }
    return result;
}
exports.ensureFindSingle = ensureFindSingle;
