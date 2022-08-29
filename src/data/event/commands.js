"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertEventCommand = void 0;
const mongooseEventModel_1 = require("./mongooseEventModel");
const upsertEventCommand = async (mongoEvent) => {
    if (!mongoEvent._id) {
        const rawResult = await mongooseEventModel_1.mongooseEventModel.insertMany(mongoEvent, { rawResult: true });
        return rawResult.insertedIds[0];
    }
    await mongooseEventModel_1.mongooseEventModel.findByIdAndUpdate(mongoEvent._id, mongoEvent);
    return mongoEvent._id;
};
exports.upsertEventCommand = upsertEventCommand;
