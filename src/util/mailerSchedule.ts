// requiring packages
import nodemailer from 'nodemailer';

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
