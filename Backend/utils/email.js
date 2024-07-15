import nodemailer from 'nodemailer';
import cron from 'node-cron';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendOrderConfirmationEmail = (order) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: order.customerEmail,
        subject: 'Order Confirmation',
        text: `Your order with ID ${order.id} has been placed successfully.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export const setupCronJobs = () => {
    cron.schedule('0 0 * * 0', () => {

        console.log('Sending promotional emails');
        
    });
};
