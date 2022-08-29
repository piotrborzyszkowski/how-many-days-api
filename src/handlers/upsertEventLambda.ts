import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {Event} from "../data/event/Event";
import {mapEventToMongo} from "../data/event/mapEventToMongo";
import {upsertEventCommand} from "../data/event/commands";
import {SNS} from "aws-sdk";

export async function upsertEvent(apiEvent: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const {httpMethod, path} = apiEvent;
    if (httpMethod !== 'PUT')
        throw new Error(`upsertEvent only accept PUT method, you tried: ${httpMethod}`);

    console.log('received:', JSON.stringify(apiEvent));

    if (!apiEvent.body)
        throw new Error("request body is required");

    const event = <Event>JSON.parse(apiEvent.body!);
    console.log(`event: ${JSON.stringify(event)}`);
    const mongoEvent = mapEventToMongo(event);
    console.log(`mongoEvent: ${JSON.stringify(mongoEvent)}`);

    await dbConnect(getConnectionString);
    try {
        const eventId = (await upsertEventCommand(mongoEvent));
        console.log(`upserted an event with id ${eventId}`);

        const upsertedMessage: EventUpsertedMessage = {
            eventId
        };

        const publish = {
            Message: JSON.stringify(upsertedMessage),
            TopicArn: process.env.TOPIC_EVENT_UPSERTED,
        };

        const publishResult = await new SNS().publish(publish).promise();
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
    } finally {
        await dbDisconnect();
    }
}
