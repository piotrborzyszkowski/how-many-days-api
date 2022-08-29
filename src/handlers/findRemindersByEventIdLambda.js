"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRemindersByEventId = void 0;
const connection_1 = require("../data/connection");
const mapReminderFromMongo_1 = require("../data/reminder/mapReminderFromMongo");
const queries_1 = require("../data/reminder/queries");
const getConnectionString_1 = require("../data/getConnectionString");
async function findRemindersByEventId(apiEvent) {
    const { httpMethod, path, pathParameters } = apiEvent;
    if (httpMethod !== 'GET')
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    console.log('received:', JSON.stringify(apiEvent));
    const { eventId } = pathParameters;
    if (!eventId)
        throw new Error("eventId is required");
    const eventIdDecoded = decodeURI(eventId);
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        const reminders = (await (0, queries_1.findCurrentRemindersByEventIdQuery)(eventIdDecoded))
            ?.map(reminder => (0, mapReminderFromMongo_1.mapReminderFromMongo)(reminder));
        const response = {
            statusCode: 200,
            body: JSON.stringify({ reminders }),
        };
        console.log(`response from: ${path} for event ${eventIdDecoded} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.findRemindersByEventId = findRemindersByEventId;
