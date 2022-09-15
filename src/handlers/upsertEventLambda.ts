import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import {dbConnect, dbDisconnect} from "../data/connection";
import {getConnectionString} from "../data/getConnectionString";
import {Event} from "../data/event/Event";
import {mapEventToMongo} from "../data/event/mapEventToMongo";
import {upsertEventCommand} from "../data/event/commands";
import {SNS} from "aws-sdk";
import {snsPublish} from "../aws/snsPublish";
import {ensure} from "../ensure";
import {mongooseEventModel} from "../data/event/mongooseEventModel";

export async function upsertEvent(apiEvent: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    console.log('received:', JSON.stringify(apiEvent));

    const {httpMethod, path} = apiEvent;
    if (httpMethod !== 'PUT')
        throw new Error(`upsertEvent only accept PUT method, you tried: ${httpMethod}`);
    ensure(process.env.TOPIC_EVENT_UPSERTED, "process.env.TOPIC_EVENT_UPSERTED");
    ensure(apiEvent.body, "apiEvent.body");

    const event = <Event>JSON.parse(apiEvent.body!);
    console.log(`event: ${JSON.stringify(event)}`);
    const mongoEvent = mapEventToMongo(event);
    console.log(`mongoEvent: ${JSON.stringify(mongoEvent)}`);

    await dbConnect(getConnectionString);
    try {
        const eventId = await upsertEventCommand(mongoEvent, mongooseEventModel);
        console.log(`upserted an event with id ${eventId}`);

        await snsPublish(<EventUpsertedMessage>{eventId}, process.env.TOPIC_EVENT_UPSERTED!, undefined, new SNS());

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
