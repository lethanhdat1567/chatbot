import config from "../config/index.js";
import handleMessage from "../utils/handleMessage.js";

class messengerControler {
    // Xác nhận người dùng

    verify(req, res) {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode && token === config.verifyToken) {
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    }

    // Nhận tin và trả lời
    async getAndSendBackMessage(req, res) {
        const body = req.body;

        if (body.object === "page") {
            for (const entry of body.entry) {
                const event = entry.messaging[0];
                const senderId = event.sender.id;

                await handleMessage(senderId, event);
            }

            return res.status(200).send("EVENT_RECEIVED");
        } else {
            return res.sendStatus(404);
        }
    }
}

export default new messengerControler();
