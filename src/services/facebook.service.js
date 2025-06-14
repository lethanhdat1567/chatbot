import axios from "axios";
import config from "../config/index.js";

// Gửi tin nhắn văn bản
export const sendTextMessage = async (senderId, text) => {
    try {
        const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${config.pageAccessToken}`;
        const body = {
            recipient: { id: senderId },
            message: { text },
        };

        console.log("Sending message to Facebook:", body);
        await axios.post(url, body);
    } catch (error) {
        if (error.response) {
            console.error("Facebook API error:", error.response.data);
        } else {
            console.error("Send message error:", error.message);
        }
    }
};

// Gửi tin nhắn dạng button template (postback)
export const sendButtonMessage = async (senderId, text, buttons) => {
    try {
        const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${config.pageAccessToken}`;
        const body = {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "button",
                        text,
                        buttons,
                    },
                },
            },
        };

        console.log("Sending button message to Facebook:", body);
        await axios.post(url, body);
    } catch (error) {
        if (error.response) {
            console.error("Facebook API error:", error.response.data);
        } else {
            console.error("Send button message error:", error.message);
        }
    }
};

// Mở quick button
export const sendQuickReplies = async (senderId, text, replies) => {
    try {
        const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${config.pageAccessToken}`;

        const body = {
            recipient: { id: senderId },
            message: {
                text,
                quick_replies: replies,
            },
        };

        await axios.post(url, body);
        console.log("✅ Đã gửi quick replies:", replies);
    } catch (error) {
        if (error.response) {
            console.error("❌ Lỗi gửi quick replies:", error.response.data);
        } else {
            console.error("❌ Lỗi:", error.message);
        }
    }
};
