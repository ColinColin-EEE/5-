let isTeacherAuthenticated = false;
let currentChapter = "5과";

function getCloudDbUrl() {
    const saved = localStorage.getItem('cloud_db_url');
    if (saved && saved.trim()) {
        return saved.trim().replace(/\/$/, '');
    }
    return "https://unit5-mid2english-default-rtdb.firebaseio.com";
}

function getSafeDbKey(str) {
    return encodeURIComponent(str).replace(/\./g, '%2E');
}

function initCloudInput() {
    const input = document.getElementById('cloud-db-url-input');
    if (input) input.value = localStorage.getItem('cloud_db_url') || getCloudDbUrl();
}

function saveCloudDbUrl() {
    const inputVal = document.getElementById('cloud-db-url-input').value.trim();
    if (!inputVal) {
        localStorage.removeItem('cloud_db_url');
        alert('기본 클라우드 DB로 설정되었습니다.');
    } else {
        localStorage.setItem('cloud_db_url', inputVal.replace(/\/$/, ''));
        alert('클라우드 DB 주소가 저장되었습니다!');
    }
    initCloudInput();
}

async function testCloudConnection() {
    const dbUrl = document.getElementById('cloud-db-url-input').value.trim() || getCloudDbUrl();
    try {
        const res = await fetch(`${dbUrl}/ping.json`);
        if (res.ok) alert('✅ 클라우드 DB 연결 성공!');
        else alert('⚠️ 연결 실패: DB 주소 및 보안 규칙(.read/.write=true)을 확인하세요.');
    } catch (e) {
        alert('❌ 연결 오류 발생!');
    }
}

async function getTeacherPassword() {
    const dbUrl = getCloudDbUrl();
    if (dbUrl) {
        try {
            const res = await fetch(`${dbUrl}/teacher_password.json`);
            if (res.ok) {
                const cloudPw = await res.json();
                if (cloudPw) {
                    localStorage.setItem('teacher_password', cloudPw);
                    return cloudPw;
                }
            }
        } catch (e) {}
    }
    return localStorage.getItem('teacher_password') || "1234";
}

function showModal(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove('hidden');
        el.classList.add('flex');
        document.body.classList.add('modal-open');
    }
}

function hideModal(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('hidden');
        el.classList.remove('flex');
        document.body.classList.remove('modal-open');
    }
}

// State variables
let currentStudent = "";
let currentMode = "Word";
let cumPoints = 0;
let quizList = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let userArrangeState = [];
let selectedOption = null;
let multiChoiceState = {};
let isAnswerChecked = false;
let incorrectQuestions = [];
let isReviewMode = false;
let currentFeedbackDetailText = "";

function cleanPunctuation(str) {
    return str.replace(/[.,?!'’"~()\-]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function playTTS(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

function playDialogueTTS() {
    const q = quizList[currentIndex];
    if (q && q.dialogue) playTTS(q.dialogue);
}

function playCurrentQuestionTTS() {
    const q = quizList[currentIndex];
    if (!q) return;
    let textToRead = q.title;
    if (q.dialogue) textToRead += ". " + q.dialogue;
    playTTS(textToRead);
}

function playFeedbackTTS() {
    if (currentFeedbackDetailText) playTTS(currentFeedbackDetailText);
}

function shuffleArray(array) {
    if (!array) return [];
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function enterStudentName() {
    const nameInput = document.getElementById('student-name').value.trim();
    if (!nameInput) {
        alert('학생 이름을 입력해 주세요!');
        return;
    }
    currentStudent = nameInput;
    document.getElementById('display-student-name').innerText = currentStudent;
    document.getElementById('student-info-bar').classList.remove('hidden');

    document.getElementById('screen-welcome').classList.add('hidden');
    document.getElementById('screen-chapter-select').classList.remove('hidden');

    loadStudentPoints();
}

function selectChapter(chap) {
    currentChapter = chap;
    document.getElementById('mode-chapter-title').innerText = chap;
    document.getElementById('screen-chapter-select').classList.add('hidden');
    document.getElementById('screen-mode-select').classList.remove('hidden');
    document.getElementById('mode-user-name').innerText = currentStudent;

    loadLeaderboard();
}

async function loadStudentPoints() {
    const localSaved = localStorage.getItem(`eng_pts_${currentStudent}`) || '0';
    cumPoints = parseInt(localSaved, 10);

    const dbUrl = getCloudDbUrl();
    if (dbUrl) {
        try {
            const key = getSafeDbKey(currentStudent);
            const res = await fetch(`${dbUrl}/leaderboard/${key}.json`);
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.points === 'number') {
                    cumPoints = Math.max(cumPoints, data.points);
                    localStorage.setItem(`eng_pts_${currentStudent}`, cumPoints.toString());
                }
            }
        } catch (e) {}
    }
    updatePointDisplay();
}

function updatePointDisplay() {
    document.getElementById('display-cum-points').innerText = cumPoints;
    document.getElementById('mode-user-points').innerText = cumPoints;
}

// 선택된 단원에 맞게 데이터 객체 반환하는 함수
function getQuestionData(chapter) {
    if (chapter === '6과') return typeof UNIT6_DATA !== 'undefined' ? UNIT6_DATA : UNIT5_DATA;
    return UNIT5_DATA;
}

function startMode(mode) {
    currentMode = mode;
    const data = getQuestionData(currentChapter);

    if (mode === 'Word') {
        quizList = shuffleArray(data.WORD).slice(0, 20);
    } else if (mode === '단어 문제') {
        quizList = shuffleArray(data.VOCAB).slice(0, 12);
    } else {
        const sampledDialogue = shuffleArray(data.DIALOGUE).slice(0, 6);
        const sampledGrammar = shuffleArray(data.GRAMMAR).slice(0, 11);
        const sampledReading = shuffleArray(data.READING).slice(0, 8);
        
        let combined = [...sampledDialogue, ...sampledGrammar, ...sampledReading];
        
        if (combined.length < 25) {
            const selectedIds = new Set(combined.map(q => q.id));
            const allPractice = [...(data.DIALOGUE || []), ...(data.GRAMMAR || []), ...(data.READING || [])];
            const remaining = shuffleArray(allPractice.filter(q => !selectedIds.has(q.id)));
            combined = [...combined, ...remaining.slice(0, 25 - combined.length)];
        }

        quizList = shuffleArray(combined);
    }

    if (!quizList || quizList.length === 0) {
        alert('해당 단원에 등록된 문제가 없습니다!');
        return;
    }

    currentIndex = 0;
    score = 0;
    streak = 0;
    incorrectQuestions = [];
    isReviewMode = false;

    document.getElementById('review-mode-indicator').classList.add('hidden');
    document.getElementById('screen-mode-select').classList.add('hidden');
    document.getElementById('screen-quiz').classList.remove('hidden');

    renderQuestion();
}

function renderQuestion() {
    const q = quizList[currentIndex];

    const progressPct = (currentIndex / quizList.length) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${progressPct}%`;
    document.getElementById('quiz-progress-text').innerText = `${currentIndex + 1} / ${quizList.length}`;
    document.getElementById('quiz-score-live').innerText = `점수: ${score}`;

    const streakBadge = document.getElementById('streak-badge');
    if (streak > 1 && !isReviewMode) {
        document.getElementById('streak-count').innerText = streak;
        streakBadge.classList.remove('hidden');
        streakBadge.classList.add('flex');
    } else {
        streakBadge.classList.add('hidden');
        streakBadge.classList.remove('flex');
    }

    userArrangeState = [];
    multiChoiceState = {};
    isAnswerChecked = false;
    document.getElementById('btn-submit').disabled = false;

    const badgeMap = {
        'arrange': '🧩 철자/배열 문제',
        'choice': '선택형 객관식',
        'text': '✏️ 쓰기 문제',
        'multi_choice': '☑️ 매칭 선택'
    };
    document.getElementById('question-type-badge').innerText = badgeMap[q.type] || '문제';
    document.getElementById('question-title').innerText = q.title;

    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    if (q.dialogue) {
        dialogueText.innerText = q.dialogue;
        dialogueBox.classList.remove('hidden');
    } else {
        dialogueBox.classList.add('hidden');
    }

    const container = document.getElementById('interactive-area');
    container.innerHTML = '';

    if (q.type === 'choice') {
        const isMultiSelect = Array.isArray(q.answer);
        selectedOption = isMultiSelect ? [] : null;

        const mappedOptions = q.options.map((opt, originalIdx) => ({ opt, originalIdx }));

        const isAlphabetOrdered = q.options.some(opt => 
            /^\s*\([A-Ea-e1-5]\)/.test(opt) || 
            /\([A-Ea-e]\)/.test(opt) ||
            /^\s*\(A\)/i.test(opt) ||
            /\(A\)\s*[-~–]/i.test(opt) ||
            /^\(A\)-\(B\)/i.test(opt) ||
            /^\(A\),\s*\(B\)/i.test(opt)
        );

        const renderedOptions = isAlphabetOrdered ? mappedOptions : shuffleArray(mappedOptions);

        renderedOptions.forEach((item) => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-4 mb-3 duo-card font-bold text-slate-700 text-base flex items-center justify-between';
            btn.innerHTML = `<span>${item.opt}</span><div class="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs check-indicator"></div>`;
            btn.onclick = () => {
                if (isAnswerChecked) return;
                if (isMultiSelect) {
                    const pos = selectedOption.indexOf(item.originalIdx);
                    if (pos > -1) {
                        selectedOption.splice(pos, 1);
                        btn.classList.remove('selected');
                    } else {
                        selectedOption.push(item.originalIdx);
                        btn.classList.add('selected');
                    }
                } else {
                    document.querySelectorAll('#interactive-area button').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedOption = item.originalIdx;
                }
            };
            container.appendChild(btn);
        });
    } else if (q.type === 'arrange') {
        const dropArea = document.createElement('div');
        dropArea.id = 'drop-area';
        dropArea.className = 'drop-area mb-5';

        const poolArea = document.createElement('div');
        poolArea.id = 'pool-area';
        poolArea.className = 'flex flex-wrap gap-2.5 justify-center py-2';

        const chipObjects = shuffleArray(q.words.map((w, idx) => ({ id: idx, word: w })));

        chipObjects.forEach((item) => {
            const chip = document.createElement('button');
            chip.className = 'word-chip';
            chip.innerText = item.word;
            chip.setAttribute('data-chip-id', item.id);
            chip.onclick = () => {
                if (!isAnswerChecked) handleWordClick(chip, item);
            };
            poolArea.appendChild(chip);
        });

        container.appendChild(dropArea);
        container.appendChild(poolArea);

    } else if (q.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'text-answer-input';
        input.placeholder = '답안을 여기에 입력하세요...';
        input.className = 'w-full p-4 border-2 border-slate-200 rounded-2xl font-bold text-lg focus:border-lime-500 focus:outline-none transition-colors';
        input.onkeyup = (e) => {
            if (e.key === 'Enter') checkAnswer();
        };
        container.appendChild(input);
        setTimeout(() => input.focus(), 100);

    } else if (q.type === 'multi_choice') {
        q.groups.forEach((group, gIdx) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'mb-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100';
            groupDiv.innerHTML = `<div class="text-xs font-bold text-slate-500 mb-2">${group.label}</div>`;

            const optWrapper = document.createElement('div');
            optWrapper.className = 'flex gap-2';

            let optsToRender = shuffleArray(group.options);

            optsToRender.forEach((opt) => {
                const btn = document.createElement('button');
                btn.className = `flex-1 py-2.5 px-3 border-2 border-slate-200 rounded-xl font-bold text-sm bg-white hover:bg-slate-100 g-btn-${gIdx} transition-colors`;
                btn.innerText = opt;
                btn.onclick = () => {
                    if (isAnswerChecked) return;
                    document.querySelectorAll(`.g-btn-${gIdx}`).forEach(b => {
                        b.classList.remove('bg-lime-100', 'border-lime-500', 'text-lime-800');
                    });
                    btn.classList.add('bg-lime-100', 'border-lime-500', 'text-lime-800');
                    multiChoiceState[gIdx] = opt;
                };
                optWrapper.appendChild(btn);
            });

            groupDiv.appendChild(optWrapper);
            container.appendChild(groupDiv);
        });
    }
}

function handleWordClick(chip, item) {
    const dropArea = document.getElementById('drop-area');
    const poolArea = document.getElementById('pool-area');

    if (chip.parentElement.id === 'pool-area') {
        dropArea.appendChild(chip);
        userArrangeState.push(item);
    } else {
        poolArea.appendChild(chip);
        const idx = userArrangeState.findIndex(x => x.id === item.id);
        if (idx > -1) userArrangeState.splice(idx, 1);
    }
}

function checkAnswer() {
    if (isAnswerChecked) return;

    const q = quizList[currentIndex];
    let isCorrect = false;
    let detailMessage = "";

    if (q.type === 'choice') {
        if (Array.isArray(q.answer)) {
            if (!selectedOption || selectedOption.length === 0) {
                alert('정답을 선택해 주세요!');
                return;
            }
            const userSorted = [...selectedOption].sort((a, b) => a - b);
            const ansSorted = [...q.answer].sort((a, b) => a - b);
            isCorrect = (JSON.stringify(userSorted) === JSON.stringify(ansSorted));
            detailMessage = q.answer.map(idx => q.options[idx]).join(', ');
        } else {
            if (selectedOption === null) {
                alert('정답을 선택해 주세요!');
                return;
            }
            isCorrect = (selectedOption === q.answer);
            detailMessage = q.options[q.answer];
        }
    } else if (q.type === 'arrange') {
        const userWordsArr = userArrangeState.map(x => x.word);
        const userStrSpaced = userWordsArr.join(' ');
        const userStrJoined = userWordsArr.join('');
        const targetStrSpaced = q.answer.join(' ');
        const targetStrJoined = q.answer.join('');

        isCorrect = (cleanPunctuation(userStrSpaced) === cleanPunctuation(targetStrSpaced)) || 
                    (cleanPunctuation(userStrJoined) === cleanPunctuation(targetStrJoined));
        detailMessage = targetStrSpaced;
    } else if (q.type === 'text') {
        const inputEl = document.getElementById('text-answer-input');
        const val = inputEl ? inputEl.value.trim() : "";
        if (!val) {
            alert('답을 입력해 주세요!');
            return;
        }
        const cleanedVal = cleanPunctuation(val);
        isCorrect = q.answer.some(ans => cleanPunctuation(ans) === cleanedVal);
        detailMessage = q.answer[0];
    } else if (q.type === 'multi_choice') {
        if (Object.keys(multiChoiceState).length < q.groups.length) {
            alert('모든 선택지를 골라주세요!');
            return;
        }
        isCorrect = q.groups.every((group, idx) => multiChoiceState[idx] === group.answer);
        detailMessage = q.groups.map(g => `${g.label}: ${g.answer}`).join(', ');
    }

    isAnswerChecked = true;
    document.getElementById('btn-submit').disabled = true;
    currentFeedbackDetailText = detailMessage;

    let ptsEarned = 0;
    if (currentMode === 'Word') {
        ptsEarned = 1;
        if (isCorrect) score += 1;
    } else if (currentMode === '단어 문제') {
        ptsEarned = isReviewMode ? 1 : 2;
        if (isCorrect) score += 2;
    } else {
        ptsEarned = isReviewMode ? 2 : 4;
        if (isCorrect) score += 4;
    }

    if (isCorrect) {
        streak++;
        cumPoints += ptsEarned;
        updatePointDisplay();
        savePointsToStorageAndCloud();
    } else {
        streak = 0;
        if (!isReviewMode) {
            incorrectQuestions.push(q);
        }
    }

    showFeedback(isCorrect, `정답: ${detailMessage}`, ptsEarned);
}

function savePointsToStorageAndCloud() {
    localStorage.setItem(`eng_pts_${currentStudent}`, cumPoints.toString());
    const dbUrl = getCloudDbUrl();
    if (dbUrl) {
        const key = getSafeDbKey(currentStudent);
        fetch(`${dbUrl}/leaderboard/${key}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: currentStudent, points: cumPoints, updated: Date.now() })
        }).catch(() => {});
    }
}

function showFeedback(isCorrect, detail, ptsEarned) {
    const modal = document.getElementById('feedback-modal');
    const icon = document.getElementById('feedback-icon');
    const title = document.getElementById('feedback-title');
    const detailEl = document.getElementById('feedback-detail');

    if (isCorrect) {
        modal.className = modal.className.replace(/border-[\w-]+/, 'border-lime-500 bg-lime-50');
        icon.innerText = '✅';
        title.innerText = streak > 1 ? `정답입니다! (+${ptsEarned}pt) 🔥 ${streak}연속!` : `정답입니다! (+${ptsEarned}pt)`;
        title.className = 'font-black text-xl text-lime-700';
        detailEl.innerText = `포인트 ${ptsEarned}점이 누적되었습니다!`;
        confetti({ particleCount: 30 + Math.min(streak * 5, 30), spread: 50, origin: { y: 0.85 } });
    } else {
        modal.className = modal.className.replace(/border-[\w-]+/, 'border-rose-500 bg-rose-50');
        icon.innerText = '❌';
        title.innerText = '아쉬워요!';
        title.className = 'font-black text-xl text-rose-700';
        detailEl.innerText = detail;
    }

    modal.classList.remove('translate-y-full');
}

function nextQuestion() {
    document.getElementById('feedback-modal').classList.add('translate-y-full');

    currentIndex++;
    if (currentIndex < quizList.length) {
        renderQuestion();
    } else {
        completeQuizRound();
    }
}

function completeQuizRound() {
    saveRecord(currentStudent, score, currentChapter, currentMode, isReviewMode);

    if (incorrectQuestions.length > 0) {
        alert(`📝 ${incorrectQuestions.length}개 문제를 틀렸습니다. 바로 오답 노트 복습을 시작합니다!`);
        quizList = [...incorrectQuestions];
        incorrectQuestions = [];
        currentIndex = 0;
        score = 0;
        streak = 0;
        isReviewMode = true;

        document.getElementById('review-mode-indicator').classList.remove('hidden');
        renderQuestion();
    } else {
        document.getElementById('screen-quiz').classList.add('hidden');
        document.getElementById('screen-result').classList.remove('hidden');
        document.getElementById('final-score').innerText = `${score}점`;
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
}

async function saveRecord(studentName, finalScore, chapter, modeName, isReview) {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

    const modeLabel = modeName + (isReview ? ' (복습)' : '');

    const newRecord = {
        date: today,
        time: timeStr,
        chapter: chapter,
        mode: modeLabel,
        name: studentName,
        score: finalScore,
        timestamp: Date.now()
    };

    const localRecords = JSON.parse(localStorage.getItem('eng_quest_records_v4') || '[]');
    localRecords.push(newRecord);
    localStorage.setItem('eng_quest_records_v4', JSON.stringify(localRecords));

    const dbUrl = getCloudDbUrl();
    if (dbUrl) {
        try {
            await fetch(`${dbUrl}/records.json`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord)
            });
        } catch (e) {}
    }
}

async function loadLeaderboard() {
    const listEl = document.getElementById('leaderboard-list');
    listEl.innerHTML = `<div class="text-center py-4 text-xs text-slate-400">전체 학생 실시간 랭킹 불러오는 중...</div>`;

    let leaderboardArr = [];
    const dbUrl = getCloudDbUrl();

    if (dbUrl) {
        try {
            const res = await fetch(`${dbUrl}/leaderboard.json`);
            if (res.ok) {
                const data = await res.json();
                if (data) leaderboardArr = Object.values(data);
            }
        } catch (e) {}
    }

    if (leaderboardArr.length === 0) {
        leaderboardArr = [{ name: currentStudent, points: cumPoints }];
    }

    leaderboardArr.sort((a, b) => (b.points || 0) - (a.points || 0));

    listEl.innerHTML = '';
    leaderboardArr.slice(0, 10).forEach((item, idx) => {
        const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}위`;
        const isMe = item.name === currentStudent;

        const row = document.createElement('div');
        row.className = `flex justify-between items-center p-2.5 rounded-2xl ${isMe ? 'bg-lime-100 text-lime-900 border-2 border-lime-400 font-black' : 'bg-slate-50'}`;
        row.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="w-8 text-center font-black">${medal}</span>
                <span>${item.name} ${isMe ? '(나)' : ''}</span>
            </div>
            <span class="font-black text-lime-600">⭐ ${item.points || 0}pt</span>
        `;
        listEl.appendChild(row);
    });
}

function backToModeSelect() {
    document.getElementById('screen-result').classList.add('hidden');
    document.getElementById('screen-mode-select').classList.remove('hidden');
    loadLeaderboard();
}

function goHome() {
    if (confirm('메인 화면으로 돌아갈까요?')) {
        document.getElementById('feedback-modal').classList.add('translate-y-full');
        document.getElementById('screen-quiz').classList.add('hidden');
        document.getElementById('screen-result').classList.add('hidden');
        document.getElementById('screen-mode-select').classList.add('hidden');
        document.getElementById('screen-chapter-select').classList.remove('hidden');
    }
}

function toggleTeacherModal() {
    const modal = document.getElementById('teacher-modal');
    if (!modal.classList.contains('hidden')) {
        hideModal('teacher-modal');
    } else {
        if (!isTeacherAuthenticated) openTeacherAuthModal();
        else openTeacherModalDirectly();
    }
}

function openTeacherAuthModal() {
    document.getElementById('teacher-password-input').value = '';
    showModal('teacher-auth-modal');
    setTimeout(() => document.getElementById('teacher-password-input').focus(), 100);
}

function closeTeacherAuthModal() {
    hideModal('teacher-auth-modal');
}

async function verifyTeacherPassword() {
    const inputPw = document.getElementById('teacher-password-input').value;
    const currentPw = await getTeacherPassword();
    if (inputPw === currentPw) {
        isTeacherAuthenticated = true;
        hideModal('teacher-auth-modal');
        openTeacherModalDirectly();
    } else {
        alert('비밀번호가 올바르지 않습니다.');
    }
}

async function resetPasswordToDefault() {
    const userAnswer = prompt("불난 집에 ( ).");
    if (userAnswer && userAnswer.trim() === "부채질하다 불타 죽는다") {
        localStorage.setItem('teacher_password', '1234');
        alert('비밀번호가 1234로 초기화되었습니다!');
    } else {
        alert('비밀번호 초기화 실패!');
    }
}

async function changeTeacherPassword() {
    const currentPwInput = document.getElementById('pw-current').value;
    const newPwInput = document.getElementById('pw-new').value.trim();
    const confirmPwInput = document.getElementById('pw-confirm').value.trim();

    const currentPw = await getTeacherPassword();
    if (currentPwInput !== currentPw) {
        alert('현재 비밀번호가 일치하지 않습니다.');
        return;
    }
    if (!newPwInput || newPwInput !== confirmPwInput) {
        alert('새 비밀번호를 확인해 주세요.');
        return;
    }

    localStorage.setItem('teacher_password', newPwInput);
    const dbUrl = getCloudDbUrl();
    if (dbUrl) {
        fetch(`${dbUrl}/teacher_password.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPwInput)
        });
    }

    alert('비밀번호가 변경되었습니다!');
    switchTeacherTab('records');
}

function openTeacherModalDirectly() {
    showModal('teacher-modal');
    document.getElementById('filter-date').value = new Date().toISOString().split('T')[0];
    renderRecords();
    initQRInput();
    initCloudInput();
}

function switchTeacherTab(tab) {
    const secRecords = document.getElementById('teacher-sec-records');
    const secQR = document.getElementById('teacher-sec-qr');
    const secPW = document.getElementById('teacher-sec-pw');
    const secCloud = document.getElementById('teacher-sec-cloud');

    document.querySelectorAll('#teacher-modal .grid button').forEach(btn => {
        btn.className = 'py-2.5 px-2 font-black rounded-xl text-xs sm:text-sm transition-all text-center text-slate-500 hover:text-slate-800';
    });

    secRecords.classList.add('hidden');
    secQR.classList.add('hidden');
    secPW.classList.add('hidden');
    secCloud.classList.add('hidden');

    if (tab === 'records') {
        secRecords.classList.remove('hidden');
        document.getElementById('tab-records').className = 'py-2.5 px-2 font-black rounded-xl text-xs sm:text-sm transition-all text-center bg-white text-lime-600 shadow-sm border border-slate-200';
        renderRecords();
    } else if (tab === 'qr') {
        secQR.classList.remove('hidden');
        document.getElementById('tab-qr').className = 'py-2.5 px-2 font-black rounded-xl text-xs sm:text-sm transition-all text-center bg-white text-lime-600 shadow-sm border border-slate-200';
    } else if (tab === 'pw') {
        secPW.classList.remove('hidden');
        document.getElementById('tab-pw').className = 'py-2.5 px-2 font-black rounded-xl text-xs sm:text-sm transition-all text-center bg-white text-lime-600 shadow-sm border border-slate-200';
    } else if (tab === 'cloud') {
        secCloud.classList.remove('hidden');
        document.getElementById('tab-cloud').className = 'py-2.5 px-2 font-black rounded-xl text-xs sm:text-sm transition-all text-center bg-white text-lime-600 shadow-sm border border-slate-200';
    }
}

async function renderRecords() {
    const selectedDate = document.getElementById('filter-date').value;
    const selectedMode = document.getElementById('filter-mode').value;
    const tbody = document.getElementById('records-table-body');
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400 text-xs font-bold">불러오는 중...</td></tr>`;

    let records = [];
    const dbUrl = getCloudDbUrl();

    if (dbUrl) {
        try {
            const res = await fetch(`${dbUrl}/records.json`);
            if (res.ok) {
                const data = await res.json();
                if (data) records = Object.values(data);
            }
        } catch (e) {
            records = JSON.parse(localStorage.getItem('eng_quest_records_v4') || '[]');
        }
    } else {
        records = JSON.parse(localStorage.getItem('eng_quest_records_v4') || '[]');
    }

    records.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    let filtered = records.filter(r => r.date === selectedDate);
    if (selectedMode !== '전체') {
        filtered = filtered.filter(r => (r.mode || '').includes(selectedMode));
    }

    const studentStats = {};
    filtered.forEach(r => {
        const isReview = (r.mode || '').includes('복습');
        if (isReview) return;

        const student = r.name || "알 수 없음";
        const chapter = r.chapter || "5과";
        const rawMode = (r.mode || "Word").replace(" (복습)", "");

        if (!studentStats[student]) studentStats[student] = {};
        if (!studentStats[student][chapter]) studentStats[student][chapter] = {};
        if (!studentStats[student][chapter][rawMode]) studentStats[student][chapter][rawMode] = 0;

        studentStats[student][chapter][rawMode]++;
    });

    const summaryEl = document.getElementById('summary-text-detail');
    let summaryHTML = '';

    if (Object.keys(studentStats).length > 0) {
        for (const [student, chapters] of Object.entries(studentStats)) {
            summaryHTML += `
            <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shadow-sm space-y-2">
                <div class="font-black text-slate-800 text-sm border-b border-slate-200 pb-2 flex items-center justify-between">
                    <span class="flex items-center gap-1.5">
                        <span class="bg-lime-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">👤</span> 
                        ${student}
                    </span>
                </div>
                <div class="space-y-2">
            `;
            for (const [chapter, modes] of Object.entries(chapters)) {
                summaryHTML += `
                    <div class="text-xs">
                        <div class="font-bold text-slate-600 mb-1 flex items-center gap-1">📘 ${chapter}</div>
                        <div class="flex flex-wrap gap-1.5 pl-2">
                `;
                for (const [m, count] of Object.entries(modes)) {
                    summaryHTML += `
                        <span class="bg-white border border-slate-200 px-2.5 py-1 rounded-xl font-bold shadow-sm flex items-center gap-1.5 text-slate-700">
                            ${m} 
                            <span class="bg-lime-100 text-lime-800 px-1.5 py-0.5 rounded-md text-[11px] font-black">${count}회 완료</span>
                        </span>
                    `;
                }
                summaryHTML += `</div></div>`;
            }
            summaryHTML += `</div></div>`;
        }
    } else {
        summaryHTML = '<div class="text-xs text-slate-400 w-full col-span-2 text-center py-4 font-bold">해당 날짜에 기록된 정규 학습 완료 건이 없습니다.</div>';
    }
    
    summaryEl.innerHTML = summaryHTML;

    tbody.innerHTML = '';
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400 text-xs font-bold">기록이 없습니다.</td></tr>`;
        return;
    }

    filtered.forEach(r => {
        const tr = document.createElement('tr');
        const isReview = (r.mode || '').includes('복습');
        const modeText = r.mode || 'Word';
        const chapterText = r.chapter || '5과';

        tr.innerHTML = `
            <td class="p-3 text-slate-500">${r.time}</td>
            <td class="p-3 font-bold text-slate-700">${chapterText}</td>
            <td class="p-3 font-bold">
                <span class="${modeText.includes('Word') ? 'text-blue-600' : modeText.includes('단어') ? 'text-amber-600' : 'text-emerald-600'}">${modeText}</span>
            </td>
            <td class="p-3 font-bold text-slate-800">${r.name}</td>
            <td class="p-3 font-black text-lime-600">
                ${r.score}점
                ${isReview ? '<span class="ml-1 bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-md font-bold">복습</span>' : ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function exportRecordsCSV() {
    let records = JSON.parse(localStorage.getItem('eng_quest_records_v4') || '[]');
    const dbUrl = getCloudDbUrl();

    if (dbUrl) {
        try {
            const res = await fetch(`${dbUrl}/records.json`);
            if (res.ok) {
                const data = await res.json();
                if (data) records = Object.values(data);
            }
        } catch (e) {}
    }

    if (records.length === 0) {
        alert('내보낼 기록이 없습니다.');
        return;
    }

    let csv = "\uFEFF날짜,시간,단원,탭,학생 이름,점수\n";
    records.forEach(r => {
        csv += `"${r.date}","${r.time}","${r.chapter || '5과'}","${r.mode || 'Word'}","${r.name}","${r.score}점"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ColinT_English_학습기록_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearRecords() {
    if (confirm('모든 학습 기록을 삭제하시겠습니까?')) {
        localStorage.removeItem('eng_quest_records_v4');
        const dbUrl = getCloudDbUrl();
        if (dbUrl) fetch(`${dbUrl}/records.json`, { method: 'DELETE' });
        renderRecords();
    }
}

function initQRInput() {
    const currentURL = window.location.href;
    const input = document.getElementById('custom-qr-url');
    if (!input.value) input.value = currentURL;
    generateQRCode();
}

function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    const targetURL = document.getElementById('custom-qr-url').value.trim() || window.location.href;
    document.getElementById('qr-url-text').innerText = targetURL;

    new QRCode(qrContainer, {
        text: targetURL,
        width: 160,
        height: 160,
        colorDark: "#334155",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}
