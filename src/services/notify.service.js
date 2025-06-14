import nodemailer from "nodemailer";
import { gmailReceiver, gmailSender, gmailPassword } from "../config/index.js";

export const sendToGmail = async (message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailSender,
      pass: gmailPassword,
    },
  });

  await transporter.sendMail({
    from: `"FB Chatbot" <${gmailSender}>`,
    to: gmailReceiver,
    subject: "Tin nhắn mới từ khách hàng Facebook",
    text: message,
  });
};
