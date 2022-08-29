import {model, Schema} from "mongoose";
import {MongoUser} from "./MongoUser";

const userCollectionName = 'Users';

const userSchema = new Schema({
    authenticationId: {type: String, required: true},
    email: {type: String, required: true},
});
export const mongooseUserModel = model<MongoUser>(userCollectionName, userSchema, userCollectionName);
