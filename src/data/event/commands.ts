import {MongoEvent} from "./MongoEvent";
import {mongooseEventModel} from "./mongooseEventModel";

export const upsertEventCommand = async(mongoEvent: MongoEvent): Promise<string> => {
    if (!mongoEvent._id) {
        const rawResult = await mongooseEventModel.insertMany(mongoEvent, {rawResult: true});
        return rawResult.insertedIds[0];
    }

    await mongooseEventModel.findByIdAndUpdate(mongoEvent._id, mongoEvent);
    return mongoEvent._id;
}