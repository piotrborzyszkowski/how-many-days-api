import {MongoUser} from "./MongoUser";
import {User} from "./User";

export const mapUserToMongo = (user: User): MongoUser => <MongoUser>{
    _id: user.id,
    authenticationId: user.authenticationId,
    email: user.email,
}
