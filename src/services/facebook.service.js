import axios from "axios";
import config from "../config/index.js";

const graphUrl = `https://graph.facebook.com/v18.0/me/messages?access_token=${config.pageAccessToken}`;

// 1. Gửi tin nhắn văn bản
export const sendTextMessage = async (senderId, text) => {
    await sendRequest({
        recipient: { id: senderId },
        message: { text },
    });
};

// 2. Gửi nút bấm dạng button template
export const sendButtonMessage = async (senderId, text, buttons) => {
    await sendRequest({
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
    });
};

// 3. Gửi Quick Replies
export const sendQuickReplies = async (senderId, text, replies) => {
    await sendRequest({
        recipient: { id: senderId },
        message: {
            text,
            quick_replies: replies,
        },
    });
};

// 4. Gửi Media (image, audio, video, file)
export const sendMediaMessage = async (senderId, type, mediaUrl) => {
    await sendRequest({
        recipient: { id: senderId },
        message: {
            attachment: {
                type, // image | audio | video | file
                payload: {
                    url: mediaUrl,
                    is_reusable: true,
                },
            },
        },
    });
};

// 5. Gửi Generic Template (carousel)
export const sendGenericTemplate = async (senderId, elements) => {
    await sendRequest({
        recipient: { id: senderId },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements, // array
                },
            },
        },
    });
};

// 6. Gửi List Template
export const sendListTemplate = async (senderId, elements, buttons = []) => {
    await sendRequest({
        recipient: { id: senderId },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "list",
                    top_element_style: "compact",
                    elements, // array of items (max 4)
                    buttons, // optional global button
                },
            },
        },
    });
};

// 7. Gửi Media Template (kèm nút trong ảnh/video)
export const sendMediaTemplate = async (senderId, mediaType, mediaUrl, buttons = []) => {
    await sendRequest({
        recipient: { id: senderId },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "media",
                    elements: [
                        {
                            media_type: mediaType, // image | video
                            url: mediaUrl,
                            buttons,
                        },
                    ],
                },
            },
        },
    });
};

// 8. Gửi One-time Notification Request
export const sendOneTimeNotificationRequest = async (senderId, text, payload) => {
    await sendRequest({
        recipient: { id: senderId },
        message: {
            text,
            quick_replies: [
                {
                    content_type: "one_time_notif_req",
                    payload,
                },
            ],
        },
    });
};

// 🔁 Gửi yêu cầu đến Facebook API
const sendRequest = async (body) => {
    try {
        console.log("▶️ Sending:", JSON.stringify(body, null, 2));
        await axios.post(graphUrl, body);
        console.log("✅ Sent successfully");
    } catch (error) {
        console.error("❌ Facebook API error:", error.response?.data || error.message);
    }
};
