"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertEvent = void 0;
const connection_1 = require("../data/connection");
const getConnectionString_1 = require("../data/getConnectionString");
const mapEventToMongo_1 = require("../data/event/mapEventToMongo");
const commands_1 = require("../data/event/commands");
const aws_sdk_1 = require("aws-sdk");
const snsPublish_1 = require("../aws/snsPublish");
const ensure_1 = require("../ensure");
const mongooseEventModel_1 = require("../data/event/mongooseEventModel");
async function upsertEvent(apiEvent) {
    console.log('received:', JSON.stringify(apiEvent));
    const { httpMethod, path } = apiEvent;
    if (httpMethod !== 'PUT')
        throw new Error(`upsertEvent only accept PUT method, you tried: ${httpMethod}`);
    (0, ensure_1.ensure)(process.env.TOPIC_EVENT_UPSERTED, "process.env.TOPIC_EVENT_UPSERTED");
    (0, ensure_1.ensure)(apiEvent.body, "apiEvent.body");
    const event = JSON.parse(apiEvent.body);
    console.log(`event: ${JSON.stringify(event)}`);
    const mongoEvent = (0, mapEventToMongo_1.mapEventToMongo)(event);
    console.log(`mongoEvent: ${JSON.stringify(mongoEvent)}`);
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        const eventId = await (0, commands_1.upsertEventCommand)(mongoEvent, mongooseEventModel_1.mongooseEventModel);
        console.log(`upserted an event with id ${eventId}`);
        await (0, snsPublish_1.snsPublish)({ eventId }, process.env.TOPIC_EVENT_UPSERTED, undefined, new aws_sdk_1.SNS());
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                ...event,
                id: eventId
            }),
        };
        console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.upsertEvent = upsertEvent;
