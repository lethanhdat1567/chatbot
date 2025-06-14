import { sendButtonMessage, sendTextMessage } from "../../services/facebook.service.js";

export const handleQuickReplies = async (senderId, payload) => {
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
};

export default handleQuickReplies;
