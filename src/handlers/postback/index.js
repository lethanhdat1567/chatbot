import { sendTextMessage, sendButtonMessage, sendQuickReplies } from "../../services/facebook.service.js";

export const handlePostback = async (senderId, postback) => {
    const payload = postback.payload;

    // Bắt đầu
    if (payload === "GET_STARTED") {
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
    }

    // Xem menu
    if (payload === "VIEW_MENU") {
        await sendTextMessage(senderId, "🥗 Menu hôm nay:\n- Bò sốt vang\n- Lẩu Thái\n- Cơm gà\n- Nước ép cam");
    }

    // Đặt bàn
    if (payload === "BOOK_TABLE") {
        await sendButtonMessage(senderId, "🧑‍🤝‍🧑 Bạn muốn đặt bàn cho bao nhiêu người?", [
            { type: "postback", title: "2 người", payload: "BOOK_TABLE_2P" },
            { type: "postback", title: "4 người", payload: "BOOK_TABLE_4P" },
            { type: "postback", title: "Nhóm >6", payload: "BOOK_TABLE_6P" },
        ]);
    }

    // Đặt bàn thành công
    if (payload.startsWith("BOOK_TABLE_")) {
        const people = payload.split("_")[2];
        await sendTextMessage(
            senderId,
            `✅ Đã ghi nhận bạn đặt bàn cho ${people === "6P" ? "nhóm > 6 người" : people.replace("P", "") + " người"}!`
        );
        // Gợi ý thêm nút xác nhận
        await sendButtonMessage(senderId, "Bạn có muốn xác nhận đặt bàn?", [
            { type: "postback", title: "✅ Xác nhận", payload: "CONFIRM_BOOKING" },
            { type: "postback", title: "❌ Huỷ", payload: "CANCEL_BOOKING" },
        ]);
    }

    // Hẹn gặp lại
    if (payload === "CONFIRM_BOOKING") {
        await sendTextMessage(senderId, "🎉 Bàn của bạn đã được đặt! Hẹn gặp lại tại Nhà hàng Đạt!");
    }

    // Hủy Đặt bàn
    if (payload === "CANCEL_BOOKING") {
        await sendTextMessage(senderId, "❌ Đã huỷ đặt bàn.");
    }
};

export default handlePostback;
