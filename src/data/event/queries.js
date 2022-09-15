"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventsByUserIdQuery = exports.findEventByIdQuery = void 0;
const findEventByIdQuery = async (id, mongooseEventModel) => await mongooseEventModel
    .findById(id)
    .exec();
exports.findEventByIdQuery = findEventByIdQuery;
const findEventsByUserIdQuery = async (userId, mongooseEventModel) => await mongooseEventModel
    .find({ userId })
    .exec();
exports.findEventsByUserIdQuery = findEventsByUserIdQuery;
