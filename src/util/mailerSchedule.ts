// requiring packages

import nodemailer from 'nodemailer';

const nodeScheduler = require('node-schedule');
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
        console.log(`error happened during sending email  ${error.message}`);
    }

}

export async function scheduleEmail(userData: any, date: Date) {
    try {

        let job = nodeScheduler.scheduleJob('* * * * 1', () => {
            mailOptions.to = userData.email;
            sendEmail(mailOptions);
            // after sending an email invalidate this job
            job.cancel();
            console.log(`job canceled for user with id ${userData._id}`);
        });


    } catch (error: any) {
        console.log(`error happened in scheduleEmail error: ${error.message} `);
    }
}


