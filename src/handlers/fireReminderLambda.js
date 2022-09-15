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
exports.fireReminder = void 0;
const aws_sdk_1 = require("aws-sdk");
const connection_1 = require("../data/connection");
const getConnectionString_1 = require("../data/getConnectionString");
const queries_1 = require("../data/event/queries");
const queries_2 = require("../data/user/queries");
const queries_3 = require("../data/reminder/queries");
const dotenv = __importStar(require("dotenv"));
const operations_1 = require("../data/reminder/operations");
const ensureFind_1 = require("../data/ensureFind");
const sendEmail_1 = require("../aws/sendEmail");
const ensure_1 = require("../ensure");
const deleteQueueMessage_1 = require("../aws/deleteQueueMessage");
const mongooseReminderModel_1 = require("../data/reminder/mongooseReminderModel");
const mongooseEventModel_1 = require("../data/event/mongooseEventModel");
const mongooseUserModel_1 = require("../data/user/mongooseUserModel");
async function fireReminder(sqsEvent) {
    console.log(`SQS event received: ${JSON.stringify(sqsEvent)}`);
    (0, ensure_1.ensure)(process.env.QUEUE_REMINDER_DUE, "process.env.QUEUE_REMINDER_DUE");
    dotenv.config();
    const ses = new aws_sdk_1.SES();
    const sqs = new aws_sdk_1.SQS();
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        for (const record of sqsEvent.Records) {
            const topicMessage = JSON.parse(record.body);
            const reminderDueMessage = JSON.parse(topicMessage.Message);
            console.log(`reminderDueMessage ${JSON.stringify(reminderDueMessage)}`);
            const reminder = await (0, ensureFind_1.ensureFindSingle)(queries_3.findReminderByIdQuery, mongooseReminderModel_1.mongooseReminderModel, reminderDueMessage.reminderId);
            const event = await (0, ensureFind_1.ensureFindSingle)(queries_1.findEventByIdQuery, mongooseEventModel_1.mongooseEventModel, reminderDueMessage.eventId);
            const user = await (0, ensureFind_1.ensureFindSingle)(queries_2.findUserByIdQuery, mongooseUserModel_1.mongooseUserModel, event?.userId);
            await (0, sendEmail_1.sendEmail)(user, event, reminder, ses);
            await (0, operations_1.rotateReminders)(reminder, event, mongooseReminderModel_1.mongooseReminderModel);
            await (0, deleteQueueMessage_1.deleteQueueMessage)(record, process.env.QUEUE_REMINDER_DUE, sqs);
        }
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.fireReminder = fireReminder;
