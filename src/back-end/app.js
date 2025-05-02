import dotenv from 'dotenv'
dotenv.config()
import express, { json } from 'express';
const app = express();

import nodemailer from 'nodemailer';
import cors from 'cors';

const PORT = 3100 || 3200;

app.use(cors());
app.use(json());

/*
 * @author jimBoYz Ni ChOy!!!
 * May 02, 2025 FRI.
 */

app.post('/send-prayer-request', async (req, res) => {
    
    const data = req.body.emailData;

    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:'465',
        secure:true,
        service:'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    let mailOptions = {
        from: 'SMTP',
        to: process.env.EMAIL_RECIPIENT,
        subject: data.subject,
        text: `Date: ${data.date} : ${data.dateTime} \nName: ${data.name} \nEmail: ${data.email} \nMessage: ${data.body}`
    }

    try {

        await transporter.sendMail(mailOptions);
        res.json({success:true, message: 'Prayer request sent successfully...'});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: 'Failed to send your prayer request...'});
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})
