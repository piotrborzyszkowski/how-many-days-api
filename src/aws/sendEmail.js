"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
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
exports.sendEmail = sendEmail;
