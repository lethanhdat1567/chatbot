export const deepFlow = {
    id: "batdau",
    type: "text",
    payload: {
        text: "👋 Chào bạn đến với cửa hàng ABC!",
    },
    condition: {
        type: "value_match",
        branches: [
            {
                value: "hi",
                next: [
                    {
                        id: "intro_menu",
                        type: "text",
                        payload: {
                            text: "Bạn đang tìm kiếm điều gì hôm nay?",
                        },
                        next: {
                            id: "main_menu",
                            type: "quick_replies",
                            payload: {
                                text: "📋 Vui lòng chọn một trong các mục sau:",
                                replies: [
                                    { title: "👕 Áo thun", payload: "AO_THUN" },
                                    { title: "👟 Giày", payload: "GIAY" },
                                    { title: "📦 Khác", payload: "KHAC" },
                                ],
                            },
                            condition: {
                                type: "value_match",
                                branches: [
                                    {
                                        value: "AO_THUN",
                                        next: {
                                            id: "show_ao_thun",
                                            type: "generic_template",
                                            payload: {
                                                elements: [
                                                    {
                                                        title: "Áo thun basic",
                                                        subtitle: "Giá: 199.000đ",
                                                        image_url: "https://via.placeholder.com/300x200",
                                                        buttons: [
                                                            {
                                                                type: "postback",
                                                                title: "Chọn mua",
                                                                payload: "MUA_AO_BASIC",
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        title: "Áo thun oversize",
                                                        subtitle: "Giá: 249.000đ",
                                                        image_url: "https://via.placeholder.com/300x200",
                                                        buttons: [
                                                            {
                                                                type: "postback",
                                                                title: "Chọn mua",
                                                                payload: "MUA_AO_OVERSIZE",
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            condition: {
                                                type: "value_match",
                                                branches: [
                                                    {
                                                        value: "MUA_AO_BASIC",
                                                        next: {
                                                            id: "confirm_basic",
                                                            type: "button_template",
                                                            payload: {
                                                                text: "Bạn có muốn đặt Áo thun basic không?",
                                                                buttons: [
                                                                    {
                                                                        type: "postback",
                                                                        title: "✅ Đặt hàng",
                                                                        payload: "DAT_AO_BASIC",
                                                                    },
                                                                    {
                                                                        type: "postback",
                                                                        title: "❌ Hủy",
                                                                        payload: "HUY_MUA",
                                                                    },
                                                                ],
                                                            },
                                                            condition: {
                                                                type: "value_match",
                                                                branches: [
                                                                    {
                                                                        value: "DAT_AO_BASIC",
                                                                        next: {
                                                                            id: "dat_hang_basic",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "✅ Đơn hàng đã được tạo. Cảm ơn bạn!",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        value: "HUY_MUA",
                                                                        next: {
                                                                            id: "huy_mua",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "❌ Bạn đã hủy đặt hàng.",
                                                                            },
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        value: "GIAY",
                                        next: {
                                            id: "show_giay",
                                            type: "generic_template",
                                            payload: {
                                                elements: [
                                                    {
                                                        title: "Giày thể thao",
                                                        subtitle: "Giá: 599.000đ",
                                                        image_url:
                                                            "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/123456789_123456789_123456789_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=123456789&_nc_ht=scontent.fhan5-11.fna&oh=123456789&oe=123456789",
                                                        buttons: [
                                                            {
                                                                type: "postback",
                                                                title: "Chọn mua",
                                                                payload: "MUA_GIAY_THE_THAO",
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        title: "Giày lười",
                                                        subtitle: "Giá: 399.000đ",
                                                        image_url:
                                                            "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/123456789_123456789_123456789_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=123456789&_nc_ht=scontent.fhan5-11.fna&oh=123456789&oe=123456789",
                                                        buttons: [
                                                            {
                                                                type: "postback",
                                                                title: "Chọn mua",
                                                                payload: "MUA_GIAY_LUOI",
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            condition: {
                                                type: "value_match",
                                                branches: [
                                                    {
                                                        value: "MUA_GIAY_THE_THAO",
                                                        next: {
                                                            id: "confirm_giay_the_thao",
                                                            type: "button_template",
                                                            payload: {
                                                                text: "Bạn có muốn đặt Giày thể thao không?",
                                                                buttons: [
                                                                    {
                                                                        type: "postback",
                                                                        title: "✅ Đặt hàng",
                                                                        payload: "DAT_GIAY_THE_THAO",
                                                                    },
                                                                    {
                                                                        type: "postback",
                                                                        title: "❌ Hủy",
                                                                        payload: "HUY_MUA",
                                                                    },
                                                                ],
                                                            },
                                                            condition: {
                                                                type: "value_match",
                                                                branches: [
                                                                    {
                                                                        value: "DAT_GIAY_THE_THAO",
                                                                        next: {
                                                                            id: "dat_hang_giay_the_thao",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "✅ Đơn hàng đã được tạo. Cảm ơn bạn!",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        value: "HUY_MUA",
                                                                        next: {
                                                                            id: "huy_mua",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "❌ Bạn đã hủy đặt hàng.",
                                                                            },
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        value: "MUA_GIAY_LUOI",
                                                        next: {
                                                            id: "confirm_giay_luoi",
                                                            type: "button_template",
                                                            payload: {
                                                                text: "Bạn có muốn đặt Giày lười không?",
                                                                buttons: [
                                                                    {
                                                                        type: "postback",
                                                                        title: "✅ Đặt hàng",
                                                                        payload: "DAT_GIAY_LUOI",
                                                                    },
                                                                    {
                                                                        type: "postback",
                                                                        title: "❌ Hủy",
                                                                        payload: "HUY_MUA",
                                                                    },
                                                                ],
                                                            },
                                                            condition: {
                                                                type: "value_match",
                                                                branches: [
                                                                    {
                                                                        value: "DAT_GIAY_LUOI",
                                                                        next: {
                                                                            id: "dat_hang_giay_luoi",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "✅ Đơn hàng đã được tạo. Cảm ơn bạn!",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        value: "HUY_MUA",
                                                                        next: {
                                                                            id: "huy_mua",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "❌ Bạn đã hủy đặt hàng.",
                                                                            },
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        value: "KHAC",
                                        next: {
                                            id: "show_khac",
                                            type: "generic_template",
                                            payload: {
                                                elements: [
                                                    {
                                                        title: "Balo thời trang",
                                                        subtitle: "Giá: 399.000đ",
                                                        image_url:
                                                            "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/123456789_123456789_123456789_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=123456789&_nc_ht=scontent.fhan5-11.fna&oh=123456789&oe=123456789",
                                                        default_action: {
                                                            type: "web_url",
                                                            url: "https://www.facebook.com",
                                                        },
                                                        buttons: [
                                                            {
                                                                type: "postback",
                                                                title: "Chọn mua",
                                                                payload: "MUA_BALO",
                                                            },
                                                            {
                                                                type: "postback",
                                                                title: "Xem chi tiết",
                                                                payload: "XEM_BALO",
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        title: "Mũ lưỡi trai",
                                                        subtitle: "Giá: 99.000đ",
                                                        image_url:
                                                            "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/123456789_123456789_123456789_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=123456789&_nc_ht=scontent.fhan5-11.fna&oh=123456789&oe=123456789",
                                                        default_action: {
                                                            type: "web_url",
                                                            url: "https://www.facebook.com",
                                                        },
                                                        buttons: [
                                                            {
                                                                type: "postback",
                                                                title: "Chọn mua",
                                                                payload: "MUA_MU",
                                                            },
                                                            {
                                                                type: "postback",
                                                                title: "Xem chi tiết",
                                                                payload: "XEM_MU",
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            condition: {
                                                type: "value_match",
                                                branches: [
                                                    {
                                                        value: "MUA_BALO",
                                                        next: {
                                                            id: "confirm_balo",
                                                            type: "button_template",
                                                            payload: {
                                                                text: "Bạn có muốn đặt Balo thời trang không?",
                                                                buttons: [
                                                                    {
                                                                        type: "postback",
                                                                        title: "✅ Đặt hàng",
                                                                        payload: "DAT_BALO",
                                                                    },
                                                                    {
                                                                        type: "postback",
                                                                        title: "❌ Hủy",
                                                                        payload: "HUY_MUA",
                                                                    },
                                                                ],
                                                            },
                                                            condition: {
                                                                type: "value_match",
                                                                branches: [
                                                                    {
                                                                        value: "DAT_BALO",
                                                                        next: {
                                                                            id: "dat_hang_balo",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "✅ Đơn hàng đã được tạo. Cảm ơn bạn!",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        value: "HUY_MUA",
                                                                        next: {
                                                                            id: "huy_mua",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "❌ Bạn đã hủy đặt hàng.",
                                                                            },
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        value: "MUA_MU",
                                                        next: {
                                                            id: "confirm_mu",
                                                            type: "button_template",
                                                            payload: {
                                                                text: "Bạn có muốn đặt Mũ lưỡi trai không?",
                                                                buttons: [
                                                                    {
                                                                        type: "postback",
                                                                        title: "✅ Đặt hàng",
                                                                        payload: "DAT_MU",
                                                                    },
                                                                    {
                                                                        type: "postback",
                                                                        title: "❌ Hủy",
                                                                        payload: "HUY_MUA",
                                                                    },
                                                                ],
                                                            },
                                                            condition: {
                                                                type: "value_match",
                                                                branches: [
                                                                    {
                                                                        value: "DAT_MU",
                                                                        next: {
                                                                            id: "dat_hang_mu",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "✅ Đơn hàng đã được tạo. Cảm ơn bạn!",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        value: "HUY_MUA",
                                                                        next: {
                                                                            id: "huy_mua",
                                                                            type: "text",
                                                                            payload: {
                                                                                text: "❌ Bạn đã hủy đặt hàng.",
                                                                            },
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        value: "XEM_BALO",
                                                        next: {
                                                            id: "xem_balo",
                                                            type: "text",
                                                            payload: {
                                                                text: "🎒 Balo thời trang:\n- Chất liệu: Canvas cao cấp\n- Kích thước: 40x30x12cm\n- Nhiều ngăn tiện dụng\n- Màu sắc: Đen, Xám, Navy",
                                                            },
                                                        },
                                                    },
                                                    {
                                                        value: "XEM_MU",
                                                        next: {
                                                            id: "xem_mu",
                                                            type: "text",
                                                            payload: {
                                                                text: "🧢 Mũ lưỡi trai:\n- Chất liệu: Cotton\n- Size: Free size (điều chỉnh được)\n- Phong cách: Basic\n- Màu sắc: Đen, Trắng, Xám",
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                default: {
                                    id: "unknown_main_menu",
                                    type: "text",
                                    payload: {
                                        text: "❓ Mình không hiểu lựa chọn của bạn. Bạn có thể chọn lại từ menu nhé!",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    default: {
        id: "unknown_greeting",
        type: "text",
        payload: {
            text: "🤖 Xin lỗi, bạn có thể chào lại bằng 'hi' không?",
        },
    },
};
