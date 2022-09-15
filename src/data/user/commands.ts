import {MongoUser} from "./MongoUser";
import {Model} from "mongoose";

export const upsertUserCommand = async (mongoUser: MongoUser, mongooseUserModel: Model<MongoUser>): Promise<MongoUser> =>
    await mongooseUserModel.findByIdAndUpdate(mongoUser._id, mongoUser, {
        new: true,
        upsert: true
    });
