"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserFromMongo = void 0;
const User_1 = require("./User");
const mapUserFromMongo = (mongoUser) => new User_1.User(`${mongoUser._id}`, mongoUser.authenticationId, mongoUser.email);
exports.mapUserFromMongo = mapUserFromMongo;
