// requiring packages
import {Schema} from "mongoose";
import nodemailer from 'nodemailer';

let cron = require('node-cron');
// mail options
let mailOptions = {
    from: 'Test',
    to: '',
    subject: 'Payment information',
    text: `<b>Dear Payment is overdue</b>`
};


// transporter to transport the email
let transporter = nodemailer.createTransport({
    service: process.env.API_EMAIL_PROVIDER,
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.API_GUARD,
        pass: process.env.API_GUARD_PASS
    }
});

async function sendEmail(mailOptions: any) {
    try {
        await transporter.sendMail(mailOptions);
        console.log(`sent`);
    } catch (error: any) {
        console.log(`error happened during ${error.message}`);
    }

}

export async function scheduleEmail(email: string, date: Date) {
    try {
        const {day, month} = structureDate(date);
        cron.schedule(`* * * ${month} ${day}`, () => {
            mailOptions.to = email;
            sendEmail(mailOptions);
            // after sending an email remove this corn

        });


    } catch (error: any) {
        console.log(`error happened in scheduleEmail error: ${error.message} `);
    }
}

function structureDate(date: Date) {
    // mapping month
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // mapping days
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return {day: days[date.getDay()], month: months[date.getMonth()]};
}

