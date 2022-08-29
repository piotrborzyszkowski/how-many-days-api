"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbDisconnect = exports.dbConnect = void 0;
const mongoose_1 = require("mongoose");
const dbConnect = async (getConnectionString) => {
    await (0, mongoose_1.connect)(await getConnectionString());
};
exports.dbConnect = dbConnect;
const dbDisconnect = async () => {
    await (0, mongoose_1.disconnect)();
};
exports.dbDisconnect = dbDisconnect;
