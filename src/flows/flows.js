import {
    sendTextMessage,
    sendQuickReplies,
    sendGenericTemplate,
    sendButtonMessage,
    sendMediaMessage,
    sendListTemplate,
    sendMediaTemplate,
    sendOneTimeNotificationRequest,
} from "../services/facebook.service.js";

// Lưu trạng thái flow của từng user
const userFlowState = new Map();

export async function sendNode(node, senderId) {
    switch (node.type) {
        case "text": {
            await sendTextMessage(senderId, node.payload.text);
            break;
        }

        case "quick_replies": {
            const { text, replies } = node.payload;
            const formattedReplies = replies.map((r) => ({
                content_type: "text",
                title: r.title,
                payload: r.payload,
            }));
            await sendQuickReplies(senderId, text, formattedReplies);
            break;
        }

        case "button_template": {
            const { text, buttons } = node.payload;
            // Lưu trạng thái node hiện tại khi hiển thị button template
            userFlowState.set(senderId, {
                currentNode: node,
                isFromDefault: false,
            });
            await sendButtonMessage(senderId, text, buttons);
            break;
        }

        case "generic_template": {
            // Lưu trạng thái node hiện tại khi hiển thị generic template
            userFlowState.set(senderId, {
                currentNode: node,
                isFromDefault: false,
            });
            await sendGenericTemplate(senderId, node.payload.elements);
            break;
        }

        case "list_template": {
            const { elements, buttons = [] } = node.payload;
            // Lưu trạng thái node hiện tại khi hiển thị list template
            userFlowState.set(senderId, {
                currentNode: node,
                isFromDefault: false,
            });

            // Đảm bảo elements không vượt quá 4 items
            const limitedElements = elements.slice(0, 4);

            // Đảm bảo mỗi element có đầy đủ các trường bắt buộc
            const validElements = limitedElements.map((element) => ({
                title: element.title || "",
                subtitle: element.subtitle || "",
                image_url: element.image_url || "https://via.placeholder.com/300x200",
                default_action: element.default_action || {
                    type: "web_url",
                    url: "https://www.facebook.com",
                },
            }));

            try {
                await sendListTemplate(senderId, validElements, buttons);
            } catch (error) {
                console.error("Error sending list template:", error);
                // Fallback to text message if list template fails
                await sendTextMessage(senderId, "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.");
            }
            break;
        }

        case "media_template": {
            const { media_type, url, buttons = [] } = node.payload;
            // Lưu trạng thái node hiện tại khi hiển thị media template
            userFlowState.set(senderId, {
                currentNode: node,
                isFromDefault: false,
            });

            try {
                await sendMediaTemplate(senderId, media_type, url, buttons);
            } catch (error) {
                console.error("Error sending media template:", error);
                // Fallback to text message if media template fails
                await sendTextMessage(senderId, "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.");
            }
            break;
        }

        case "media": {
            const { type, url } = node.payload; // image, video, audio, file
            await sendMediaMessage(senderId, type, url);
            break;
        }

        case "one_time_notif": {
            const { text, payload } = node.payload;
            await sendOneTimeNotificationRequest(senderId, text, payload);
            break;
        }

        default: {
            console.warn("⚠️ Unknown node type:", node.type);
            break;
        }
    }
}

async function runNext(next, userInput, context) {
    if (Array.isArray(next)) {
        for (const n of next) {
            await runFlow(n, userInput, context); // truyền nguyên context
        }
    } else {
        await runFlow(next, userInput, context);
    }
}

export async function runFlow(node, userInput, context = {}) {
    const { senderId, isFromDefault = false, inputType } = context;

    // Nếu đang từ default mà lại vào default nữa → chặn vòng lặp
    if (isFromDefault && node.id === "unknown") {
        console.log("🛑 Dừng vòng lặp default.");
        return;
    }

    // Kiểm tra xem có đang đợi input từ các template không
    const currentState = userFlowState.get(senderId);
    if (currentState?.currentNode) {
        console.log("📝 Current state:", {
            type: currentState.currentNode.type,
            id: currentState.currentNode.id,
            input: userInput,
            inputType,
        });

        // Xóa trạng thái cũ
        userFlowState.delete(senderId);

        // Xử lý input dựa trên loại template
        switch (currentState.currentNode.type) {
            case "quick_replies": {
                const matchedReply = currentState.currentNode.payload.replies.find(
                    (reply) => reply.title === userInput || reply.payload === userInput
                );

                if (matchedReply) {
                    console.log("✅ Matched quick reply:", matchedReply.payload);
                    if (currentState.currentNode.condition) {
                        const matchedBranch = currentState.currentNode.condition.branches?.find(
                            (branch) => branch.value === matchedReply.payload
                        );

                        if (matchedBranch) {
                            await runNext(matchedBranch.next, matchedReply.payload, {
                                senderId,
                                isFromDefault: currentState.isFromDefault,
                                inputType,
                            });
                        } else if (currentState.currentNode.condition.default) {
                            await runNext(currentState.currentNode.condition.default, matchedReply.payload, {
                                senderId,
                                isFromDefault: true,
                                inputType,
                            });
                        }
                    } else if (currentState.currentNode.next) {
                        await runNext(currentState.currentNode.next, matchedReply.payload, {
                            senderId,
                            isFromDefault: currentState.isFromDefault,
                            inputType,
                        });
                    }
                } else if (currentState.currentNode.condition?.default) {
                    await runNext(currentState.currentNode.condition.default, userInput, {
                        senderId,
                        isFromDefault: true,
                        inputType,
                    });
                }
                break;
            }

            case "media_template":
            case "list_template":
            case "generic_template":
            case "button_template": {
                if (inputType === "postback") {
                    if (currentState.currentNode.condition) {
                        const matchedBranch = currentState.currentNode.condition.branches?.find((branch) => branch.value === userInput);

                        if (matchedBranch) {
                            console.log("✅ Matched branch:", matchedBranch.value);
                            await runNext(matchedBranch.next, userInput, {
                                senderId,
                                isFromDefault: currentState.isFromDefault,
                                inputType,
                            });
                        } else if (currentState.currentNode.condition.default) {
                            console.log("⚠️ No matching branch, using default");
                            await runNext(currentState.currentNode.condition.default, userInput, {
                                senderId,
                                isFromDefault: true,
                                inputType,
                            });
                        }
                    } else if (currentState.currentNode.next) {
                        console.log("➡️ No condition, using next node");
                        await runNext(currentState.currentNode.next, userInput, {
                            senderId,
                            isFromDefault: currentState.isFromDefault,
                            inputType,
                        });
                    }
                } else {
                    console.log("⚠️ Expected postback but got:", inputType);
                    if (currentState.currentNode.condition?.default) {
                        await runNext(currentState.currentNode.condition.default, userInput, {
                            senderId,
                            isFromDefault: true,
                            inputType,
                        });
                    }
                }
                break;
            }
        }
        return;
    }

    // Nếu là quick replies, lưu node hiện tại và đợi input
    if (node.type === "quick_replies") {
        userFlowState.set(senderId, {
            currentNode: node,
            isFromDefault,
        });
        await sendNode(node, senderId);
        return;
    }

    await sendNode(node, senderId);

    // Nếu có điều kiện
    if (node.condition) {
        const matchedBranch = node.condition.branches?.find((branch) => branch.value === userInput);

        if (matchedBranch) {
            await runNext(matchedBranch.next, userInput, {
                senderId,
                isFromDefault: false,
                inputType,
            });
        } else if (node.condition.default) {
            await runNext(node.condition.default, userInput, {
                senderId,
                isFromDefault: true,
                inputType,
            });
        }

        return;
    }

    if (node.next) {
        await runNext(node.next, userInput, {
            senderId,
            isFromDefault: false,
            inputType,
        });
    }
}
