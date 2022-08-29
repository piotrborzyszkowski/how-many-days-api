import {SecretsManager} from "aws-sdk";
import * as dotenv from "dotenv";

interface MongoConnectionStringType {
    mongoConnectionString: string,
}

export async function getConnectionString(): Promise<string> {
    dotenv.config();
    const region = process.env.AWS_REGION!;
    const secretName = process.env.MONGO_SECRET_NAME!;

    const client = new SecretsManager({region});

    const secret = await client.getSecretValue({SecretId: secretName}).promise();

    const json = secret.SecretString!;
    const {mongoConnectionString} = <MongoConnectionStringType>JSON.parse(json);

    return mongoConnectionString;
}