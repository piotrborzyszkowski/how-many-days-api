import {MongoUser} from "../data/user/MongoUser";
import {MongoEvent} from "../data/event/MongoEvent";
import {MongoReminder} from "../data/reminder/MongoReminder";
import {SES} from "aws-sdk";
import {SendEmailRequest} from "aws-sdk/clients/ses";

export async function sendEmail(user: MongoUser, event: MongoEvent, reminder: MongoReminder, ses: SES) {
    const sendEmailRequest: SendEmailRequest = {
        Source: process.env.EMAIL_FROM!,
        Destination: {
            ToAddresses: [user?.email!]
        },
        Message: {
            Body: {
                Text: {
                    Data: `${event.name} is in ${reminder!.daysBefore} days!`,
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
