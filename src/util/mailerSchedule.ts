/**
 * @module src/util/mailerSchedule.ts
 * @description module tp orchestrate the email service for payment system
 * @requires {nodemailer,nodeScheduler}
 */
import nodemailer from 'nodemailer';

const nodeScheduler = require('node-schedule');


/**
 * @async
 * @function
 * @namespace sendEmail
 * @param mailOptions option for the email
 * @description sending email for particular user
 * @returns Promise<void|never> void function
 * @throws error throws an error if there is any
 */
async function sendEmail(mailOptions: any) {
    try {
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
        await transporter.sendMail(mailOptions);
        console.log(`sent`);
    } catch (error: any) {
        console.log(`error happened during sending email  ${error.message}`);
    }

}

/**
 * @async
 * @function
 * @namespace scheduleEmail
 * @param userData payments and user id
 * @param date date of the sending email
 * @returns Promise<void|never> return nothing
 * @throws error if there is any error
 */
export async function scheduleEmail(userData: any, date: Date) {
    try {

        // we must using date , but for testing we want to send email at any given time xx:x 1 in second 1.
        let job = nodeScheduler.scheduleJob('* * * * 1', () => {
            sendEmail(prepareEmail(userData.email));
            // after sending an email invalidate this job
            job.cancel();
            console.log(`job canceled for user with id ${userData._id}`);
            // after sending an email we wants to mark payment as completed and update paidDate and status
            const {payment} = userData;
            // means completed
            payment.status = 'CP';
            payment.isDeleted = true;
            payment.paidDate = new Date();
            // saving changes
            payment.save();
        });


    } catch (error: any) {
        console.log(`error happened in scheduleEmail error: ${error.message} `);
    }
}

/**
 * @function
 * @namespace prepareEmail
 * @param deliverTo person email
 * @returns Object json object holds email info
 */
function prepareEmail(deliverTo: string): any {
    // mail options
    return {
        from: 'Test',
        to: deliverTo,
        subject: 'Payment information',
        html: `<b>Dear Payment is overdue</b>`
    };
}


