import { sendTextMessage } from "../../services/facebook.service.js";

async function handleText(senderId, text) {
    await sendTextMessage(senderId, text);
}

export default handleText;
