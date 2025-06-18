import { runFlow } from "../flows/flows.js";
import { deepFlow } from "../flows/sample.js";

export default function handleMessage(senderId, event) {
    let userInput;

    // Xử lý postback từ button
    if (event.postback?.payload) {
        userInput = event.postback.payload;
        console.log("📥 Received postback:", userInput);
    }
    // Xử lý tin nhắn văn bản
    else if (event.message?.text) {
        userInput = event.message.text;
        console.log("📥 Received text:", userInput);
    }
    // Xử lý quick reply
    else if (event.message?.quick_reply?.payload) {
        userInput = event.message.quick_reply.payload;
        console.log("📥 Received quick reply:", userInput);
    }

    // Chỉ chạy flow khi có input
    if (userInput) {
        console.log("▶️ Running flow with input:", userInput);
        // Thêm context để biết đang xử lý loại input nào
        const context = {
            senderId,
            inputType: event.postback ? "postback" : event.message?.quick_reply ? "quick_reply" : "text",
        };
        runFlow(deepFlow, userInput, context);
    } else {
        console.log("⚠️ No valid input received");
    }
}
