// CONFIGURATION
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLy4vIUsDSukVPljFrCj9zU2UI0yzghxtJjrtnJwD_J8jSrTM_R9Z9fubsbwcmBkUe/exec"; // User to fill this
// Client-side API Key removed for security. Backend handles AI calls.

// STATE
const currentState = {
    step: 0,
    subStep: 0,
    answers: {}, // Quiz answers
    selfScores: new Array(10).fill(0), // Self-assessment scores
    actualScores: new Array(10).fill(0), // Final calculated scores
    totalSelf: 0,
    totalActual: 0,
    user: { name: "", email: "" },
    isSaving: false,
    hoveredIndex: null,
    systemLogs: [] // New: Store User Journey
};

// --- CLIENT LOGGING ---
function addLog(event) {
    const logEntry = { time: Date.now(), event: event };
    currentState.systemLogs.push(logEntry);
    console.log("LOG:", event);
}

// CHART INSTANCE
let radarChart = null;

// DOM ELEMENTS
const views = {
    login: document.getElementById('view-login'),
    intro: document.getElementById('view-intro'),
    selfAssess: document.getElementById('view-self-assess'),
    quiz: document.getElementById('view-quiz'),
    result: document.getElementById('view-result'),
    history: document.getElementById('view-history')
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    setupEventListeners();
});

function setupEventListeners() {
    // Login
    document.getElementById('btn-login').addEventListener('click', handleLogin);

    // Start Test
    document.getElementById('btn-start').addEventListener('click', startTest);

    // History
    const btnHistory = document.getElementById('btn-history');
    if (btnHistory) btnHistory.addEventListener('click', handleHistory);

    const btnBackIntro = document.getElementById('btn-back-intro');
    if (btnBackIntro) btnBackIntro.addEventListener('click', handleBackToIntro);

    // Quick Answer
    document.getElementById('btn-quick-answer').addEventListener('click', handleQuickAnswer);

    // View History
    document.getElementById('btn-view-history').addEventListener('click', handleHistory);

    // Self Assessment Buttons
    document.querySelectorAll('#view-self-assess .rating-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const score = parseInt(btn.dataset.score);
            handleSelfAssess(score);
        });
    });
}

function initChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ASPECTS.map((a, i) => `${i + 1}. ${a.name}`),
            datasets: [{
                label: 'Tự đánh giá',
                data: currentState.selfScores,
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: '#10b981',
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#10b981'
            }, {
                label: 'Thực tế',
                data: currentState.actualScores,
                fill: true,
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderColor: '#f59e0b',
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#f59e0b',
                hidden: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 40
                }
            },
            elements: {
                line: { borderWidth: 3 }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: (context) => {
                            if (currentState.user && context.index === currentState.step) {
                                return '#10b981'; // Green for active step
                            }
                            return '#94a3b8'; // Grey for default
                        },
                        font: (context) => {
                            if (currentState.user && context.index === currentState.step) {
                                return { size: 14, weight: 'bold', family: "'Inter', sans-serif" };
                            }
                            return { size: 11, family: "'Inter', sans-serif", weight: 'bold' };
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                        display: false, // Hide numbers
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'center',
                    labels: {
                        color: '#f8fafc',
                        padding: 40,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: { enabled: false } // Disable default tooltip to use ours
            },
            onHover: (event, elements, chart) => {
                const tooltip = document.getElementById('edu-tooltip');
                if (!tooltip) return;

                // 1. Get Mouse Coordinates relative to Canvas
                const canvasPosition = chart.canvas.getBoundingClientRect();
                const mouseX = event.stop ? event.x : (event.native ? event.native.clientX : 0) - canvasPosition.left;
                const mouseY = event.stop ? event.y : (event.native ? event.native.clientY : 0) - canvasPosition.top;

                // 2. Access internal scale (r) to find center
                const scale = chart.scales.r;
                const centerX = scale.xCenter;
                const centerY = scale.yCenter;
                const maxRadius = scale.drawingArea;

                // 3. Calculate Distance from Center
                const dx = mouseX - centerX;
                const dy = mouseY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // 4. Threshold Logic: Show if inside outer ring but not too close to center
                // 10% inner buffer, 130% outer buffer (to catch labels)
                if (distance < maxRadius * 0.1 || distance > maxRadius * 1.3) {
                    tooltip.classList.add('hidden');
                    return;
                }

                // 5. Calculate Angle (Radians -> Degrees)
                // Math.atan2 returns -PI to PI. 0 is Right (3 o'clock).
                // Chart.js starts 0 at Top (12 o'clock).
                let angle = Math.atan2(dy, dx) * (180 / Math.PI);

                // Adjust to match Chart.js rotation (Top start)
                // Rotate +90 degrees so 0 is Top
                angle = angle + 90;
                if (angle < 0) angle += 360;

                // 6. Map Angle to Segment (0-9)
                // 10 segments = 36 deg each.
                // Because index 0 is at Top (0 deg), slice is -18 to +18? 
                // No, typically index 0 center is at 0 deg.
                // Segment 0 spans 342(-18) -> 18.

                const stepAngle = 360 / 10;
                // Shift by half step to center the segment around the axis
                let index = Math.round(angle / stepAngle);
                if (index >= 10) index = 0;

                // 7. Show Tooltip
                const aspect = ASPECTS[index];
                if (aspect) {
                    document.getElementById('edu-title').innerText = `${index + 1}. ${aspect.name}`;
                    document.getElementById('edu-meaning').innerText = aspect.meaning || "Đang cập nhật...";
                    document.getElementById('edu-cause').innerText = aspect.lowScoreCause || "Đang cập nhật...";

                    tooltip.classList.remove('hidden');

                    // Position Tooltip
                    // Desktop: Follow mouse? Or Fixed corner?
                    // Let's try following mouse with offset
                    // Use clientX/Y from native event for global positioning
                    const globalX = event.native.clientX;
                    const globalY = event.native.clientY;

                    // Bound checks to keep on screen handled by CSS if possible, 
                    // simpler here is fixed offset
                    tooltip.style.left = (globalX + 15) + 'px';
                    tooltip.style.top = (globalY + 15) + 'px';
                }
            }
        }
    });
}

// LOGIC FLOW

function handleLogin() {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');

    if (!nameInput.value || !emailInput.value) {
        alert("Vui lòng nhập đầy đủ Họ tên và Email để bắt đầu!");
        return;
    }

    // SAVE USER INFO TO STATE
    currentState.user.name = nameInput.value.trim();
    currentState.user.email = emailInput.value.trim();

    addLog("User_Login_Success");

    // Switch View
    switchView('intro');

    // Update display name if element exists
    const displayEl = document.getElementById('user-name-display');
    if (displayEl) displayEl.innerText = currentState.user.name;
}

function startTest() {
    currentState.startTime = new Date();
    currentState.step = 0;
    currentState.subStep = 'quiz'; // Start with Quiz first

    // Show Actual dataset now
    // radarChart.data.datasets[1].hidden = false; // it is already visible now
    radarChart.update();

    loadStep();
}

function loadStep() {
    const aspect = ASPECTS[currentState.step];

    // Highlight Chart Axis
    radarChart.options.scales.r.pointLabels.color = (context) => {
        return context.index === currentState.step ? '#faa90e' : 'rgba(255,255,255,0.5)';
    };
    radarChart.options.scales.r.pointLabels.font = (context) => {
        return context.index === currentState.step ? { size: 14, weight: 'bold' } : { size: 11 };
    };
    radarChart.update();

    if (currentState.subStep === 'self') {
        // Show Self Assess View (Step 2)
        switchView('selfAssess');
        document.getElementById('current-aspect-num').innerText = currentState.step + 1;
        document.getElementById('current-aspect-name').innerText = "Đánh giá: " + aspect.name;

        // Reset buttons
        document.querySelectorAll('.rating-btn').forEach(btn => btn.style.background = '');

    } else {
        // Show Quiz View (Step 1)
        switchView('quiz');
        document.getElementById('quiz-aspect-num').innerText = currentState.step + 1;
        document.getElementById('quiz-aspect-name').innerText = "Đánh giá: " + aspect.name;
        document.getElementById('quiz-question').innerText = aspect.question;

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        aspect.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span>${opt.text}</span>
                <span class="option-score">+${opt.score}</span>
            `;
            btn.onclick = () => handleQuizAnswer(opt.score);
            optionsContainer.appendChild(btn);
        });
    }
}

function handleQuickAnswer() {
    addLog('Quick Answer Used');
    
    // Giả lập điểm số
    currentState.actualScores = [3, 4, 3, 4, 3, 4, 3, 4, 3, 4]; // Điểm thực tế giả lập
    currentState.selfScores = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]; // Tự đánh giá giả lập
    
    // Cập nhật chart
    radarChart.data.datasets[0].data = currentState.selfScores;
    radarChart.data.datasets[1].data = currentState.actualScores;
    radarChart.update();
    
    // Chuyển đến kết quả
    finishTest();
}

function handleQuizAnswer(score) {
    currentState.actualScores[currentState.step] = score;

    // Update Chart Realtime
    radarChart.data.datasets[1].data = currentState.actualScores;
    radarChart.update();

    // Move to SELF ASSESS (Step 2)
    setTimeout(() => {
        currentState.subStep = 'self';
        loadStep();
    }, 300);
}

function finishTest() {
    currentState.endTime = new Date();
    switchView('result');
    renderResults();
    saveToSheet(); // Async
}

function renderResults() {
    // 1. Calculate Totals
    const totalSelf = currentState.selfScores.reduce((a, b) => a + b, 0);
    const totalActual = currentState.actualScores.reduce((a, b) => a + b, 0);

    document.getElementById('final-self-score').innerText = totalSelf + '/50';
    document.getElementById('final-actual-score').innerText = totalActual + '/50';

    // 2. Categorize Aspects by Zone
    const healthyZone = [];      // Score 4-5
    const watchZone = [];        // Score 3
    const interventionZone = []; // Score 1-2
    const allWeaknesses = []; // Keep track for AI analysis

    currentState.actualScores.forEach((score, index) => {
        const item = `${ASPECTS[index].name} (${score}/5)`;
        if (score >= 4) {
            healthyZone.push(item);
        } else if (score === 3) {
            watchZone.push(item);
        } else {
            interventionZone.push(item);
            allWeaknesses.push(item);
        }
    });

    // 3. Render Detailed Results (3 Zones)
    const resultsContainer = document.getElementById('detailed-results');
    resultsContainer.innerHTML = '';

    // Helper to create zone section
    const createZone = (title, icon, colorClass, items, desc) => {
        if (items.length === 0) return;
        const div = document.createElement('div');
        div.className = 'mb-4';
        div.innerHTML = `
            <h3 style="color: ${colorClass}; font-size: 1.1rem; margin-bottom: 0.5rem;">
                ${icon} ${title}
            </h3>
            <ul style="margin-left: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">
                ${items.map(i => `<li>${i}</li>`).join('')}
            </ul>
        `;
        return div;
    };

    // Render Intervention Zone (Red) - Priority 1
    if (interventionZone.length > 0) {
        resultsContainer.appendChild(createZone(
            'Vùng cần can thiệp sớm',
            '<i class="fa-solid fa-triangle-exclamation"></i>',
            '#ef4444',
            interventionZone
        ));
    }

    // Render Watch Zone (Yellow) - Priority 2
    if (watchZone.length > 0) {
        resultsContainer.appendChild(createZone(
            'Vùng cần theo dõi',
            '<i class="fa-solid fa-circle-exclamation"></i>',
            '#eab308',
            watchZone
        ));
    }

    // Render Healthy Zone (Green) - Priority 3
    if (healthyZone.length > 0) {
        resultsContainer.appendChild(createZone(
            'Vùng khỏe mạnh',
            '<i class="fa-solid fa-circle-check"></i>',
            '#10b981',
            healthyZone
        ));
    }

    // 4. Update Gemini Call (pass only true weaknesses)
    // If no weaknesses, maybe pass watchZone or generic advice
    // (This part is handled later in saveToSheet, but we prepare the list here implicitly)

    // 5. Gap Analysis (Blind Spot & Low Self-Esteem)
    const blindSpots = []; // Self > Actual (>= 2)
    const lowEsteem = [];  // Self < Actual (<= -2)

    currentState.selfScores.forEach((self, i) => {
        const actual = currentState.actualScores[i];
        const gap = self - actual;

        if (gap >= 2) {
            blindSpots.push(`${ASPECTS[i].name} (Tự chấm: ${self} - Thực tế: ${actual})`);
        } else if (gap <= -2) {
            lowEsteem.push(`${ASPECTS[i].name} (Tự chấm: ${self} - Thực tế: ${actual})`);
        }
    });

    const gapContainer = document.getElementById('gap-analysis');
    gapContainer.innerHTML = '';

    // Priority: Display Low Confidence FIRST, then Blind Spots
    if (lowEsteem.length > 0) {
        const card = document.createElement('div');
        card.className = 'insight-card low-esteem';
        card.innerHTML = `
            <h4> <i class="fa-solid fa-cloud-rain"></i> VÙNG TỰ TI TÀI CHÍNH</h4>
            <p class="insight-desc">Bạn đang làm tốt hơn bạn nghĩ. Đừng khắt khe quá với bản thân, hãy tự tin phát huy thế mạnh này.</p>
            <ul class="insight-list">
                ${lowEsteem.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        gapContainer.appendChild(card);
    }

    if (blindSpots.length > 0) {
        const card = document.createElement('div');
        card.className = 'insight-card blind-spot';
        card.innerHTML = `
            <h4> <i class="fa-solid fa-triangle-exclamation"></i> VÙNG MÙ TÀI CHÍNH</h4>
            <p class="insight-desc">Bạn đang hơi quá tự tin về khả năng của mình trong khi thực tế chưa tốt như bản thân tự cảm nhận. Điều này khiến bạn khó nhận ra vấn đề để sửa chữa.</p>
            <ul class="insight-list">
                ${blindSpots.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        gapContainer.appendChild(card);
    }
}

async function callGeminiAnalysis(weaknesses) {
    const prompt = `
    Người dùng đang yếu ở các khía cạnh quản lý chi phí sau: ${weaknesses.join(', ')}.
    Hãy đóng vai bác sĩ tài chính cá nhân và đưa ra:
    - Phân tích ngắn gọn gốc rễ hành vi
    - 2–3 hành động cụ thể, dễ làm trong 30 ngày
    - Ngôn ngữ không phán xét, mang tính hỗ trợ.
    Trả lời bằng HTML đơn giản (không thẻ html/body), dùng thẻ <p>, <ul>, <li>, <b>.
    `;

    // MOCK RESPONSE
    if (!GEMINI_API_KEY) {
        setTimeout(() => {
            document.getElementById('ai-response').innerHTML = `
                <p><b>Phân tích sơ bộ (Mô phỏng):</b></p>
                <p>Việc yếu ở các khía cạnh <b>${weaknesses.join(', ')}</b> thường xuất phát từ việc thiếu thói quen theo dõi sát sao hoặc chưa có công cụ hỗ trợ phù hợp.</p>
                <p><b>Gợi ý hành động:</b></p>
                <ul>
                    <li>Cài đặt ngay một ứng dụng ghi chép chi tiêu (MoneyLover, v.v).</li>
                    <li>Dành 5 phút mỗi tối để rà soát lại ví tiền.</li>
                    <li>Thiết lập hạn mức chi tiêu hàng tuần thay vì hàng tháng để dễ kiểm soát.</li>
                </ul>
                <p><i>(Lưu ý: Đây là phản hồi mẫu. Hãy cấu hình API Key để nhận tư vấn thực tế từ AI)</i></p>
            `;
        }, 1500);
        return;
    }

    // REAL CALL (If Key Provided)
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || response.statusText);
        }

        const data = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("AI không trả về kết quả (Có thể do bộ lọc an toàn).");
        }

        const text = data.candidates[0].content.parts[0].text;

        // Convert Markdown to basic HTML if needed or just display
        // Simple regex replace for bold
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\* /g, '• ')
            .replace(/\n/g, '<br>');

        document.getElementById('ai-response').innerHTML = formatted;

    } catch (e) {
        console.error(e);
        document.getElementById('ai-response').innerHTML = `<span style="color: #ef4444;">Lỗi kết nối AI: ${e.message}</span>`;
    }
}

async function saveToSheet() {
    if (!GOOGLE_SCRIPT_URL) {
        console.log("No configured URL");
        return;
    }

    // Check URL validity
    if (GOOGLE_SCRIPT_URL.includes("googleusercontent.com")) {
        alert("⚠️ Vui lòng cập nhật URL Script mới (đuôi /exec)!");
        return;
    }

    if (currentState.isSaving) return;
    currentState.isSaving = true;

    // Show status
    const btn = document.querySelector(".result-actions .primary-btn");
    const originalText = btn ? btn.innerText : "Gửi kết quả";
    if (btn) btn.innerText = "Đang gửi...";

    // Prepare Payload (Standard JSON)
    const payload = {
        timestamp: new Date().toISOString(),
        email: currentState.user.email,
        name: currentState.user.name,
        actualScores: currentState.actualScores,
        totalSelf: currentState.selfScores.reduce((a, b) => a + b, 0),
        totalActual: currentState.actualScores.reduce((a, b) => a + b, 0)
    };

    try {
        // STANDARD POST REQUEST (Stable Method)
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log("Save request sent (no-cors). Assuming success.");
        alert("✅ Đã gửi kết quả thành công! Hãy kiểm tra email.");

    } catch (e) {
        console.error("Save failed", e);
        alert("❌ Lỗi gửi dữ liệu: " + e.message);
    } finally {
        currentState.isSaving = false;
        if (btn) btn.innerText = originalText;
    }
}

// UTILS
function switchView(viewName) {
    // Hide all
    Object.values(views).forEach(el => el.classList.add('hidden'));
    // Show target
    views[viewName].classList.remove('hidden');

    // Animation reset
    views[viewName].style.animation = 'none';
    views[viewName].offsetHeight; /* trigger reflow */
    views[viewName].style.animation = 'fadeIn 0.5s ease-out';

    // Handle Header Visibility
    const header = document.getElementById('intro-header');
    const container = document.querySelector('.app-container');

    if (viewName === 'quiz' || viewName === 'selfAssess' || viewName === 'result') {
        if (header) header.style.display = 'none';
        if (container) container.style.alignItems = 'center'; // Center vertically when header is gone
    } else {
        if (header) header.style.display = 'block';
        if (container) container.style.alignItems = 'flex-start'; // Top align when header is present
    }
}

// === HISTORY & PROGRESS FEATURES ===

function handleHistory() {
    if (!currentState.user || !currentState.user.email) {
        alert("Vui lòng đăng nhập trước!");
        return;
    }

    const btnViewHistory = document.getElementById('btn-view-history');
    let originalText = '';
    if (btnViewHistory) {
        originalText = btnViewHistory.innerHTML;
        btnViewHistory.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tải...';
        btnViewHistory.disabled = true;
    }

    // Call Backend bằng POST
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'getHistory',
            email: currentState.user.email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (btnViewHistory) {
            btnViewHistory.innerHTML = originalText;
            btnViewHistory.disabled = false;
        }

        if (data.history && data.history.length > 0) {
            switchView('history');
            renderHistoryChart(data.history);
        } else {
            alert("Bạn chưa có lịch sử kiểm tra nào.");
        }
    })
    .catch(error => {
        console.error(error);
        if (btnViewHistory) {
            btnViewHistory.innerHTML = originalText;
            btnViewHistory.disabled = false;
        }
        alert("Không thể tải lịch sử. Vui lòng thử lại sau.");
    });
}

let historyChartInstance = null;

function renderHistoryChart(historyData) {
    const ctx = document.getElementById('historyChart').getContext('2d');

    // Sort by date just in case
    historyData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = historyData.map(item => {
        const d = new Date(item.date);
        return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    const dataPoints = historyData.map(item => item.total);

    if (historyChartInstance) {
        historyChartInstance.destroy();
    }

    historyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Điểm Tổng (Thang 50)',
                data: dataPoints,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#10b981',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc', font: { family: "'Inter', sans-serif" } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });

    // Hiển thị tiến bộ
    let progressText = '';
    if (dataPoints.length > 1) {
        const latest = dataPoints[dataPoints.length - 1];
        const previous = dataPoints[dataPoints.length - 2];
        const change = latest - previous;
        progressText = `Tiến bộ: ${change > 0 ? '+' : ''}${change} điểm so với lần trước`;
    } else {
        progressText = 'Đây là lần test đầu tiên của bạn!';
    }
    document.getElementById('progress-text').innerText = progressText;
}

function handleBackToIntro() {
    switchView('intro');
}
