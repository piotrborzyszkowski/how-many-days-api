import {MongoUser} from "./MongoUser";
import {User} from "./User";

export const mapUserFromMongo = (mongoUser: MongoUser): User => new User(
    `${mongoUser._id}`,
    mongoUser.authenticationId,
    mongoUser.email,
);
