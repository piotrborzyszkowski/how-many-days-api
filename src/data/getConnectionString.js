"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionString = void 0;
const aws_sdk_1 = require("aws-sdk");
const dotenv = __importStar(require("dotenv"));
async function getConnectionString() {
    dotenv.config();
    const region = process.env.AWS_REGION;
    const secretName = process.env.MONGO_SECRET_NAME;
    const client = new aws_sdk_1.SecretsManager({ region });
    const secret = await client.getSecretValue({ SecretId: secretName }).promise();
    const json = secret.SecretString;
    const { mongoConnectionString } = JSON.parse(json);
    return mongoConnectionString;
}
exports.getConnectionString = getConnectionString;
