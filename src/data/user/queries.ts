import {MongoUser} from "./MongoUser";
import {Model} from "mongoose";

export const findUserByAuthenticationIdQuery = async (authenticationId: string, mongooseUserModel: Model<MongoUser>): Promise<MongoUser | null> => {
    const users = await mongooseUserModel
        .find({userId: authenticationId})
        .exec();
    if (!users || !users.length)
        return null;
    if (users.length == 1)
        return users[0];

    throw new Error(`Expecting at most one user with authentication id ${authenticationId} but found ${users.length}`)
}

export const findUserByIdQuery = async (id: string, mongooseUserModel: Model<MongoUser>): Promise<MongoUser | null> =>
    await mongooseUserModel
        .findById(id)
        .exec();