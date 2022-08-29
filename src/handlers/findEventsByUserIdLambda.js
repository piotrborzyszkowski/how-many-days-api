"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventsByUserId = void 0;
const connection_1 = require("../data/connection");
const mapEventFromMongo_1 = require("../data/event/mapEventFromMongo");
const getConnectionString_1 = require("../data/getConnectionString");
const queries_1 = require("../data/event/queries");
async function findEventsByUserId(apiEvent) {
    const { httpMethod, path, pathParameters } = apiEvent;
    if (httpMethod !== 'GET')
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    console.log('received:', JSON.stringify(apiEvent));
    const { userId } = pathParameters;
    if (!userId)
        throw new Error("userId is required");
    const userIdDecoded = decodeURI(userId);
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        const events = (await (0, queries_1.findEventsByUserIdQuery)(userIdDecoded))
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
