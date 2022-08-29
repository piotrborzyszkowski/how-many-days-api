import {APIGatewayEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyResult} from "aws-lambda";
import {dbConnect, dbDisconnect} from "../data/connection";
import {mapReminderFromMongo} from "../data/reminder/mapReminderFromMongo";
import {findCurrentRemindersByEventIdQuery} from "../data/reminder/queries";
import {getConnectionString} from "../data/getConnectionString";

interface FindRemindersByEventIdLambdaPathParameters extends APIGatewayProxyEventPathParameters {
    eventId: string
}

export async function findRemindersByEventId(apiEvent: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const {httpMethod, path, pathParameters} = apiEvent;
    if (httpMethod !== 'GET')
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);

    console.log('received:', JSON.stringify(apiEvent));

    const {eventId} = <FindRemindersByEventIdLambdaPathParameters>pathParameters;
    if (!eventId)
        throw new Error("eventId is required");
    const eventIdDecoded = decodeURI(eventId);

    await dbConnect(getConnectionString);
    try {
        const reminders = (await findCurrentRemindersByEventIdQuery(eventIdDecoded))
            ?.map(reminder => mapReminderFromMongo(reminder));

        const response = {
            statusCode: 200,
            body: JSON.stringify({reminders}),
        };

        console.log(`response from: ${path} for event ${eventIdDecoded} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } finally {
        await dbDisconnect();
    }
}