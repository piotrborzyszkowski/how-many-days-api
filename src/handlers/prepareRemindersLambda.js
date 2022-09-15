"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareRemindersByEventId = void 0;
const queries_1 = require("../data/event/queries");
const queries_2 = require("../data/reminder/queries");
const createRemindersForEvent_1 = require("../data/reminder/createRemindersForEvent");
const mapEventFromMongo_1 = require("../data/event/mapEventFromMongo");
const mapReminderFromMongo_1 = require("../data/reminder/mapReminderFromMongo");
const commands_1 = require("../data/reminder/commands");
const mapReminderToMongo_1 = require("../data/reminder/mapReminderToMongo");
const connection_1 = require("../data/connection");
const getConnectionString_1 = require("../data/getConnectionString");
const mongooseEventModel_1 = require("../data/event/mongooseEventModel");
const mongooseReminderModel_1 = require("../data/reminder/mongooseReminderModel");
async function prepareRemindersByEventId(snsEvent) {
    console.log(`SNS event received: ${JSON.stringify(snsEvent)}`);
    await (0, connection_1.dbConnect)(getConnectionString_1.getConnectionString);
    try {
        for (const record of snsEvent.Records) {
            const message = JSON.parse(record.Sns.Message);
            const event = (0, mapEventFromMongo_1.mapEventFromMongo)(await (0, queries_1.findEventByIdQuery)(message.eventId, mongooseEventModel_1.mongooseEventModel));
            console.log(`found event: ${JSON.stringify(event)}`);
            if (!event) {
                console.error(`Event ${message.eventId} not found`);
                return;
            }
            if (!event.remindDaysBefore) {
                console.error(`Reminders are not set for event ${event.id}`);
                return;
            }
            const existingReminders = (await (0, queries_2.findCurrentRemindersByEventIdQuery)(message.eventId, mongooseReminderModel_1.mongooseReminderModel)).map(mr => (0, mapReminderFromMongo_1.mapReminderFromMongo)(mr));
            const { toBeDeletedReminders, toBeInsertedReminders } = (0, createRemindersForEvent_1.createRemindersForEvent)(event, existingReminders);
            console.log(`existingReminders ${JSON.stringify(existingReminders)}`);
            console.log(`toBeDeletedReminders ${JSON.stringify(toBeDeletedReminders)}`);
            console.log(`toBeInsertedReminders ${JSON.stringify(toBeInsertedReminders)}`);
            for (const reminder of toBeDeletedReminders) {
                await (0, commands_1.deleteReminderCommand)(reminder.id, mongooseReminderModel_1.mongooseReminderModel);
            }
            await (0, commands_1.insertRemindersCommand)(toBeInsertedReminders.map(mapReminderToMongo_1.mapReminderToMongo), mongooseReminderModel_1.mongooseReminderModel);
            console.log(`reminders updated for event ${event.id}`);
        }
    }
    finally {
        await (0, connection_1.dbDisconnect)();
    }
}
exports.prepareRemindersByEventId = prepareRemindersByEventId;
