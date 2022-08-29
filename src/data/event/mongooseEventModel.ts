import {model, Schema, Types} from "mongoose";
import {MongoEvent} from "./MongoEvent";

const eventCollectionName = 'Events';

const eventSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: Types.ObjectId, required: true},
    date: {type: Date, required: true},
    repeatEvery: {type: String, required: true},
    remindDaysBefore: {type: [Number], required: false}
});
export const mongooseEventModel = model<MongoEvent>(eventCollectionName, eventSchema, eventCollectionName);
