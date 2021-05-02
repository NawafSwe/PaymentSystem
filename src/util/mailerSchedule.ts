// requiring packages

import nodemailer from 'nodemailer';

const axios = require('axios');

let cron = require('node-cron');
// mail options
let mailOptions = {
    from: 'Test',
    to: '',
    subject: 'Payment information',
    html: `<b>Dear Payment is overdue</b>`
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

export async function scheduleEmail(userData: any, date: Date) {
    try {
        const {day, month} = structureDate(date);
        cron.schedule(`* * * ${month} ${day}`, () => {
            mailOptions.to = userData.email;
            sendEmail(mailOptions);
            // after sending an email remove this corn
            cron.stop();
            //const endPoint = `${process.env.API_URL}${process.env.HOST}:${process.env.PORT}/payments/${userData.payment.id}`;
            // console.log(endPoint);
            // axios.delete(endPoint);
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


