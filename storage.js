// ==========================================
// KALICI KAYIT & KARİYER YÖNETİCİSİ (Cloud-Ready)
// ==========================================
const CaseStorage = (() => {
    const STORAGE_KEY = "clinical_dx_profile_v1";
    const SCHEMA_VERSION = 1;

    function createEmptyCareer() {
        return {
            firstRunCompleted: false,  // İlk karşılaşma bitti mi? (Adil leaderboard için kilitlenir)
            firstRunOutcome: null,     // "won" | "lost" | null
            firstRunAttempts: null,    // İlk karşılaşma deneme sayısı (1..7)
            everWon: false,            // Daha önce en az 1 kez çözüldü mü? (Restart atsa da true kalır)
            everLost: false,           // Daha önce en az 1 kez failledi mi?
            firstWinAttempts: null,    // İlk kez çözdüğünde kaç denemede bildi
            bestAttempts: null,        // Tüm denemeler içindeki en düşük deneme sayısı
            winCount: 0,
            lossCount: 0,
            restartCount: 0,           // Bu vakaya atılan toplam restart sayısı
            firstPlayedAt: null,
            lastPlayedAt: null
        };
    }

    function createEmptyCurrent() {
        return {
            status: "unplayed",        // "unplayed" | "playing" | "won" | "lost"
            wrongGuesses: 0,
            guessedIds: [],            // Yalnızca disease.id listesi (data.js değişikliklerine dayanıklı)
            isGameWon: false,
            finalAttemptCount: null
        };
    }

    function generateGuestId() {
        if (window.crypto && crypto.randomUUID) {
            return "guest_" + crypto.randomUUID();
        }
        return "guest_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
    }

    function createDefaultStore() {
        return {
            schemaVersion: SCHEMA_VERSION,
            profile: {
                guestId: generateGuestId(),
                displayName: null,
                createdAt: new Date().toISOString(),
                lastActiveCaseKey: null
            },
            cases: {}
        };
    }

    // Safari gizli sekme vb. kısıtlamalarda oyunun çökmemesi için güvenli bellek yedeği
    let memoryFallback = null;

    function readStore() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                const fresh = createDefaultStore();
                writeStore(fresh);
                return fresh;
            }
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object" || !parsed.cases) {
                const fresh = createDefaultStore();
                writeStore(fresh);
                return fresh;
            }
            return parsed;
        } catch (err) {
            if (!memoryFallback) memoryFallback = createDefaultStore();
            return memoryFallback;
        }
    }

    function writeStore(store) {
        memoryFallback = store;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        } catch (err) {
            // Kota/gizli mod hatasında sessizce bellek yedeğinden devam et
        }
    }

    let store = readStore();

    // Vaka için sabit anahtar üretir (Sıra değişse bile kayıt kaybolmaz)
    function getCaseKey(caseData) {
        return caseData.caseId || caseData.targetDiseaseId;
    }

    function ensureCaseRecord(caseKey) {
        if (!store.cases[caseKey]) {
            store.cases[caseKey] = {
                career: createEmptyCareer(),
                current: createEmptyCurrent()
            };
        } else {
            store.cases[caseKey].career = Object.assign(createEmptyCareer(), store.cases[caseKey].career);
            store.cases[caseKey].current = Object.assign(createEmptyCurrent(), store.cases[caseKey].current);
        }
        return store.cases[caseKey];
    }

    // Tüm casesDB için oyun başlangıcında caseStates dizisini canlandırır
    function hydrateCaseStates(casesList, diseasesList) {
        return casesList.map(c => {
            const key = getCaseKey(c);
            const rec = ensureCaseRecord(key);
            const cur = rec.current;

            const guessedHistory = (cur.guessedIds || [])
                .map(id => diseasesList.find(d => d.id === id))
                .filter(Boolean);

            const isWon = cur.status === "won";
            const maxClueTurn = Math.max(...c.clues.map(cl => cl.turn));

            return {
                caseKey: key,
                wrongGuesses: isWon ? Math.max(cur.wrongGuesses, maxClueTurn - 1) : cur.wrongGuesses,
                guessedHistory,
                status: cur.status,
                isGameWon: isWon ? true : cur.isGameWon,
                finalAttemptCount: cur.finalAttemptCount,
                career: { ...rec.career }
            };
        });
    }

    // Her tahminde aktif oturumu kaydeder
    function saveActiveRun(caseData, liveState, forceStatus = null) {
        const key = getCaseKey(caseData);
        const rec = ensureCaseRecord(key);
        const now = new Date().toISOString();

        const effectiveStatus = forceStatus || liveState.status;
        const maxClueTurn = Math.max(...caseData.clues.map(cl => cl.turn));

        rec.current = {
            status: effectiveStatus,
            wrongGuesses: effectiveStatus === "won"
                ? Math.max(liveState.wrongGuesses, maxClueTurn - 1)
                : liveState.wrongGuesses,
            guessedIds: liveState.guessedHistory.map(d => d.id),
            isGameWon: effectiveStatus === "won",
            finalAttemptCount: liveState.finalAttemptCount
        };

        if (!rec.career.firstPlayedAt && rec.current.guessedIds.length > 0) {
            rec.career.firstPlayedAt = now;
        }
        rec.career.lastPlayedAt = now;

        store.profile.lastActiveCaseKey = key;
        writeStore(store);
    }

    // Vaka kazanıldığında veya kaybedildiğinde KALICI kariyer istatistiklerini günceller
    function recordOutcome(caseData, isWin, attemptCount) {
        const key = getCaseKey(caseData);
        const rec = ensureCaseRecord(key);
        const career = rec.career;
        const now = new Date().toISOString();

        if (!career.firstPlayedAt) career.firstPlayedAt = now;
        career.lastPlayedAt = now;

        // İlk karşılaşma sonucu kilitlenir (sonraki restartlar bunu ezmez)
        if (!career.firstRunCompleted) {
            career.firstRunCompleted = true;
            career.firstRunOutcome = isWin ? "won" : "lost";
            career.firstRunAttempts = attemptCount;
        }

        if (isWin) {
            career.everWon = true;
            career.winCount += 1;
            if (career.firstWinAttempts === null) {
                career.firstWinAttempts = attemptCount;
            }
            if (career.bestAttempts === null || attemptCount < career.bestAttempts) {
                career.bestAttempts = attemptCount;
            }
        } else {
            career.everLost = true;
            career.lossCount += 1;
        }

        writeStore(store);
        return { ...career };
    }

    // Vakaya restart atıldığında yalnızca aktif oturumu sıfırlar, kariyer bilgisini korur
    function recordRestart(caseData) {
        const key = getCaseKey(caseData);
        const rec = ensureCaseRecord(key);

        rec.career.restartCount += 1;
        rec.career.lastPlayedAt = new Date().toISOString();
        rec.current = createEmptyCurrent();

        writeStore(store);
        return { ...rec.career };
    }

    function setLastActiveCase(caseData) {
        store.profile.lastActiveCaseKey = getCaseKey(caseData);
        writeStore(store);
    }

    function getLastActiveCaseIndex(casesList) {
        const savedKey = store.profile.lastActiveCaseKey;
        if (!savedKey) return 0;
        const idx = casesList.findIndex(c => getCaseKey(c) === savedKey);
        return idx >= 0 ? idx : 0;
    }

    // İleride açılacak İstatistik & Leaderboard ekranı için hazır özet fonksiyonu
    function getSummaryStats(casesList) {
        let solvedCount = 0;
        let firstTryWinCount = 0;
        let failedFirstRunCount = 0;
        let totalRestarts = 0;
        let firstWinAttemptSum = 0;

        casesList.forEach(c => {
            const rec = store.cases[getCaseKey(c)];
            if (!rec) return;
            const cr = rec.career;
            if (cr.everWon) solvedCount++;
            if (cr.firstRunOutcome === "won") {
                firstTryWinCount++;
                firstWinAttemptSum += cr.firstRunAttempts || 0;
            } else if (cr.firstRunOutcome === "lost") {
                failedFirstRunCount++;
            }
            totalRestarts += cr.restartCount || 0;
        });

        return {
            totalCases: casesList.length,
            solvedCount,
            firstTryWinCount,
            failedFirstRunCount,
            totalRestarts,
            avgFirstRunAttempts: firstTryWinCount > 0
                ? Number((firstWinAttemptSum / firstTryWinCount).toFixed(2))
                : null
        };
    }

    // İleride Supabase/Firebase'e aktarırken veya yedeklerken kullanılacak ham veri
    function getRawStore() {
        return JSON.parse(JSON.stringify(store));
    }

    return {
        getCaseKey,
        hydrateCaseStates,
        saveActiveRun,
        recordOutcome,
        recordRestart,
        setLastActiveCase,
        getLastActiveCaseIndex,
        getSummaryStats,
        getRawStore
    };
})();