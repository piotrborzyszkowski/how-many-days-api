"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByIdQuery = exports.findUserByAuthenticationIdQuery = void 0;
const findUserByAuthenticationIdQuery = async (authenticationId, mongooseUserModel) => {
    const users = await mongooseUserModel
        .find({ userId: authenticationId })
        .exec();
    if (!users || !users.length)
        return null;
    if (users.length == 1)
        return users[0];
    throw new Error(`Expecting at most one user with authentication id ${authenticationId} but found ${users.length}`);
};
exports.findUserByAuthenticationIdQuery = findUserByAuthenticationIdQuery;
const findUserByIdQuery = async (id, mongooseUserModel) => await mongooseUserModel
    .findById(id)
    .exec();
exports.findUserByIdQuery = findUserByIdQuery;
