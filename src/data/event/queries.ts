import {MongoEvent} from "./MongoEvent";
import {Model} from "mongoose";

export const findEventByIdQuery = async (id: string, mongooseEventModel: Model<MongoEvent>): Promise<MongoEvent | null> =>
    await mongooseEventModel
        .findById(id)
        .exec();

export const findEventsByUserIdQuery = async (userId: string, mongooseEventModel: Model<MongoEvent>): Promise<MongoEvent[]> =>
    await mongooseEventModel
        .find({userId})
        .exec();
