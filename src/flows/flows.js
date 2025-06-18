import { sendTextMessage, sendQuickReplies } from "../services/send.service.js";

// Lưu trạng thái flow hiện tại của từng user
const userStates = {};

export async function runFlow(senderId, message, flow) {
    let currentNodeId = userStates[senderId] || flow.start;
    const currentNode = flow.nodes[currentNodeId];

    // Nếu đang ở node có reply/quick
    if (currentNode.type === "quick_reply") {
        // Nếu là lần đầu => gửi câu hỏi và options
        if (message === "__init") {
            const quickReplies = currentNode.options.map((opt) => ({
                content_type: "text",
                title: opt,
                payload: opt,
            }));
            await sendQuickReplies(senderId, currentNode.text, quickReplies);
            return;
        }

        // Người dùng vừa gửi trả lời → check điều kiện
        const matched = currentNode.transitions.find((t) => t.condition === message);
        if (matched) {
            userStates[senderId] = matched.next;
            return runFlow(senderId, "__init", flow);
        } else {
            await sendTextMessage(senderId, "❗ Không hiểu ý bạn, hãy chọn lại.");
            return runFlow(senderId, "__init", flow);
        }
    }

    if (currentNode.type === "text") {
        await sendTextMessage(senderId, currentNode.text);
        userStates[senderId] = flow.start;
        return;
    }
}
