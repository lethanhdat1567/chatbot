import express from "express";
import messengerController from "../controllers/messenger.controller.js";

const router = express.Router();

// Verify
router.get("/", messengerController.verify);
// Nhận tin nhắn
router.post("/", messengerController.getAndSendBackMessage);

export default router;
