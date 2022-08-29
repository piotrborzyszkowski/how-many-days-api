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
const commands_1 = require("../data/reminder/commands");
const createReminderAfterFiring_1 = require("../data/reminder/createReminderAfterFiring");
const mapReminderFromMongo_1 = require("../data/reminder/mapReminderFromMongo");
const mapEventFromMongo_1 = require("../data/event/mapEventFromMongo");
const mapReminderToMongo_1 = require("../data/reminder/mapReminderToMongo");
const ensureFind_1 = require("../data/ensureFind");
async function fireReminder(sqsEvent) {
    console.log(`SQS event received: ${JSON.stringify(sqsEvent)}`);
    dotenv.config();
    const ses = new aws_sdk_1.SES();
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        for (const record of sqsEvent.Records) {
            const topicMessage = JSON.parse(record.body);
            const reminderDueMessage = JSON.parse(topicMessage.Message);
            console.log(`reminderDueMessage ${JSON.stringify(reminderDueMessage)}`);
            const reminder = await (0, ensureFind_1.ensureFindSingle)(queries_3.findReminderByIdQuery, reminderDueMessage.reminderId);
            const event = await (0, ensureFind_1.ensureFindSingle)(queries_1.findEventByIdQuery, reminderDueMessage.eventId);
            const user = await (0, ensureFind_1.ensureFindSingle)(queries_2.findUserByIdQuery, event?.userId);
            await sendEmail(user, event, reminder, ses);
            await rotateReminders(reminder, event);
            await deleteQueueMessage(record);
        }
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.fireReminder = fireReminder;
async function sendEmail(user, event, reminder, ses) {
    const sendEmailRequest = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [user?.email]
        },
        Message: {
            Body: {
                Text: {
                    Data: `${event.name} is in ${reminder.daysBefore} days!`,
                },
            },
            Subject: {
                Data: `Reminder: ${event.name}`,
            },
        },
    };
    console.log(`Sending email ${JSON.stringify(sendEmailRequest)}`);
    await ses.sendEmail(sendEmailRequest).promise();
}
async function rotateReminders(reminder, event) {
    await (0, commands_1.markReminderFiredCommand)(reminder._id);
    const newReminder = (0, createReminderAfterFiring_1.createReminderAfterFiring)((0, mapReminderFromMongo_1.mapReminderFromMongo)(reminder), (0, mapEventFromMongo_1.mapEventFromMongo)(event));
    await (0, commands_1.insertRemindersCommand)([(0, mapReminderToMongo_1.mapReminderToMongo)(newReminder)]);
}
async function deleteQueueMessage(record) {
    const deleteMessageRequest = {
        QueueUrl: process.env.QUEUE_REMINDER_DUE,
        ReceiptHandle: record.receiptHandle,
    };
    console.log(`Deleting message ${JSON.stringify(deleteMessageRequest)}`);
    await new aws_sdk_1.SQS().deleteMessage(deleteMessageRequest).promise();
}
