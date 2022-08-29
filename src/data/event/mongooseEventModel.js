"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseEventModel = void 0;
const mongoose_1 = require("mongoose");
const eventCollectionName = 'Events';
const eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    repeatEvery: { type: String, required: true },
    remindDaysBefore: { type: [Number], required: false }
});
exports.mongooseEventModel = (0, mongoose_1.model)(eventCollectionName, eventSchema, eventCollectionName);
