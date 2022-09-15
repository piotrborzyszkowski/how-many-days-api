"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertEventCommand = void 0;
const upsertEventCommand = async (mongoEvent, mongooseEventModel) => {
    if (!mongoEvent._id) {
        const rawResult = await mongooseEventModel.insertMany(mongoEvent, { rawResult: true });
        return rawResult.insertedIds[0];
    }
    await mongooseEventModel.findByIdAndUpdate(mongoEvent._id, mongoEvent);
    return mongoEvent._id;
};
exports.upsertEventCommand = upsertEventCommand;
