"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByIdQuery = exports.findUserByAuthenticationIdQuery = void 0;
const mongooseUserModel_1 = require("./mongooseUserModel");
const findUserByAuthenticationIdQuery = async (authenticationId) => {
    const users = await mongooseUserModel_1.mongooseUserModel
        .find({ userId: authenticationId })
        .exec();
    if (!users)
        return null;
    if (users.length == 1)
        return users[0];
    throw new Error(`Expecting at most one user with authentication id ${authenticationId} but found ${users.length}`);
};
exports.findUserByAuthenticationIdQuery = findUserByAuthenticationIdQuery;
const findUserByIdQuery = async (id) => await mongooseUserModel_1.mongooseUserModel
    .findById(id)
    .exec();
exports.findUserByIdQuery = findUserByIdQuery;
