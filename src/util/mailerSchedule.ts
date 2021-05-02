// requiring packages
import {Schema} from "mongoose";
import nodemailer from 'nodemailer';

let cron = require('node-cron');
// mail options
let mailOptions = {
    from: '<From_Email_Address',
    to: '<TO_Email_Address',
    subject: 'Payment information',
    text: `<b>Dear Payment is overdue</b>`
};


// transporter to transport the email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.API_GUARD,
        pass: process.env.API_GUARD_PASS
    }
});

async function sendEmail(mailOptions: any) {
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(`sent`);
    } catch (error: any) {
        console.log(`error happened during ${error.message}`);
    }

}

export async function scheduleEmail(email: any, date: Date) {
    try {
        // monthly cron
        // cron.schedule(`* * * * ${month}`, () => {
        //     sendEmail(email);
        // });

        const {day, month} = structureDate(date);
        console.log(`${day}, ${month}`);
        // cron.schedule(`* * * ${month} ${day}`, () => {
        //     console.log(`sent email`);
        // });
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

