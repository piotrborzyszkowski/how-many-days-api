"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventsByUserIdQuery = exports.findEventByIdQuery = void 0;
const mongooseEventModel_1 = require("./mongooseEventModel");
const findEventByIdQuery = async (id) => await mongooseEventModel_1.mongooseEventModel
    .findById(id)
    .exec();
exports.findEventByIdQuery = findEventByIdQuery;
const findEventsByUserIdQuery = async (userId) => await mongooseEventModel_1.mongooseEventModel
    .find({ userId })
    .exec();
exports.findEventsByUserIdQuery = findEventsByUserIdQuery;
