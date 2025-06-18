# 🤖 Hướng dẫn tạo Chatbot Facebook

## 📝 Cấu trúc JSON cơ bản

Mỗi node trong flow của chatbot sẽ có cấu trúc cơ bản như sau:

```json
{
    "id": "node_id", // ID định danh node
    "type": "node_type", // Loại node (text, quick_replies, ...)
    "payload": {}, // Nội dung của node
    "next": {}, // Node tiếp theo (tùy chọn)
    "condition": {} // Điều kiện rẽ nhánh (tùy chọn)
}
```

## 🔤 Các loại node

### 1. Text Message

Dùng để gửi tin nhắn văn bản đơn giản.

```json
{
    "id": "greeting",
    "type": "text",
    "payload": {
        "text": "👋 Chào bạn đến với cửa hàng!"
    }
}
```

### 2. Quick Replies

Hiển thị các nút trả lời nhanh cho người dùng.

```json
{
    "id": "main_menu",
    "type": "quick_replies",
    "payload": {
        "text": "📋 Vui lòng chọn:",
        "replies": [
            {
                "title": "👕 Áo thun",
                "payload": "AO_THUN"
            },
            {
                "title": "👟 Giày",
                "payload": "GIAY"
            }
        ]
    }
}
```

### 3. Generic Template

Dùng để hiển thị sản phẩm với hình ảnh và nút bấm.

```json
{
    "id": "show_products",
    "type": "generic_template",
    "payload": {
        "elements": [
            {
                "title": "Áo thun basic",
                "subtitle": "Giá: 199.000đ",
                "image_url": "https://example.com/image.jpg",
                "default_action": {
                    "type": "web_url",
                    "url": "https://www.facebook.com"
                },
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn mua",
                        "payload": "MUA_AO"
                    }
                ]
            }
        ]
    }
}
```

### 4. Button Template

Hiển thị tin nhắn kèm các nút bấm.

```json
{
    "id": "confirm_order",
    "type": "button_template",
    "payload": {
        "text": "Bạn có muốn đặt hàng không?",
        "buttons": [
            {
                "type": "postback",
                "title": "✅ Đặt hàng",
                "payload": "DAT_HANG"
            },
            {
                "type": "postback",
                "title": "❌ Hủy",
                "payload": "HUY_MUA"
            }
        ]
    }
}
```

## 🔄 Xử lý điều kiện và rẽ nhánh

Sử dụng `condition` để xử lý các trường hợp khác nhau:

```json
{
    "condition": {
        "type": "value_match",
        "branches": [
            {
                "value": "AO_THUN",
                "next": {
                    "id": "show_ao",
                    "type": "generic_template"
                    // ...
                }
            }
        ],
        "default": {
            "id": "unknown",
            "type": "text",
            "payload": {
                "text": "❓ Mình không hiểu"
            }
        }
    }
}
```

## 📌 Lưu ý quan trọng

1. **ID Node**:

    - Mỗi node phải có ID duy nhất
    - ID giúp dễ dàng debug và theo dõi flow

2. **Payload**:

    - Phải phù hợp với loại node
    - Cần escape các ký tự đặc biệt trong text

3. **Buttons**:

    - Tối đa 3 buttons cho mỗi template
    - Payload không được quá 1000 ký tự

4. **Generic Template**:

    - Tối đa 10 elements
    - Mỗi element có thể có 3 buttons
    - URL ảnh phải là HTTPS

5. **Quick Replies**:
    - Tối đa 13 quick replies
    - Title không quá 20 ký tự
    - Payload không quá 1000 ký tự

## 🌟 Ví dụ hoàn chỉnh

Xem file `sample.js` để thấy một ví dụ hoàn chỉnh về:

-   Menu chọn sản phẩm
-   Hiển thị danh sách sản phẩm
-   Xử lý đặt hàng
-   Xử lý hủy đơn

## 🔍 Testing

1. Test các trường hợp:

    - Người dùng chọn đúng option
    - Người dùng nhập text tự do
    - Người dùng bấm nút
    - Người dùng không trả lời

2. Kiểm tra:
    - Flow hoạt động đúng
    - Tin nhắn hiển thị đẹp
    - Không có lỗi cú pháp
    - Xử lý timeout

## 🐛 Debug

1. Sử dụng `console.log` để theo dõi:

    ```javascript
    console.log("📝 Current state:", {
        type: node.type,
        id: node.id,
        input: userInput,
    });
    ```

2. Kiểm tra log khi:
    - Nhận input từ user
    - Trước khi gửi message
    - Sau khi gửi message
    - Khi có lỗi xảy ra

## 🆘 Xử lý lỗi thường gặp

1. **No matching user found**:

    - Kiểm tra lại sender ID
    - Đảm bảo user đã tương tác với page

2. **Template không hiển thị**:

    - Kiểm tra cấu trúc JSON
    - Kiểm tra URL ảnh (phải là HTTPS)
    - Đảm bảo không vượt quá giới hạn

3. **Buttons không hoạt động**:
    - Kiểm tra payload có đúng format
    - Đảm bảo đã handle postback
    - Kiểm tra condition có match

## 📚 Tài liệu tham khảo

-   [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform)
-   [Templates Reference](https://developers.facebook.com/docs/messenger-platform/send-messages/templates)
-   [Buttons Reference](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons)
