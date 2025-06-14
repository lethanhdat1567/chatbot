import handleText from "./messages/handleText.js";
import handlePostback from "./postback/index.js";
import handleQuickReplies from "./quickReplies/index.js";

export const handleMessage = async (senderId, event) => {
    // Text message
    if (event.message) {
        if (event.message.quick_reply) {
            const payload = event.message.quick_reply.payload;
            await handleQuickReplies(senderId, payload);
        }
        // 👉 Nếu là Text thường
        else if (event.message.text) {
            await handleText(senderId, event.message.text);
        }
    }
    // Đây là postback, xử lý tại đây
    else if (event.postback) {
        handlePostback(event.sender.id, event.postback);
    }
    // Other
    else {
        console.log("⛔ Không phải tin nhắn dạng text từ người dùng. Bỏ qua.");
    }
};
