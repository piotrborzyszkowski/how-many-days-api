import {mongooseUserModel} from "./mongooseUserModel";
import {MongoUser} from "./MongoUser";

export const upsertUserCommand = async (mongoUser: MongoUser): Promise<MongoUser> =>
    await mongooseUserModel.findByIdAndUpdate(mongoUser._id, mongoUser, {
        new: true,
        upsert: true
    });
