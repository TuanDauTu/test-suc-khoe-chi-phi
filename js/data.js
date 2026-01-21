const ASPECTS = [
    {
        id: "awareness",
        name: "Nhận thức chi tiêu",
        question: "Bạn có biết chính xác tiền của mình đang đi đâu mỗi tháng không?",
        options: [
            { text: "Hoàn toàn không biết", score: 1 },
            { text: "Biết mơ hồ vài khoản lớn", score: 2 },
            { text: "Biết khoảng 50–60%", score: 3 },
            { text: "Biết gần hết, đôi lúc lệch", score: 4 },
            { text: "Biết rõ 90–100%, có số liệu", score: 5 }
        ]
    },
    {
        id: "recording",
        name: "Ghi chép chi tiêu",
        question: "Bạn ghi chép chi tiêu ở mức độ nào?",
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
        name: "Ngân sách",
        question: "Bạn có ngân sách chi tiêu trước khi bước vào tháng mới không?",
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
        name: "Kỷ luật chi tiêu",
        question: "Khi chi vượt kế hoạch, Bạn thường phản ứng thế nào?",
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
        name: "Chi tiêu cảm xúc",
        question: "Bạn chi tiền theo cảm xúc (stress, buồn, hứng) bao nhiêu?",
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
        name: "Chi phí cố định",
        question: "Chi phí cố định chiếm bao nhiêu % thu nhập?",
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
        question: "Bạn có thường xuyên chi cho các khoản 'không thật sự cần'?",
        options: [
            { text: "Rất nhiều", score: 1 },
            { text: "Nhiều", score: 2 },
            { text: "Trung bình", score: 3 },
            { text: "Ít", score: 4 },
            { text: "Rất ít, có chọn lọc", score: 5 }
        ]
    },
    {
        id: "value_vs_desire",
        name: "Giá trị vs Tiêu dùng",
        question: "Bạn có phân biệt rõ chi tiêu theo giá trị và ham muốn không?",
        options: [
            { text: "Không phân biệt", score: 1 },
            { text: "Hiểu mơ hồ", score: 2 },
            { text: "Phân biệt được nhưng hay lệch", score: 3 },
            { text: "Phân biệt khá rõ", score: 4 },
            { text: "Rất rõ, quyết định tỉnh táo", score: 5 }
        ]
    },
    {
        id: "cutting_ability",
        name: "Khả năng cắt giảm",
        question: "Khi cần tiết kiệm gấp, Bạn cắt chi tiêu thế nào?",
        options: [
            { text: "Không biết cắt gì", score: 1 },
            { text: "Cắt bừa", score: 2 },
            { text: "Cắt được vài khoản", score: 3 },
            { text: "Cắt có ưu tiên", score: 4 },
            { text: "Cắt nhanh, đúng chỗ", score: 5 }
        ]
    },
    {
        id: "system",
        name: "Hệ thống chi tiêu",
        question: "Bạn đang quản lý chi tiêu bằng cách nào?",
        options: [
            { text: "Không có hệ thống", score: 1 },
            { text: "Dựa vào trí nhớ", score: 2 },
            { text: "1 file / app đơn giản", score: 3 },
            { text: "Hệ thống tương đối", score: 4 },
            { text: "Hệ thống rõ + định kỳ rà soát", score: 5 }
        ]
    }
];
