const ASPECTS = [
    {
        id: "awareness",
        name: "Tổng kết chi tiêu hàng tháng",
        question: "Bạn có tổng kết chi tiêu mỗi tháng không? Biết 3 tháng gần đây chi tiêu như thế nào.",
        options: [
            { text: "Không bao giờ", score: 1 },
            { text: "Thỉnh thoảng tổng kết chi tiêu tháng nhưng không ghi chép lại tổng kết.", score: 2 },
            { text: "Thỉnh thoảng tổng kết chi tiêu tháng, CÓ GHI CHÉP LAI", score: 3 },
            { text: "Luôn tổng kết chi tiêu tháng nhưng không ghi chép lại", score: 4 },
            { text: "Luôn tổng kết chi tiêu tháng và CÓ GHI CHÉP LAI", score: 5 }
        ]
    },
    {
        id: "recording",
        name: "Ghi chép chi tiêu",
        question: "Bạn đang ghi chép chi tiêu như thế nào?",
        options: [
            { text: "Không ghi", score: 1 },
            { text: "Ghi khi nhớ", score: 2 },
            { text: "Ghi vài ngày rồi bỏ", score: 3 },
            { text: "Ghi khá đều", score: 4 },
            { text: "Ghi 100%, có hệ thống", score: 5 }
        ]
    },
    {
        id: "budgeting",
        name: "Lập kế hoạch chi tiêu đầu tháng",
        question: "Bạn có lập kế hoạch chi tiêu trước khi bước vào tháng mới không?",
        options: [
            { text: "Không có", score: 1 },
            { text: "Có ý định nhưng không làm", score: 2 },
            { text: "Có ngân sách nhưng không theo", score: 3 },
            { text: "Có ngân sách và theo phần lớn", score: 4 },
            { text: "Ngân sách rõ, bám sát", score: 5 }
        ]
    },
    {
        id: "discipline",
        name: "Giữ kỷ luật trong chi tiêu",
        question: "Khi chi tiêu vượt kế hoạch, Bạn thường phản ứng thế nào?",
        options: [
            { text: "Mặc kệ", score: 1 },
            { text: "Tự an ủi", score: 2 },
            { text: "Cảm thấy áy náy", score: 3 },
            { text: "Điều chỉnh lại tháng sau", score: 4 },
            { text: "Dừng – phân tích – sửa ngay", score: 5 }
        ]
    },
    {
        id: "emotional",
        name: "Chi tiêu theo cảm xúc",
        question: "Bạn có thường chi tiền theo cảm xúc (thích là mua, vui cũng mua, buồn cũng mua để thỏa mãn cảm xúc) mà không cần để ý kế hoạch chi tiêu hàng tháng.",
        options: [
            { text: "Rất thường xuyên", score: 1 },
            { text: "Thường xuyên", score: 2 },
            { text: "Thỉnh thoảng", score: 3 },
            { text: "Hiếm khi", score: 4 },
            { text: "Gần như không", score: 5 }
        ]
    },
    {
        id: "fixed_costs",
        name: "Chi phí Thiết yếu",
        question: "Chi phí THIẾT YẾU chiếm bao nhiêu % thu nhập? (Là những khoản chi bắt buộc và không thể cắt giảm để duy trì mức sống cơ bản. Ví dụ như  ăn uống, nhà ở, đi lại)",
        options: [
            { text: ">80%", score: 1 },
            { text: "65–80%", score: 2 },
            { text: "50–65%", score: 3 },
            { text: "40–50%", score: 4 },
            { text: "<40%", score: 5 }
        ]
    },
    {
        id: "non_essential",
        name: "Chi phí không thiết yếu",
        question: "Chi phí KHÔNG THIẾT YẾU chiếm bao nhiêu % thu nhập? (Là những khoản chi tiêu không bắt buộc, mang tính tùy ý, giải trí. Ví dụ như: Đi du lịch, ăn nhà hàng, mua sắm không cấp bách)",
        options: [
            { text: "45-55%", score: 1 },
            { text: "35-45%", score: 2 },
            { text: "25-35%", score: 3 },
            { text: "15-25%", score: 4 },
            { text: "5-15%", score: 5 }
        ]
    },
    {
        id: "value_vs_desire",
        name: "Tỷ lệ chi tiêu/Thu nhập",
        question: "Tổng chi tiêu của Bạn chiếm bao nhiêu % thu nhập?",
        options: [
            { text: ">100%", score: 1 },
            { text: "90–100%", score: 2 },
            { text: "70–90%", score: 3 },
            { text: "50–70%", score: 4 },
            { text: "<50%", score: 5 }
        ]
    },
    {
        id: "cutting_ability",
        name: "Khả năng cắt giảm",
        question: "Khi cần tiết kiệm gấp, Bạn cắt chi tiêu thế nào?",
        options: [
            { text: "Không biết cắt gì, thấy cái gì cũng cần chi tiêu", score: 1 },
            { text: "Cắt bừa", score: 2 },
            { text: "Cắt được vài khoản", score: 3 },
            { text: "Cắt có ưu tiên", score: 4 },
            { text: "Cắt có ưu tiên, cắt nhanh, đúng chỗ", score: 5 }
        ]
    },
    {
        id: "system",
        name: "Hệ thống quản lý chi tiêu",
        question: "Bạn đang quản lý chi tiêu bằng cách nào?",
        options: [
            { text: "Không có hệ thống", score: 1 },
            { text: "Dựa vào trí nhớ", score: 2 },
            { text: "1 file / app đơn giản", score: 3 },
            { text: "Hệ thống quản lý chi tiêu tương đối nhưng không định kỳ rà soát", score: 4 },
            { text: "Hệ thống rõ + định kỳ rà soát", score: 5 }
        ]
    }
];
