// Aktif Vaka Seçimi (Başlangıçta 1. vakadan yani index 0'dan başlar, istersen değiştirebilirsin)
let activeCaseIndex = 0; 
let currentCaseData = casesDB[activeCaseIndex];
let targetDisease = diseaseDB.find(d => d.id === currentCaseData.targetDiseaseId);

const maxGuesses = gameConfig.maxGuesses; // 7

// HER VAKANIN DURUMUNU TUTAN OTURUM HAFIZASI (Sayfa yenilenene kadar korunur)
const caseStates = casesDB.map(() => ({
    wrongGuesses: 0,
    guessedHistory: [],
    status: "unplayed",   // "unplayed" | "playing" | "won" | "lost"
    isGameWon: false,
    finalAttemptCount: null // Kazanıldığında veya kaybedildiğinde sayacın kaçta kaldığını (Örn: 4/7) hatırlar
}));

// Geriye dönük uyumluluk için aktif vakanın anlık değişkenleri
let wrongGuesses = 0;
let guessedHistory = [];
let isGameWon = false;

// Vakalar arası hızlı geçişte eski vakanın setTimeout'larının yeni vakayı bozmasını önleyen liste
let activeTimeouts = [];
function registerTimeout(fn, delay) {
    const id = setTimeout(fn, delay);
    activeTimeouts.push(id);
    return id;
}
function clearActiveTimeouts() {
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];
}

// Sağdaki Sütunların Açıldığı Yanlış Tahmin Sayıları
const unlockThresholds = {
    seyir: 0,      // Başlangıçta açık
    mekanizma: 2,  // 2. yanlışta açılır
    brans: 5       // 5. yanlışta açılır
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

// Mevcut değişkenleri aktif vakanın hafızasına kaydeder
function syncStateToMemory() {
    const state = caseStates[activeCaseIndex];
    state.wrongGuesses = wrongGuesses;
    state.guessedHistory = [...guessedHistory];
    state.isGameWon = isGameWon;
}

// Vaka Seçici Butonları sol panelin başlık kısmına kusursuz yerleştiren fonksiyon
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
    // Eğer önceki vakada zafer/kayıp animasyonu henüz bitmeden başka vakaya tıklandıysa bekleyen işlemleri hemen tamamla
    clearActiveTimeouts();
    const prevState = caseStates[activeCaseIndex];
    if (prevState.status === "won" && !prevState.isGameWon) {
        prevState.isGameWon = true;
        const maxClueTurn = Math.max(...currentCaseData.clues.map(c => c.turn));
        prevState.wrongGuesses = Math.max(prevState.wrongGuesses, maxClueTurn - 1);
    }

    // Yeni vakaya geç
    activeCaseIndex = newIndex;
    currentCaseData = casesDB[activeCaseIndex];
    targetDisease = diseaseDB.find(d => d.id === currentCaseData.targetDiseaseId);

    const state = caseStates[activeCaseIndex];
    wrongGuesses = state.wrongGuesses;
    guessedHistory = [...state.guessedHistory];
    isGameWon = state.isGameWon;

    initGame(true);
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

    // Başlık Durumu (Normal / Yeşil ✓ / Kırmızı ✕)
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

    // Eğer bu vakada henüz hiç tahmin yapılmadıysa ilk ipucu 3D açılış animasyonuyla gelsin, 
    // ama oynanmış/bitmiş bir vakaya geri dönülüyorsa kutular sabit dursun (tekrar animasyon yapmasın)
    const isFreshCase = (guessedHistory.length === 0 && state.status === "unplayed");
    renderClues(isFreshCase, !isFreshCase && isSwitchingCase);
    renderMatrix(false, false);

    // Alt Bar (Input vs Sonuç Banner'ı) Kontrolü
    const existingBanner = document.getElementById("end-phase-banner");
    if (existingBanner) existingBanner.remove();

    if (state.status === "won" && isGameWon) {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;
        showEndBanner(true, targetDisease.name, true);
    } else if (state.status === "lost") {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;
        showEndBanner(false, targetDisease.name, true);
    } else {
        if (inputSectionEl) inputSectionEl.style.display = "flex";
        guessInputEl.disabled = false;
        submitBtn.disabled = false;
        guessInputEl.value = "";
        autocompleteListEl.innerHTML = "";
    }
}

// mm³, °C, (+)-(++++) ve (-) dahil tüm klinik birimleri hatasız vurgulayan fonksiyon
function highlightClinicalText(text) {
    return text.replace(/(%\d+(?:[.,]\d+)?|\(\+{1,4}\)|\(-\)|\b\d+(?:[.,/-]\d+)*\s*(?:mmHg|\/dk|°C|\/mm³|mm³|\/mm3|mm3|kg\/m²|kg\/m2|U\/L|mIU\/L|mg\/dL|g\/dL|mmol\/L|mEq\/L|ng\/mL|pg\/mL|mcL|fL|cm|mm|sn|katı)(?![a-zA-ZğüşıöçĞÜŞİÖÇ]))/g, '<span class="clinical-val">$1</span>');
}

// Sol Taraftaki İpuçlarını Ekrana Basma
function renderClues(isInitial = false, suppressAnimation = false) {
    clinicalFileEl.innerHTML = "";
    const currentTurn = wrongGuesses + 1;

    currentCaseData.clues.forEach(clue => {
        const div = document.createElement("div");

        if (currentTurn >= clue.turn) {
            const isJustUnlocked = !suppressAnimation && (currentTurn === clue.turn) && (wrongGuesses > 0 || isInitial);
            const unlockAnimClass = isJustUnlocked ? "clue-just-unlocked" : "";
            
            // Oyun doğru bilerek bittiyse kritik kutular kırmızı yerine koyu mavi (resolved-alert) olur!
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

if (!isInitial && !suppressAnimation) {
        const isPortraitMobile = window.matchMedia("(max-width: 950px) and (orientation: portrait)").matches;
        const scrollDelay = isPortraitMobile ? 260 : 100; // Mobilde klavyenin kapanma süresi için pay

        registerTimeout(() => {
            if (isPortraitMobile) {
                const justUnlocked = clinicalFileEl.querySelector(".clue-just-unlocked");
                if (justUnlocked) {
                    justUnlocked.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                    // O turda sol panelde yeni ipucu açılmadıysa (3. ve 6. turlar gibi) yeni tahmin satırına kaydır
                    const latestRow = guessesContainerEl.lastElementChild;
                    if (latestRow) {
                        latestRow.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }
            } else {
                clinicalFileEl.scrollTo({ top: clinicalFileEl.scrollHeight, behavior: "smooth" });
            }
        }, scrollDelay);
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

// Kutunun İçine Yazılacak Metin
function formatBoxText(obj, isCorrect) {
    if (isCorrect && obj.secondary) {
        return `<span>${obj.primary}</span><span class="sub-mech">(+${obj.secondary})</span>`;
    }
    return `<span>${obj.primary}</span>`;
}

// Sağ Sütun Başlıklarını Güncelleyen Fonksiyon (Gecikmeli Senkronize Açılış Destekli)
function updateColumnHeader(elementId, title, threshold, justUnlocked, unlockDelayMs = 0, forceUnlocked = false) {
    const el = document.getElementById(elementId);
    const remaining = forceUnlocked ? 0 : (threshold - wrongGuesses);

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
    };

    if (justUnlocked) {
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
    let wrapperClass = "flipped-static";
    let styleAttr = "";

    if (animType === "flip") {
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
            <div class="cell-face cell-front ${extraNameClass} ${frontLockClass}">${frontContent}</div>
            <div class="cell-face cell-back ${extraNameClass} ${colorClass}">${content}</div>
        </div>
    `;
}

// Sağ Taraftaki Tahmin Matrisini Güncelleme
function renderMatrix(isNewGuessAdded = false, isWinningGuess = false) {
    guessesContainerEl.innerHTML = "";
    const state = caseStates[activeCaseIndex];
    const isAlreadyWonCase = (state.status === "won");

    // Normal turda mı açıldı, yoksa doğru tanı bilindiği için mi kilidi kırılıyor?
    const mekNormallyUnlocked = !isWinningGuess && (wrongGuesses === unlockThresholds.mekanizma) && isNewGuessAdded;
    const bransNormallyUnlocked = !isWinningGuess && (wrongGuesses === unlockThresholds.brans) && isNewGuessAdded;

    const mekWinUnlocked = isWinningGuess && (wrongGuesses < unlockThresholds.mekanizma);
    const bransWinUnlocked = isWinningGuess && (wrongGuesses < unlockThresholds.brans);

    const mekJustUnlocked = mekNormallyUnlocked || mekWinUnlocked;
    const bransJustUnlocked = bransNormallyUnlocked || bransWinUnlocked;

    updateColumnHeader("header-mekanizma", "Temel Mekanizma", unlockThresholds.mekanizma, mekJustUnlocked, mekWinUnlocked ? 640 : 0, isAlreadyWonCase);
    updateColumnHeader("header-brans", "Branş", unlockThresholds.brans, bransJustUnlocked, bransWinUnlocked ? 900 : 0, isAlreadyWonCase);

    const lastIdx = guessedHistory.length - 1;

    guessedHistory.forEach((disease, index) => {
        const isLatestRow = isNewGuessAdded && (index === lastIdx);
        const isCorrect = disease.id === targetDisease.id;

        const row = document.createElement("div");
        row.className = `guess-row ${isCorrect ? 'winning-row' : ''}`;

        const nameStatusClass = isCorrect ? "correct-diagnosis" : "wrong-diagnosis";
        const seyirClass = evaluateSeyir(disease.seyir, targetDisease.seyir);
        
        // Kazanıldığında (veya kazanılmış vakaya geri dönüldüğünde) üstteki eski satırların kilitli sütunları da açıktır!
        const isMekUnlocked = (wrongGuesses >= unlockThresholds.mekanizma || isCorrect || isWinningGuess || isAlreadyWonCase);
        const mekanizmaClass = isMekUnlocked
            ? evaluatePrimarySecondary(disease.mekanizma, targetDisease.mekanizma)
            : "cell-locked";
            
        const isBransUnlocked = (wrongGuesses >= unlockThresholds.brans || isCorrect || isWinningGuess || isAlreadyWonCase);
        const bransClass = isBransUnlocked
            ? evaluatePrimarySecondary(disease.brans, targetDisease.brans)
            : "cell-locked";

        // 1. TANI KUTUSU (120ms)
        const nameCellHTML = create3DCellHTML({
            content: disease.name,
            colorClass: nameStatusClass,
            isUnlocked: true,
            animType: isLatestRow ? "flip" : "none",
            delayMs: 120,
            isNameCell: true
        });

        // 2. SEYİR KUTUSU (380ms)
        const seyirCellHTML = create3DCellHTML({
            content: disease.seyir,
            colorClass: seyirClass,
            isUnlocked: true,
            animType: isLatestRow ? "flip" : "none",
            delayMs: 380
        });

        // 3. MEKANİZMA KUTUSU (640ms)
        let mekAnimType = "none";
        let mekDelay = 0;
        let mekFrontLock = false;

        if (isLatestRow && isMekUnlocked) {
            mekAnimType = "flip";
            mekDelay = 640;
        } else if (mekJustUnlocked) {
            mekAnimType = "shatter";
            mekDelay = mekWinUnlocked ? (640 + index * 120) : (450 + index * 180);
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

        // 4. BRANŞ KUTUSU (900ms)
        let bransAnimType = "none";
        let bransDelay = 0;
        let bransFrontLock = false;

        if (isLatestRow && isBransUnlocked) {
            bransAnimType = "flip";
            bransDelay = 900;
        } else if (bransJustUnlocked) {
            bransAnimType = "shatter";
            bransDelay = bransWinUnlocked ? (900 + index * 120) : (450 + index * 180);
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
        guessesContainerEl.appendChild(row);
    });
}

// Oyun İçi Sonuç ve Faz Geçiş Barını Gösteren Yardımcı Fonksiyon (Input'u silmeden gizler!)
function showEndBanner(isWin, diagnosisName, isStaticRestore = false) {
    if (inputSectionEl) inputSectionEl.style.display = "none";
    autocompleteListEl.innerHTML = "";

    const existingBanner = document.getElementById("end-phase-banner");
    if (existingBanner) existingBanner.remove();

    const bannerDiv = document.createElement("div");
    bannerDiv.id = "end-phase-banner";
    bannerDiv.className = isWin ? "phase-transition-banner" : "phase-transition-banner lost-banner";
    
    // Vakalar arasında geri dönüldüğünde 3D açılış animasyonunu tekrar oynatmaması için
    if (isStaticRestore) {
        bannerDiv.style.animation = "none";
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
        // Sadece kaybedilen vakayı sıfırlama özelliği (diğer vakaların ilerlemesini silmez!)
        setTimeout(() => {
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
}

// Doğru bilindiğinde çalışan sıralı koreografi
function runVictorySequence(diagnosisName) {
    const currentTurn = wrongGuesses + 1;
    const lockedClues = currentCaseData.clues.filter(c => c.turn > currentTurn);

    // Sağdaki son kartın (Branş: 900ms delay + 700ms flip = 1600ms) dönüşü bittiği an!
    const rightRevealDoneTime = 1600;
    const rightPanelFinishTime = 1850; 
    const stepInterval = 450;

    // 1. ADIM: Sağdaki tüm kartlar dönüp açıldığı salisede VAKA #1 ✓, yeşil sayaç, yeşil vaka butonu ve kritik kutuların maviye dönüşü gerçekleşir!
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

    // 2. ADIM: Hemen ardından soldaki kilitli ipuçları sırayla açılır (Kritik olanlar doğrudan koyu mavi açılır)
    lockedClues.forEach((clue, idx) => {
        registerTimeout(() => {
            wrongGuesses = clue.turn - 1;
            syncStateToMemory();
            renderClues(false, false);
        }, rightPanelFinishTime + (idx * stepInterval));
    });

    // 3. ADIM: En son Tanı Doğrulandı barı açılır
    const bannerRevealTime = rightPanelFinishTime + (lockedClues.length * stepInterval);

    registerTimeout(() => {
        showEndBanner(true, diagnosisName, false);
    }, bannerRevealTime);
}

// Tahmin Gönderme İşlemi
function handleGuess() {
    const state = caseStates[activeCaseIndex];
    if (state.status === "won" || state.status === "lost") return;

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

    guessedHistory.push(matchedDisease);
    if (state.status === "unplayed") state.status = "playing";
    syncStateToMemory();

    guessInputEl.value = "";
    autocompleteListEl.innerHTML = "";
    // Dokunmatik cihazlarda (telefon/tablet) Enter ile tahmin yapılsa bile klavyeyi kapat
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        guessInputEl.blur();
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }
    }

    if (matchedDisease.id === targetDisease.id) {
        guessInputEl.disabled = true;
        submitBtn.disabled = true;

        // Kaçıncı denemede bildiğini (Örn: 4/7) kilitle ki ipuçları açılırken sayaç 7/7'ye değişmesin!
        state.finalAttemptCount = Math.min(wrongGuesses + 1, maxGuesses);
        state.status = "won";
        syncStateToMemory();

        renderMatrix(true, true);
        if (window.matchMedia("(max-width: 950px) and (orientation: portrait)").matches) {
            registerTimeout(() => {
                const winRow = guessesContainerEl.lastElementChild;
                if (winRow) winRow.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 260);
        }
        runVictorySequence(matchedDisease.name);

    } else {
        wrongGuesses++;
        syncStateToMemory();
        updateAttemptBadge();
        renderMatrix(true, false);
        renderClues(false, false);

        if (wrongGuesses >= maxGuesses) {
            guessInputEl.disabled = true;
            submitBtn.disabled = true;
            state.finalAttemptCount = maxGuesses;

            // Kaybedildiğinde sağdaki son satırın 3D dönüşü bittiği an (1600ms) VAKA #1 ✕ ve kırmızı sayaç yanar!
            registerTimeout(() => {
                state.status = "lost";
                syncStateToMemory();
                renderCaseSelector();

                attemptCounterEl.classList.remove("badge-warning", "badge-danger");
                attemptCounterEl.classList.add("badge-lost");

                mainTitleEl.classList.add("title-lost");
                mainTitleEl.innerHTML = `${currentCaseData.caseNumber} <span class="title-status-icon">✕</span>`;

                showEndBanner(false, targetDisease.name, false);
            }, 1600);
        }
    }
}

let activeAutocompleteIndex = -1;

function updateAutocompleteHighlight(items) {
    items.forEach((item, idx) => {
        item.classList.toggle("autocomplete-active", idx === activeAutocompleteIndex);
        if (idx === activeAutocompleteIndex) {
            item.scrollIntoView({ block: "nearest" });
        }
    });
}

// Otomatik Tamamlama Dinleyicisi
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

// Masaüstü Klavye Kısayolları (Yukarı/Aşağı/Enter/Esc)
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

// Sadece fare/klavye kullanılan masaüstünde vakaya geçince arama çubuğuna otomatik odaklan
const originalSwitchCase = switchCase;
switchCase = function(newIndex) {
    originalSwitchCase(newIndex);
    if (window.matchMedia("(pointer: fine)").matches && !guessInputEl.disabled) {
        guessInputEl.focus();
    }
};

// Oyunu Başlat
initGame();