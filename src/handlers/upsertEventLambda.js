"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertEvent = void 0;
const connection_1 = require("../data/connection");
const getConnectionString_1 = require("../data/getConnectionString");
const mapEventToMongo_1 = require("../data/event/mapEventToMongo");
const commands_1 = require("../data/event/commands");
const aws_sdk_1 = require("aws-sdk");
async function upsertEvent(apiEvent) {
    const { httpMethod, path } = apiEvent;
    if (httpMethod !== 'PUT')
        throw new Error(`upsertEvent only accept PUT method, you tried: ${httpMethod}`);
    console.log('received:', JSON.stringify(apiEvent));
    if (!apiEvent.body)
        throw new Error("request body is required");
    const event = JSON.parse(apiEvent.body);
    console.log(`event: ${JSON.stringify(event)}`);
    const mongoEvent = (0, mapEventToMongo_1.mapEventToMongo)(event);
    console.log(`mongoEvent: ${JSON.stringify(mongoEvent)}`);
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        const eventId = (await (0, commands_1.upsertEventCommand)(mongoEvent));
        console.log(`upserted an event with id ${eventId}`);
        const upsertedMessage = {
            eventId
        };
        const publish = {
            Message: JSON.stringify(upsertedMessage),
            TopicArn: process.env.TOPIC_EVENT_UPSERTED,
        };
        const publishResult = await new aws_sdk_1.SNS().publish(publish).promise();
        console.log(`published ${JSON.stringify(publish)} with result ${JSON.stringify(publishResult)}`);
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
