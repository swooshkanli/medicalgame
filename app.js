// Aktif Vaka Seçimi
let activeCaseIndex = 0;
let currentCaseData = casesDB[activeCaseIndex];
let targetDisease = diseaseDB.find(d => d.id === currentCaseData.targetDiseaseId);

const maxGuesses = gameConfig.maxGuesses; // 7

// HER VAKANIN DURUMUNU TUTAN OTURUM HAFIZASI (Sayfa yenilenene kadar korunur)
const caseStates = casesDB.map(() => ({
    wrongGuesses: 0,
    guessedHistory: [],
    status: "unplayed", // "unplayed" | "playing" | "won" | "lost"
    isGameWon: false,
    finalAttemptCount: null
}));

let wrongGuesses = 0;
let guessedHistory = [];
let isGameWon = false;
let isTurnTransitioning = false;
let activeAutocompleteIndex = -1;

// Zamanlayıcı ve aktif kaydırma (scroll) yöneticisi
let activeTimeouts = [];
let activeScrollRafId = null;

function registerTimeout(fn, delay) {
    const id = setTimeout(fn, delay);
    activeTimeouts.push(id);
    return id;
}

function cancelActiveScroll() {
    if (activeScrollRafId !== null) {
        cancelAnimationFrame(activeScrollRafId);
        activeScrollRafId = null;
    }
}

function clearActiveTimeouts() {
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];
    cancelActiveScroll();
    isTurnTransitioning = false;
}

// Dikey telefon/tablet modunda olup olmadığımızı kontrol eder
function isPortraitScrollMode() {
    return window.matchMedia("(max-width: 950px) and (orientation: portrait)").matches;
}

// Hedef elemana seri ve pürüzsüz kayar, bittiği salisede animasyonu tetikler
function smoothScrollToElement(targetEl, onComplete, align = "center") {
    cancelActiveScroll();
    if (!targetEl) {
        if (onComplete) onComplete();
        return;
    }

    const rect = targetEl.getBoundingClientRect();
    const currentY = window.scrollY || window.pageYOffset;
    const viewportH = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    let targetY;
    if (align === "top") {
        targetY = currentY + rect.top - 28;
    } else {
        targetY = currentY + rect.top - (viewportH - rect.height) / 2;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportH);
    targetY = Math.max(0, Math.min(targetY, maxScroll));

    const distance = targetY - currentY;

    // Zaten hizadaysa beklemeden anında oynat
    if (Math.abs(distance) < 12) {
        if (onComplete) requestAnimationFrame(onComplete);
        return;
    }

    const duration = Math.min(300, Math.max(180, Math.abs(distance) * 0.35));
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, currentY + distance * easeOutCubic(progress));

        if (progress < 1) {
            activeScrollRafId = requestAnimationFrame(step);
        } else {
            activeScrollRafId = null;
            if (onComplete) onComplete();
        }
    }

    activeScrollRafId = requestAnimationFrame(step);
}

// Sağdaki Sütunların Açıldığı Yanlış Tahmin Sayıları
const unlockThresholds = {
    seyir: 0,     // Başlangıçta açık
    mekanizma: 2, // 2. yanlışta açılır
    brans: 5      // 5. yanlışta açılır
};

// DOM Elementleri
const mainTitleEl = document.getElementById("main-title");
const caseSubtitleEl = document.getElementById("case-subtitle");
const clinicalFileEl = document.getElementById("clinical-file");
const guessesContainerEl = document.getElementById("guesses-container");
const guessInputEl = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-guess");
const autocompleteListEl = document.getElementById("autocomplete-list");
const attemptCounterEl = document.getElementById("attempt-counter");
const inputWrapperEl = document.querySelector(".input-wrapper");
const inputSectionEl = document.querySelector(".input-section");

function syncStateToMemory() {
    const state = caseStates[activeCaseIndex];
    state.wrongGuesses = wrongGuesses;
    state.guessedHistory = [...guessedHistory];
    state.isGameWon = isGameWon;
}

// Vaka Seçici Butonları (2. Satırda kompakt)
function renderCaseSelector() {
    let selectorRow = document.getElementById("case-selector-row");
    let selectorContainer = document.getElementById("case-selector");
    const panelHeaderEl = document.querySelector(".panel-header");

    if (!selectorRow && panelHeaderEl) {
        selectorRow = document.createElement("div");
        selectorRow.id = "case-selector-row";
        selectorRow.className = "case-selector-row";

        selectorContainer = document.createElement("div");
        selectorContainer.id = "case-selector";
        selectorContainer.className = "case-selector";

        selectorRow.appendChild(selectorContainer);
        panelHeaderEl.appendChild(selectorRow);
    }

    if (!selectorContainer) return;
    selectorContainer.innerHTML = "";

    casesDB.forEach((c, idx) => {
        const st = caseStates[idx];
        const btn = document.createElement("button");
        btn.className = "case-btn";
        btn.textContent = idx + 1;

        if (idx === activeCaseIndex) btn.classList.add("active-case");
        if (st.status === "won") btn.classList.add("case-won");
        if (st.status === "lost") btn.classList.add("case-lost");

        btn.title = `${c.caseNumber} (${
            st.status === "won" ? "Çözüldü ✓" :
            st.status === "lost" ? "Devredildi ✕" :
            st.guessedHistory.length > 0 ? "Devam Ediyor..." : "Oynanmadı"
        })`;

        btn.addEventListener("click", () => {
            if (activeCaseIndex !== idx) {
                switchCase(idx);
            }
        });

        selectorContainer.appendChild(btn);
    });
}

// Vakalar Arası Geçiş Fonksiyonu
function switchCase(newIndex) {
    clearActiveTimeouts();
    const prevState = caseStates[activeCaseIndex];
    if (prevState.status === "won" && !prevState.isGameWon) {
        prevState.isGameWon = true;
        const maxClueTurn = Math.max(...currentCaseData.clues.map(c => c.turn));
        prevState.wrongGuesses = Math.max(prevState.wrongGuesses, maxClueTurn - 1);
    }

    activeCaseIndex = newIndex;
    currentCaseData = casesDB[activeCaseIndex];
    targetDisease = diseaseDB.find(d => d.id === currentCaseData.targetDiseaseId);

    const state = caseStates[activeCaseIndex];
    wrongGuesses = state.wrongGuesses;
    guessedHistory = [...state.guessedHistory];
    isGameWon = state.isGameWon;

    initGame(true);

    if (isPortraitScrollMode()) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (window.matchMedia("(pointer: fine)").matches && !guessInputEl.disabled) {
        guessInputEl.focus();
    }
}

// Hak Sayacını ve Rengini Güncelleyen Fonksiyon
function updateAttemptBadge() {
    const state = caseStates[activeCaseIndex];
    const displayAttempt = state.finalAttemptCount !== null
        ? state.finalAttemptCount
        : Math.min(wrongGuesses + 1, maxGuesses);
    const remainingAttempts = maxGuesses - wrongGuesses;

    attemptCounterEl.textContent = `${displayAttempt} / ${maxGuesses}`;
    attemptCounterEl.classList.remove("badge-warning", "badge-danger", "badge-win", "badge-lost");

    if (state.status === "won" && isGameWon) {
        attemptCounterEl.classList.add("badge-win");
        return;
    }
    if (state.status === "lost") {
        attemptCounterEl.classList.add("badge-lost");
        return;
    }

    if (remainingAttempts <= 1) {
        attemptCounterEl.classList.add("badge-danger");
    } else if (remainingAttempts === 2 || remainingAttempts === 3) {
        attemptCounterEl.classList.add("badge-warning");
    }
}

// Oyunu veya Seçilen Vakayı Yükle
function initGame(isSwitchingCase = false) {
    const state = caseStates[activeCaseIndex];
    caseSubtitleEl.textContent = currentCaseData.customSubTitle || gameConfig.defaultSubTitle;

    mainTitleEl.className = "";
    if (state.status === "won" && isGameWon) {
        mainTitleEl.classList.add("title-win");
        mainTitleEl.innerHTML = `${currentCaseData.caseNumber} <span class="title-status-icon">✓</span>`;
    } else if (state.status === "lost") {
        mainTitleEl.classList.add("title-lost");
        mainTitleEl.innerHTML = `${currentCaseData.caseNumber} <span class="title-status-icon">✕</span>`;
    } else {
        mainTitleEl.textContent = currentCaseData.caseNumber;
    }

    updateAttemptBadge();
    renderCaseSelector();

    const isFreshCase = (guessedHistory.length === 0 && state.status === "unplayed");
    renderClues(isFreshCase, !isFreshCase && isSwitchingCase, false);
    renderMatrix(false, false, false);

    const existingBanner = document.getElementById("end-phase-banner");
    if (existingBanner) existingBanner.remove();

    activeAutocompleteIndex = -1;

    if (state.status === "won" && isGameWon) {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;
        showEndBanner(true, targetDisease.name, true, false);
    } else if (state.status === "lost") {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;
        showEndBanner(false, targetDisease.name, true, false);
    } else {
        if (inputSectionEl) inputSectionEl.style.display = "flex";
        guessInputEl.disabled = false;
        submitBtn.disabled = false;
        guessInputEl.value = "";
        autocompleteListEl.innerHTML = "";
    }
}

// Klinik birimleri, aralıkları ve test işaretlerini vurgulayan fonksiyon
function highlightClinicalText(text) {
    return text.replace(/(%\d+(?:[.,]\d+)?|\(\+{1,4}\)|\(-\)|\b\d+(?:[.,/-]\d+)*\s*(?:mmHg|\/dk|°C|\/mm³|mm³|\/mm3|mm3|kg\/m²|kg\/m2|U\/L|mIU\/L|mg\/dL|g\/dL|mmol\/L|mEq\/L|ng\/mL|pg\/mL|mcL|fL|cm|mm|sn|katı)(?![a-zA-ZğüşıöçĞÜŞİÖÇ]))/g, '<span class="clinical-val">$1</span>');
}

// Sol Taraftaki İpuçlarını Ekrana Basma
function renderClues(isInitial = false, suppressAnimation = false, deferUnlockAnim = false) {
    clinicalFileEl.innerHTML = "";
    const currentTurn = wrongGuesses + 1;

    currentCaseData.clues.forEach(clue => {
        const div = document.createElement("div");

        if (currentTurn >= clue.turn) {
            const isJustUnlocked = !suppressAnimation && (currentTurn === clue.turn) && (wrongGuesses > 0 || isInitial);
            const unlockAnimClass = isJustUnlocked
                ? (deferUnlockAnim ? "clue-awaiting-anim" : "clue-just-unlocked")
                : "";

            const alertClass = clue.isAlert ? (isGameWon ? "alert resolved-alert" : "alert") : "";

            div.className = `lore-entry ${alertClass} ${unlockAnimClass}`;
            div.innerHTML = `
                <span class="entry-title">${clue.title}</span>
                <p>${highlightClinicalText(clue.text)}</p>
            `;
        } else {
            const remaining = clue.turn - currentTurn;
            const nextUpClass = (remaining === 1) ? "next-up" : "";

            div.className = `lore-entry locked-clue ${nextUpClass}`;
            div.innerHTML = `
                <span class="entry-title">🔒 ${clue.title}</span>
                <span class="unlock-countdown">${remaining === 1 ? 'Sıradaki İpucu (1 tahmin)' : remaining + ' tahmin sonra açılır'}</span>
            `;
        }
        clinicalFileEl.appendChild(div);
    });

    // Masaüstü ve yatay modda sol panel kendi içinde yeni ipucuna kayar
    if (!isInitial && !suppressAnimation && !isPortraitScrollMode()) {
        registerTimeout(() => {
            clinicalFileEl.scrollTo({ top: clinicalFileEl.scrollHeight, behavior: "smooth" });
        }, 40);
    }
}

// 1. Seyir Değerlendirmesi
function evaluateSeyir(guessedVal, targetVal) {
    if (guessedVal === targetVal) return "cell-green";

    if (targetVal === "Kronik Zemininde Akut" && (guessedVal === "Akut" || guessedVal === "Kronik")) {
        return "cell-yellow";
    }
    if (guessedVal === "Kronik Zemininde Akut" && (targetVal === "Akut" || targetVal === "Kronik")) {
        return "cell-yellow";
    }

    return "cell-red";
}

// 2. Mekanizma ve Branş İçin Tek Yönlü Primary/Secondary Değerlendirmesi
function evaluatePrimarySecondary(guessedObj, targetObj) {
    if (guessedObj.primary === targetObj.primary) {
        return "cell-green";
    }
    if (targetObj.secondary && guessedObj.primary === targetObj.secondary) {
        return "cell-yellow";
    }
    return "cell-red";
}

function formatBoxText(obj, isCorrect) {
    if (isCorrect && obj.secondary) {
        return `<span>${obj.primary}</span><span class="sub-mech">(+${obj.secondary})</span>`;
    }
    return `<span>${obj.primary}</span>`;
}

// Uzun tanı/seyir/branş metinlerinin dar telefonlarda bölünmeden sığması için ölçek sınıfı belirler
function getCellLengthClass(htmlContent) {
    const plainText = htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const longestWord = plainText
        .split(/[\s/()+-]+/)
        .reduce((max, word) => Math.max(max, word.length), 0);

    if (plainText.length > 28 || longestWord > 14) {
        return "cell-text-xs";
    }
    if (plainText.length > 16 || longestWord > 10) {
        return "cell-text-sm";
    }
    return "";
}

// Sağ Sütun Başlıklarını Güncelleyen Fonksiyon
function updateColumnHeader(elementId, title, threshold, justUnlocked, unlockDelayMs = 0, forceUnlocked = false, deferUnlock = false) {
    const el = document.getElementById(elementId);
    const remaining = forceUnlocked
        ? 0
        : (deferUnlock && justUnlocked ? 1 : (threshold - wrongGuesses));

    const triggerUnlockAnim = () => {
        el.classList.remove("locked", "unlocked-header", "next-up-header", "header-unlock-anim");
        el.innerHTML = `
            <div class="header-title-wrap">
                <span class="header-title-text">${title}</span>
                <span class="header-lock-badge">🔓</span>
            </div>
        `;
        void el.offsetWidth;
        el.classList.add("header-unlock-anim");

        registerTimeout(() => {
            const badge = el.querySelector(".header-lock-badge");
            if (badge) badge.remove();
        }, 950);
    };

    if (justUnlocked && !deferUnlock) {
        if (unlockDelayMs > 0) {
            registerTimeout(triggerUnlockAnim, unlockDelayMs);
        } else {
            triggerUnlockAnim();
        }
        return;
    }

    el.classList.remove("locked", "unlocked-header", "next-up-header", "header-unlock-anim");

    if (remaining <= 0) {
        el.innerHTML = `
            <div class="header-title-wrap">
                <span class="header-title-text">${title}</span>
            </div>
        `;
    } else if (remaining === 1) {
        el.innerHTML = `
            <div class="header-title-wrap">
                <span class="header-title-text">${title}</span>
                <span class="header-lock-badge">🔒</span>
            </div>
            <span class="header-subtext">(Sıradaki - 1 tahmin)</span>
        `;
        el.classList.add("next-up-header");
    } else {
        el.innerHTML = `
            <div class="header-title-wrap">
                <span class="header-title-text">${title}</span>
                <span class="header-lock-badge">🔒</span>
            </div>
            <span class="header-subtext">(${remaining} tahmin kaldı)</span>
        `;
        el.classList.add("locked");
    }
}

// 3 Boyutlu Çift Yüzlü Hücre Oluşturucu
function create3DCellHTML({ content, colorClass, isUnlocked, animType, delayMs, isNameCell = false, frontHasLock = false }) {
    if (!isUnlocked) {
        return `
            <div class="cell-3d-wrapper">
                <div class="cell-face cell-front locked-front">🔒</div>
            </div>
        `;
    }

    const extraNameClass = isNameCell ? "cell-name" : "";
    const lengthClass = getCellLengthClass(content);
    let wrapperClass = "flipped-static";
    let styleAttr = "";

    if (animType === "pre-flip") {
        wrapperClass = "";
    } else if (animType === "flip") {
        wrapperClass = "flip-card";
        styleAttr = `style="animation-delay: ${delayMs}ms;"`;
    } else if (animType === "shatter") {
        wrapperClass = "shatter-and-flip";
        styleAttr = `style="animation-delay: ${delayMs}ms;"`;
    }

    const frontContent = frontHasLock
        ? `<span class="lock-icon">🔒</span>`
        : content;
    const frontLockClass = frontHasLock ? "locked-front" : "";

    return `
        <div class="cell-3d-wrapper ${wrapperClass}" ${styleAttr}>
            <div class="cell-face cell-front ${extraNameClass} ${frontLockClass} ${frontHasLock ? '' : lengthClass}">${frontContent}</div>
            <div class="cell-face cell-back ${extraNameClass} ${colorClass} ${lengthClass}">${content}</div>
        </div>
    `;
}

// Sağ Taraftaki Tahmin Matrisini Güncelleme (Atomik Güncelleme + Sıfır Zıplama + Hızlı Kart Ritimleri)
function renderMatrix(isNewGuessAdded = false, isWinningGuess = false, deferAnimations = false) {
    const savedScrollY = window.scrollY;
    const state = caseStates[activeCaseIndex];
    const isAlreadyWonCase = (state.status === "won" && !deferAnimations && !isWinningGuess);

    const mekNormallyUnlocked = !isWinningGuess && (wrongGuesses === unlockThresholds.mekanizma) && isNewGuessAdded;
    const bransNormallyUnlocked = !isWinningGuess && (wrongGuesses === unlockThresholds.brans) && isNewGuessAdded;

    const mekWinUnlocked = isWinningGuess && (wrongGuesses < unlockThresholds.mekanizma);
    const bransWinUnlocked = isWinningGuess && (wrongGuesses < unlockThresholds.brans);

    const mekJustUnlocked = mekNormallyUnlocked || mekWinUnlocked;
    const bransJustUnlocked = bransNormallyUnlocked || bransWinUnlocked;

    const lastIdx = guessedHistory.length - 1;
    const fragment = document.createDocumentFragment();

    guessedHistory.forEach((disease, index) => {
        const isLatestRow = isNewGuessAdded && (index === lastIdx);
        const isCorrect = disease.id === targetDisease.id;

        const row = document.createElement("div");
        row.className = `guess-row ${(isCorrect && !deferAnimations) ? 'winning-row' : ''}`;

        const nameStatusClass = isCorrect ? "correct-diagnosis" : "wrong-diagnosis";
        const seyirClass = evaluateSeyir(disease.seyir, targetDisease.seyir);

        const isMekUnlocked = deferAnimations
            ? (wrongGuesses >= unlockThresholds.mekanizma && !mekJustUnlocked)
            : (wrongGuesses >= unlockThresholds.mekanizma || isCorrect || isWinningGuess || isAlreadyWonCase);

        const mekanizmaClass = isMekUnlocked
            ? evaluatePrimarySecondary(disease.mekanizma, targetDisease.mekanizma)
            : "cell-locked";

        const isBransUnlocked = deferAnimations
            ? (wrongGuesses >= unlockThresholds.brans && !bransJustUnlocked)
            : (wrongGuesses >= unlockThresholds.brans || isCorrect || isWinningGuess || isAlreadyWonCase);

        const bransClass = isBransUnlocked
            ? evaluatePrimarySecondary(disease.brans, targetDisease.brans)
            : "cell-locked";

        // 1. TANI KUTUSU (0ms - Kayma biter bitmez anında başlar)
        const nameCellHTML = create3DCellHTML({
            content: disease.name,
            colorClass: nameStatusClass,
            isUnlocked: true,
            animType: isLatestRow ? (deferAnimations ? "pre-flip" : "flip") : "none",
            delayMs: 0,
            isNameCell: true
        });

        // 2. SEYİR KUTUSU (220ms)
        const seyirCellHTML = create3DCellHTML({
            content: disease.seyir,
            colorClass: seyirClass,
            isUnlocked: true,
            animType: isLatestRow ? (deferAnimations ? "pre-flip" : "flip") : "none",
            delayMs: 220
        });

        // 3. MEKANİZMA KUTUSU (440ms)
        let mekAnimType = "none";
        let mekDelay = 0;
        let mekFrontLock = false;

        if (isLatestRow && isMekUnlocked) {
            mekAnimType = deferAnimations ? "pre-flip" : "flip";
            mekDelay = 440;
        } else if (!deferAnimations && mekJustUnlocked) {
            mekAnimType = "shatter";
            mekDelay = mekWinUnlocked ? (440 + index * 90) : (260 + index * 120);
            mekFrontLock = true;
        }

        const mekCellHTML = create3DCellHTML({
            content: formatBoxText(disease.mekanizma, isCorrect),
            colorClass: mekanizmaClass,
            isUnlocked: isMekUnlocked,
            animType: mekAnimType,
            delayMs: mekDelay,
            frontHasLock: mekFrontLock
        });

        // 4. BRANŞ KUTUSU (660ms)
        let bransAnimType = "none";
        let bransDelay = 0;
        let bransFrontLock = false;

        if (isLatestRow && isBransUnlocked) {
            bransAnimType = deferAnimations ? "pre-flip" : "flip";
            bransDelay = 660;
        } else if (!deferAnimations && bransJustUnlocked) {
            bransAnimType = "shatter";
            bransDelay = bransWinUnlocked ? (660 + index * 90) : (260 + index * 120);
            bransFrontLock = true;
        }

        const bransCellHTML = create3DCellHTML({
            content: formatBoxText(disease.brans, isCorrect),
            colorClass: bransClass,
            isUnlocked: isBransUnlocked,
            animType: bransAnimType,
            delayMs: bransDelay,
            frontHasLock: bransFrontLock
        });

        row.innerHTML = nameCellHTML + seyirCellHTML + mekCellHTML + bransCellHTML;
        fragment.appendChild(row);
    });

    // 1. Satırları tek hamlede değiştir (Sayfa boyu hiç 0'a düşmez)
    guessesContainerEl.replaceChildren(fragment);

    // 2. Başlık kilit açılma animasyonlarını satırlar yerleştikten SONRA tetikle
    updateColumnHeader("header-mekanizma", "Temel Mekanizma", unlockThresholds.mekanizma, mekJustUnlocked, mekWinUnlocked ? 440 : 0, isAlreadyWonCase, deferAnimations);
    updateColumnHeader("header-brans", "Branş", unlockThresholds.brans, bransJustUnlocked, bransWinUnlocked ? 660 : 0, isAlreadyWonCase, deferAnimations);

    // 3. Dikey mobilde tarayıcının scroll pozisyonunu yukarı zıplatmasını engelle
    if (isPortraitScrollMode() && isNewGuessAdded && !deferAnimations) {
        window.scrollTo(0, savedScrollY);
    }
}

// Oyun İçi Sonuç ve Faz Geçiş Barı
function showEndBanner(isWin, diagnosisName, isStaticRestore = false, deferAnim = false) {
    if (inputSectionEl) inputSectionEl.style.display = "none";
    autocompleteListEl.innerHTML = "";

    const existingBanner = document.getElementById("end-phase-banner");
    if (existingBanner) existingBanner.remove();

    const bannerDiv = document.createElement("div");
    bannerDiv.id = "end-phase-banner";
    bannerDiv.className = isWin ? "phase-transition-banner" : "phase-transition-banner lost-banner";

    if (isStaticRestore) {
        bannerDiv.style.animation = "none";
    } else if (deferAnim) {
        bannerDiv.classList.add("clue-awaiting-anim");
    }

    if (isWin) {
        bannerDiv.innerHTML = `
            <div class="banner-text">
                <h4>✓ TANI DOĞRULANDI: ${diagnosisName.toUpperCase()}</h4>
                <p>Klinik tablo aydınlatıldı. Hastanın tedavi protokolünü belirleyin.</p>
            </div>
            <button class="next-phase-btn" id="start-treatment-btn">Tedavi Fazına Geç ➔</button>
        `;
    } else {
        bannerDiv.innerHTML = `
            <div class="banner-text">
                <h4>✕ VAKA DEVREDİLDİ</h4>
                <p>Doğru Tanı: <strong>${diagnosisName}</strong></p>
            </div>
            <button class="next-phase-btn" id="retry-case-btn" style="background:#37474f; border-color:#78909c; box-shadow:none;">Bu Vakayı Sıfırla ↻</button>
        `;
        registerTimeout(() => {
            const retryBtn = document.getElementById("retry-case-btn");
            if (retryBtn) {
                retryBtn.addEventListener("click", () => {
                    caseStates[activeCaseIndex] = {
                        wrongGuesses: 0,
                        guessedHistory: [],
                        status: "unplayed",
                        isGameWon: false,
                        finalAttemptCount: null
                    };
                    switchCase(activeCaseIndex);
                });
            }
        }, 0);
    }

    inputWrapperEl.appendChild(bannerDiv);
    return bannerDiv;
}

// Doğru bilindiğinde çalışan hızlı ve senkronize koreografi
function runVictorySequence(diagnosisName) {
    const currentTurn = wrongGuesses + 1;
    const lockedClues = currentCaseData.clues.filter(c => c.turn > currentTurn);

    const rightRevealDoneTime = 1380;
    const rightPanelFinishTime = 1480;
    const stepInterval = 300;

    // 1. ADIM: Sağdaki yeşil kartların dönüşü bittiği an başlık & sayaç yeşile döner
    registerTimeout(() => {
        isGameWon = true;
        syncStateToMemory();
        renderCaseSelector();

        attemptCounterEl.classList.remove("badge-warning", "badge-danger");
        attemptCounterEl.classList.add("badge-win");

        mainTitleEl.classList.add("title-win");
        mainTitleEl.innerHTML = `${currentCaseData.caseNumber} <span class="title-status-icon">✓</span>`;

        document.querySelectorAll(".lore-entry.alert").forEach(el => {
            el.classList.add("resolved-alert");
        });
    }, rightRevealDoneTime);

    // 2. ADIM: Kalan kilitli ipuçlarını aç
    if (isPortraitScrollMode()) {
        const revealNextClue = (idx) => {
            if (idx >= lockedClues.length) {
                const bannerEl = showEndBanner(true, diagnosisName, false, true);
                smoothScrollToElement(bannerEl, () => {
                    bannerEl.classList.remove("clue-awaiting-anim");
                    void bannerEl.offsetWidth;
                    isTurnTransitioning = false;
                }, "center");
                return;
            }

            wrongGuesses = lockedClues[idx].turn - 1;
            syncStateToMemory();
            renderClues(false, false, true);

            const awaitingEl = clinicalFileEl.querySelector(".clue-awaiting-anim");
            smoothScrollToElement(awaitingEl, () => {
                if (awaitingEl) {
                    awaitingEl.classList.remove("clue-awaiting-anim");
                    void awaitingEl.offsetWidth;
                    awaitingEl.classList.add("clue-just-unlocked");
                }
                registerTimeout(() => revealNextClue(idx + 1), 260);
            }, "center");
        };

        registerTimeout(() => revealNextClue(0), rightPanelFinishTime);
    } else {
        lockedClues.forEach((clue, idx) => {
            registerTimeout(() => {
                wrongGuesses = clue.turn - 1;
                syncStateToMemory();
                renderClues(false, false, false);
            }, rightPanelFinishTime + (idx * stepInterval));
        });

        const bannerRevealTime = rightPanelFinishTime + (lockedClues.length * stepInterval);
        registerTimeout(() => {
            showEndBanner(true, diagnosisName, false, false);
            isTurnTransitioning = false;
        }, bannerRevealTime);
    }
}

// Tahmin Gönderme İşlemi
function handleGuess() {
    const state = caseStates[activeCaseIndex];
    if (state.status === "won" || state.status === "lost" || isTurnTransitioning) return;

    const query = guessInputEl.value.trim().toLowerCase();
    const matchedDisease = diseaseDB.find(d => d.name.toLowerCase() === query);

    if (!matchedDisease) {
        guessInputEl.classList.remove("input-shake");
        void guessInputEl.offsetWidth;
        guessInputEl.classList.add("input-shake");

        setTimeout(() => {
            guessInputEl.classList.remove("input-shake");
        }, 550);
        return;
    }

    if (guessedHistory.some(d => d.id === matchedDisease.id)) {
        return;
    }

    const wasKeyboardOpen = (document.activeElement === guessInputEl);
    guessedHistory.push(matchedDisease);
    if (state.status === "unplayed") state.status = "playing";
    syncStateToMemory();

    guessInputEl.value = "";
    autocompleteListEl.innerHTML = "";
    activeAutocompleteIndex = -1;

    // Dokunmatik cihazlarda klavyeyi anında kapat
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouchDevice) {
        guessInputEl.blur();
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }
    }

    const portraitMode = isPortraitScrollMode();
    const kbWait = (isTouchDevice && wasKeyboardOpen) ? 110 : 0;

    // --- DOĞRU TAHMİN ---
    if (matchedDisease.id === targetDisease.id) {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;
        isTurnTransitioning = true;

        state.finalAttemptCount = Math.min(wrongGuesses + 1, maxGuesses);
        state.status = "won";
        syncStateToMemory();

        if (portraitMode) {
            renderMatrix(true, true, true);
            const latestRowEl = guessesContainerEl.lastElementChild;
            registerTimeout(() => {
                smoothScrollToElement(latestRowEl || guessesContainerEl, () => {
                    renderMatrix(true, true, false);
                    runVictorySequence(matchedDisease.name);
                }, "center");
            }, kbWait);
        } else {
            renderMatrix(true, true, false);
            runVictorySequence(matchedDisease.name);
        }
        return;
    }

    // --- YANLIŞ TAHMİN ---
    wrongGuesses++;
    syncStateToMemory();
    updateAttemptBadge();

    const isDefeat = (wrongGuesses >= maxGuesses);
    const newClueUnlocked = currentCaseData.clues.some(c => c.turn === wrongGuesses + 1);

    if (isDefeat) {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;
        state.finalAttemptCount = maxGuesses;
    }

    if (portraitMode) {
        isTurnTransitioning = true;

        if (newClueUnlocked && !isDefeat) {
            // 1. DURUM: Yeni bir SOL ipucu açıldı -> İpucuna kay, sonra HEM ipucunu aç HEM son tahmin kartlarını döndür
            renderClues(false, false, true);
            renderMatrix(true, false, true);

            const awaitingClueEl = clinicalFileEl.querySelector(".clue-awaiting-anim");
            registerTimeout(() => {
                smoothScrollToElement(awaitingClueEl, () => {
                    if (awaitingClueEl) {
                        awaitingClueEl.classList.remove("clue-awaiting-anim");
                        void awaitingClueEl.offsetWidth;
                        awaitingClueEl.classList.add("clue-just-unlocked");
                    }
                    renderMatrix(true, false, false);
                    registerTimeout(() => { isTurnTransitioning = false; }, 120);
                }, "center");
            }, kbWait);
        } else {
            // 2. DURUM: Yeni sol ipucu yok (veya kayıp) -> Doğrudan SON TAHMİN satırına kay ve kart dönüşünü izle
            renderClues(false, false, false);
            renderMatrix(true, false, true);

            const latestRowEl = guessesContainerEl.lastElementChild;
            registerTimeout(() => {
                smoothScrollToElement(latestRowEl || guessesContainerEl, () => {
                    renderMatrix(true, false, false);

                    if (isDefeat) {
                        registerTimeout(() => {
                            state.status = "lost";
                            syncStateToMemory();
                            renderCaseSelector();

                            attemptCounterEl.classList.remove("badge-warning", "badge-danger");
                            attemptCounterEl.classList.add("badge-lost");

                            mainTitleEl.classList.add("title-lost");
                            mainTitleEl.innerHTML = `${currentCaseData.caseNumber} <span class="title-status-icon">✕</span>`;

                            const bannerEl = showEndBanner(false, targetDisease.name, false, true);
                            smoothScrollToElement(bannerEl, () => {
                                bannerEl.classList.remove("clue-awaiting-anim");
                                void bannerEl.offsetWidth;
                                isTurnTransitioning = false;
                            }, "center");
                        }, 1380);
                    } else {
                        registerTimeout(() => { isTurnTransitioning = false; }, 120);
                    }
                }, "center");
            }, kbWait);
        }
    } else {
        // MASAÜSTÜ VE YATAY MOD
        renderMatrix(true, false, false);
        renderClues(false, false, false);

        if (isDefeat) {
            registerTimeout(() => {
                state.status = "lost";
                syncStateToMemory();
                renderCaseSelector();

                attemptCounterEl.classList.remove("badge-warning", "badge-danger");
                attemptCounterEl.classList.add("badge-lost");

                mainTitleEl.classList.add("title-lost");
                mainTitleEl.innerHTML = `${currentCaseData.caseNumber} <span class="title-status-icon">✕</span>`;

                showEndBanner(false, targetDisease.name, false, false);
            }, 1380);
        }
    }
}

// Otomatik Tamamlama ve Klavye Kısayolları
function updateAutocompleteHighlight(items) {
    items.forEach((item, idx) => {
        item.classList.toggle("autocomplete-active", idx === activeAutocompleteIndex);
        if (idx === activeAutocompleteIndex) {
            item.scrollIntoView({ block: "nearest" });
        }
    });
}

guessInputEl.addEventListener("input", function() {
    const val = this.value.trim().toLowerCase();
    autocompleteListEl.innerHTML = "";
    activeAutocompleteIndex = -1;
    if (!val) return;

    const matches = diseaseDB.filter(d => d.name.toLowerCase().includes(val));
    matches.forEach(d => {
        const item = document.createElement("div");
        const isAlreadyGuessed = guessedHistory.some(guessed => guessed.id === d.id);

        if (isAlreadyGuessed) {
            item.className = "autocomplete-item already-guessed";
            item.innerHTML = `<span>${d.name}</span> <span class="guessed-badge">Denenmiş Tanı</span>`;
        } else {
            item.className = "autocomplete-item";
            item.textContent = d.name;
            item.addEventListener("click", function() {
                guessInputEl.value = d.name;
                autocompleteListEl.innerHTML = "";
                activeAutocompleteIndex = -1;
                guessInputEl.focus();
            });
        }
        autocompleteListEl.appendChild(item);
    });
});

submitBtn.addEventListener("click", handleGuess);

guessInputEl.addEventListener("keydown", function(e) {
    const selectableItems = Array.from(autocompleteListEl.querySelectorAll(".autocomplete-item:not(.already-guessed)"));

    if (e.key === "ArrowDown" && selectableItems.length > 0) {
        e.preventDefault();
        activeAutocompleteIndex = (activeAutocompleteIndex + 1) % selectableItems.length;
        updateAutocompleteHighlight(selectableItems);
    } else if (e.key === "ArrowUp" && selectableItems.length > 0) {
        e.preventDefault();
        activeAutocompleteIndex = (activeAutocompleteIndex - 1 + selectableItems.length) % selectableItems.length;
        updateAutocompleteHighlight(selectableItems);
    } else if (e.key === "Escape") {
        autocompleteListEl.innerHTML = "";
        activeAutocompleteIndex = -1;
    } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeAutocompleteIndex >= 0 && selectableItems[activeAutocompleteIndex]) {
            guessInputEl.value = selectableItems[activeAutocompleteIndex].textContent;
            autocompleteListEl.innerHTML = "";
            activeAutocompleteIndex = -1;
        } else {
            handleGuess();
        }
    }
});

// Oyunu Başlat
initGame();