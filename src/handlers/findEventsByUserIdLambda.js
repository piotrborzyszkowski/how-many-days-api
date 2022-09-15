"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventsByUserId = void 0;
const connection_1 = require("../data/connection");
const mapEventFromMongo_1 = require("../data/event/mapEventFromMongo");
const getConnectionString_1 = require("../data/getConnectionString");
const queries_1 = require("../data/event/queries");
const ensure_1 = require("../ensure");
const mongooseEventModel_1 = require("../data/event/mongooseEventModel");
async function findEventsByUserId(apiEvent) {
    const { httpMethod, path, pathParameters } = apiEvent;
    if (httpMethod !== 'GET')
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    console.log('received:', JSON.stringify(apiEvent));
    const { userId } = pathParameters;
    (0, ensure_1.ensure)(userId, "userId");
    const userIdDecoded = decodeURI(userId);
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        const events = (await (0, queries_1.findEventsByUserIdQuery)(userIdDecoded, mongooseEventModel_1.mongooseEventModel))
            ?.map(event => (0, mapEventFromMongo_1.mapEventFromMongo)(event));
        const response = {
            statusCode: 200,
            body: JSON.stringify({ events }),
        };
        console.log(`response from: ${path} for user ${userIdDecoded} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.findEventsByUserId = findEventsByUserId;
