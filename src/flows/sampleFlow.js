export const menuFlow = {
    start: "start",
    nodes: {
        start: {
            type: "quick_reply",
            text: "Chào bạn 👋 Bot có thể giúp gì cho bạn?",
            options: ["Giới thiệu thương hiệu", "Xem sản phẩm", "Đặt hàng"],
            transitions: [
                { condition: "Giới thiệu thương hiệu", next: "brand_intro" },
                { condition: "Xem sản phẩm", next: "category" },
                { condition: "Đặt hàng", next: "order_form" },
            ],
        },
        brand_intro: {
            type: "text",
            text: "Chúng tôi là thương hiệu ABC chuyên cung cấp sản phẩm chất lượng cao.",
        },
        category: {
            type: "quick_reply",
            text: "Bạn muốn xem loại sản phẩm nào?",
            options: ["Áo thun", "Quần jean", "Giày sneaker"],
            transitions: [
                { condition: "Áo thun", next: "product_ao" },
                { condition: "Quần jean", next: "product_quan" },
                { condition: "Giày sneaker", next: "product_giay" },
            ],
        },
        product_ao: {
            type: "text",
            text: "🧥 Áo thun Unisex cotton 100% - Giá 200.000đ\nLink sản phẩm: https://abc.vn/ao-thun",
        },
        product_quan: {
            type: "text",
            text: "👖 Quần jean co giãn - Giá 350.000đ\nLink sản phẩm: https://abc.vn/quan-jean",
        },
        product_giay: {
            type: "text",
            text: "👟 Giày sneaker năng động - Giá 500.000đ\nLink sản phẩm: https://abc.vn/giay-sneaker",
        },
        order_form: {
            type: "text",
            text: "Vui lòng nhập thông tin theo cú pháp:\nTên - Số điện thoại - Địa chỉ - Tên sản phẩm\n(Ví dụ: Nguyễn Văn A - 0901234567 - 123 Lê Lợi - Áo thun)",
        },
        // Bạn có thể xử lý thêm việc detect nội dung nhập thủ công ở server sau node này
        thank_you: {
            type: "text",
            text: "🎉 Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ sớm nhất.",
        },
    },
};
