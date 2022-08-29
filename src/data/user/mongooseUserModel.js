"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseUserModel = void 0;
const mongoose_1 = require("mongoose");
const userCollectionName = 'Users';
const userSchema = new mongoose_1.Schema({
    authenticationId: { type: String, required: true },
    email: { type: String, required: true },
});
exports.mongooseUserModel = (0, mongoose_1.model)(userCollectionName, userSchema, userCollectionName);
