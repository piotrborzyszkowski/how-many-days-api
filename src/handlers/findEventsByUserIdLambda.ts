import {APIGatewayEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyResult} from "aws-lambda";
import {dbConnect, dbDisconnect} from "../data/connection";
import {mapEventFromMongo} from "../data/event/mapEventFromMongo";
import {getConnectionString} from "../data/getConnectionString";
import {findEventsByUserIdQuery} from "../data/event/queries";
import {ensure} from "../ensure";
import {mongooseEventModel} from "../data/event/mongooseEventModel";

interface FindEventsByUserIdLambdaPathParameters extends APIGatewayProxyEventPathParameters {
    userId: string
}

export async function findEventsByUserId(apiEvent: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const {httpMethod, path, pathParameters} = apiEvent;
    if (httpMethod !== 'GET')
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);

    console.log('received:', JSON.stringify(apiEvent));

    const {userId} = <FindEventsByUserIdLambdaPathParameters>pathParameters;
    ensure(userId, "userId");
    const userIdDecoded = decodeURI(userId);

    await dbConnect(getConnectionString);

    try {
        const events = (await findEventsByUserIdQuery(userIdDecoded, mongooseEventModel))
            ?.map(event => mapEventFromMongo(event));

        const response = {
            statusCode: 200,
            body: JSON.stringify({events}),
        };

        console.log(`response from: ${path} for user ${userIdDecoded} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } finally {
        await dbDisconnect();
    }
}
