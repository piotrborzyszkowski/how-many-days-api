"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertUserCommand = void 0;
const mongooseUserModel_1 = require("./mongooseUserModel");
const upsertUserCommand = async (mongoUser) => await mongooseUserModel_1.mongooseUserModel.findByIdAndUpdate(mongoUser._id, mongoUser, {
    new: true,
    upsert: true
});
exports.upsertUserCommand = upsertUserCommand;
