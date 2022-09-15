"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertUserCommand = void 0;
const upsertUserCommand = async (mongoUser, mongooseUserModel) => await mongooseUserModel.findByIdAndUpdate(mongoUser._id, mongoUser, {
    new: true,
    upsert: true
});
exports.upsertUserCommand = upsertUserCommand;
