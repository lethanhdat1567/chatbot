import dotenv from "dotenv";
dotenv.config();

const config = {
    pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    gmailReceiver: process.env.GMAIL_RECEIVER,
    gmailSender: process.env.GMAIL_SENDER,
    gmailPassword: process.env.GMAIL_PASSWORD,
};

export default config;
