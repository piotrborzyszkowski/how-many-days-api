import {connect, disconnect} from 'mongoose';

export const dbConnect = async (getConnectionString: () => Promise<string>) => {
    await connect(await getConnectionString());
};

export const dbDisconnect = async () => {
    await disconnect();
};
