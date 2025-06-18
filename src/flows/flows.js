import { sendTextMessage, sendQuickReplies } from "../services/facebook.service.js";

// Lưu trạng thái flow hiện tại của từng user
const userStates = {};

export async function runFlow(senderId, message, flow) {
    let currentNodeId = userStates[senderId] || flow.start;
    const currentNode = flow.nodes[currentNodeId];

    if (!currentNode) {
        await sendTextMessage(senderId, "⚠️ Bot hiện tại không hiểu ý bạn.");
        return;
    }

    // Node có quick_reply
    if (currentNode.type === "quick_reply") {
        if (message === "__init" || message === "__retry") {
            const quickReplies = currentNode.options.map((opt) => ({
                content_type: "text",
                title: opt,
                payload: opt,
            }));
            await sendQuickReplies(senderId, currentNode.text, quickReplies);
            return;
        }

        const matched = currentNode.transitions.find((t) => t.condition === message);
        if (matched) {
            userStates[senderId] = matched.next;
            return runFlow(senderId, "__init", flow);
        } else {
            await sendTextMessage(senderId, "❗ Không hiểu ý bạn, hãy chọn lại.");
            return runFlow(senderId, "__retry", flow); // ❗ Gọi lại với "__retry" để dừng vòng lặp vô hạn
        }
    }

    // Node là text
    if (currentNode.type === "text") {
        await sendTextMessage(senderId, currentNode.text);

        // Nếu có chuyển tiếp thì tiếp tục
        const matched = currentNode.transitions?.[0];
        if (matched) {
            userStates[senderId] = matched.next;
        } else {
            // Kết thúc flow nếu không còn bước tiếp theo
            delete userStates[senderId];
        }

        return;
    }

    // Trường hợp node không hợp lệ
    await sendTextMessage(senderId, "⚠️ Flow bị lỗi cấu hình.");
}
