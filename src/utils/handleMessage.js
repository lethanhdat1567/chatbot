import { sendTextMessage } from "../services/facebook.service.js";
import { runFlow } from "../flows/flows.js";
import { menuFlow } from "../flows/sampleFlow.js";

async function handleMessage(senderId, event) {
    const message = event.message?.text || event.postback?.payload;

    if (message?.toLowerCase() === "hi" || message === "GET_STARTED") {
        // Khởi động flow
        await runFlow(senderId, "__init", menuFlow);
        return;
    }

    // Giả sử người dùng nhập cú pháp đặt hàng
    if (/ - \d{9,10} - .* - .+/i.test(message)) {
        await sendTextMessage(senderId, "🎉 Đã nhận thông tin đặt hàng!");
        await runFlow(senderId, "__init", {
            start: "thank_you",
            nodes: menuFlow.nodes,
        });
        return;
    }

    // Tiếp tục flow đang chạy
    await runFlow(senderId, message, menuFlow);
}

export default handleMessage;
