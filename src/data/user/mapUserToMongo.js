"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToMongo = void 0;
const mapUserToMongo = (user) => ({
    _id: user.id,
    authenticationId: user.authenticationId,
    email: user.email,
});
exports.mapUserToMongo = mapUserToMongo;
