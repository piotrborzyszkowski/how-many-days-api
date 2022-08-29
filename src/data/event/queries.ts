import {mongooseEventModel} from "./mongooseEventModel";
import {MongoEvent} from "./MongoEvent";

export const findEventByIdQuery = async (id: string): Promise<MongoEvent | null> =>
    await mongooseEventModel
        .findById(id)
        .exec();

export const findEventsByUserIdQuery = async (userId: string): Promise<MongoEvent[]> =>
    await mongooseEventModel
        .find({userId})
        .exec();
