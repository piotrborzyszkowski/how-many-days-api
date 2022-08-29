import {MongoUser} from "./MongoUser";
import {mongooseUserModel} from "./mongooseUserModel";

export const findUserByAuthenticationIdQuery = async (authenticationId: string): Promise<MongoUser | null> => {
    const users = await mongooseUserModel
        .find({userId: authenticationId})
        .exec();
    if (!users)
        return null;
    if (users.length == 1)
        return users[0];

    throw new Error(`Expecting at most one user with authentication id ${authenticationId} but found ${users.length}`)
}

export const findUserByIdQuery = async (id: string): Promise<MongoUser | null> =>
    await mongooseUserModel
        .findById(id)
        .exec();