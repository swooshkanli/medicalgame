// SABİT TANIMLAMALAR (Harf hatasını önleyen ID/Enum yapısı)
const SEYIR = {
    AKUT: "Akut",
    SUBAKUT: "Subakut / Evreli",
    KRONIK: "Kronik",
    KRONIK_AKUT: "Kronik Zemininde Akut"
};

const MEKANIZMA = {
    ENFEKSIYOZ: "Enfeksiyöz",
    OTOIMMUN: "Otoimmün",
    INFLAMATUAR: "İnflamatuar",
    MEKANIK: "Mekanik / Obstrüktif",
    TRAVMATIK: "Travmatik",
    IDIYOPATIK: "İdiyopatik",
    VASKULER: "Vasküler / İskemik",
    TOKSIK: "Toksik / İatrojenik",
    METABOLIK: "Metabolik / Endokrin",
    DEJENERATIF: "Dejeneratif",
    ALERJIK: "Alerjik / İmmünolojik",
    FONKSIYONEL: "Fonksiyonel / Psikiyatrik",
    MALIGNITE: "Malignite / Neoplastik",
    KLONAL: "Klonal / Premalign",
    GENETIK: "Genetik / Kalıtsal"
};

const BRANS = {
    ACIL: "Acil Tıp",
    GENEL_CERRAHI: "Genel Cerrahi",
    GOGUS_CERRAHISI: "Göğüs Cerrahisi",
    GASTRO: "Gastroenteroloji",
    GOGUS: "Göğüs Hastalıkları",
    ENFEKSIYON: "Enfeksiyon",
    DERMATOLOJI: "Dermatoloji",
    ENDOKRIN: "Endokrinoloji",
    PEDIATRI: "Pediatri",
    ROMATOLOJI: "Romatoloji",
    NEFROLOJI: "Nefroloji",
    PSIKIYATRI: "Psikiyatri",
    ORTOPEDI: "Ortopedi",
    ONKOLOJI: "Onkoloji",
    KARDIYOLOJI: "Kardiyoloji",
    NOROLOJI: "Nöroloji",
    UROLOJI: "Üroloji",
    KADIN_DOGUM: "Kadın Hastalıkları ve Doğum",
    HEMATOLOJI: "Hematoloji",
    FTR: "Fizik Tedavi ve Rehabilitasyon"
};

// 1. OYUN GENEL AYARLARI
const gameConfig = {
    defaultSubTitle: "",
    maxGuesses: 7
};

// 2. HASTALIK HAVUZU (Tamamı Sabit ID/Enum Yapısıyla Güncellendi)
const diseaseDB = [
    {
        id: "akut_apandisit",
        name: "Akut Apandisit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.GENEL_CERRAHI, secondary: BRANS.ACIL }
    },
    {
        id: "akut_pankreatit",
        name: "Akut Pankreatit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI }
    },
    {
        id: "primer_biliyer_kolanjit",
        name: "Primer Biliyer Kolanjit (PBC)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "tansiyon_pnomotoraks",
        name: "Tansiyon Pnömotoraks",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TRAVMATIK, secondary: MEKANIZMA.MEKANIK },
        brans: { primary: BRANS.ACIL, secondary: BRANS.GOGUS_CERRAHISI }
    },
    {
        id: "koah_alevlenme",
        name: "KOAH Akut Alevlenme",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.GOGUS, secondary: BRANS.ACIL }
    },
    {
        id: "primer_sifiliz",
        name: "Primer Sifiliz",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "sekonder_sifiliz",
        name: "Sekonder Sifiliz",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "norosifiliz",
        name: "Nörosifiliz",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.NOROLOJI }
    },
    {
        id: "konjenital_hipotiroidi",
        name: "Konjenital Hipotiroidi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.PEDIATRI }
    },
    {
        id: "lupus_sle",
        name: "Sistemik Lupus Eritematozus (SLE)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.NEFROLOJI }
    },
    {
        id: "akut_psikotik_atak",
        name: "Akut Psikotik Atak",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.FONKSIYONEL, secondary: null },
        brans: { primary: BRANS.PSIKIYATRI, secondary: null }
    },
    {
        id: "paget_osteosarkom",
        name: "Paget Sekonder Osteosarkom",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.ORTOPEDI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "romatoid_artrit",
        name: "Romatoid Artrit",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "ankilozan_spondilit",
        name: "Ankilozan Spondilit",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "reaktif_artrit",
        name: "Reaktif Artrit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "ailevi_akdeniz_atesi",
        name: "Ailevi Akdeniz Ateşi (FMF)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "behcet",
        name: "Behçet Hastalığı",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "mgus",
        name: "Önemi Bilinmeyen Monoklonal Gammopati (MGUS)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.KLONAL, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "smoldering_myelom",
        name: "Smoldering Multiple Myelom",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.KLONAL, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "multiple_myelom",
        name: "Multiple Myelom",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    // --- YENİ EKLENEN HASTALIKLAR (Kardiyoloji, Göğüs, Acil ve Vasküler) ---
    {
        id: "akut_stemi",
        name: "Akut ST Elevasyonlu Miyokard Enfarktüsü (STEMI)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: null },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "pulmoner_emboli",
        name: "Pulmoner Tromboemboli",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: null },
        brans: { primary: BRANS.GOGUS, secondary: BRANS.ACIL }
    },
    {
        id: "aort_diseksiyonu",
        name: "Akut Aort Diseksiyonu",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.DEJENERATIF },
        brans: { primary: BRANS.ACIL, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "kardiyak_tamponad",
        name: "Kardiyak Tamponad",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: null },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "enfektif_endokardit",
        name: "Subakut Bakteriyel Endokardit",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "kalp_yetmezligi_dekompanse",
        name: "Akut Dekompanse Kalp Yetmezliği",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.MEKANIK },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "astim_atagi",
        name: "Akut Astım Atağı",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.GOGUS, secondary: BRANS.ACIL }
    },
    {
        id: "anafilaksi",
        name: "Anafilaktik Şok",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ACIL, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "idiyopatik_pulmoner_fibrozis",
        name: "İdiyopatik Pulmoner Fibrozis",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.IDIYOPATIK, secondary: null },
        brans: { primary: BRANS.GOGUS, secondary: null }
    },
    {
        id: "sarkoidoz",
        name: "Sarkoidoz",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.GOGUS, secondary: BRANS.ROMATOLOJI }
    },

    // --- Gastroenteroloji & Genel Cerrahi ---
    {
        id: "akut_kolesistit",
        name: "Akut Kolesistit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.GENEL_CERRAHI, secondary: BRANS.GASTRO }
    },
    {
        id: "akut_kolanjit",
        name: "Akut Bakteriyel Kolanjit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.MEKANIK },
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI }
    },
    {
        id: "peptik_ulser_perforasyonu",
        name: "Peptik Ülser Perforasyonu",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.GENEL_CERRAHI, secondary: BRANS.ACIL }
    },
    {
        id: "akut_mezenter_iskemi",
        name: "Akut Mezenter İskemisi",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.MEKANIK },
        brans: { primary: BRANS.GENEL_CERRAHI, secondary: BRANS.ACIL }
    },
    {
        id: "crohn_hastaligi",
        name: "Crohn Hastalığı",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI }
    },
    {
        id: "ulseratif_kolit",
        name: "Ülseratif Kolit",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "colyak_hastaligi",
        name: "Çölyak Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: null },
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "wilson_hastaligi",
        name: "Wilson Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.GASTRO, secondary: BRANS.NOROLOJI }
    },
    {
        id: "asetaminofen_toksisitesi",
        name: "Asetaminofen (Parasetamol) İntoksikasyonu",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.ACIL, secondary: BRANS.GASTRO }
    },

    // --- Endokrinoloji & Metabolizma ---
    {
        id: "diyabetik_ketoasidoz",
        name: "Diyabetik Ketoasidoz (DKA)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.ACIL }
    },
    {
        id: "graves_hastaligi",
        name: "Graves Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "hashimoto_tiroiditi",
        name: "Hashimoto Tiroiditi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "subakut_granulomatoz_tiroidit",
        name: "Subakut Granülomatöz Tiroidit (De Quervain)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "addison_krizi",
        name: "Akut Adrenal Kriz (Addison Krizi)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.ACIL }
    },
    {
        id: "feokromositoma",
        name: "Feokromositoma",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.MALIGNITE },
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.GENEL_CERRAHI }
    },

    // --- Nöroloji & Psikiyatri ---
    {
        id: "iskemik_inme",
        name: "Akut İskemik İnme",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.MEKANIK },
        brans: { primary: BRANS.NOROLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "subaraknoid_kanama",
        name: "Subaraknoid Kanama (SAK)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.TRAVMATIK },
        brans: { primary: BRANS.NOROLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "akut_bakteriyel_menenjit",
        name: "Akut Bakteriyel Menenjit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.NOROLOJI }
    },
    {
        id: "guillain_barre",
        name: "Guillain-Barré Sendromu (GBS)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.NOROLOJI, secondary: null }
    },
    {
        id: "multipl_skleroz",
        name: "Multipl Skleroz (MS)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.DEJENERATIF },
        brans: { primary: BRANS.NOROLOJI, secondary: null }
    },
    {
        id: "myastenia_gravis",
        name: "Myastenia Gravis",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: null },
        brans: { primary: BRANS.NOROLOJI, secondary: BRANS.GOGUS_CERRAHISI }
    },
    {
        id: "alzheimer",
        name: "Alzheimer Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: null },
        brans: { primary: BRANS.NOROLOJI, secondary: BRANS.PSIKIYATRI }
    },
    {
        id: "parkinson",
        name: "Parkinson Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: null },
        brans: { primary: BRANS.NOROLOJI, secondary: null }
    },
    {
        id: "noroleptik_malign_sendrom",
        name: "Nöroleptik Malign Sendrom",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.PSIKIYATRI, secondary: BRANS.ACIL }
    },
        {
        id: "major_depresyon",
        name: "Majör Depresif Bozukluk",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.FONKSIYONEL, secondary: null },
        brans: { primary: BRANS.PSIKIYATRI, secondary: null }
    },

    // --- Nefroloji, Üroloji & Kadın Doğum ---
    {
        id: "poststreptokoksik_gn",
        name: "Akut Poststreptokoksik Glomerülonefrit (APSGN)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.PEDIATRI }
    },
    {
        id: "goodpasture",
        name: "Goodpasture Sendromu",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: null },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.GOGUS }
    },
    {
        id: "nefrolitiyazis",
        name: "Üreterolitiyazis (Renal Kolik)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.UROLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "testis_torsiyonu",
        name: "Testis Torsiyonu",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.MEKANIK },
        brans: { primary: BRANS.UROLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "ektopik_gebelik_rupturu",
        name: "Ektopik Gebelik Rüptürü",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ACIL }
    },
    {
        id: "preeklampsi",
        name: "Preeklampsi",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ACIL }
    },
    {
        id: "hellp",
        name: "HELLP Sendromu",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ACIL }
    },

    // --- Hematoloji, Onkoloji, Romatoloji & Pediatri ---
    {
        id: "orak_hucreli_anemi_kriz",
        name: "Orak Hücreli Anemi (Vazo-oklüzif Kriz)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "gut_atagi",
        name: "Akut Gut Artriti",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "septik_artrit",
        name: "Akut Septik Artrit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ORTOPEDI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "dvt",
        name: "Derin Ven Trombozu (DVT)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "henoch_schonlein",
        name: "IgA Vasküliti (Henoch-Schönlein Purpurası)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.PEDIATRI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "miyofasiyal_agri_sendromu",
        name: "Miyofasial Ağrı Sendromu",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: null },
        brans: { primary: BRANS.FTR, secondary: null }
    },
    {
        id: "fibromiyalji",
        name: "Fibromiyalji",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.FONKSIYONEL, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.FTR, secondary: BRANS.NOROLOJI }
    },
    {
        id: "demir_eksikligi_anemisi",
        name: "Demir Eksikliği Anemisi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "kronik_hastalik_anemisi",
        name: "Kronik Hastalık Anemisi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "folat_eksikligi_anemisi",
        name: "Folat Eksikliği Anemisi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "b12_eksikligi_anemisi",
        name: "Vitamin B12 Eksikliği (Pernisiyöz Anemi)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "subakut_kombine_dejenerasyon",
        name: "Subakut Kombine Dejenerasyon",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.NOROLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "otoimmun_hemolitik_anemi",
        name: "Otoimmün Hemolitik Anemi",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "herediter_sferositoz",
        name: "Herediter Sferositoz",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "aplastik_anemi",
        name: "Aplastik Anemi",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.IDIYOPATIK, secondary: MEKANIZMA.TOKSIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "G6PD_eksikligi",
        name: "Glukoz-6-Fosfat Dehidrogenaz (G6PD) Eksikliği / Favizm",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.GENETIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.PEDIATRI }
    },
    {
        id: "beta_talasemi_major",
        name: "Beta Talasemi Major",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.PEDIATRI } 
    },
    {
        id: "sideroblastik_anemi",
        name: "Sideroblastik Anemi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.TOKSIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null } 
    },
    {
        id: "ttp",
        name: "Trombotik Trombositopenik Purpura (TTP)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.NEFROLOJI }
    },
    {
        id: "itp",
        name: "İmmün Trombositopenik Purpura (ITP)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.PEDIATRI }
    },
    {
        id: "hit",
        name: "Heparin İlişkili Trombositopeni (HIT)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "hus",
        name: "Hemolitik Üremik Sendrom (HÜS)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "dik",
        name: "Dissemine Intravasküler Koagülasyon (DİK)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.TRAVMATIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ACIL }
    },
    {
        id: "von_willebrand",
        name: "Von Willebrand Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "hemofili_a",
        name: "Hemofili A",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "hemofili_b",
        name: "Hemofili B",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "bernard_soulier",
        name: "Bernard-Soulier Hastalığı",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.PEDIATRI }
    },
    {
        id: "glanzmann",
        name: "Glanzmann Trombastenisi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.PEDIATRI }
    },

    // --- LÖKOSİT (WBC), LÖSEMİ, LENFOMA VE MİYELOPROLİFERATİF HASTALIKLAR ---
    {
        id: "all",
        name: "Akut Lenfoblastik Lösemi (ALL)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "aml",
        name: "Akut Miyeloid Lösemi (AML)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "kml",
        name: "Kronik Miyeloid Lösemi (KML)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "kll",
        name: "Kronik Lenfositer Lösemi (KLL)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "sacli_hucreli_losemi",
        name: "Saçlı Hücreli Lösemi (Hairy Cell)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "hodgkin_lenfoma",
        name: "Hodgkin Lenfoma",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.ONKOLOJI, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "non_hodgkin_lenfoma",
        name: "Non-Hodgkin Lenfoma (NHL)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.ONKOLOJI, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "polisitemia_vera",
        name: "Polisitemia Vera",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "enfeksiyoz_mononukleoz",
        name: "Enfeksiyöz Mononükleoz (EBV)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "agranulositoz_febril_notropeni",
        name: "Agranülositoz / Febril Nötropeni",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ACIL, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "pnh",
        name: "Paroksismal Nokturnal Hemoglobinuri (PNH)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "miyelodisplastik_sendrom",
        name: "Miyelodisplastik Sendrom (MDS)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.KLONAL, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },


    // --- ROMATOLOJİ: BÜYÜK, ORTA VE KÜÇÜK ÇAPLI DAMAR VASKÜLİTLERİ ---
    {
        id: "temporal_arterit",
        name: "Dev Hücreli (Temporal) Arterit",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.NOROLOJI }
    },
    {
        id: "takayasu_arteriti",
        name: "Takayasu Arteriti",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "poliarteritis_nodoza",
        name: "Poliarteritis Nodoza (PAN)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "buerger_hastaligi",
        name: "Buerger Hastalığı (Tromboanjitis Obliterans)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.TOKSIK },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "wegener_gpa",
        name: "Granülomatöz Polianjiit (Wegener Granülomatozisi / GPA)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.GOGUS }
    },
    {
        id: "churg_strauss_egpa",
        name: "Eozinofilik Granülomatöz Polianjiit (Churg-Strauss / EGPA)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.GOGUS }
    },
    {
        id: "mikroskopik_polianjiit",
        name: "Mikroskopik Polianjiit (MPA)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "kriyoglobulinemik_vaskulit",
        name: "Esansiyel Mikst Kriyoglobulinemi (Kriyoglobulinemik Vaskülit)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "lokositoklastik_vaskulit",
        name: "Kütanöz Lökositoklastik (Hipersensitivite) Vasküliti",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.DERMATOLOJI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "eriskin_still",
        name: "Erişkin Still Hastalığı (ESH)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "polimyaljiya_romatika",
        name: "Polimyaljiya Romatika (PMR)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },


    // --- ENFEKSIYON ---

    {
        id: "bruselloz",
        name: "Bruselloz",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "sitma",
        name: "Sıtma (Malarya)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: null }
    },
    {
        id: "selulit",
        name: "Selülit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: null }
    },
    {
        id: "erizipel",
        name: "Erizipel",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: null }
    },
    {
        id: "nekrotizan_fasiit",
        name: "Nekrotizan Fasiit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.TOKSIK },
        brans: { primary: BRANS.ACIL, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "gazli_gangren",
        name: "Gazlı Gangren",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.TOKSIK },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ACIL }
    },
    {
        id: "riketsiyoz",
        name: "Riketsiyoz (Akdeniz Benekli Ateşi)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ENFEKSIYON, secondary: null }
    },
    {
        id: "kkka",
        name: "Kırım Kongo Kanamalı Ateşi (KKKA)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ACIL }
    },
    {
        id: "kizil",
        name: "Kızıl (Scarlet Fever)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "kizamik",
        name: "Kızamık (Rubeola)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "kizamikcik",
        name: "Kızamıkçık (Rubella)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "5_hastalik",
        name: "Beşinci (5.) Hastalık (Eritema İnfeksiyozum)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "6_hastalik",
        name: "Altıncı (6.) Hastalık (Roseola Infantum)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "su_cicegi",
        name: "Su Çiçeği (Varicella Zoster Virus / VZV)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "zona",
        name: "Zona (Herpes Zoster Virus / HZV)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "el_ayak_agiz",
        name: "El-Ayak-Ağız Hastalığı",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "meningokok_sepsis",
        name: "Meningokok Sepsisi",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "pseudomonas_sepsis",
        name: "Pseudomonas Sepsisi (Ektima Gangrenozum)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "lyme",
        name: "Lyme Hastalığı (Borrelia Burgdorferi)",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "osteomiyelit",
        name: "Osteomiyelit",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "spondilodiskit",
        name: "Spondilodiskit",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "protez_enfeksiyonu",
        name: "Protez İlişkili Enfeksiyon",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "ara",
        name: "Akut Romatizmal Ateş (ARA)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "hepA",
        name: "Hepatit A Enfeksiyonu (HAV)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.GASTRO }
    },
    {
        id: "hepB",
        name: "Hepatit B Enfeksiyonu (HBV)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "hepC",
        name: "Hepatit C Enfeksiyonu (HCV)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "hepD",
        name: "Hepatit D Enfeksiyonu (HDV)",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.GASTRO }
    },
    {
        id: "hepE",
        name: "Hepatit E Enfeksiyonu (HEV)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.KADIN_DOGUM }
    },
    {
        id: "akut_piyelonefrit",
        name: "Akut Piyelonefrit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "akut_sistit",
        name: "Akut Sistit",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.UROLOJI, secondary: BRANS.ENFEKSIYON }
    },




    //KADIN DOĞUM
// --- JİNEKOLOJİK ENDOKRİNOLOJİ & PKOS AYIRICI TANILARI ---
    {
        id: "pkos",
        name: "Polikistik Over Sendromu (PKOS)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.IDIYOPATIK }, // İnsülin direnci, hiperandrojenizm ve multifaktöriyel/idiyopatik zemin
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "kah",
        name: "Konjenital Adrenal Hiperplazi (KAH)",
        seyir: SEYIR.KRONIK_AKUT, // Kronik enzimatik zemin + Klasik formda akut tuz kaybı / adrenal kriz veya geç başlangıçlı formda ergenlikte klinik patlama
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK }, // Eğer enum'da KONJENITAL/GENETIK varsa primary: MEKANIZMA.KONJENITAL yap!
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.KADIN_DOGUM }
    },
    {
        id: "cushing_sendromu",
        name: "Cushing Sendromu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.TOKSIK }, // Hiperkortizolizm + Hipofiz/Adrenal adenom veya ektopik ACTH neoplazisi
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "cushing_hastaligi",
        name: "Cushing Hastalığı (Hipofizer Adenom)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.METABOLIK }, // Hiperkortizolizm + Hipofiz/Adrenal adenom veya ektopik ACTH neoplazisi
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "prolaktinoma",
        name: "Hiperprolaktinemi (Prolaktinoma)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.METABOLIK }, // Fonksiyonel hipofiz adenomu (neoplazi) + GnRH/Östrojen baskılanması
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.KADIN_DOGUM }
    },
    {
        id: "sertoli_leydig_hucreli_tumor",
        name: "Androjen Salgılayan Over Tümörü (Sertoli-Leydig)",
        seyir: SEYIR.SUBAKUT, // PKOS'un aksine haftalar/aylar içinde hızla gelişen virilizasyon (ses kalınlaşması, klitoromegali)!
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.METABOLIK }, // Seks kord-stromal neoplazi + Ağır hiperandrojenemi
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "hashimoto",
        name: "Hashimoto Tiroiditi (Primer Hipotiroidi)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.METABOLIK }, // Anti-TPO/Anti-Tg otoimmün yıkım + Hipometabolizma ve TRH kaynaklı oligomenore
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "primer_over_yetmezligi",
        name: "Primer Over Yetmezliği (Erken Menopoz)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.OTOIMMUN }, // Folikül havuzunun erken tükenmesi + Otoimmün ooforit zemini
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "plummervinson",
        name: "Plummer-Vinson (Paterson–Brown–Kelly) Sendromu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.MEKANIK }, // Ağır demir/nütrisyonel eksiklik + Mukozal atrofi ve fibrotik web gelişimi
        brans: { primary: BRANS.GASTRO, secondary: BRANS.HEMATOLOJI } // Disfaji/Endoskopik dilatasyon + Demir eksikliği anemisi
    },





// --- ÖZOFAGUS HASTALIKLARI & DİSMOTİLİTE PAKETİ ---
    {
        id: "akalazya",
        name: "Akalazya",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.DEJENERATIF    }, // Miyenterik (Auerbach) pleksusta inhibitör gangliyon hücre kaybı
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI } // Manometri/Pnömatik dilatasyon + Heller miyotomisi
    },
    {
        id: "diffuz_ozofagus_spazmi",
        name: "Diffüz Özofageal Spazm",
        seyir: SEYIR.KRONIK_AKUT, // Kronik dismotilite zemininde anjina pektorisi taklit eden akut göğüs ağrısı atakları!
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.MEKANIK }, // Koordine olmayan spastik kontraksiyonlar + Nöromüsküler disfonksiyon
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "reflu_ozofajiti",
        name: "Gastroözofageal Reflü Hastalığı (GÖRH)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.METABOLIK }, // Asit-pepsin reflüsüne bağlı kimyasal mukozal inflamasyon + AÖS gevşekliği
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "barrett_ozofagusu",
        name: "Barrett Özofagusu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.MALIGNITE }, // Kronik asit hasarına sekonder intestinal metaplazi + Adenokarsinom prekürsörü
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "ozofagus_kanseri",
        name: "Özofagus Kanseri",
        seyir: SEYIR.SUBAKUT, // Haftalar-aylar içinde hızla ilerleyen (katıdan sıvıya) mekanik disfaji ve ağır kilo kaybı
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.ONKOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "candida_ozofajiti",
        name: "Candida Özofajiti",
        seyir: SEYIR.AKUT, // Veya SUBAKUT; şiddetli odinofaji (yutarken ağrı) ile başvurur
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR }, // Fırsatçı fungal enfeksiyon + İmmünsüpresyon / İnhaler steroid zemini
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "eozinofilik_ozofajit",
        name: "Eozinofilik Özofajit",
        seyir: SEYIR.KRONIK_AKUT, // Kronik atopik/alerjik zemin + Akut gıda takılması (food impaction) acili ile başvuru!
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.INFLAMATUAR }, // Th2/Alerjik immün yanıt + Trakealize (halkalı) özofagus inflamasyonu
        brans: { primary: BRANS.GASTRO, secondary: null } // Veya varsa ALLERJI / IMMUNOLOJI
    },
    {
        id: "zenker_divertikulu",
        name: "Zenker Divertikülü (Faringoözofageal Divertikül)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: null }, // Killian üçgeninde duvar zayıflığı ve krikofarengeal disfonksiyona bağlı pulsiyon herniasyonu
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI } // Veya KBB / GENEL_CERRAHI
    },
    {
        id: "mallory_weiss_sendromu",
        name: "Mallory-Weiss Sendromu",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TRAVMATIK, secondary: MEKANIZMA.VASKULER }, // Şiddetli öğürme/kusmaya bağlı gastroözofageal bileşkede longitudinal mukozal yırtık + Üst GİS kanaması
        brans: { primary: BRANS.ACIL, secondary: BRANS.GASTRO }
    },
    {
        id: "boerhaave_sendromu",
        name: "Boerhaave Sendromu (Spontan Özofagus Rüptürü)",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TRAVMATIK, secondary: null }, // Barojenik tam kat transmural yırtık + Akut kimyasal/bakteriyel mediastinit
        brans: { primary: BRANS.ACIL, secondary: BRANS.GENEL_CERRAHI } // Göğüs/Genel cerrahi acili!
    },
    {
        id: "kostik_ozofajit",
        name: "Kostik Özofajit (Koroziv Madde İçimi)",
        seyir: SEYIR.AKUT, // Akut nekroz (kronik dönemde striktür)
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.TRAVMATIK }, // Alkali (likefaksiyon) veya asit (koagülasyon) kimyasal yanığı
        brans: { primary: BRANS.ACIL, secondary: BRANS.GASTRO }
    },
    {
        id: "sjogren",
        name: "Sjögren Sendromu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR }, // Anti-SSA (Ro) / Anti-SSB (La) aracılı otoimmün ekzokrin bez yıkımı ve lenfositik infiltrasyon
        brans: { primary: BRANS.ROMATOLOJI, secondary: null } // Veya varsa GOZ / KBB
    },

];

// 3. VAKA LİSTESİ
const casesDB = [
    {
        caseNumber: "VAKA #1",  
        customSubTitle: "",
        targetDiseaseId: "ankilozan_spondilit",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "26 yaşında erkek hasta, sabah saat 07:10'da ayaktan acil servise başvurdu. Oldukça bakımlı ve özenle giyinmiş duruyor. Elinde bir iş çantası var. Mevcut çok ciddi bir durumu yokmuş gibi görünüyor.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır (SOL)
                title: "Anamnez",
                text: "Şu anda bir şikayeti olmadığını ve birazdan işe gideceğini ancak ağrısının bu sabah gelmeye karar verdikten sonra, acil servise yürürken azalarak yok olduğunu söylüyor. Ayrıca son 4 aydır bu saatlerde işe giderken yataktan kalkmakta ve iş için hazırlanmakta zorlandığını belirtiyor.",
                isAlert: false
            },
            {
                turn: 4, // 3. Yanlışta açılır (SOL)
                title: "Anamnez #2",
                text: "Durumu ilk defa fark ettiğinde geceleri tuvalete kalkıp adım atarken acı duyduğunu ve biraz gezinip ancak ondan sonra geri yatabildiğini, sabahları pantolon ve çoraplarını giyerken zorlandığını belirtiyor. 2 aydır her sabah uyanır uyanmaz ağrı kesici aldığını, onların sayesinde daha iyi hissettiğini, aksi taktirde ağrıdan yürüyemeyeceğinden ve doğrulamayacağından korktuğunu söylüyor.",
                isAlert: false
            },
            {
                turn: 5, // 4. Yanlışta açılır (SOL)
                title: "Fizik Muayene ve Laboratuvar",
                text: "Fizik muayenede göğüs kafesi nefes almakla olması gerekenden daha az hareket ediyor, omurgada ve kalça hareketleri için Schoeber ve FABER testlerinde ağrı ve kısıtlılık saptandı. Sağ ayakta topukta ve aşil tendonunun kalkaneusa yapışma bölgesinde hassasiyet, şişlik ve kızarıklık saptandı, sol taraf normal. Laboratuvar sonuçlarında CRP ve sedimantasyon hafif yüksek raporlandı.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (SOL - Son Şans!)
                title: "Görüntüleme & Spesifik Sonuçlar",
                text: "Direkt grafide her iki sakroiliak eklemin etrafında opasite artışı, erozyon ve silikleşme görüldü. MR'da aynı eklemlerde bilateral artmış inflamasyon ve ödem saptandı. Hastanın amcasında da benzer şikâyetlerin bulunduğu öğrenildi. HLA-B27 testi (+), RF testi (-) olarak raporlandı.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #2",  
        customSubTitle: "",
        targetDiseaseId: "selulit",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "74 yaşında kadın hasta, yakınları tarafından tekerlekli sandalye ile acil servise getirildi. Hasta bitkin ve ağrılı görünüyor, sağ tarafındaki ayakkabısı ve çorapları çıkarılmış ve pijamasının altı dizine kadar açılmış duruyor.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır (SOL)
                title: "Anamnez",
                text: "Hasta uyandığında sağ bacağının dayanılmaz derecede ağrımaya başladığını, aynı anda kendini yorgun ve iştahsız hissettiğini söylüyor. Aynı zamanda kendini ateşi varmış gibi hissediyor ve sağ bacağının da aynı şekilde sıcak hissettirdiğini söylüyor.",
                isAlert: false
            },
            {
                turn: 4, // 3. Yanlışta açılır (SOL)
                title: "Fizik Muayene",
                text: "Fizik muayenede sağ bacağın sol bacaktan belirgin daha şişmiş olduğu; sağda dizden ayak bileğine kadar uzanan bölgede ödem, hassasiyet, ısı artışı ve yaygın kızarıklık olduğu saptandı. Sağ inguinal lenf nodlarında büyüme görüldü. Vital bulgular: Ateş: 38.5°C, Nabız: 110/dk, TA: 110/80 mmHg, SpO2: %95.  ",
                isAlert: false
            },
            {
                turn: 5, // 4. Yanlışta açılır (SOL)
                title: "Anamnez #2",
                text: "Yakınları hastanın daha önce böyle bir şikayet yaşamadığını, normal yaşamında hareketli ve aktif olduğunu, düzenli olarak tansiyon ve kan sulandırıcı ilaçlarını kullandığını söylüyor. Son zamanlarda hastanın sağ ayağında ve tırnaklarında sararma, kaşınma ve dökülme olduğunu ve mantar enfeksiyonundan şüphelendiklerini ancak hastanın bunun için bir şey yapmadığını belirtiyorlar.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (SOL - Son Şans!)
                title: "Görüntüleme & Spesifik Sonuçlar",
                text: "Doppler ultrasonografide sağ bacakta derin ven trombozu ve arteriyel dolaşım bozukluğu saptanmadı. Sağ ayakta, özellikle parmak aralarında deri bütünlüğünü bozan tinea pedis enfeksiyonu doğrulandı. Kan kültürlerinde Streptococcus pyogenes (Grup A beta-hemolitik streptokok) üremesi saptandı.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #3",
        customSubTitle: "",
        targetDiseaseId: "pnh",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "32 yaşında erkek hasta acil servise iki büklüm vaziyette, sağ elini karnının üst kısmına bastırarak yürüyerek geldi. Oldukça bitkin ve soluk görünüyor. Pantolonunun düğmesini ve kemerini açmış durumda.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır
                title: "Anamnez",
                text: "Hasta son 4 gündür karnının hızla şiştiğini ve sağ kaburga altında giderek şiddetlenen keskin bir ağrı başladığını belirtiyor. Son 5-6 aydır merdiven çıkarken çabuk yorulduğunu, daha sık hastalandığını ve böbreklerinden kum döktüğünü söylüyor.",
                isAlert: false
            },
            {
                turn: 4, // 4. Yanlışta açılır
                title: "Anamnez #2",
                text: "Detaylı sorgulamada hasta 1 ay önce ateşli bir boğaz enfeksiyonu geçirdiğini; o dönemde birkaç gün boyunca sabah uyandığında yaptığı ilk idrarın koyu kırmızı-kahverengi çıktığını ancak gün içinde rengin kendiliğinden açıldığını söyledi. O sırada gittiği poliklinikte ''kum döküyor olabileceği'' söylenmiş, bu sırada yapılan idrar tahlilinde dipstick testinde kan (+++) saptanmasına rağmen mikroskobik incelemede eritrosit saptanmadığı görüldü.",
                isAlert: false
            },
            {
                turn: 5, // 3. Yanlışta açılır
                title: "Fizik Muayene ve Laboratuvar",
                text: "Vital bulgular nabız 116/dk dışında normal, konjonktivalar belirgin soluk, skleralarda sarılık mevcut. Batında sağ üst kadran derin palpasyonla ağrılı, hepatomegali ve asit saptandı. Laboratuvar: Hb: 7.6 g/dL, WBC: 3.100/mm³, PLT: 64.000/mm³ olarak sonuçlandı ve kanda her üç seride azalma lehine yorumlandı, LDH ve indirekt bilirubinde belirgin artma saptandı.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Görüntüleme & Spesifik Sonuçlar",
                text: "Direkt Coombs testi (-) sonuçlandı. Batın Doppler USG'de hepatik venlerde tromboz görüldü ve akım sitometride myeloid seri hücrelerin yüzeylerinde GPI-ankorlu proteinlerin (CD55 ve CD59) ekspresyon kaybı doğrulandı.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #4",
        customSubTitle: "",
        targetDiseaseId: "pkos",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "24 yaşında kadın hasta soluk soluğa polikliniğe geldi. Kilosu yaşına ve boyuna göre fazla, yüzü ve boynu son derece terlemiş ve parlak duruyor.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır
                title: "Anamnez",
                text: "Hasta son 6 aydır diyet yaptığını ancak kilo vermek yerine göbeğinin daha da büyüdüğünü, yemeklerden sonra dayanılmaz bir tatlı yeme ihtiyacı hissettiğini söylüyor. Ayrıca boyun kıvrımlarındaki pürüzlü kalınlaşma ve siyahlaşmadan ve yüzündeki aknelerden dolayı görünüşünden şikayetçi.",
                isAlert: false
            },
            {
                turn: 4, // 4. Yanlışta açılır
                title: "Fizik Muayene",
                text: "Fizik muayenede vitaller stabil, hastanın vücut kitle indeksi: 31.4 kg/m². Ense ve boyun kıvrımlarında, aksillalarda kadifemsi hiperpigmentasyon doğrulandı. Sırtta ve yüzde çok sayıda komedon ve papülopüstüler lezyonlar saptandı. Başın tepe ve orta kısımlarında saçlarda incelme, hacim kaybı ve dökülme sebebiyle skalpın görünürlüğünün arttığı görüldü.",
                isAlert: false
            },
            {
                turn: 5, // 3. Yanlışta açılır
                title: "Anamnez #2",
                text: "İleri sorgulamada hasta 5 yıldan beri göbeğinde, göğsünde ve çene altında kendisini utandıracak derecede kıllanma artışının olduğunu ama bunları düzenli olarak aldığını; bu sorun için bir arkadaşının tavsiyesi üzerine doğum kontrol hapına başladığını ve o günden beri adetlerinin aralığının ergenlikten beri ilk defa adet aralıklarının belirgin derecede kısaldığını ancak 5 ay önce ilacı bıraktığından beri sadece bir kez adet gördüğünü belirtiyor.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Laboratuvar & Spesifik Sonuçlar",
                text: "Laboratuvarda TSH, prolaktin, 17-OH progesteron seviyeleri ve deksametazon süpresyon testi normal sonuçlandı. LH düzeyi FSH'nin 2.8 katı olarak ölçüldü ve serbest testosteron belirgin derecede yüksek bulundu. Pelvik USG'de her iki over hacmi artmış olup periferik dizilimli, 2-9 mm çapında çok sayıda folikül kisti izlendi.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #5",
        customSubTitle: "",
        targetDiseaseId: "plummervinson",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "44 yaşında kadın hasta polikliniğe başvurdu. Hastanın oldukça zayıf görünümde olduğu, dudak kenarlarındaki kızarık çatlakların dikkat çektiği ve elindeki su şişesinden sık sık küçük yudumlar aldığı görülüyor.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır
                title: "Anamnez",
                text: "Hasta son 1 yıldır yutma güçlüğü çektiğini, bazen lokmalarının boğazın hemen altında takılıp kaldığını, sadece çorba ve sıvılarla rahatça beslenebildiğini söylüyor. Takılma korkusuyla öğünlerini azalttığı için son aylarda 5-6 kg kaybettiğini belirtiyor.",
                isAlert: false
            },
            {
                turn: 4, // 3. Yanlışta açılır
                title: "Fizik Muayene",
                text: "Vital bulgular: TA: 105/65 mmHg, Nabız: 98/dk, Ateş: 36.6°C. Konjonktivalar soluk, her iki dudak köşesinde maserasyon ve fissürler mevcut. Ağız içi muayenede dil papillalarının silindiği, dilin parlak, düz ve kızarık olduğu görüldü. El tırnaklarında incelme, enine çizgilenme ve tırnak plağının orta kısmında çöküklük saptandı. Boyunda kitle veya tiroid bezinde büyüme yok.",
                isAlert: false
            },
            {
                turn: 5, // 4. Yanlışta açılır
                title: "Anamnez #2",
                text: "Detaylı sorgulamada hasta son aylarda buzdolabından sürekli buz çıkarıp kıtır kıtır çiğnediğini ve baharatlı yiyecekler yediğinde dilinin çok yandığını ekliyor.",
                isAlert: true
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Laboratuvar & Spesifik Sonuçlar",
                text: "Laboratuvarda Hb: 8.2 g/dL, MCV: 64 fL, Ferritin: 4 ng/mL olarak sonuçlandı. Baryumlu özofagus grafisinde ve üst GİS endoskopisinde üst özofageal sfinkterin hemen altında, lümeni kısmen daraltan ince, eksantrik yerleşimli mukozal perde izlendi; biyopside malignite saptanmadı.",
                isAlert: true
            }
        ]
    }
];