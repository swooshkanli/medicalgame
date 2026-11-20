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
    MALIGNITE: "Neoplastik", //malignite?
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
    FTR: "Fizik Tedavi ve Rehabilitasyon",
    BEYIN_CERRAHI: "Beyin ve Sinir Cerrahisi"
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
        name: "Primer Biliyer Kolanjit",
        aliases: "PBK, PBC",
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
        name: "Sistemik Lupus Eritematozus",
        aliases: "SLE",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.NEFROLOJI }
    },
    {
        id: "akut_psikotik_atak",
        name: "Akut Psikotik Atak",
        aliases: "Şizofrenik",
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
        aliases: "RA",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "ankilozan_spondilit",
        name: "Ankilozan Spondilit",
        aliases: "AS",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "reaktif_artrit",
        name: "Reaktif Artrit",
        aliases: "Reiter Artriti",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "ailevi_akdeniz_atesi",
        name: "Ailevi Akdeniz Ateşi",
        aliases: "FMF",
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
        name: "Önemi Bilinmeyen Monoklonal Gammopati",
        aliases: "MGUS",
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
        aliases: "MM",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    // --- YENİ EKLENEN HASTALIKLAR (Kardiyoloji, Göğüs, Acil ve Vasküler) ---
    {
        id: "akut_stemi",
        name: "Akut ST Elevasyonlu Miyokard Enfarktüsü",
        aliases: "STEMI",
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
        aliases: "SBE",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "kalp_yetmezligi_dekompanse",
        name: "Akut Dekompanse Kalp Yetmezliği",
        aliases: "Dekompanse Düşük Ejeksiyon Fraksiyonlu Kalp Yetersizliği",
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
        aliases: "Anafilaksi, Alerjik, Hipersensitivite",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ACIL, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "idiyopatik_pulmoner_fibrozis",
        name: "İdiyopatik Pulmoner Fibrozis",
        aliases: "IPF",
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
        aliases: "ÜK, UK",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "colyak_hastaligi",
        name: "Çölyak Hastalığı",
        aliases: "Gluten Enteropatisi",
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
        name: "Asetaminofen İntoksikasyonu",
        aliases: "Parol, Parasetamol, Parasetamol Zehirlenmesi",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.ACIL, secondary: BRANS.GASTRO }
    },

    // --- Endokrinoloji & Metabolizma ---
    {
        id: "diyabetik_ketoasidoz",
        name: "Diyabetik Ketoasidoz",
        aliases: "DKA",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.ACIL }
    },
    {
        id: "graves_hastaligi",
        name: "Graves Hastalığı",
        aliases: "Basedow",
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
        aliases: "Feo, Pheochrom",
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
        name: "Subaraknoid Kanama",
        aliases: "SAK",
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
        name: "Guillain-Barré Sendromu",
        aliases: "GBS",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.NOROLOJI, secondary: null }
    },
    {
        id: "multipl_skleroz",
        name: "Multipl Skleroz",
        aliases: "MS",
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
        aliases: "Depresyon",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.FONKSIYONEL, secondary: null },
        brans: { primary: BRANS.PSIKIYATRI, secondary: null }
    },

    // --- Nefroloji, Üroloji & Kadın Doğum ---
    {
        id: "poststreptokoksik_gn",
        name: "Akut Poststreptokoksik Glomerülonefrit",
        aliases: "APSGN",
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
        name: "Üreterolitiyazis",
        aliases: "Nefrolitiyazis, Renal Kolik, Böbrek Taşı, Taş",
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
        name: "Derin Ven Trombozu",
        aliases: "DVT",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ORTOPEDI }
    },
    {
        id: "henoch_schonlein",
        name: "IgA Vasküliti (Henoch-Schönlein Purpurası)",
        aliases: "Henöch-Schönlein Purpurası",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.PEDIATRI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "miyofasiyal_agri_sendromu",
        name: "Miyofasial Ağrı Sendromu",
        aliases: "MAS",
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
        aliases: "Folik Asit Eksikliği Anemisi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "b12_eksikligi_anemisi",
        name: "Vitamin B12 Eksikliği",
        aliases: "B12 Vitamin Eksikliği, B12 Eksikliği, Pernisiyöz Anemi, Pernisiyoz Anemi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "subakut_kombine_dejenerasyon",
        name: "Subakut Kombine Dejenerasyon",
        aliases: "SKD, SAKD",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.NOROLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "otoimmun_hemolitik_anemi",
        name: "Otoimmün Hemolitik Anemi",
        aliases: "OİHA",
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
        name: "Glukoz-6-Fosfat Dehidrogenaz Eksikliği",
        aliases: "G6PD, G6PD Eksikliği, Favizm, Glikoz-6-Fosfat Dehidrogenaz Eksikliği, Glikoz 6 Fosfat Dehidrogenaz Eksikliği",
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
        name: "Trombotik Trombositopenik Purpura",
        aliases: "TTP",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.NEFROLOJI }
    },
    {
        id: "itp",
        name: "İmmün Trombositopenik Purpura",
        aliases: "ITP, İTP, İdiyopatik Trombositopenik Purpura",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.IDIYOPATIK },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.PEDIATRI }
    },
    {
        id: "hit",
        name: "Heparin İlişkili Trombositopeni)",
        aliases: "HIT",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "hus",
        name: "Hemolitik Üremik Sendrom",
        aliases: "HÜS",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "dik",
        name: "Dissemine Intravasküler Koagülasyon",
        aliases: "DIC, DİC, DİK, DIK, Yaygın Damariçi Pıhtılaşma, YDP",
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
        name: "Akut Lenfoblastik Lösemi",
        aliases: "ALL",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "aml",
        name: "Akut Miyeloid Lösemi",
        aliases: "AML",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "kml",
        name: "Kronik Miyeloid Lösemi",
        aliases: "KML",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "kll",
        name: "Kronik Lenfositer Lösemi",
        aliases: "KLL",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "sacli_hucreli_losemi",
        name: "Saçlı Hücreli Lösemi",
        aliases: "Hairy Cell",
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
        name: "Non-Hodgkin Lenfoma",
        aliases: "NHL",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.ONKOLOJI, secondary: BRANS.HEMATOLOJI }
    },
    {
        id: "polisitemia_vera",
        name: "Polisitemia Vera",
        aliases: "PV",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.HEMATOLOJI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "enfeksiyoz_mononukleoz",
        name: "Enfeksiyöz Mononükleoz",
        aliases: "EBV, Epstein Barr, İnfeksiyoz Mononükleoz",
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
        name: "Paroksismal Nokturnal Hemoglobinüri",
        aliases: "PNH, Paroksismal Gece Hemoglobinürisi",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },
    {
        id: "miyelodisplastik_sendrom",
        name: "Miyelodisplastik Sendrom",
        aliases: "MDS",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.KLONAL, secondary: null },
        brans: { primary: BRANS.HEMATOLOJI, secondary: null }
    },


    // --- ROMATOLOJİ: BÜYÜK, ORTA VE KÜÇÜK ÇAPLI DAMAR VASKÜLİTLERİ ---
    {
        id: "temporal_arterit",
        name: "Dev Hücreli (Temporal) Arterit",
        aliases: "Temporal Arterit Vasküliti",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.NOROLOJI }
    },
    {
        id: "takayasu_arteriti",
        name: "Takayasu Arteriti",
        aliases: "Takayasu Arteriti Vasküliti",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.INFLAMATUAR },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "poliarteritis_nodoza",
        name: "Poliarteritis Nodoza",
        aliases: "PAN Vasküliti",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "buerger_hastaligi",
        name: "Buerger Hastalığı (Tromboanjitis Obliterans)",
        aliases: "Buerger Vasküliti",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.TOKSIK },
        brans: { primary: BRANS.KARDIYOLOJI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "wegener_gpa",
        name: "Granülomatöz Polianjiit",
        aliases: "GPA, Wegener Granülomatozisi Vasküliti",
        seyir: SEYIR.SUBAKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.GOGUS }
    },
    {
        id: "churg_strauss_egpa",
        name: "Eozinofilik Granülomatöz Polianjiit",
        aliases: "EGPA, Churg-Strauss, Churg Strauss Vasküliti",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.OTOIMMUN },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.GOGUS }
    },
    {
        id: "mikroskopik_polianjiit",
        name: "Mikroskopik Polianjiit",
        aliases: "MPA Vasküliti",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.NEFROLOJI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "kriyoglobulinemik_vaskulit",
        name: "Esansiyel Mikst Kriyoglobulinemi",
        aliases: "Kriyoglobulinemik Vaskülit",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.ENFEKSIYOZ },
        brans: { primary: BRANS.ROMATOLOJI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "lokositoklastik_vaskulit",
        name: "Kütanöz Lökositoklastik Vaskülit",
        aliases: "Hipersensitivite Vasküliti",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.DERMATOLOJI, secondary: BRANS.ROMATOLOJI }
    },
    {
        id: "eriskin_still",
        name: "Erişkin Still Hastalığı",
        aliases: "ESH",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: null },
        brans: { primary: BRANS.ROMATOLOJI, secondary: null }
    },
    {
        id: "polimyaljiya_romatika",
        name: "Polimyaljiya Romatika",
        aliases: "PMR",
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
        name: "Malarya",
        aliases: "Sıtma, Malaria, Falciparum, Vivax, Ovale, Plasmodium",
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
        name: "Kırım Kongo Kanamalı Ateşi",
        aliases: "KKKA",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.VASKULER },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.ACIL }
    },
    {
        id: "kizil",
        name: "Kızıl",
        aliases: "Scarlet Fever",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "kizamik",
        name: "Kızamık",
        aliases: "Rubeola",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "kizamikcik",
        name: "Kızamıkçık",
        aliases: "Rubella",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "5_hastalik",
        name: "5. Hastalık (Eritema İnfeksiyozum)",
        aliases: "Beşinci Hastalık, Parvovirus B19, 5., 5. Hastalık, Eritema Enfeksiyozum",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "6_hastalik",
        name: "6. Hastalık (Roseola Infantum)",
        aliases: "Altıncı Hastalık, HHV-6, HHV6, Herpes 6, 6., 6. Hastalık",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "kawasaki",
        name: "Kawasaki Hastalığı",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.VASKULER, secondary: MEKANIZMA.INFLAMATUAR }, // Orta çaplı damar vasküliti -> >=5 gün dirençli ateş, konjonktivit, çilek dili, el-ayak ödemi
        brans: { primary: BRANS.PEDIATRI, secondary: BRANS.KARDIYOLOJI }
    },
    {
        id: "su_cicegi",
        name: "Su Çiçeği (Varicella Zoster Virus)",
        aliases: "VZV, Varisella, Suçiçeği",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "zona",
        name: "Zona (Herpes Zoster Virus)",
        aliases: "HZV",
        seyir: SEYIR.KRONIK_AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "el_ayak_agiz",
        name: "El-Ayak-Ağız Hastalığı",
        aliases: "Coxsackie A",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null },
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI }
    },
    {
        id: "meningokok_sepsis",
        name: "Meningokok Sepsisi",
        aliases: "Neisseria Meningitidis Sepsisi",
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
        name: "Lyme Hastalığı",
        aliases: "Borrelia Burgdorferi",
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
        name: "Akut Romatizmal Ateş",
        aliases: "ARA",
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
    {
        id: "ilac_erupsiyonu",
        name: "Makülopapüler İlaç Döküntüsü",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.INFLAMATUAR }, // Tip IV aşırı duyarlılık reaksiyonu -> Antibiyotik (amoksisilin vb.) sonrası kaşıntılı döküntü
        brans: { primary: BRANS.DERMATOLOJI, secondary: BRANS.ACIL }
    },




    //KADIN DOĞUM
// --- JİNEKOLOJİK ENDOKRİNOLOJİ & PKOS AYIRICI TANILARI ---
    {
        id: "pkos",
        name: "Polikistik Over Sendromu",
        aliases: "PKOS, PCOS",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.IDIYOPATIK }, // İnsülin direnci, hiperandrojenizm ve multifaktöriyel/idiyopatik zemin
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "kah",
        name: "Konjenital Adrenal Hiperplazi",
        aliases: "KAH, GBKAH, Geç Başlayan Konjenital Adrenal Hiperplazi",
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
        id: "sertoli_leydig_hucreli_tumor",
        name: "Androjen Salgılayan Over Tümörü (Sertoli-Leydig)",
        seyir: SEYIR.SUBAKUT, // PKOS'un aksine haftalar/aylar içinde hızla gelişen virilizasyon (ses kalınlaşması, klitoromegali)!
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.METABOLIK }, // Seks kord-stromal neoplazi + Ağır hiperandrojenemi
        brans: { primary: BRANS.KADIN_DOGUM, secondary: BRANS.ONKOLOJI }
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
        name: "Plummer-Vinson Sendromu",
        aliases: "Paterson-Brown-Kelly Sendromu, Plummer Winson, Plumer Winson, Plumer Vinson",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.MEKANIK }, // Ağır demir/nütrisyonel eksiklik + Mukozal atrofi ve fibrotik web gelişimi
        brans: { primary: BRANS.GASTRO, secondary: BRANS.HEMATOLOJI } // Disfaji/Endoskopik dilatasyon + Demir eksikliği anemisi
    },





// --- ÖZOFAGUS HASTALIKLARI & DİSMOTİLİTE PAKETİ ---
    {
        id: "akalazya",
        name: "Akalazya",
        aliases: "Özefagus Akalazya, Özafagus Akalazya, Özofagus Akalazya",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: MEKANIZMA.DEJENERATIF    }, // Miyenterik (Auerbach) pleksusta inhibitör gangliyon hücre kaybı
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI } // Manometri/Pnömatik dilatasyon + Heller miyotomisi
    },
    {
        id: "diffuz_ozofagus_spazmi",
        name: "Diffüz Özofageal Spazm",
        aliases: "DÖS, DES, Özefageal Spazm, Özafageal Spazm",
        seyir: SEYIR.KRONIK_AKUT, // Kronik dismotilite zemininde anjina pektorisi taklit eden akut göğüs ağrısı atakları!
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.MEKANIK }, // Koordine olmayan spastik kontraksiyonlar + Nöromüsküler disfonksiyon
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "reflu_ozofajiti",
        name: "Gastroözofageal Reflü Hastalığı",
        aliases: "GÖRH, GERD, GERH, Reflux, Özefajit, Özofajit, Özafajit",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.METABOLIK }, // Asit-pepsin reflüsüne bağlı kimyasal mukozal inflamasyon + AÖS gevşekliği
        brans: { primary: BRANS.GASTRO, secondary: null }
    },
    {
        id: "barrett_ozofagusu",
        name: "Barrett Özofagusu",
        aliases: "Baret, Barrett, Barett, Barret, Özafagus Barrett, Özefagus Barrett",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.MALIGNITE }, // Kronik asit hasarına sekonder intestinal metaplazi + Adenokarsinom prekürsörü
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ONKOLOJI }
    },
    {
        id: "ozofagus_kanseri",
        name: "Özofagus Kanseri",
        aliases: "Özefagus Kanseri, Özafagus Kanseri, Adenokarsiom Özofagus, Skuamöz Karsinom Özofagus",
        seyir: SEYIR.SUBAKUT, // Haftalar-aylar içinde hızla ilerleyen (katıdan sıvıya) mekanik disfaji ve ağır kilo kaybı
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: null },
        brans: { primary: BRANS.ONKOLOJI, secondary: BRANS.GASTRO }
    },
    {
        id: "candida_ozofajiti",
        name: "Candida Özofajiti",
        aliases: "Candida albicans özefajiti, candida özafajiti",
        seyir: SEYIR.AKUT, // Veya SUBAKUT; şiddetli odinofaji (yutarken ağrı) ile başvurur
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR }, // Fırsatçı fungal enfeksiyon + İmmünsüpresyon / İnhaler steroid zemini
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "eozinofilik_ozofajit",
        name: "Eozinofilik Özofajit",
        aliases: "eozinofilik özefajit, eosinofilik özofajit, özonofilik özafajit",
        seyir: SEYIR.KRONIK_AKUT, // Kronik atopik/alerjik zemin + Akut gıda takılması (food impaction) acili ile başvuru!
        mekanizma: { primary: MEKANIZMA.ALERJIK, secondary: MEKANIZMA.INFLAMATUAR }, // Th2/Alerjik immün yanıt + Trakealize (halkalı) özofagus inflamasyonu
        brans: { primary: BRANS.GASTRO, secondary: null } // Veya varsa ALLERJI / IMMUNOLOJI
    },
    {
        id: "zenker_divertikulu",
        name: "Zenker Divertikülü",
        aliases: "Faringoözofageal Divertikül",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MEKANIK, secondary: null }, // Killian üçgeninde duvar zayıflığı ve krikofarengeal disfonksiyona bağlı pulsiyon herniasyonu
        brans: { primary: BRANS.GASTRO, secondary: BRANS.GENEL_CERRAHI } // Veya KBB / GENEL_CERRAHI
    },
    {
        id: "mallory_weiss_sendromu",
        name: "Mallory-Weiss Sendromu",
        aliases: "Malory Weiss, Mallory Veiss",
        seyir: SEYIR.AKUT,
        mekanizma: { primary: MEKANIZMA.TRAVMATIK, secondary: MEKANIZMA.VASKULER }, // Şiddetli öğürme/kusmaya bağlı gastroözofageal bileşkede longitudinal mukozal yırtık + Üst GİS kanaması
        brans: { primary: BRANS.ACIL, secondary: BRANS.GASTRO }
    },
    {
        id: "boerhaave_sendromu",
        name: "Boerhaave Sendromu",
        aliases: "Spontan Özafagus Rüptürü, Spontan Özefagus Rüptürü, Ani Özofagus Rüptürü",
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
        aliases: "Keratokonjunktivitis sicca",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR }, // Anti-SSA (Ro) / Anti-SSB (La) aracılı otoimmün ekzokrin bez yıkımı ve lenfositik infiltrasyon
        brans: { primary: BRANS.ROMATOLOJI, secondary: null } // Veya varsa GOZ / KBB
    },




    // --- DERMATOLOJİ: VİTİLİGO & HİPOPİGMENTASYON AYIRICI TANILARI ---
    {
        id: "vitiligo",
        name: "Vitiligo",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.DEJENERATIF }, // CD8+ T hücre aracılı melanosit yıkımı ve kalıcı pigment kaybı
        brans: { primary: BRANS.DERMATOLOJI, secondary: null }
    },
    {
        id: "tinea_versikolor",
        name: "Tinea Versikolor (Pitriyazis Versikolor)",
        seyir: SEYIR.KRONIK, // Yaz aylarında sık tekrarlayan kronik yüzeyel mikoz (Seyir yeşil yanarak oyuncuyu 3. tura kadar şaşırtır!)
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: null }, // Malassezia furfur + Azelaik asit ile melanogenez inhibisyonu
        brans: { primary: BRANS.DERMATOLOJI, secondary: BRANS.ENFEKSIYON }
    },
    {
        id: "pitriyazis_alba",
        name: "Pitriyazis Alba",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.INFLAMATUAR, secondary: MEKANIZMA.OTOIMMUN }, // Atopik dermatit spektrumunda hafif egzamatöz inflamasyon sonrası hipopigmentasyon
        brans: { primary: BRANS.DERMATOLOJI, secondary: null } // Enum'da PEDIATRI varsa secondary: BRANS.PEDIATRI yapabilirsin
    },
    {
        id: "lepra",
        name: "Lepra (Hansen Hastalığı)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.ENFEKSIYOZ, secondary: MEKANIZMA.INFLAMATUAR }, // Mycobacterium leprae granülomatöz enfeksiyonu + Hipopigmente anestezik plaklar
        brans: { primary: BRANS.ENFEKSIYON, secondary: BRANS.DERMATOLOJI } // Periferik sinir tutulumu + Kutanöz lezyonlar
    },
    {
        id: "liken_sklerozus",
        name: "Liken Sklerozus",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.INFLAMATUAR }, // Porselen beyazı atrofik/sklerotik plaklar
        brans: { primary: BRANS.DERMATOLOJI, secondary: BRANS.KADIN_DOGUM } // Anogenital ve ekstragenital tutulum
    },
    {
        id: "kimyasal_lokoderma",
        name: "Kimyasal Lökoderma (Toksik Depigmentasyon)",
        seyir: SEYIR.SUBAKUT, // Fenol/katekol/hidrokinon gibi melanositotoksik ajan maruziyeti sonrası haftalar-aylar içinde gelişir
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.DEJENERATIF },
        brans: { primary: BRANS.DERMATOLOJI, secondary: null }
    },
    {
        id: "mikozis_fungoides",
        name: "Mikozis Fungoides",
        aliases: "Kutanöz T-Hücreli Lenfoma, Mycosis Fungoides, Mykozis Fungoides",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.INFLAMATUAR }, // Hipopigmente varyantı gençlerde vitiligoyu birebir taklit edebilir
        brans: { primary: BRANS.DERMATOLOJI, secondary: BRANS.HEMATOLOJI }
    },


    // --- HİPOFİZ, ENDOKRİN & ERKEKTE LİBİDO KAYBI PAKETİ ---
    {
        id: "prolaktinoma",
        name: "Prolaktinoma",
        aliases: "Hiperprolaktinemi",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null }, // Benign laktotrof adenomu -> Hiperprolaktinemi ile GnRH baskılanması (sekonder hipogonadizm)
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.BEYIN_CERRAHI } // İlk basamak medikal (kabergolin) + Kiazma basısında transsfenoidal cerrahi
    },
    {
        id: "nonfonksiyone_hipofiz_adenomu",
        name: "Nonfonksiyone Hipofiz Adenomu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.DEJENERATIF }, // Hormon salgılamayan kitle + Stalk effect ile hafif hiperprolaktinemi ve hipopituitarizm
        brans: { primary: BRANS.BEYIN_CERRAHI, secondary: BRANS.ENDOKRIN } // Semptomatik kiazma basısında ilk basamak cerrahi (Prolaktinoma vakasında Branş SARI yanar!)
    },
    {
        id: "akromegali",
        name: "Akromegali",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.DEJENERATIF }, // Somatotrof adenomu (GH/IGF-1 artışı) + Sık eşlik eden prolaktin ko-sekresyonu
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.BEYIN_CERRAHI }
    },
    {
        id: "kraniyofarinjiyoma",
        name: "Kraniyofarinjiyoma",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.METABOLIK }, // Rathke kesesi artığı suprasellar kitle + Optik kiazma ve hipofiz sapı basısı
        brans: { primary: BRANS.BEYIN_CERRAHI, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "hipotalamus_tumoru",
        name: "Hipofiz Sapı / Hipotalamus Tümörü",
        seyir: SEYIR.SUBAKUT, // Germinom, gliom veya metastazlarda aylar içinde hızlanan kitle etkisi, baş ağrısı ve görme kaybı
        mekanizma: { primary: MEKANIZMA.MALIGNITE, secondary: MEKANIZMA.METABOLIK }, // İnfiltratif tümör + Stalk basısıyla sekonder hiperprolaktinemi ve gonadotropin kaybı
        brans: { primary: BRANS.BEYIN_CERRAHI, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "primer_hipogonadizm",
        name: "Primer Hipogonadizm (Testiküler Yetmezlik)",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.DEJENERATIF }, // Hipergonadotropik hipogonadizm (yüksek LH/FSH, düşük testosteron)
        brans: { primary: BRANS.UROLOJI, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "klinefelter",
        name: "Klinefelter Sendromu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK }, // Seminifer tübül disgenezi -> Küçük sert testisler, jinekomasti, seyrek kıllanma
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.UROLOJI }
    },
    {
        id: "kallmann",
        name: "Kallmann Sendromu",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.GENETIK, secondary: MEKANIZMA.METABOLIK }, // GnRH nöron göç defekti -> Konjenital hipogonadotropik hipogonadizm + Anozmi
        brans: { primary: BRANS.ENDOKRIN, secondary: BRANS.NOROLOJI }
    },
    {
        id: "hemokromatozis",
        name: "Herediter Hemokromatozis",
        aliases: "Hemakromatozis",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.GENETIK }, // Ön hipofizde demir birikimine bağlı sekonder hipogonadizm + Karaciğer/pankreas tutulumu
        brans: { primary: BRANS.GASTRO, secondary: BRANS.ENDOKRIN }
    },
    {
        id: "hashimoto",
        name: "Hashimoto Tiroiditi",
        aliases: "Hashimato, Haşimato, Haşimoto, Otoimmün tiroidit",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.OTOIMMUN, secondary: MEKANIZMA.METABOLIK }, // Artmış TRH ile laktotrof uyarımı (sekonder hiperprolaktinemi) + Yorgunluk ve libido kaybı
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "uyku_apnesi",
        name: "Obstrüktif Uyku Apnesi Sendromu",
        aliases: "OUAS, OSAS",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.DEJENERATIF, secondary: MEKANIZMA.VASKULER }, // Gece hipoksisi ve uyku fragmantasyonu -> Sabah baş ağrısı, gündüz bitkinliği, düşük testosteron
        brans: { primary: BRANS.GOGUS, secondary: BRANS.NOROLOJI }
    },
    {
        id: "iyot_eksikligi_hipotiroidisi",
        name: "İyot Eksikliği Hipotiroidisi",
        aliases: "Guatr İyot",
        seyir: SEYIR.KRONIK,
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: null }, // Tiroid hormon sentezi için substrat eksikliği -> Kompansatuar TSH artışı ve guatr
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "ilac_induklu_hipotiroidi",
        name: "İlaç İndüklü Hipotiroidi",
        aliases: "Guatr İlaç",
        seyir: SEYIR.SUBAKUT, // İlaç başlanmasını takip eden haftalar-aylar içinde hormon sentez/salınım bloğu (Wolff-Chaikoff etkisi vb.)
        mekanizma: { primary: MEKANIZMA.TOKSIK, secondary: MEKANIZMA.METABOLIK },
        brans: { primary: BRANS.ENDOKRIN, secondary: null }
    },
    {
        id: "miksodem_komasi",
        name: "Miksödem Koması (Dekompanse Hipotiroidi)",
        seyir: SEYIR.KRONIK_AKUT, // Uzun süreli tedavisiz hipotiroidi zemininde enfeksiyon/soğukla tetiklenen akut hipotermi, bradikardi ve bilinç kaybı
        mekanizma: { primary: MEKANIZMA.METABOLIK, secondary: MEKANIZMA.DEJENERATIF },
        brans: { primary: BRANS.ACIL, secondary: BRANS.ENDOKRIN }
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
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Laboratuvar & Spesifik Sonuçlar",
                text: "Laboratuvarda Hb: 8.2 g/dL, MCV: 64 fL, Ferritin: 4 ng/mL olarak sonuçlandı. Baryumlu özofagus grafisinde ve üst GİS endoskopisinde üst özofageal sfinkterin hemen altında, lümeni kısmen daraltan ince, eksantrik yerleşimli mukozal perde izlendi; biyopside malignite saptanmadı.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #6",
        customSubTitle: "",
        targetDiseaseId: "vitiligo",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "21 yaşında erkek hasta sıcak bir yaz günü kafasını gözlerine kadar kapatan kışlık bere ve ellerine eldiven giymiş halde polikliniğe başvurdu.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır
                title: "Anamnez",
                text: "Hasta üşüdüğü için değil, insanların bakışlarından rahatsız olduğu ve güneşten korunmak için böyle giyindiğini söylüyor. Son bir yıldır özellikle güneşli havalarda ellerinde ve alnında yanma ve kızarıklık oluştuğunu, bu nedenle bu bölgeleri mümkün olduğunca kapalı tuttuğunu; beresini çıkardığında ise arkadaşlarının sürekli saçının ön kısmına bakıp sorular sormasından çok bunaldığını belirtiyor.",
                isAlert: false
            },
            {
                turn: 4, // 3. Yanlışta açılır
                title: "Fizik Muayene",
                text: "Vital bulgular normal. Hasta çekinerek bere ve eldivenlerini çıkardığında saçlı deride dökülme veya seyrelme olmadığı, ancak alnın ön saç çizgisinde ve sağ kaşın iç kısmında bir kıl tutamının belirgin şekilde beyazladığı görüldü. El sırtlarında, parmak eklemlerinde ve göz çevresinde farklı boyutlarda, çevre deriden daha açık renkli, yer yer birleşme eğilimi gösteren yamalar saptandı. Lezyonlarda kepeklenme, bül, ciltte sertleşme veya dokunma-ağrı duyusu kaybı yok.",
                isAlert: false
            },
            {
                turn: 5, // 4. Yanlışta açılır
                title: "Anamnez #2",
                text: "Detaylı sorgulamada bu renk değişikliklerinin doğuştan olmadığı; yaklaşık 1.5 yıl önce bisikletten düşüp el sırtını sıyırdıktan sonra yara izinin normal ten rengine dönmeyip beyazlaşmasıyla başladığı, zamanla ellerine ve yüzüne yayıldığı öğrenildi. Herhangi bir kimyasal çözücü veya ağartıcı madde teması yok; annesinde Hashimoto tiroiditi, ablasında ise Tip 1 diyabet öyküsü mevcut.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Laboratuvar & Spesifik Sonuçlar",
                text: "Wood lambası incelemesinde lezyonlar çevre normal deriden keskin sınırlarla ayrılan parlak fildişi beyazı yansıma verdi; lezyon kazıntısının %10 KOH incelemesi (-) sonuçlandı. Laboratuvarda TSH: 6.8 mIU/L, Anti-TPO: (+) ve ANA: (-) saptandı. Biyopside epidermisin bazal tabakasında melanositlerin tamamen kaybolduğu ve lezyon çevresinde CD8+ T lenfosit infiltrasyonu izlendi.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #7",
        customSubTitle: "",
        targetDiseaseId: "prolaktinoma",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "34 yaşında erkek hasta poliklinik odasına girerken sağ omzunu kapı kenarına hafifçe çarpıp mahcup bir şekilde gülümsüyor. Oldukça yorgun ve durgun görünüyor; şakaklarını ovuşturarak koltuğa oturuyor ve söze nasıl başlayacağını bilemez halde yere bakıyor.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır
                title: "Anamnez",
                text: "Hasta aslında eşinin ısrarıyla geldiğini, son 1.5 yıldır cinsel isteğinin neredeyse tamamen kaybolduğunu ve aylardır sabah ereksiyonu yaşamadığını, hatta sanki sakallarının bile daha az gür çıkıyormuş gibi hissettiğini belirtiyor. Bu durumu yoğun iş stresine ve bitkinliğe bağladığını ancak artık endişelenmeye başladığını söylüyor.",
                isAlert: false
            },
            {
                turn: 4, // 3. Yanlışta açılır
                title: "Anamnez #2",
                text: "Hasta her şeyin üst üste geldiğini; başının sürekli ağrıdığını, sanki dikkati dağınıkmış gibi sakarlıklarının arttığını hatta son 2 ayda arabasının hem sağ hem sol yan aynasını toplam 6 kez sürttüğünü ekliyor.",
                isAlert: false
            },
            {
                turn: 5, // 4. Yanlışta açılır
                title: "Fizik Muayene",
                text: "Vital bulgular: TA: 122/76 mmHg, Nabız: 70/dk, Ateş: 36.6°C. Görme alanı muayenesinde her iki gözün dış yarılarında belirgin görme alanı kaybı saptandı; santral görme keskinliği normal. Bilateral hafif jinekomasti ve meme başı çevresinde hassasiyet mevcut; sakal ve vücut kılları seyrek, testis boyutları normal ve varikosel yok. Femoral nabızlar bilateral güçlü ve simetrik; çene, el ve ayaklarda irileşme veya ciltte bronzlaşma izlenmedi.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Laboratuvar & Spesifik Sonuçlar",
                text: "Laboratuvarda Prolaktin: 485 ng/mL, Total Testosteron: 1.3 ng/mL olarak sonuçlandı; LH ve FSH düzeyleri baskılanmış, TSH: 1.9 mIU/L ve IGF-1 düzeyi normal saptandı. Kontrastlı hipofiz MR'ında sella tursikadan suprasellar alana uzanarak optik kiazmaya bası yapan 18 mm çapında makroadenom izlendi.",
                isAlert: true
            }
        ]
    },
    {
        caseNumber: "VAKA #8",
        customSubTitle: "",
        targetDiseaseId: "6_hastalik",
        clues: [
            {
                turn: 1,
                title: "İnspeksiyon / Triyaj",
                text: "11 aylık bebek, elinde yarısı kullanılmış bir şurup şişesiyle oldukça telaşlı görünen anne ve babası tarafından acil polikliniğe getirildi. Bebeğin annesinin kucağında oldukça neşeli olduğu, etrafına gülümseyip muayene kalemine uzandığı görülüyor; zıbının yakasından boynuna doğru uzanan pembe renkli lekeler dikkat çekiyor.",
                isAlert: false
            },
            {
                turn: 2, // 1. Yanlışta açılır
                title: "Anamnez",
                text: "Anne, bebeğin 4 gün önce aniden başlayan ve 39.8°C'ye kadar çıkan inatçı bir ateşi olduğunu, ancak bebeğin keyfinin yerinde kaldığını ve emmeyi hiç bırakmadığını söylüyor. Dün başka bir acile gittiklerini, oradaki doktorların ateş ve boğaz kızarıklığı için şurup verdiklerini; bugün ise bebeğin vücudunda aniden döküntüler çıkınca ilaç alerjisi geliştiğini düşünerek panikle başvurduklarını söylüyor.",
                isAlert: false
            },
            {
                turn: 4, // 3. Yanlışta açılır
                title: "Fizik Muayene",
                text: "Vital bulgular: Ateş: 36.7°C, Nabız: 118/dk, Solunum: 28/dk. Genel durum çok iyi, bebek huzurlu ve aktif. Boyun ve gövdede yoğunlaşan, kol ve bacakların üst kısımlarına hafifçe yayılan ancak yüzü, avuç içlerini ve ayak tabanlarını tamamen koruyan, basmakla solan gül pembesi makülopapüler döküntüler saptandı. Kaşıntı, ürtiker plağı veya ciltte zımpara hissi yok. Göz kapaklarında çok hafif dolgunluk, iki taraflı küçük servikal ve suboksipital lenf nodları mevcut; ağız içinde yumuşak damak ve uvula üzerinde birkaç adet küçük kızarık papül izlendi. Konjonktivit, eksüdatif tonsillit, çilek dili, yanak içinde beyaz leke veya el-ayak ödemi saptanmadı.",
                isAlert: false
            },
            {
                turn: 5, // 4. Yanlışta açılır
                title: "Anamnez #2",
                text: "Zamanlama detaylı sorgulandığında anne, 3 gündür süren yüksek ateşin aslında dün gece aniden ve tamamen düştüğünü, döküntülerin ise ateş normale döndükten birkaç saat sonra önce göğüs ve sırttan başlayıp çıktığını fark ettiğini söylüyor. Bebeğin öksürük, burun akıntısı, ishal veya hırıltısı olmamış; rutin çocukluk çağı aşıları tam ve kreşe giden abisi geçen hafta 2 gün süren hafif ateşli bir enfeksiyon geçirmiş.",
                isAlert: false
            },
            {
                turn: 7, // 6. Yanlışta açılır (Son Şans!)
                title: "Laboratuvar & Spesifik Sonuçlar",
                text: "Yüksek ateş döneminde 2 gün önce dış merkezde alınan tetkiklerde lökosit: 4.200/mm³ (%72 lenfosit hakimiyeti, hafif nötropeni) ve CRP: 0.6 mg/dL olarak sonuçlandı; tam idrar tahlili, boğaz hızlı antijen testi (-) ve kan kültürü steril raporlandı. Çalışılan viral PCR panelinde HHV-6 (+) saptandı.",
                isAlert: true
            }
        ]
    }
];