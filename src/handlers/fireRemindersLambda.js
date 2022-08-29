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
exports.fireReminders = void 0;
const connection_1 = require("../data/connection");
const getConnectionString_1 = require("../data/getConnectionString");
const queries_1 = require("../data/reminder/queries");
const aws_sdk_1 = require("aws-sdk");
const mapReminderFromMongo_1 = require("../data/reminder/mapReminderFromMongo");
const dotenv = __importStar(require("dotenv"));
async function fireReminders(scheduledEvent) {
    console.log(`Received scheduledEvent: ${JSON.stringify(scheduledEvent)}`);
    let today = new Date();
    today.setHours(23, 59, 59, 999);
    console.log(`Looking for all reminders due by ${today}`);
    dotenv.config();
    const sns = new aws_sdk_1.SNS();
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        const reminders = (await (0, queries_1.findRemindersToBeFiredQuery)(today)).map(mapReminderFromMongo_1.mapReminderFromMongo);
        for (const reminder of reminders) {
            const reminderDueMessage = {
                reminderId: reminder?.id,
                eventId: reminder?.eventId,
            };
            const publish = {
                Message: JSON.stringify(reminderDueMessage),
                TopicArn: process.env.TOPIC_REMINDER_DUE,
                MessageGroupId: process.env.MESSAGE_GROUP_ID_REMINDER_DUE,
            };
            const publishResult = await sns.publish(publish).promise();
            console.log(`published ${JSON.stringify(publish)} with result ${JSON.stringify(publishResult)}`);
        }
        console.log(`Successfully published ${reminders.length} reminders`);
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.fireReminders = fireReminders;
;
