import { sendButtonMessage, sendQuickReplies, sendTextMessage } from "../../services/facebook.service.js";

async function handleText(senderId, text) {
    await sendButtonMessage(
        senderId,
        "👋 Xin chào! Mình là trợ lý đặt bàn và tư vấn của nhà hàng ABC.\n\nBạn cần mình hỗ trợ gì hôm nay?",
        [
            {
                type: "postback",
                title: "📖 Xem menu",
                payload: "VIEW_MENU",
            },
            {
                type: "postback",
                title: "📅 Đặt bàn",
                payload: "BOOK_TABLE",
            },
            {
                type: "postback",
                title: "ℹ️ Giới thiệu nhà hàng",
                payload: "INFO",
            },
        ]
    );
    await sendQuickReplies(senderId, "Bạn muốn làm gì tiếp theo?", [
        { content_type: "text", title: "📖 Xem Menu", payload: "VIEW_MENU" },
        { content_type: "text", title: "📅 Đặt Bàn", payload: "BOOK_TABLE" },
    ]);
    // await sendTextMessage(senderId, text);
}

export default handleText;
