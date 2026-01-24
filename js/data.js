const ASPECTS = [
    {
        id: "awareness",
        name: "Tổng kết chi tiêu hàng tháng",
        question: "Bạn có tổng kết chi tiêu mỗi tháng không? Biết 3 tháng gần đây chi tiêu như thế nào.",
        meaning: "Khía cạnh này không chỉ đơn thuần là việc cộng trừ các con số, mà nó đo lường mức độ 'tỉnh thức' và minh bạch của bạn đối với dòng tiền cá nhân. Việc biết chính xác tiền đi đâu giúp bạn phá vỡ ảo tưởng 'mình tiêu ít lắm' và đối diện với thực tế, từ đó mới có cơ sở để điều chỉnh hành vi tiêu dùng một cách hiệu quả.",
        lowScoreCause: "Nguyên nhân thường đến từ tâm lý sợ hãi (Financial Fear) - sợ phải nhìn thấy số tiền mình đã phung phí, hoặc do thói quen trì hoãn, lười biếng. Nhiều người cũng có tâm lý 'mắt không thấy thì tim không đau' nên chọn cách lờ đi việc tổng kết.",
        options: [
            { text: "Không bao giờ", score: 1 },
            { text: "Thỉnh thoảng tổng kết chi tiêu tháng nhưng không ghi chép lại tổng kết.", score: 2 },
            { text: "Thỉnh thoảng tổng kết chi tiêu tháng, CÓ GHI CHÉP LẠI", score: 3 },
            { text: "Luôn tổng kết chi tiêu tháng nhưng không ghi chép lại", score: 4 },
            { text: "Luôn tổng kết chi tiêu tháng và CÓ GHI CHÉP LẠI", score: 5 }
        ]
    },
    {
        id: "recording",
        name: "Ghi chép chi tiêu",
        question: "Bạn đang ghi chép chi tiêu như thế nào?",
        meaning: "Đây là thói quen nền tảng nhất của quản lý tài chính, thể hiện sự kỷ luật trong việc giám sát từng đồng tiền ra khỏi ví. Ghi chép chi tiêu giúp bạn xây dựng dữ liệu lịch sử, từ đó nhận diện được những 'lỗ hổng' nhỏ (Latte Factor) đang âm thầm bào mòn tài sản của bạn mỗi ngày mà bạn không hề hay biết.",
        lowScoreCause: "Điểm thấp thường do sự thiếu kiên nhẫn, cảm thấy phiền phức khi phải ghi lại những khoản nhỏ nhặt (như tiền gửi xe, trà đá). Ngoài ra, việc chưa tìm được công cụ ghi chép phù hợp (App quá phức tạp hoặc sổ tay bất tiện) cũng là lý do khiến nhiều người bỏ cuộc giữa chừng.",
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
        meaning: "Khía cạnh này phản ánh tư duy chủ động: Bạn bảo tiền phải đi đâu thay vì hỏi tiền đã đi đâu mất rồi. Lập ngân sách (Budgeting) giống như việc vẽ bản đồ cho chuyến đi, giúp bạn phân bổ nguồn lực hữu hạn cho những mục tiêu quan trọng nhất, tránh tình trạng 'đầu tháng vung tay, cuối tháng vay mượn'.",
        lowScoreCause: "Nhiều người không lập ngân sách vì tư duy 'nước đến chân mới nhảy', sống ngày nào biết ngày đó. Một số khác lại cho rằng lập kế hoạch là tự trói buộc bản thân, làm mất đi sự tự do và niềm vui trong việc tiêu tiền, hoặc đơn giản là họ chưa bao giờ được hướng dẫn cách lập một ngân sách khả thi.",
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
        meaning: "Đây là thước đo sức mạnh ý chí và cam kết của bạn trước những cám dỗ tiêu dùng. Một kế hoạch dù hoàn hảo đến đâu cũng vô nghĩa nếu thiếu kỷ luật thực thi. Khả năng nói 'KHÔNG' với những ham muốn nhất thời để bảo vệ mục tiêu dài hạn chính là phẩm chất cốt lõi của người giàu có bền vững.",
        lowScoreCause: "Sự nuông chiều bản thân quá mức (YOLO - You Only Live Once) và thiếu mục tiêu tài chính đủ lớn là nguyên nhân chính. Khi không có động lực rõ ràng (như mua nhà, nghỉ hưu sớm), người ta dễ dàng thỏa hiệp với bản thân và phá vỡ các quy tắc đã đặt ra khi đứng trước một món đồ yêu thích.",
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
        meaning: "Chỉ số này đánh giá EQ Tài chính (Trí tuệ cảm xúc) của bạn. Nó cho thấy khả năng tách biệt cảm xúc hỉ-nộ-ái-ố ra khỏi các quyết định mua sắm. Những người làm chủ được cảm xúc sẽ không dùng tiền để mua vui ngắn hạn (Retail Therapy) hay để khỏa lấp những trống trải trong tâm hồn.",
        lowScoreCause: "Áp lực cuộc sống, stress công việc hoặc những tổn thương tâm lý chưa được chữa lành thường dẫn đến hành vi mua sắm bốc đồng để giải tỏa (Dopamine hit). Ngoài ra, sự tác động của quảng cáo và mạng xã hội cũng kích thích lòng tham và sự ghen tị, khiến ta chi tiền chỉ để bằng bạn bằng bè.",
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
        meaning: "Tỷ lệ này cho biết mức độ 'cồng kềnh' và rủi ro trong cấu trúc tài chính của bạn. Nếu chi phí thiết yếu chiếm tỷ trọng quá lớn, bạn sẽ rất dễ bị tổn thương khi thu nhập sụt giảm (mất việc, ốm đau) vì đây là những khoản 'không thể không chi'. Một cấu trúc khỏe mạnh cần giữ khoản này ở mức an toàn (thường dưới 50%).",
        lowScoreCause: "Nguyên nhân chính thường là do lạm phát lối sống (Lifestyle Inflation) - tăng mức sống ngay khi tăng thu nhập. Thuê nhà quá đẹp, mua xe quá sang hoặc gánh nặng nợ nần lớn (trả góp) khiến các khoản chi cố định phình to, bóp nghẹt khả năng tích lũy và đầu tư.",
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
        meaning: "Khía cạnh này phản ánh phong cách sống và mức độ hưởng thụ của bạn. Nó không xấu, nhưng cần sự cân bằng. Kiểm soát tốt chi phí không thiết yếu cho thấy bạn biết ưu tiên giá trị tương lai hơn là những niềm vui tức thời, đồng thời vẫn biết cách tận hưởng cuộc sống một cách hợp lý.",
        lowScoreCause: "Hội chứng FOMO (Sợ bỏ lỡ), tâm lý muốn thể hiện bản thân (Flexing) hoặc thói quen xã giao, tiệc tùng quá đà là những thủ phạm chính. Việc thiếu các mục tiêu tài chính lớn cũng khiến người ta dễ dàng 'vung tay quá trán' cho những thú vui nhất thời.",
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
        meaning: "Đây là chỉ số sức khỏe dòng tiền tổng quát quan trọng nhất, quyết định tốc độ làm giàu của bạn. Nó thể hiện khả năng giữ tiền (Saving Rate). Kiếm được bao nhiêu không quan trọng bằng việc bạn giữ lại được bao nhiêu. Tỷ lệ này càng thấp, bạn càng sớm đạt được tự do tài chính.",
        lowScoreCause: "Thu nhập quá thấp không đủ trang trải mức sống tối thiểu, hoặc khả năng quản lý tài chính yếu kém dẫn đến chi tiêu vượt quá thu nhập (lạm chi). Sự thiếu hụt quỹ dự phòng cũng khiến bạn phải vay mượn khi có việc gấp, làm trầm trọng thêm tình trạng thâm hụt ngân sách.",
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
        meaning: "Khả năng này đo lường sự linh hoạt, độ đàn hồi của bạn trước những biến cố tài chính. Người có khả năng cắt giảm tốt giống như một doanh nghiệp tinh gọn, có thể sống sót qua khủng hoảng bằng cách tối ưu hóa chi phí mà không làm giảm quá nhiều chất lượng cuộc sống cốt lõi.",
        lowScoreCause: "Do đã định hình một lối sống tiêu chuẩn quá cao (High Maintenance), phụ thuộc vào nhiều tiện nghi đắt tiền nên rất khó 'thắt lưng buộc bụng'. Sự sĩ diện hão cũng khiến nhiều người không dám cắt giảm chi tiêu công khai vì sợ người khác đánh giá.",
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
        meaning: "Đây là cấp độ cao nhất của quản lý tài chính cá nhân: Chuyên nghiệp hóa và Tự động hóa. Một hệ thống tốt giúp bạn quản lý tiền bạc một cách nhẹ nhàng, không tốn sức, giảm thiểu sai sót do con người và đảm bảo mọi thứ vận hành trơn tru ngay cả khi bạn bận rộn nhất.",
        lowScoreCause: "Thường do tư duy làm việc thủ công, tùy hứng, không chịu cập nhật công nghệ hoặc học hỏi các phương pháp quản lý khoa học (như 6 chiếc lọ, 50/30/20). Nhiều người ngại thay đổi thói quen cũ, chấp nhận sự lộn xộn thay vì dành thời gian xây dựng một hệ thống bài bản.",
        options: [
            { text: "Không có hệ thống", score: 1 },
            { text: "Dựa vào trí nhớ", score: 2 },
            { text: "1 file / app đơn giản", score: 3 },
            { text: "Hệ thống quản lý chi tiêu tương đối nhưng không định kỳ rà soát", score: 4 },
            { text: "Hệ thống rõ + định kỳ rà soát", score: 5 }
        ]
    }
];
