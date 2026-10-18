// ================= ATLAS TRADE ENGINE =================
// Institutional Performance System, Multi-Device Cloud Sync,
// Multilingual Engine, MT4/MT5 Sync, PnL Sharing & Achievements

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Master Admin Definition
const MASTER_ADMIN_EMAIL = 'satriatrader1@gmail.com';
const MASTER_ADMIN_PASS = 'satria308';

// Server Sync Configuration
let isServerOnline = false;
const API_BASE = window.location.origin.includes('http') ? window.location.origin : 'http://localhost:8000';

// Default User DB Seed (Fallback if offline)
const DEFAULT_USERS_DB = {
  [MASTER_ADMIN_EMAIL]: {
    email: MASTER_ADMIN_EMAIL,
    password: MASTER_ADMIN_PASS,
    name: 'Satria (Master Admin)',
    role: 'admin',
    status: 'approved',
    avatar: '👑',
    bio: 'Lead Market Strategist & Desk Administrator',
    currency: 'USD',
    theme: 'default',
    language: 'en',
    createdAt: '2026-10-01',
    activeAccountId: 'acc-satria-1',
    accounts: [
      { id: 'acc-satria-1', name: 'Apex 150K Funded (Master)', type: 'Prop Firm Funded' },
      { id: 'acc-satria-2', name: 'Topstep 100K Express', type: 'Prop Firm Challenge' }
    ],
    trades: [
      { id: 'tr-sat-1', accountId: 'acc-satria-1', date: '2026-10-01', pair: 'XAUUSD', side: 'BUY', lot: 2.00, entry: 2642.50, exit: 2665.20, pl: 2270.00, status: 'PROFIT', notes: 'London breakout continuation' },
      { id: 'tr-sat-2', accountId: 'acc-satria-1', date: '2026-10-02', pair: 'NAS100', side: 'SELL', lot: 1.50, entry: 20120.00, exit: 20180.00, pl: -450.00, status: 'LOSS', notes: 'Choppy session stop out' },
      { id: 'tr-sat-3', accountId: 'acc-satria-1', date: '2026-10-03', pair: 'EURUSD', side: 'BUY', lot: 3.00, entry: 1.0850, exit: 1.0850, pl: 0.00, status: 'BREAK EVEN', notes: 'Risk off before NFP release' },
      { id: 'tr-sat-4', accountId: 'acc-satria-1', date: '2026-10-04', pair: 'XAUUSD', side: 'BUY', lot: 2.50, entry: 2655.00, exit: 2682.40, pl: 3425.00, status: 'PROFIT', notes: 'NY session expansion' },
      { id: 'tr-sat-5', accountId: 'acc-satria-1', date: '2026-10-07', pair: 'BTCUSDT', side: 'BUY', lot: 1.00, entry: 64100.00, exit: 65800.00, pl: 1700.00, status: 'PROFIT', notes: 'Breakout above weekly resistance' },
      { id: 'tr-sat-6', accountId: 'acc-satria-2', date: '2026-10-05', pair: 'US30', side: 'SELL', lot: 1.00, entry: 42200.00, exit: 42050.00, pl: 750.00, status: 'PROFIT', notes: 'Key level rejection' },
      { id: 'tr-sat-7', accountId: 'acc-satria-2', date: '2026-10-06', pair: 'XAUUSD', side: 'SELL', lot: 1.50, entry: 2680.00, exit: 2690.00, pl: -600.00, status: 'LOSS', notes: 'Failed breakdown' }
    ]
  },
  'alex.turner@alphatrading.com': {
    email: 'alex.turner@alphatrading.com',
    password: 'password123',
    name: 'Alex Turner',
    role: 'trader',
    status: 'approved',
    avatar: '🦁',
    bio: 'FX & Commodities Trader',
    currency: 'USD',
    theme: 'default',
    language: 'en',
    createdAt: '2026-10-02',
    activeAccountId: 'acc-alex-1',
    accounts: [
      { id: 'acc-alex-1', name: 'FTMO 100K Funded', type: 'Prop Firm Funded' },
      { id: 'acc-alex-2', name: 'Personal Swing Account', type: 'Live Personal Broker' }
    ],
    trades: [
      { id: 'tr-al-1', accountId: 'acc-alex-1', date: '2026-10-01', pair: 'EURUSD', side: 'BUY', lot: 2.00, entry: 1.0840, exit: 1.0890, pl: 1000.00, status: 'PROFIT', notes: 'Daily support bounce' },
      { id: 'tr-al-2', accountId: 'acc-alex-1', date: '2026-10-02', pair: 'GBPUSD', side: 'BUY', lot: 2.00, entry: 1.3020, exit: 1.3000, pl: -400.00, status: 'LOSS', notes: 'London stop run' },
      { id: 'tr-al-3', accountId: 'acc-alex-1', date: '2026-10-04', pair: 'XAUUSD', side: 'SELL', lot: 1.50, entry: 2660.00, exit: 2640.00, pl: 1500.00, status: 'PROFIT', notes: '4H orderblock mitigation' },
      { id: 'tr-al-4', accountId: 'acc-alex-1', date: '2026-10-05', pair: 'NAS100', side: 'BUY', lot: 1.00, entry: 20100.00, exit: 20100.00, pl: 0.00, status: 'BREAK EVEN', notes: 'Secured at BE' }
    ]
  },
  'david.chen@propcapital.io': {
    email: 'david.chen@propcapital.io',
    password: 'password123',
    name: 'David Chen',
    role: 'trader',
    status: 'approved',
    avatar: '🐂',
    bio: 'Indices & Gold Scalper',
    currency: 'USD',
    theme: 'default',
    language: 'en',
    createdAt: '2026-10-03',
    activeAccountId: 'acc-dav-1',
    accounts: [
      { id: 'acc-dav-1', name: 'Apex 50K Prop Challenge', type: 'Prop Firm Challenge' }
    ],
    trades: [
      { id: 'tr-dv-1', accountId: 'acc-dav-1', date: '2026-10-02', pair: 'US30', side: 'SELL', lot: 1.00, entry: 42150.00, exit: 42300.00, pl: -750.00, status: 'LOSS', notes: 'Overnight hold loss' },
      { id: 'tr-dv-2', accountId: 'acc-dav-1', date: '2026-10-04', pair: 'NAS100', side: 'BUY', lot: 0.80, entry: 20050.00, exit: 20110.00, pl: 480.00, status: 'PROFIT', notes: 'NY open scalp' },
      { id: 'tr-dv-3', accountId: 'acc-dav-1', date: '2026-10-06', pair: 'XAUUSD', side: 'BUY', lot: 1.00, entry: 2650.00, exit: 2645.00, pl: -250.00, status: 'LOSS', notes: 'Slipped stop' }
    ]
  },
  'sarah.miller@forexdesk.com': {
    email: 'sarah.miller@forexdesk.com',
    password: 'password123',
    name: 'Sarah Miller',
    role: 'trader',
    status: 'approved',
    avatar: '🦅',
    bio: 'Swing FX Trader',
    currency: 'USD',
    theme: 'default',
    language: 'en',
    createdAt: '2026-10-04',
    activeAccountId: 'acc-sar-1',
    accounts: [
      { id: 'acc-sar-1', name: 'The5ers 60K High Stakes', type: 'Prop Firm Funded' }
    ],
    trades: [
      { id: 'tr-sr-1', accountId: 'acc-sar-1', date: '2026-10-01', pair: 'XAUUSD', side: 'BUY', lot: 2.00, entry: 2640.00, exit: 2670.00, pl: 3000.00, status: 'PROFIT', notes: 'Weekly trend following' },
      { id: 'tr-sr-2', accountId: 'acc-sar-1', date: '2026-10-03', pair: 'EURUSD', side: 'SELL', lot: 2.50, entry: 1.0880, exit: 1.0820, pl: 1500.00, status: 'PROFIT', notes: 'ECB speech reaction' },
      { id: 'tr-sr-3', accountId: 'acc-sar-1', date: '2026-10-05', pair: 'GBPUSD', side: 'SELL', lot: 2.00, entry: 1.3050, exit: 1.3050, pl: 0.00, status: 'BREAK EVEN', notes: 'Protected capital' }
    ]
  },
  'marcus.vance@hedgefund.com': {
    email: 'marcus.vance@hedgefund.com',
    password: 'password123',
    name: 'Marcus Vance',
    role: 'trader',
    status: 'pending',
    avatar: '🐺',
    bio: 'Junior Quantitative Analyst',
    currency: 'USD',
    theme: 'default',
    language: 'en',
    createdAt: '2026-10-06',
    activeAccountId: 'acc-mar-1',
    accounts: [
      { id: 'acc-mar-1', name: 'Evaluation 50K Desk', type: 'Prop Firm Challenge' }
    ],
    trades: []
  }
};

// Global App State
let appState = {
  currency: localStorage.getItem('atlas_currency') || 'USD',
  theme: localStorage.getItem('atlas_theme') || 'default',
  language: localStorage.getItem('atlas_language') || 'en',
  currentUserEmail: null,
  inspectingUserEmail: null,
  activeAccountId: null,
  calDate: new Date(),
  filterStatus: 'ALL',
  filterSearch: '',
  adminSearch: '',
  selectedTradeIds: new Set(),
  cachedFeedbacks: [],
  cachedQuestionnaires: []
};

// ================= 5. MULTILINGUAL DICTIONARY (11 LANGUAGES) =================
const I18N = {
  en: {
    brandSubtitle: "Institutional Performance Desk",
    rememberedSession: "Remembered Session",
    signIn: "Sign In",
    approvalRequired: "Approval Required",
    pendingNoticeText: "Your account is awaiting approval from the Desk Administrator. You will be able to sign in once access is granted.",
    tabSignIn: "Sign In",
    tabCreateAccount: "Create Account",
    labelEmail: "Trader Email",
    labelPassword: "Password",
    labelAccountName: "Primary Trading Account Name",
    rememberAccount: "Remember this account",
    needHelp: "Need help?",
    btnSignIn: "Sign In to Dashboard",
    authFootnote: "Institutional encrypted server session. Multi-device sync enabled across desktop, tablet, and mobile.",
    activeAccount: "Active Trading Account",
    deleteAccount: "Delete Account",
    navDashboard: "Dashboard",
    navJournal: "Trade Journal",
    navCalendar: "Daily Performance",
    navAnalytics: "Analytics",
    navAchievements: "Achievements",
    navAdmin: "👑 Master Admin",
    themeLabel: "Theme: Default",
    signOut: "Sign Out",
    inspectMode: "Admin Inspection Mode:",
    viewing: "Currently viewing",
    returnAdmin: "Return to Master Admin",
    headerEyebrow: "TRADING DESK • LIVE TERMINAL",
    pageTitleDashboard: "Dashboard",
    feedbackBtn: "Feedback",
    heroPnlTitle: "Net Realized P&L (Active Account)",
    sharePnLBtn: "Share PnL",
    winRate: "Win Rate",
    profitFactor: "Profit Factor",
    totalTrades: "Total Trades",
    grossProfit: "Gross Profit",
    grossProfitFooter: "Sum of all winning trades",
    grossLoss: "Gross Loss",
    grossLossFooter: "Sum of all losing trades",
    totalLotsTraded: "Total Lots Traded",
    avgLot: "Avg",
    maxDrawdown: "Max Drawdown",
    drawdownFooter: "Peak-to-trough decline",
    equityCurveTitle: "Cumulative Equity Curve",
    equityCurveSubtitle: "Account portfolio trajectory",
    recentExecutionsTitle: "Recent Executions",
    recentExecutionsSubtitle: "P&L distribution of last 12 trades",
    crownBannerText: "DISCIPLINE IS YOUR CROWN",
    crownBannerSub: "Master your mind • Execute your edge • Protect your capital",
    crownBannerSub2: "Daily consistency beats sporadic luck • Protect your crown every single day",
    journalHeading: "Trade Journal",
    journalSubtitle: "Independent trade log for",
    mtSyncBtn: "MT4 / MT5 Sync",
    btnLogNewTrade: "+ Log New Trade",
    optAllStatus: "All Statuses",
    optProfitOnly: "Profit Only",
    optLossOnly: "Loss Only",
    optBEOnly: "Break Even Only",
    optOpenOnly: "Open Only",
    positionsSelected: "positions selected",
    changeStatus: "Change Status:",
    btnApply: "Apply",
    btnDeleteSelected: "Delete Selected",
    btnDeselectAll: "Deselect All",
    colDate: "Date",
    colSymbol: "Symbol",
    colSide: "Side",
    colLot: "Lot Size",
    colEntry: "Entry",
    colExit: "Exit",
    colNetPL: "Net P&L",
    colStatus: "Status",
    colNotes: "Notes & Reflection",
    colActions: "Actions",
    calendarHeading: "Monthly Daily Performance",
    calendarSubtitle: "Track day-by-day whether your trading days were in Profit or Loss.",
    kpiWinningDays: "Winning Days (Profit)",
    kpiLosingDays: "Losing Days (Loss)",
    kpiBEDays: "Break Even Days",
    kpiDayRate: "Profitable Day Rate",
    kpiBestDay: "Best Day P&L",
    calPrev: "Previous",
    calCurrent: "Current Month",
    calNext: "Next",
    analyticsHeading: "Strategy & Edge Analytics",
    analyticsSubtitle: "Comprehensive statistical metrics for the active trading account.",
    bestTrade: "Best Trade",
    bestTradeFooter: "Highest single gain",
    worstTrade: "Worst Trade",
    worstTradeFooter: "Largest single loss",
    winningStreak: "Winning Streak",
    winningStreakFooter: "Consecutive winning trades",
    expectancy: "Trade Expectancy",
    expectancyFooter: "Expected return per trade",
    executionBreakdown: "Execution Breakdown",
    outcomeDistribution: "Outcome Distribution",
    profitableWins: "Profitable Trades (Wins):",
    losingLosses: "Losing Trades (Losses):",
    breakEvenTrades: "Break Even Trades (BE):",
    openPositions: "Open Positions:",
    volumeAnalytics: "Volume & Lot Analytics",
    totalLotsExec: "Total Lots Executed:",
    avgLotSize: "Average Lot Size:",
    winRateExcl: "Win Rate (Excl. BE):",
    riskDrawdown: "Risk & Drawdown",
    avgWinner: "Average Winner:",
    avgLoser: "Average Loser:",
    totalRealizedPL: "Total Realized P&L:",
    achievementsTitle: "🏆 Trader Achievements & Accolades",
    achievementsSubtitle: "Institutional milestones awarded by Atlas Trade for capital growth, risk mastery, and execution discipline.",
    unlockedText: "Unlocked",
    sharePnLModalTitle: "📸 Share Institutional PnL Card",
    sharePnLModalSub: "High-definition branded performance graphic ready for Twitter, Discord, Instagram, and Telegram.",
    downloadPNG: "Download PNG",
    copyImage: "Copy to Clipboard",
    mtSyncTitle: "⚡ MetaTrader 4 & 5 Synchronization Hub",
    profileModalTitle: "Edit Trader Profile",
    uploadPhoto: "Upload Photo",
    traderUsername: "Trader Username / Callsign",
    traderBio: "Trading Style & Bio",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    onboardingTitle: "🎯 Welcome to Atlas Trade — Trader Profile Setup",
    surveyQ1: "What is your primary goal joining Atlas Trade?",
    surveyQ2: "How did you discover Atlas Trade?",
    surveyQ3: "What is your trading profit target & milestone?",
    btnSubmitSurvey: "Complete & Enter Desk →",
    feedbackTitle: "💬 Share Platform Feedback",
    platformRating: "Desk Rating",
    feedbackCategory: "Category",
    feedbackMessage: "Message / Suggestion",
    btnSendFeedback: "Send Feedback",
    noteModalTitle: "📝 Trade Reflection & Strategy Notes",
    notesReflection: "Detailed Notes & Trade Reflection",
    saveNote: "Save Note",
    certModalTitle: "🏆 Trader Institutional Accolade",
    downloadCertificate: "Download Certificate (PNG)",
    logTradeTitle: "Log New Trade",
    formDate: "Date",
    formPair: "Symbol / Pair",
    formSide: "Side",
    formStatus: "Trade Status",
    formLot: "Lot Size (Lots)",
    formEntry: "Entry Price",
    formExit: "Exit Price (Optional if Open)",
    formPL: "Net Realized P&L ($)",
    formNotes: "Notes / Setup Strategy & Reflection (Optional)",
    btnSaveTrade: "Save Trade",
    addAccountTitle: "Add Trading Account",
    accountNameLabel: "Trading Account Name",
    accountTypeLabel: "Account Type",
    btnAddAccountSubmit: "Add Account"
  },
  id: {
    brandSubtitle: "Meja Performa Institusional",
    rememberedSession: "Sesi Tersimpan",
    signIn: "Masuk",
    approvalRequired: "Memerlukan Persetujuan",
    pendingNoticeText: "Akun Anda sedang menunggu persetujuan dari Administrator Desk. Anda dapat masuk setelah akses diberikan.",
    tabSignIn: "Masuk",
    tabCreateAccount: "Buat Akun",
    labelEmail: "Email Trader",
    labelPassword: "Kata Sandi",
    labelAccountName: "Nama Akun Trading Utama",
    rememberAccount: "Ingat akun ini",
    needHelp: "Butuh bantuan?",
    btnSignIn: "Masuk ke Dashboard",
    authFootnote: "Sesi server terenkripsi institusional. Sinkronisasi multi-perangkat aktif untuk laptop, tablet, dan ponsel.",
    activeAccount: "Akun Trading Aktif",
    deleteAccount: "Hapus Akun",
    navDashboard: "Dashboard",
    navJournal: "Jurnal Trading",
    navCalendar: "Performa Harian",
    navAnalytics: "Analisis",
    navAchievements: "Pencapaian",
    navAdmin: "👑 Master Admin",
    themeLabel: "Tema: Default",
    signOut: "Keluar",
    inspectMode: "Mode Inspeksi Admin:",
    viewing: "Sedang melihat",
    returnAdmin: "Kembali ke Master Admin",
    headerEyebrow: "MEJA TRADING • TERMINAL AKTIF",
    pageTitleDashboard: "Dashboard",
    feedbackBtn: "Feedback",
    heroPnlTitle: "Net Realized P&L (Akun Aktif)",
    sharePnLBtn: "Bagikan PnL",
    winRate: "Win Rate",
    profitFactor: "Faktor Profit",
    totalTrades: "Total Posisi",
    grossProfit: "Laba Kotor",
    grossProfitFooter: "Total seluruh transaksi profit",
    grossLoss: "Rugi Kotor",
    grossLossFooter: "Total seluruh transaksi rugi",
    totalLotsTraded: "Total Lot Ditransaksikan",
    avgLot: "Rata-rata",
    maxDrawdown: "Drawdown Maksimal",
    drawdownFooter: "Penurunan dari puncak modal",
    equityCurveTitle: "Kurva Pertumbuhan Ekuitas",
    equityCurveSubtitle: "Trayektori portofolio akun",
    recentExecutionsTitle: "Eksekusi Terakhir",
    recentExecutionsSubtitle: "Distribusi P&L 12 trade terakhir",
    crownBannerText: "DISIPLIN ADALAH MAHKOTAMU",
    crownBannerSub: "Kuasai pikiranmu • Eksekusi rencanamu • Lindungi modalmu",
    crownBannerSub2: "Konsistensi harian mengalahkan keberuntungan sesaat • Jaga mahkotamu setiap hari",
    journalHeading: "Jurnal Trading",
    journalSubtitle: "Catatan transaksi mandiri untuk",
    mtSyncBtn: "Sinkronisasi MT4 / MT5",
    btnLogNewTrade: "+ Catat Posisi Baru",
    optAllStatus: "Semua Status",
    optProfitOnly: "Profit Saja",
    optLossOnly: "Loss Saja",
    optBEOnly: "Break Even Saja",
    optOpenOnly: "Posisi Terbuka",
    positionsSelected: "posisi dipilih",
    changeStatus: "Ubah Status:",
    btnApply: "Terapkan",
    btnDeleteSelected: "Hapus Terpilih",
    btnDeselectAll: "Batalkan Semua",
    colDate: "Tanggal",
    colSymbol: "Simbol",
    colSide: "Posisi",
    colLot: "Ukuran Lot",
    colEntry: "Harga Masuk",
    colExit: "Harga Keluar",
    colNetPL: "P&L Bersih",
    colStatus: "Status",
    colNotes: "Catatan & Evaluasi",
    colActions: "Aksi",
    calendarHeading: "Performa Harian Bulanan",
    calendarSubtitle: "Pantau hari demi hari apakah hari trading Anda Profit atau Loss.",
    kpiWinningDays: "Hari Profit (Hijau)",
    kpiLosingDays: "Hari Rugi (Merah)",
    kpiBEDays: "Hari Break Even",
    kpiDayRate: "Rasio Hari Profit",
    kpiBestDay: "P&L Hari Terbaik",
    calPrev: "Sebelumnya",
    calCurrent: "Bulan Ini",
    calNext: "Berikutnya",
    analyticsHeading: "Analisis Strategi & Statistik",
    analyticsSubtitle: "Metrik komprehensif untuk akun trading yang aktif.",
    bestTrade: "Trade Terbaik",
    bestTradeFooter: "Keuntungan tunggal terbesar",
    worstTrade: "Trade Terburuk",
    worstTradeFooter: "Kerugian tunggal terbesar",
    winningStreak: "Kemenangan Beruntun",
    winningStreakFooter: "Jumlah trade menang berturut-turut",
    expectancy: "Ekspektansi Trade",
    expectancyFooter: "Perkiraan return rata-rata per trade",
    executionBreakdown: "Rincian Eksekusi",
    outcomeDistribution: "Distribusi Hasil Trade",
    profitableWins: "Trade Menang (Profit):",
    losingLosses: "Trade Kalah (Loss):",
    breakEvenTrades: "Trade Break Even (BE):",
    openPositions: "Posisi Masih Terbuka:",
    volumeAnalytics: "Analisis Lot & Volume",
    totalLotsExec: "Total Lot Dieksekusi:",
    avgLotSize: "Rata-rata Ukuran Lot:",
    winRateExcl: "Win Rate (Tanpa BE):",
    riskDrawdown: "Risiko & Drawdown",
    avgWinner: "Rata-rata Kemenangan:",
    avgLoser: "Rata-rata Kerugian:",
    totalRealizedPL: "Total Realized P&L:",
    achievementsTitle: "🏆 Pencapaian & Penghargaan Trader",
    achievementsSubtitle: "Penghargaan institusional dari Atlas Trade atas pertumbuhan modal, manajemen risiko, dan disiplin eksekusi.",
    unlockedText: "Terbuka",
    sharePnLModalTitle: "📸 Bagikan Kartu PnL Institusional",
    sharePnLModalSub: "Grafis performa berkualitas tinggi siap dibagikan ke Telegram, Instagram, Twitter, dan Discord.",
    downloadPNG: "Unduh PNG",
    copyImage: "Salin Gambar",
    mtSyncTitle: "⚡ Pusat Sinkronisasi MetaTrader 4 & 5",
    profileModalTitle: "Edit Profil Trader",
    uploadPhoto: "Unggah Foto",
    traderUsername: "Nama / Callsign Trader",
    traderBio: "Gaya Trading & Bio",
    cancel: "Batal",
    saveChanges: "Simpan Perubahan",
    onboardingTitle: "🎯 Selamat Datang di Atlas Trade — Pengaturan Profil",
    surveyQ1: "Apa tujuan utama Anda bergabung di Atlas Trade?",
    surveyQ2: "Dari mana Anda mengetahui tentang Atlas Trade?",
    surveyQ3: "Apa target tujuan trading Anda?",
    btnSubmitSurvey: "Selesai & Masuk Terminal →",
    feedbackTitle: "💬 Bagikan Kritik & Saran",
    platformRating: "Penilaian Desk",
    feedbackCategory: "Kategori",
    feedbackMessage: "Pesan / Saran Perbaikan",
    btnSendFeedback: "Kirim Masukan",
    noteModalTitle: "📝 Catatan & Evaluasi Posisi Trading",
    notesReflection: "Catatan Rinci & Evaluasi Psikologi",
    saveNote: "Simpan Catatan",
    certModalTitle: "🏆 Penghargaan Institusional Atlas Trade",
    downloadCertificate: "Unduh Sertifikat (PNG)",
    logTradeTitle: "Catat Posisi Baru",
    formDate: "Tanggal",
    formPair: "Simbol / Pasangan",
    formSide: "Posisi",
    formStatus: "Status Trade",
    formLot: "Ukuran Lot",
    formEntry: "Harga Masuk",
    formExit: "Harga Keluar",
    formPL: "P&L Bersih ($)",
    formNotes: "Catatan Setup & Refleksi Strategi (Opsional)",
    btnSaveTrade: "Simpan Trade",
    addAccountTitle: "Tambah Akun Trading",
    accountNameLabel: "Nama Akun Trading",
    accountTypeLabel: "Tipe Akun",
    btnAddAccountSubmit: "Tambah Akun"
  },
  ms: {
    brandSubtitle: "Meja Prestasi Institusi",
    signIn: "Log Masuk",
    tabSignIn: "Log Masuk",
    tabCreateAccount: "Buka Akaun",
    btnSignIn: "Masuk ke Papan Pemuka",
    navDashboard: "Papan Pemuka",
    navJournal: "Jurnal Dagangan",
    navCalendar: "Prestasi Harian",
    navAnalytics: "Analisis",
    navAchievements: "Pencapaian",
    sharePnLBtn: "Kongsi PnL",
    feedbackBtn: "Maklum Balas",
    colNotes: "Nota & Refleksi",
    thanksFeedback: "Terima kasih atas maklum balas anda"
  },
  de: {
    brandSubtitle: "Institutionelles Performance-Desk",
    signIn: "Anmelden",
    tabSignIn: "Anmelden",
    tabCreateAccount: "Konto Erstellen",
    btnSignIn: "Im Terminal Anmelden",
    navDashboard: "Dashboard",
    navJournal: "Handelsjournal",
    navCalendar: "Tagesleistung",
    navAnalytics: "Analytik",
    navAchievements: "Erfolge",
    sharePnLBtn: "GuV Teilen",
    feedbackBtn: "Feedback",
    colNotes: "Notizen & Reflexion",
    thanksFeedback: "Vielen Dank für Ihr Feedback"
  },
  fr: {
    brandSubtitle: "Desk de Performance Institutionnel",
    signIn: "Connexion",
    tabSignIn: "Connexion",
    tabCreateAccount: "Créer un Compte",
    btnSignIn: "Accéder au Tableau de Bord",
    navDashboard: "Tableau de Bord",
    navJournal: "Journal de Trading",
    navCalendar: "Performance Quotidienne",
    navAnalytics: "Analytique",
    navAchievements: "Succès",
    sharePnLBtn: "Partager PnL",
    feedbackBtn: "Retour",
    colNotes: "Notes & Réflexion",
    thanksFeedback: "Merci pour vos retours"
  },
  es: {
    brandSubtitle: "Mesa de Rendimiento Institucional",
    signIn: "Iniciar Sesión",
    tabSignIn: "Iniciar Sesión",
    tabCreateAccount: "Crear Cuenta",
    btnSignIn: "Entrar al Panel",
    navDashboard: "Panel de Control",
    navJournal: "Diario de Trading",
    navCalendar: "Rendimiento Diario",
    navAnalytics: "Analítica",
    navAchievements: "Logros",
    sharePnLBtn: "Compartir PnL",
    feedbackBtn: "Comentarios",
    colNotes: "Notas y Reflexión",
    thanksFeedback: "Gracias por sus comentarios"
  },
  it: {
    brandSubtitle: "Desk di Performance Istituzionale",
    signIn: "Accedi",
    tabSignIn: "Accedi",
    tabCreateAccount: "Crea Account",
    btnSignIn: "Entra nella Dashboard",
    navDashboard: "Dashboard",
    navJournal: "Diario di Trading",
    navCalendar: "Performance Giornaliera",
    navAnalytics: "Analitica",
    navAchievements: "Traguardi",
    sharePnLBtn: "Condividi PnL",
    feedbackBtn: "Feedback",
    colNotes: "Note e Riflessioni",
    thanksFeedback: "Grazie per il tuo feedback"
  },
  zh: {
    brandSubtitle: "机构级交易绩效分析终端",
    signIn: "登录系统",
    tabSignIn: "登录",
    tabCreateAccount: "创建账户",
    btnSignIn: "登录交易终端",
    navDashboard: "仪表盘",
    navJournal: "交易日志",
    navCalendar: "每日盈亏表现",
    navAnalytics: "统计分析",
    navAchievements: "交易成就",
    sharePnLBtn: "分享盈亏海报",
    feedbackBtn: "意见反馈",
    colNotes: "交易心得与笔记",
    thanksFeedback: "感谢您的宝贵建议"
  },
  ja: {
    brandSubtitle: "機関投資家向けトレード分析ターミナル",
    signIn: "ログイン",
    tabSignIn: "サインイン",
    tabCreateAccount: "新規登録",
    btnSignIn: "ダッシュボードへ",
    navDashboard: "ダッシュボード",
    navJournal: "トレード記録",
    navCalendar: "日別損益カレンダー",
    navAnalytics: "パフォーマンス分析",
    navAchievements: "アチーブメント",
    sharePnLBtn: "損益画像を共有",
    feedbackBtn: "フィードバック",
    colNotes: "トレードノート",
    thanksFeedback: "フィードバックありがとうございます"
  },
  th: {
    brandSubtitle: "โต๊ะบันทึกและวิเคราะห์การเทรดสถาบัน",
    signIn: "เข้าสู่ระบบ",
    tabSignIn: "เข้าสู่ระบบ",
    tabCreateAccount: "สร้างบัญชีใหม่",
    btnSignIn: "เข้าสู่หน้าจอเทอร์มินัล",
    navDashboard: "แดชบอร์ด",
    navJournal: "บันทึกการเทรด",
    navCalendar: "ผลงานรายวัน",
    navAnalytics: "สถิติและการวิเคราะห์",
    navAchievements: "รางวัลความสำเร็จ",
    sharePnLBtn: "แชร์รูปภาพ PnL",
    feedbackBtn: "คำติชม",
    colNotes: "บันทึกและข้อคิดการเทรด",
    thanksFeedback: "ขอบคุณสำหรับข้อเสนอแนะของคุณ"
  },
  ar: {
    brandSubtitle: "مكتب الأداء المؤسسي للتداول",
    signIn: "تسجيل الدخول",
    tabSignIn: "تسجيل الدخول",
    tabCreateAccount: "إنشاء حساب",
    btnSignIn: "الدخول إلى منصة التداول",
    navDashboard: "لوحة التحكم",
    navJournal: "سجل الصفقات",
    navCalendar: "الأداء اليومي",
    navAnalytics: "التحليلات والإحصائيات",
    navAchievements: "إنجازات المتداول",
    sharePnLBtn: "مشاركة بطاقة الأرباح",
    feedbackBtn: "إرسال ملاحظات",
    colNotes: "ملاحظات وتأملات الصفقة",
    thanksFeedback: "شكراً جزيلاً لملاحظاتك القيمة"
  }
};

// Apply language translations across UI
function setLanguage(lang) {
  if (!I18N[lang]) lang = 'en';
  appState.language = lang;
  localStorage.setItem('atlas_language', lang);

  document.documentElement.lang = lang;
  document.body.classList.toggle('rtl', lang === 'ar');

  const dict = I18N[lang];
  const enDict = I18N.en;

  // Update elements with data-i18n
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = dict[key] || enDict[key];
    if (translation) {
      el.textContent = translation;
    }
  });

  // Sync selectors
  const authSel = $('#authLangSelect');
  if (authSel) authSel.value = lang;
  const mainSel = $('#mainLangSelect');
  if (mainSel) mainSel.value = lang;

  // Push to server profile if logged in
  if (appState.currentUserEmail && isServerOnline) {
    fetch(`${API_BASE}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: appState.currentUserEmail, language: lang })
    }).catch(console.error);
  }
}

// ================= 8. THEME ENGINE (5 THEMES) =================
// default, classic, deep, dark, light
function setTheme(theme) {
  const allowed = ['default', 'classic', 'deep', 'dark', 'light'];
  if (!allowed.includes(theme)) theme = 'default';
  appState.theme = theme;
  localStorage.setItem('atlas_theme', theme);

  // Preserve rtl class if active
  const isRtl = document.body.classList.contains('rtl');
  document.body.className = `theme-${theme}` + (isRtl ? ' rtl' : '');

  const themeSel = $('#mainThemeSelect');
  if (themeSel) themeSel.value = theme;

  const themeLabel = $('#themeLabel');
  if (themeLabel) {
    const names = { default: 'Default', classic: 'Classic', deep: 'Deep', dark: 'Dark', light: 'Light' };
    themeLabel.textContent = `Theme: ${names[theme]}`;
  }

  // Push to server profile
  if (appState.currentUserEmail && isServerOnline) {
    fetch(`${API_BASE}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: appState.currentUserEmail, theme: theme })
    }).catch(console.error);
  }
}

// ================= 1. SERVER SYNC & DATABASE ENGINE =================
async function initServerSync() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { method: 'GET' });
    if (res.ok) {
      isServerOnline = true;
      updateServerStatusUI(true);

      // Fetch master DB from server
      const dbRes = await fetch(`${API_BASE}/api/db`);
      if (dbRes.ok) {
        const payload = await dbRes.json();
        if (payload.success && payload.users) {
          localStorage.setItem('atlas_users_db', JSON.stringify(payload.users));
        }
      }
    } else {
      isServerOnline = false;
      updateServerStatusUI(false);
    }
  } catch (err) {
    isServerOnline = false;
    updateServerStatusUI(false);
  }
}

function updateServerStatusUI(online) {
  const badge = $('#serverStatusBadge');
  const badgeText = $('#serverStatusText');
  const authPill = $('#authServerStatus');
  const authPillText = $('#authServerStatusText');

  if (online) {
    if (badge) { badge.classList.remove('offline'); }
    if (badgeText) badgeText.textContent = 'Server Sync Active';
    if (authPill) { authPill.classList.remove('offline'); }
    if (authPillText) authPillText.textContent = 'Cloud Server';
  } else {
    if (badge) { badge.classList.add('offline'); }
    if (badgeText) badgeText.textContent = 'Local Cache';
    if (authPill) { authPill.classList.add('offline'); }
    if (authPillText) authPillText.textContent = 'Local Storage';
  }
}

function getUsersDB() {
  const data = localStorage.getItem('atlas_users_db');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (!parsed[MASTER_ADMIN_EMAIL]) {
        parsed[MASTER_ADMIN_EMAIL] = DEFAULT_USERS_DB[MASTER_ADMIN_EMAIL];
        localStorage.setItem('atlas_users_db', JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('atlas_users_db', JSON.stringify(DEFAULT_USERS_DB));
  return DEFAULT_USERS_DB;
}

function saveUsersDB(db) {
  localStorage.setItem('atlas_users_db', JSON.stringify(db));
  // Push full sync to server if online
  if (isServerOnline) {
    fetch(`${API_BASE}/api/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: db })
    }).catch(console.error);
  }
}

function getCurrentUser() {
  const db = getUsersDB();
  const emailToLookup = appState.inspectingUserEmail || appState.currentUserEmail;
  if (!emailToLookup || !db[emailToLookup]) return null;
  return db[emailToLookup];
}

function isCurrentMasterAdmin() {
  return appState.currentUserEmail && appState.currentUserEmail.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
}

function saveCurrentUser(updatedUser) {
  const db = getUsersDB();
  db[updatedUser.email] = updatedUser;
  saveUsersDB(db);
}

// Currency format configuration
const CURRENCY_CONFIG = {
  USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
  EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
  GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
  IDR: { locale: 'id-ID', currency: 'IDR', symbol: 'Rp ' }
};

function fmt(n) {
  const cfg = CURRENCY_CONFIG[appState.currency] || CURRENCY_CONFIG.USD;
  const isIdr = appState.currency === 'IDR';
  return new Intl.NumberFormat(cfg.locale, {
    style: 'currency',
    currency: cfg.currency,
    minimumFractionDigits: isIdr ? 0 : 2,
    maximumFractionDigits: isIdr ? 0 : 2
  }).format(n);
}

function todayDateStr() {
  return new Date().toISOString().slice(0, 10);
}

function showToast(message, type = 'info') {
  const container = $('#toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ================= AUTHENTICATION & SESSIONS =================
function initAuth() {
  getUsersDB();
  const remembered = localStorage.getItem('atlas_remembered_account');
  const logged = localStorage.getItem('atlasLogged');
  const remCard = $('#rememberedCard');

  if (remembered) {
    try {
      const remObj = JSON.parse(remembered);
      if (remCard) {
        remCard.classList.remove('hidden');
        $('#remEmail').textContent = remObj.email;
        $('#remAvatar').textContent = (remObj.name || remObj.email || 'TR').slice(0, 2).toUpperCase();
        
        $('#email').value = remObj.email;
        if (remObj.password) $('#password').value = remObj.password;

        $('#btnQuickLogin').onclick = () => {
          attemptLogin(remObj.email, remObj.password);
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (logged) {
    try {
      const u = JSON.parse(logged);
      const db = getUsersDB();
      if (db[u.email]) {
        appState.currentUserEmail = u.email;
        enterDashboard();
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  $('#auth').classList.remove('hidden');
  $('#app').classList.add('hidden');
}

function showPendingNotice(msg) {
  const box = $('#pendingNoticeBox');
  const text = $('#pendingNoticeText');
  if (box && text) {
    if (msg) text.textContent = msg;
    box.classList.remove('hidden');
  }
}

function hidePendingNotice() {
  const box = $('#pendingNoticeBox');
  if (box) box.classList.add('hidden');
}

async function attemptLogin(emailInput, passwordInput) {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput;

  // Try server login first if online
  if (isServerOnline) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        // Cache user to local DB
        const db = getUsersDB();
        db[email] = data.user;
        saveUsersDB(db);
        loginSuccess(data.user);
        return;
      } else if (data.pending) {
        showPendingNotice(data.message);
        showToast('Account awaiting Master Admin approval.', 'warning');
        return;
      }
    } catch (e) {
      console.warn('Server login fallback to local cache:', e);
    }
  }

  // Fallback to local DB
  const db = getUsersDB();
  const user = db[email];

  if (!user || user.password !== password) {
    showToast('Invalid trader email or password.', 'error');
    return;
  }

  if (user.status !== 'approved' && user.role !== 'admin') {
    showPendingNotice(`Account ${user.email} is pending approval from the Desk Administrator.`);
    showToast('Account awaiting Master Admin authorization.', 'warning');
    return;
  }

  loginSuccess(user);
}

function loginSuccess(user) {
  appState.currentUserEmail = user.email;
  appState.inspectingUserEmail = null;
  appState.activeAccountId = user.activeAccountId || (user.accounts && user.accounts[0] ? user.accounts[0].id : null);

  if (user.theme) setTheme(user.theme);
  if (user.language) setLanguage(user.language);
  if (user.currency) {
    appState.currency = user.currency;
    const curSel = $('#currencySelect');
    if (curSel) curSel.value = user.currency;
  }

  const rememberChecked = $('#rememberMe') ? $('#rememberMe').checked : true;
  localStorage.setItem('atlasLogged', JSON.stringify({ email: user.email, name: user.name }));

  if (rememberChecked) {
    localStorage.setItem('atlas_remembered_account', JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name
    }));
  } else {
    localStorage.removeItem('atlas_remembered_account');
  }

  enterDashboard();
  showToast(`Welcome back, ${user.name}!`, 'success');
}

function enterDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  $('#auth').classList.add('hidden');
  $('#app').classList.remove('hidden');

  const isAdmin = isCurrentMasterAdmin();
  const adminBadge = $('#adminBadge');
  const navAdmin = $('#navAdmin');

  if (isAdmin) {
    if (adminBadge) adminBadge.classList.remove('hidden');
    if (navAdmin) navAdmin.classList.remove('hidden');
  } else {
    if (adminBadge) adminBadge.classList.add('hidden');
    if (navAdmin) navAdmin.classList.add('hidden');
  }

  // Update User Header Display & Avatar
  updateUserDisplay(user);

  // Active account check
  if (!user.activeAccountId && user.accounts && user.accounts.length > 0) {
    user.activeAccountId = user.accounts[0].id;
    saveCurrentUser(user);
  }
  appState.activeAccountId = user.activeAccountId;

  renderAccountSwitcher();
  render();
}

function updateUserDisplay(user) {
  const avatar = $('#userAvatar');
  if (avatar) {
    if (user.avatar && user.avatar.startsWith('data:image')) {
      avatar.textContent = '';
      avatar.style.backgroundImage = `url(${user.avatar})`;
      avatar.style.backgroundSize = 'cover';
    } else if (user.avatar && user.avatar.length <= 4) {
      avatar.textContent = user.avatar;
      avatar.style.backgroundImage = 'none';
    } else {
      avatar.textContent = (user.name || user.email || 'TR').slice(0, 2).toUpperCase();
      avatar.style.backgroundImage = 'none';
    }

    if (user.role === 'admin') {
      avatar.classList.add('admin-avatar');
    } else {
      avatar.classList.remove('admin-avatar');
    }
  }

  const nameEl = $('#userNameDisplay');
  if (nameEl) nameEl.textContent = user.name;
  const emailEl = $('#userAccountEmail');
  if (emailEl) emailEl.textContent = user.email;
}

// ================= 7. POST-REGISTRATION QUESTIONNAIRE =================
function triggerPostRegistrationSurvey(email) {
  const modal = $('#modalOnboarding');
  if (!modal) return;
  modal.classList.remove('hidden');

  const form = $('#onboardingForm');
  form.onsubmit = async e => {
    e.preventDefault();
    const goal = form.querySelector('input[name="onbGoal"]:checked')?.value || 'Prop Firm Funded';
    const source = form.querySelector('input[name="onbSource"]:checked')?.value || 'Community Referral';
    const target = form.querySelector('input[name="onbTarget"]:checked')?.value || '$1,000 - $3,000 / month';

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/onboarding`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, goal, source, target })
        });
      } catch (err) {
        console.error(err);
      }
    }

    modal.classList.add('hidden');
    showPendingNotice(`Registration & Onboarding completed for ${email}! Your account is pending authorization from the Desk Administrator.`);
    showToast('Survey submitted! Awaiting Desk Administrator approval.', 'success');
  };
}

function setupAuthEvents() {
  let isRegistering = false;
  const tabLogin = $('#tabLogin');
  const tabRegister = $('#tabRegister');
  const authSubmit = $('#authSubmit');
  const groupAccount = $('#groupAccountName');

  tabLogin.onclick = () => {
    isRegistering = false;
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    authSubmit.querySelector('span').textContent = I18N[appState.language]?.btnSignIn || 'Sign In to Dashboard';
    groupAccount.classList.add('hidden');
  };

  tabRegister.onclick = () => {
    isRegistering = true;
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    authSubmit.querySelector('span').textContent = I18N[appState.language]?.tabCreateAccount || 'Create Account';
    groupAccount.classList.remove('hidden');
  };

  $('#authForm').onsubmit = async e => {
    e.preventDefault();
    const email = $('#email').value.trim().toLowerCase();
    const password = $('#password').value;
    const accountName = $('#regAccountName').value.trim();

    if (isRegistering) {
      const db = getUsersDB();
      if (db[email]) {
        showToast('This email is already registered. Please sign in.', 'warning');
        return;
      }

      const accId = 'acc-' + Date.now();
      const primaryAccName = accountName || 'Primary Trading Account';
      const newUser = {
        email,
        password,
        name: email.split('@')[0],
        role: 'trader',
        status: 'pending',
        avatar: '🦁',
        bio: 'Prop Firm Trader',
        currency: appState.currency,
        theme: appState.theme,
        language: appState.language,
        createdAt: todayDateStr(),
        activeAccountId: accId,
        accounts: [
          { id: accId, name: primaryAccName, type: 'Prop Firm Funded' }
        ],
        trades: []
      };

      db[email] = newUser;
      saveUsersDB(db);

      // Server registration
      if (isServerOnline) {
        try {
          await fetch(`${API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name: newUser.name, accountName: primaryAccName })
          });
        } catch (err) {
          console.error(err);
        }
      }

      // 7. Trigger Onboarding Questionnaire right after registration!
      triggerPostRegistrationSurvey(email);

      // Reset form
      $('#password').value = '';
      tabLogin.click();
    } else {
      attemptLogin(email, password);
    }
  };

  $('#logoutBtn').onclick = () => {
    localStorage.removeItem('atlasLogged');
    showToast('Signed out of terminal.', 'info');
    setTimeout(() => location.reload(), 300);
  };

  $('#linkForgot').onclick = e => {
    e.preventDefault();
    alert('For assistance with your account or password recovery, please contact desk support.');
  };

  const btnCloseNotice = $('#btnClosePendingNotice');
  if (btnCloseNotice) {
    btnCloseNotice.onclick = () => hidePendingNotice();
  }
}

// ================= ACCOUNT SWITCHER & MANAGEMENT =================
function renderAccountSwitcher() {
  const user = getCurrentUser();
  if (!user) return;

  const select = $('#accountSelect');
  const typeDisplay = $('#accountTypeDisplay');
  const headerName = $('#headerAccountName');
  const journalTitle = $('#journalAccountTitle');

  if (!user.accounts || user.accounts.length === 0) {
    user.accounts = [{ id: 'acc-default', name: 'Primary Funded Desk', type: 'Prop Firm Funded' }];
    user.activeAccountId = 'acc-default';
    saveCurrentUser(user);
  }

  select.innerHTML = user.accounts.map(acc => `
    <option value="${acc.id}" ${acc.id === appState.activeAccountId ? 'selected' : ''}>
      ${acc.name}
    </option>
  `).join('');

  const activeAcc = user.accounts.find(a => a.id === appState.activeAccountId) || user.accounts[0];
  if (activeAcc) {
    appState.activeAccountId = activeAcc.id;
    if (typeDisplay) typeDisplay.textContent = activeAcc.type || 'Trading Account';
    if (headerName) headerName.textContent = activeAcc.name;
    if (journalTitle) journalTitle.textContent = activeAcc.name;
  }

  select.onchange = e => {
    appState.activeAccountId = e.target.value;
    user.activeAccountId = appState.activeAccountId;
    saveCurrentUser(user);

    const changedAcc = user.accounts.find(a => a.id === appState.activeAccountId);
    if (changedAcc) {
      if (typeDisplay) typeDisplay.textContent = changedAcc.type || 'Trading Account';
      if (headerName) headerName.textContent = changedAcc.name;
      if (journalTitle) journalTitle.textContent = changedAcc.name;
    }

    render();
    showToast(`Switched active desk: ${changedAcc ? changedAcc.name : ''}`, 'info');
  };

  const btnDeleteAcc = $('#btnDeleteAccount');
  if (btnDeleteAcc) {
    btnDeleteAcc.onclick = async () => {
      if (user.accounts.length <= 1) {
        showToast('You must keep at least one active trading account.', 'warning');
        return;
      }
      const accToDelete = user.accounts.find(a => a.id === appState.activeAccountId);
      if (!accToDelete) return;

      if (confirm(`Delete trading account "${accToDelete.name}" and all associated trades permanently?`)) {
        user.accounts = user.accounts.filter(a => a.id !== accToDelete.id);
        user.trades = (user.trades || []).filter(t => t.accountId !== accToDelete.id);
        user.activeAccountId = user.accounts[0].id;
        appState.activeAccountId = user.accounts[0].id;

        saveCurrentUser(user);

        if (isServerOnline) {
          try {
            await fetch(`${API_BASE}/api/accounts/delete`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, accountId: accToDelete.id })
            });
          } catch (e) { console.error(e); }
        }

        renderAccountSwitcher();
        render();
        showToast(`Account "${accToDelete.name}" deleted.`, 'info');
      }
    };
  }
}

function setupAccountModal() {
  const modal = $('#modalAccount');
  const btnAdd = $('#btnAddAccount');
  const btnClose = $('#btnCloseAccountModal');
  const btnCancel = $('#btnCancelAccount');

  if (btnAdd) btnAdd.onclick = () => modal.classList.remove('hidden');
  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');
  if (btnCancel) btnCancel.onclick = () => modal.classList.add('hidden');

  $('#accountForm').onsubmit = async e => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const name = $('#newAccountName').value.trim();
    const type = $('#newAccountType').value;
    const newId = 'acc-' + Date.now();

    user.accounts.push({ id: newId, name, type });
    user.activeAccountId = newId;
    appState.activeAccountId = newId;

    saveCurrentUser(user);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/accounts/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, name, type })
        });
      } catch (err) { console.error(err); }
    }

    modal.classList.add('hidden');
    $('#newAccountName').value = '';
    renderAccountSwitcher();
    render();
    showToast(`Added trading account: ${name}`, 'success');
  };
}

// ================= 4. TRADER PROFILE EDIT & AVATAR =================
function setupProfileModal() {
  const modal = $('#modalProfile');
  const btnOpen = $('#btnOpenProfile');
  const btnClose = $('#btnCloseProfileModal');
  const btnCancel = $('#btnCancelProfile');
  const photoInput = $('#profPhotoInput');
  const btnRemovePhoto = $('#btnRemovePhoto');
  const avatarPreview = $('#profAvatarPreview');

  let tempAvatarData = null;

  if (btnOpen) {
    btnOpen.onclick = () => {
      const user = getCurrentUser();
      if (!user) return;

      $('#profName').value = user.name || '';
      $('#profBio').value = user.bio || '';
      tempAvatarData = user.avatar || '';

      updateAvatarPreview(tempAvatarData, user.name);
      modal.classList.remove('hidden');
    };
  }

  function updateAvatarPreview(avatarVal, name) {
    if (!avatarPreview) return;
    if (avatarVal && avatarVal.startsWith('data:image')) {
      avatarPreview.textContent = '';
      avatarPreview.style.backgroundImage = `url(${avatarVal})`;
    } else if (avatarVal && avatarVal.length <= 4) {
      avatarPreview.textContent = avatarVal;
      avatarPreview.style.backgroundImage = 'none';
    } else {
      avatarPreview.textContent = (name || 'TR').slice(0, 2).toUpperCase();
      avatarPreview.style.backgroundImage = 'none';
    }
  }

  // File upload photo
  if (photoInput) {
    photoInput.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image file too large (Max 2MB).', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        tempAvatarData = ev.target.result;
        updateAvatarPreview(tempAvatarData, $('#profName').value);
      };
      reader.readAsDataURL(file);
    };
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.onclick = () => {
      tempAvatarData = '';
      updateAvatarPreview('', $('#profName').value);
    };
  }

  // Preset avatar buttons
  $$('.preset-avatar-btn').forEach(btn => {
    btn.onclick = () => {
      tempAvatarData = btn.getAttribute('data-avatar');
      updateAvatarPreview(tempAvatarData, $('#profName').value);
    };
  });

  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');
  if (btnCancel) btnCancel.onclick = () => modal.classList.add('hidden');

  $('#profileForm').onsubmit = async e => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    user.name = $('#profName').value.trim();
    user.bio = $('#profBio').value.trim();
    user.avatar = tempAvatarData || '';

    saveCurrentUser(user);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            bio: user.bio,
            avatar: user.avatar
          })
        });
      } catch (err) { console.error(err); }
    }

    updateUserDisplay(user);
    modal.classList.add('hidden');
    showToast('Trader profile updated successfully!', 'success');
  };
}

// ================= 9. SHARE FEEDBACK MODAL =================
function setupFeedbackModal() {
  const modal = $('#modalFeedback');
  const btnOpen = $('#btnOpenFeedback');
  const btnClose = $('#btnCloseFeedback');
  const btnCancel = $('#btnCancelFeedback');
  const form = $('#feedbackForm');
  const stars = $$('#starRating .star-item');
  const ratingValInput = $('#fbRatingVal');

  if (btnOpen) btnOpen.onclick = () => modal.classList.remove('hidden');
  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');
  if (btnCancel) btnCancel.onclick = () => modal.classList.add('hidden');

  stars.forEach(star => {
    star.onclick = () => {
      const rating = parseInt(star.getAttribute('data-rating'));
      ratingValInput.value = rating;
      stars.forEach(s => {
        const r = parseInt(s.getAttribute('data-rating'));
        s.classList.toggle('active', r <= rating);
      });
    };
  });

  if (form) {
    form.onsubmit = async e => {
      e.preventDefault();
      const user = getCurrentUser() || { email: 'trader@atlas.io', name: 'Trader' };
      const rating = parseInt(ratingValInput.value || 5);
      const category = $('#fbCategory').value;
      const message = $('#fbMessage').value.trim();

      if (!message) return;

      if (isServerOnline) {
        try {
          await fetch(`${API_BASE}/api/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              rating,
              category,
              message
            })
          });
        } catch (err) { console.error(err); }
      }

      modal.classList.add('hidden');
      $('#fbMessage').value = '';
      
      // Exact user requirement #9: "thanks for your feedback"
      showToast('thanks for your feedback', 'success');
    };
  }
}

// ================= 10. TRADE NOTES VIEWER / EDITOR =================
function setupNoteModal() {
  const modal = $('#modalNote');
  const btnClose = $('#btnCloseNoteModal');
  const btnCancel = $('#btnCancelNote');
  const form = $('#noteForm');

  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');
  if (btnCancel) btnCancel.onclick = () => modal.classList.add('hidden');

  window.openNoteModal = function(tradeId) {
    const user = getCurrentUser();
    if (!user) return;
    const trade = (user.trades || []).find(t => t.id === tradeId);
    if (!trade) return;

    $('#noteTradeId').value = trade.id;
    $('#noteInputText').value = trade.notes || '';
    $('#noteModalSubtitle').textContent = `${trade.pair} • ${trade.side} ${trade.lot} Lot • ${trade.date}`;
    modal.classList.remove('hidden');
  };

  if (form) {
    form.onsubmit = async e => {
      e.preventDefault();
      const user = getCurrentUser();
      if (!user) return;

      const tradeId = $('#noteTradeId').value;
      const newNote = $('#noteInputText').value.trim();

      const trade = (user.trades || []).find(t => t.id === tradeId);
      if (trade) {
        trade.notes = newNote;
        saveCurrentUser(user);

        if (isServerOnline) {
          try {
            await fetch(`${API_BASE}/api/trades/save`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, trade })
            });
          } catch (err) { console.error(err); }
        }

        renderTable();
        modal.classList.add('hidden');
        showToast('Trade reflection notes updated!', 'success');
      }
    };
  }
}

// ================= 2. SHARE PNL AS IMAGE (CANVAS GENERATOR) =================
function setupSharePnLModal() {
  const modal = $('#modalSharePnL');
  const btnOpen = $('#btnOpenSharePnL');
  const btnClose = $('#btnCloseSharePnL');
  const btnDownload = $('#btnDownloadPnL');
  const btnCopy = $('#btnCopyPnL');

  if (btnOpen) {
    btnOpen.onclick = () => {
      modal.classList.remove('hidden');
      generatePnLCard();
    };
  }
  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');

  if (btnDownload) {
    btnDownload.onclick = () => {
      const canvas = $('#pnlCanvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `atlas-pnl-${todayDateStr()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('PnL Image downloaded successfully!', 'success');
    };
  }

  if (btnCopy) {
    btnCopy.onclick = async () => {
      const canvas = $('#pnlCanvas');
      if (!canvas) return;
      try {
        canvas.toBlob(async blob => {
          if (!blob) return;
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            showToast('PnL graphic copied to clipboard!', 'success');
          } else {
            showToast('Please right click image to copy.', 'info');
          }
        });
      } catch (err) {
        showToast('Could not copy automatically. Click Download PNG.', 'warning');
      }
    };
  }
}

function generatePnLCard() {
  const canvas = $('#pnlCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const user = getCurrentUser();
  const metrics = calculateAccountMetrics();
  const activeAcc = (user.accounts || []).find(a => a.id === appState.activeAccountId);

  const w = canvas.width;
  const h = canvas.height;

  // Background
  const bgGrad = ctx.createRadialGradient(w / 2, 0, 50, w / 2, h / 2, 500);
  bgGrad.addColorStop(0, '#101a2e');
  bgGrad.addColorStop(0.5, '#080d18');
  bgGrad.addColorStop(1, '#03050a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Border & Grid
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, w - 32, h - 32);

  // Header Bar: Brand Logo & Title
  ctx.fillStyle = '#06b6d4';
  ctx.font = '900 22px Inter, sans-serif';
  ctx.fillText('ATLAS ', 36, 56);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('TRADE', 114, 56);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px Inter, sans-serif';
  ctx.fillText('INSTITUTIONAL PERFORMANCE DESK', 36, 74);

  // Verified Badge Top Right
  ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(w - 220, 36, 184, 28, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.font = '800 11px Inter, sans-serif';
  ctx.fillText('✓ VERIFIED EXECUTION', w - 204, 54);

  // Trader & Account Info
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 12px Inter, sans-serif';
  ctx.fillText(`TRADER: ${user.name.toUpperCase()}  •  ${(activeAcc ? activeAcc.name : 'PRIMARY').toUpperCase()}`, 36, 120);

  // Net P&L Centerpiece
  const isProf = metrics.netPL >= 0;
  const pnlText = (isProf ? '+' : '') + fmt(metrics.netPL);

  ctx.fillStyle = isProf ? '#10b981' : '#f43f5e';
  ctx.font = '900 58px "JetBrains Mono", Inter, sans-serif';
  ctx.fillText(pnlText, 36, 184);

  // Realized badge
  ctx.fillStyle = isProf ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
  ctx.strokeStyle = isProf ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)';
  ctx.beginPath();
  ctx.roundRect(36, 204, 190, 26, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = isProf ? '#10b981' : '#f43f5e';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.fillText(`▲ NET REALIZED GAIN`, 50, 221);

  // 4 Metrics Cards Row
  const cards = [
    { label: 'WIN RATE', val: metrics.winRate.toFixed(1) + '%', color: '#10b981' },
    { label: 'PROFIT FACTOR', val: metrics.pf.toFixed(2), color: '#38bdf8' },
    { label: 'TOTAL LOTS', val: metrics.totalLots.toFixed(2) + ' L', color: '#06b6d4' },
    { label: 'TRADES', val: metrics.tradeCount.toString(), color: '#f8fafc' }
  ];

  const cardW = 168;
  const cardH = 74;
  const cardY = 260;

  cards.forEach((c, idx) => {
    const cardX = 36 + idx * (cardW + 18);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '700 10px Inter, sans-serif';
    ctx.fillText(c.label, cardX + 16, cardY + 26);

    ctx.fillStyle = c.color;
    ctx.font = '800 22px "JetBrains Mono", Inter, sans-serif';
    ctx.fillText(c.val, cardX + 16, cardY + 56);
  });

  // Institutional Bottom Ribbon: DISCIPLINE IS YOUR CROWN
  ctx.fillStyle = 'rgba(234, 179, 8, 0.1)';
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
  ctx.beginPath();
  ctx.roundRect(36, 360, w - 72, 44, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.font = '800 13px Inter, sans-serif';
  ctx.fillText('👑 DISCIPLINE IS YOUR CROWN', 54, 387);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 11px Inter, sans-serif';
  ctx.fillText('Daily consistency beats sporadic luck • Protect your edge', 320, 387);

  // Footer Watermark
  ctx.fillStyle = '#334155';
  ctx.font = '600 10px Inter, sans-serif';
  ctx.fillText(`atlastrade.io  •  Institutional Trade Journal  •  Generated ${new Date().toLocaleDateString()}`, 36, 432);
}

// ================= 3. METATRADER 4 & 5 SYNC HUB =================
function setupMTSyncModal() {
  const modal = $('#modalMTSync');
  const btnOpen = $('#btnOpenMTSync');
  const btnClose = $('#btnCloseMTSync');
  const tabs = $$('.mt-tab');
  const fileInput = $('#mtFileInput');
  const dropzone = $('#mtDropzone');
  const btnDemoSync = $('#btnRunDemoSync');
  const btnBridgeConnect = $('#btnConnectBridge');

  if (btnOpen) btnOpen.onclick = () => modal.classList.remove('hidden');
  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');

  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-mttab');

      $('#mtTabImport').classList.toggle('hidden', target !== 'import');
      $('#mtTabBridge').classList.toggle('hidden', target !== 'bridge');
      $('#mtTabDemo').classList.toggle('hidden', target !== 'demo');
    };
  });

  // Dropzone click & drag events
  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();
    dropzone.ondragover = e => { e.preventDefault(); dropzone.classList.add('dragover'); };
    dropzone.ondragleave = () => dropzone.classList.remove('dragover');
    dropzone.ondrop = e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processMTReportFile(e.dataTransfer.files[0]);
      }
    };
    fileInput.onchange = e => {
      if (e.target.files && e.target.files[0]) {
        processMTReportFile(e.target.files[0]);
      }
    };
  }

  // Quick Demo Sync button
  if (btnDemoSync) {
    btnDemoSync.onclick = async () => {
      const sampleTrades = [
        { id: 'mt5-' + Date.now() + '-1', date: todayDateStr(), pair: 'XAUUSD', side: 'BUY', lot: 1.50, entry: 2652.20, exit: 2670.70, pl: 1850.00, status: 'PROFIT', notes: 'MT5 Live Sync: H1 Orderblock Breakout' },
        { id: 'mt5-' + Date.now() + '-2', date: todayDateStr(), pair: 'EURUSD', side: 'SELL', lot: 2.00, entry: 1.0875, exit: 1.0840, pl: 700.00, status: 'PROFIT', notes: 'MT5 Live Sync: London High Liquidity Sweep' },
        { id: 'mt5-' + Date.now() + '-3', date: todayDateStr(), pair: 'US30', side: 'SELL', lot: 1.00, entry: 42350.00, exit: 42420.00, pl: -350.00, status: 'LOSS', notes: 'MT5 Live Sync: Slipped Stop NY Open' },
        { id: 'mt5-' + Date.now() + '-4', date: todayDateStr(), pair: 'NAS100', side: 'BUY', lot: 1.20, entry: 20110.00, exit: 20190.00, pl: 960.00, status: 'PROFIT', notes: 'MT5 Live Sync: Tech Rally Continuation' }
      ];

      await importTradesToAccount(sampleTrades, 'MetaTrader 5');
    };
  }

  // Live Broker Bridge Simulation
  if (btnBridgeConnect) {
    btnBridgeConnect.onclick = async () => {
      const platform = $('#mtBridgePlatform').value;
      const server = $('#mtBridgeServer').value.trim() || 'Broker-LiveServer';
      const login = $('#mtBridgeLogin').value.trim() || '8841092';

      btnBridgeConnect.disabled = true;
      btnBridgeConnect.textContent = `Connecting to ${platform} Bridge...`;

      setTimeout(async () => {
        btnBridgeConnect.disabled = false;
        btnBridgeConnect.textContent = 'Connect & Sync Positions';

        const bridgeTrades = [
          { id: 'br-' + Date.now() + '-1', date: todayDateStr(), pair: 'XAUUSD', side: 'BUY', lot: 1.00, entry: 2660.00, exit: 2674.50, pl: 1450.00, status: 'PROFIT', notes: `Bridge ${platform} #${login}: NY Expansion` },
          { id: 'br-' + Date.now() + '-2', date: todayDateStr(), pair: 'GBPUSD', side: 'BUY', lot: 1.50, entry: 1.3040, exit: 1.3040, pl: 0.00, status: 'BREAK EVEN', notes: `Bridge ${platform} #${login}: Secured at BE` }
        ];

        await importTradesToAccount(bridgeTrades, `${platform} (${server} #${login})`);
      }, 1200);
    };
  }
}

// Parse MT4 / MT5 Detailed HTML or CSV Report
function processMTReportFile(file) {
  const statusEl = $('#mtFileStatus');
  statusEl.classList.remove('hidden');
  statusEl.textContent = `Processing ${file.name}...`;

  const reader = new FileReader();
  reader.onload = async ev => {
    const text = ev.target.result;
    const parsedTrades = parseMTReportText(text, file.name);

    if (parsedTrades.length === 0) {
      statusEl.textContent = `⚠️ No closed positions recognized in ${file.name}. Please ensure this is an MT4 or MT5 History Report.`;
      return;
    }

    await importTradesToAccount(parsedTrades, file.name);
  };
  reader.readAsText(file);
}

function parseMTReportText(content, filename) {
  const trades = [];
  const lines = content.split('\n');

  // Simple heuristic table / CSV extractor for MT4 / MT5
  lines.forEach((line, idx) => {
    const upper = line.toUpperCase();
    if (upper.includes('BUY') || upper.includes('SELL')) {
      const tokens = line.replace(/<[^>]*>/g, ' ').split(/[\s,;\t]+/).filter(Boolean);
      // Look for symbol & numbers
      const side = tokens.find(t => t === 'BUY' || t === 'SELL');
      const symbol = tokens.find(t => /^[A-Z0-9]{6,8}$/.test(t) && !['BALANCE', 'CREDIT'].includes(t));
      const numbers = tokens.filter(t => /^-?\d+(\.\d+)?$/.test(t)).map(parseFloat);

      if (side && symbol && numbers.length >= 2) {
        const lot = numbers[0] < 50 ? numbers[0] : 1.0;
        const pl = numbers[numbers.length - 1]; // usually last column is profit
        const entry = numbers.length > 2 ? numbers[1] : 100.0;
        const exit = numbers.length > 3 ? numbers[2] : entry;

        trades.push({
          id: `mt-${Date.now()}-${idx}`,
          date: todayDateStr(),
          pair: symbol,
          side: side,
          lot: Math.max(0.01, lot),
          entry: entry,
          exit: exit,
          pl: isNaN(pl) ? 0.0 : pl,
          status: pl > 0 ? 'PROFIT' : (pl < 0 ? 'LOSS' : 'BREAK EVEN'),
          notes: `Imported from MT Statement: ${filename}`
        });
      }
    }
  });

  return trades;
}

async function importTradesToAccount(tradeList, sourceName) {
  const user = getCurrentUser();
  if (!user) return;

  const activeAccId = appState.activeAccountId;
  tradeList.forEach(t => {
    t.accountId = activeAccId;
  });

  user.trades = [...(user.trades || []), ...tradeList];
  saveCurrentUser(user);

  if (isServerOnline) {
    try {
      await fetch(`${API_BASE}/api/meta-trader/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          accountId: activeAccId,
          platform: 'MetaTrader',
          trades: tradeList
        })
      });
    } catch (err) { console.error(err); }
  }

  const resultBox = $('#mtSyncResult');
  if (resultBox) {
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `✅ Successfully synchronized <b>${tradeList.length}</b> positions from <b>${sourceName}</b> into active journal!`;
  }

  render();
  showToast(`Synchronized ${tradeList.length} trades into journal!`, 'success');
}

// ================= 11. ACHIEVEMENTS & ACCOLADES ENGINE =================
const ACHIEVEMENTS_LIST = [
  {
    id: 'ach_100',
    title: '100 Dollar Pertama',
    titleEn: 'First $100 Profit',
    desc: 'Reach your first $100.00 in cumulative net realized trading profit.',
    icon: '🥉',
    target: 100,
    type: 'profit'
  },
  {
    id: 'ach_1000',
    title: '1000 Dollar Pertama',
    titleEn: 'Four Figures Club ($1,000)',
    desc: 'Surpass $1,000.00 in cumulative institutional profit.',
    icon: '🥈',
    target: 1000,
    type: 'profit'
  },
  {
    id: 'ach_10000',
    title: 'High Roller Club ($10,000)',
    titleEn: 'High Roller Club ($10,000)',
    desc: 'Elite trader status with $10,000+ realized portfolio gains.',
    icon: '🥇',
    target: 10000,
    type: 'profit'
  },
  {
    id: 'ach_first',
    title: 'First Blood (First Trade)',
    titleEn: 'First Blood',
    desc: 'Log and execute your first verified trade on the desk.',
    icon: '🎯',
    target: 1,
    type: 'trades'
  },
  {
    id: 'ach_streak',
    title: 'Discipline Crown (5-Day Streak)',
    titleEn: 'Discipline Crown',
    desc: 'Maintain 5 consecutive profitable trading days in the performance calendar.',
    icon: '👑',
    target: 5,
    type: 'streak'
  },
  {
    id: 'ach_winrate',
    title: 'Risk Sovereign (60%+ Win Rate)',
    titleEn: 'Risk Sovereign',
    desc: 'Maintain a minimum 60% win rate over 5+ executed trades.',
    icon: '🛡️',
    target: 60,
    type: 'winrate'
  },
  {
    id: 'ach_journal',
    title: 'Master Journalist',
    titleEn: 'Master Journalist',
    desc: 'Record reflection notes and execution strategy on 5 or more trades.',
    icon: '📜',
    target: 5,
    type: 'notes'
  },
  {
    id: 'ach_50trades',
    title: 'Centurion Desk',
    titleEn: 'Centurion Desk',
    desc: 'Complete 50 trade executions with disciplined execution.',
    icon: '⚡',
    target: 50,
    type: 'trades'
  }
];

function renderAchievements() {
  const grid = $('#achievementsGrid');
  if (!grid) return;

  const user = getCurrentUser();
  if (!user) return;

  const metrics = calculateAccountMetrics();
  const trades = getActiveAccountTrades();
  const notedTrades = trades.filter(t => t.notes && t.notes.trim().length > 0).length;

  let unlockedCount = 0;

  grid.innerHTML = ACHIEVEMENTS_LIST.map(ach => {
    let currentVal = 0;
    let isUnlocked = false;

    if (ach.type === 'profit') {
      currentVal = Math.max(0, metrics.netPL);
      isUnlocked = metrics.netPL >= ach.target;
    } else if (ach.type === 'trades') {
      currentVal = metrics.tradeCount;
      isUnlocked = metrics.tradeCount >= ach.target;
    } else if (ach.type === 'streak') {
      currentVal = metrics.streak;
      isUnlocked = metrics.streak >= ach.target;
    } else if (ach.type === 'winrate') {
      currentVal = metrics.winRate;
      isUnlocked = metrics.winRate >= ach.target && metrics.tradeCount >= 5;
    } else if (ach.type === 'notes') {
      currentVal = notedTrades;
      isUnlocked = notedTrades >= ach.target;
    }

    if (isUnlocked) unlockedCount++;

    const progressPct = Math.min(100, (currentVal / ach.target) * 100);
    const progressText = ach.type === 'profit'
      ? `${fmt(currentVal)} / ${fmt(ach.target)}`
      : `${currentVal.toFixed(0)} / ${ach.target}`;

    const title = appState.language === 'id' ? ach.title : (ach.titleEn || ach.title);

    return `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-top">
          <div class="achievement-icon">${ach.icon}</div>
          <span class="achievement-status-tag">${isUnlocked ? '✓ UNLOCKED' : '🔒 IN PROGRESS'}</span>
        </div>
        <h4 class="achievement-title">${title}</h4>
        <p class="achievement-desc">${ach.desc}</p>
        <div class="achievement-progress-wrap">
          <div class="achievement-progress-labels">
            <span>Progress</span>
            <span>${progressText} (${progressPct.toFixed(0)}%)</span>
          </div>
          <div class="achievement-progress-bg">
            <div class="achievement-progress-fill" style="width: ${progressPct}%;"></div>
          </div>
        </div>
        ${isUnlocked ? `
          <button type="button" class="btn-cert-share" onclick="openCertificateModal('${ach.id}')">
            🏆 View Official Award Certificate
          </button>
        ` : ''}
      </div>
    `;
  }).join('');

  const unlockedCountEl = $('#achUnlockedCount');
  if (unlockedCountEl) unlockedCountEl.textContent = unlockedCount;
  const totalCountEl = $('#achTotalCount');
  if (totalCountEl) totalCountEl.textContent = ACHIEVEMENTS_LIST.length;
}

// Certificate Generator on Canvas
function setupCertModal() {
  const modal = $('#modalCert');
  const btnClose = $('#btnCloseCertModal');
  const btnDownload = $('#btnDownloadCert');
  const btnCopy = $('#btnCopyCert');

  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');

  window.openCertificateModal = function(achId) {
    const ach = ACHIEVEMENTS_LIST.find(a => a.id === achId);
    if (!ach) return;
    modal.classList.remove('hidden');
    drawCertificate(ach);
  };

  if (btnDownload) {
    btnDownload.onclick = () => {
      const canvas = $('#certCanvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `atlas-certificate-${todayDateStr()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Certificate downloaded successfully!', 'success');
    };
  }

  if (btnCopy) {
    btnCopy.onclick = async () => {
      const canvas = $('#certCanvas');
      if (!canvas) return;
      canvas.toBlob(async blob => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          showToast('Certificate copied to clipboard!', 'success');
        }
      });
    };
  }
}

function drawCertificate(ach) {
  const canvas = $('#certCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const user = getCurrentUser();
  const w = canvas.width;
  const h = canvas.height;

  // Background
  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, 500);
  bgGrad.addColorStop(0, '#101626');
  bgGrad.addColorStop(0.7, '#070a12');
  bgGrad.addColorStop(1, '#020306');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Elegant Double Gold Border
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.5)';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  ctx.strokeStyle = 'rgba(234, 179, 8, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // Header Title
  ctx.fillStyle = '#facc15';
  ctx.font = '800 13px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ATLAS TRADE PERFORMANCE ACCOLADES', w / 2, 65);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 28px Inter, sans-serif';
  ctx.fillText('CERTIFICATE OF ACHIEVEMENT', w / 2, 105);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 13px Inter, sans-serif';
  ctx.fillText('This official credential recognizes that trader', w / 2, 145);

  // Trader Name
  ctx.fillStyle = '#06b6d4';
  ctx.font = '900 32px "JetBrains Mono", Inter, sans-serif';
  ctx.fillText(user.name.toUpperCase(), w / 2, 195);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 13px Inter, sans-serif';
  ctx.fillText('has successfully achieved the institutional milestone of', w / 2, 235);

  // Achievement Title & Badge
  ctx.fillStyle = '#facc15';
  ctx.font = '900 24px Inter, sans-serif';
  ctx.fillText(`${ach.icon}  ${ach.title.toUpperCase()}`, w / 2, 280);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '500 12px Inter, sans-serif';
  ctx.fillText(ach.desc, w / 2, 310);

  // Institutional Gold Seal Bottom
  ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w / 2, 390, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.font = '800 10px Inter, sans-serif';
  ctx.fillText('★ OFFICIAL ★', w / 2, 385);
  ctx.fillText('VERIFIED DESK', w / 2, 400);

  // Signatures / Dates
  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px Inter, sans-serif';
  ctx.fillText(`DATE: ${new Date().toLocaleDateString()}`, 50, 430);

  ctx.textAlign = 'right';
  ctx.fillText('DESK ADMINISTRATOR: Satria', w - 50, 430);

  ctx.textAlign = 'left'; // reset
}

// ================= NAVIGATION & PAGE SWITCHER =================
function setupNav() {
  const links = $$('.nav-link');
  links.forEach(btn => {
    btn.onclick = () => {
      links.forEach(l => l.classList.remove('active'));
      btn.classList.add('active');

      const page = btn.getAttribute('data-page');
      $$('.page-content').forEach(p => p.classList.add('hidden'));

      const target = $(`#page-${page}`);
      if (target) target.classList.remove('hidden');

      const titleMap = {
        dashboard: I18N[appState.language]?.pageTitleDashboard || 'Dashboard',
        journal: I18N[appState.language]?.journalHeading || 'Trade Journal',
        calendar: I18N[appState.language]?.calendarHeading || 'Monthly Daily Performance',
        analytics: I18N[appState.language]?.analyticsHeading || 'Strategy & Edge Analytics',
        achievements: I18N[appState.language]?.navAchievements || 'Achievements',
        admin: '👑 Master Admin Desk'
      };
      $('#pageTitle').textContent = titleMap[page] || 'Dashboard';

      if (page === 'admin') {
        renderMasterAdminDesk();
      } else if (page === 'calendar') {
        renderMonthlyDailyPerformance();
      } else if (page === 'achievements') {
        renderAchievements();
      } else if (page === 'dashboard') {
        drawChart();
      }
    };
  });

  const exitBtn = $('#btnExitInspect');
  if (exitBtn) {
    exitBtn.onclick = () => {
      appState.inspectingUserEmail = null;
      $('#inspectBanner').classList.add('hidden');
      enterDashboard();
      const adminNavBtn = $('#navAdmin');
      if (adminNavBtn) adminNavBtn.click();
      showToast('Exited inspection mode. Returned to Master Admin Desk.', 'info');
    };
  }

  // Theme dropdown and toggle
  const themeSelect = $('#mainThemeSelect');
  if (themeSelect) {
    themeSelect.onchange = e => setTheme(e.target.value);
  }

  const themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.onclick = () => {
      const themes = ['default', 'classic', 'deep', 'dark', 'light'];
      const nextIdx = (themes.indexOf(appState.theme) + 1) % themes.length;
      setTheme(themes[nextIdx]);
    };
  }

  // Language selectors
  const authLang = $('#authLangSelect');
  if (authLang) authLang.onchange = e => setLanguage(e.target.value);

  const mainLang = $('#mainLangSelect');
  if (mainLang) mainLang.onchange = e => setLanguage(e.target.value);

  // Currency selector
  const curSel = $('#currencySelect');
  if (curSel) {
    curSel.value = appState.currency;
    curSel.onchange = e => {
      appState.currency = e.target.value;
      localStorage.setItem('atlas_currency', appState.currency);
      render();
    };
  }
}

// ================= DATA CALCULATION & METRICS =================
function getActiveAccountTrades() {
  const user = getCurrentUser();
  if (!user || !user.trades) return [];
  if (!appState.activeAccountId) return user.trades;
  return user.trades.filter(t => t.accountId === appState.activeAccountId);
}

function calculateAccountMetrics() {
  const trades = getActiveAccountTrades();
  let grossProfit = 0;
  let grossLoss = 0;
  let wins = 0;
  let losses = 0;
  let beCount = 0;
  let openCount = 0;
  let totalLots = 0;
  let best = 0;
  let worst = 0;

  let peak = 0;
  let maxDD = 0;
  let runningPL = 0;

  let currentStreak = 0;
  let maxStreak = 0;

  // Chronological sort for equity & streaks
  const chrono = trades.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  chrono.forEach(t => {
    const lot = parseFloat(t.lot) || 1.0;
    totalLots += lot;

    if (t.status === 'OPEN') {
      openCount++;
      return;
    }

    const pl = parseFloat(t.pl) || 0;
    runningPL += pl;

    if (runningPL > peak) peak = runningPL;
    const dd = peak - runningPL;
    if (dd > maxDD) maxDD = dd;

    if (t.status === 'BREAK EVEN' || pl === 0) {
      beCount++;
      currentStreak = 0;
    } else if (pl > 0 || t.status === 'PROFIT') {
      grossProfit += pl;
      wins++;
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
      if (pl > best) best = pl;
    } else {
      grossLoss += Math.abs(pl);
      losses++;
      currentStreak = 0;
      if (pl < worst) worst = pl;
    }
  });

  const netPL = grossProfit - grossLoss;
  const closedCount = wins + losses + beCount;
  const winRate = closedCount > 0 ? (wins / closedCount) * 100 : 0;
  const pf = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? 99.99 : 0);
  const avgLot = trades.length > 0 ? totalLots / trades.length : 0;

  const aw = wins > 0 ? grossProfit / wins : 0;
  const al = losses > 0 ? grossLoss / losses : 0;
  const expectancy = closedCount > 0 ? netPL / closedCount : 0;

  return {
    netPL,
    grossProfit,
    grossLoss,
    wins,
    losses,
    beCount,
    openCount,
    tradeCount: trades.length,
    winRate,
    pf,
    totalLots,
    avgLot,
    maxDD,
    best,
    worst,
    streak: maxStreak,
    aw,
    al,
    expectancy
  };
}

// ================= TRADE MODAL (LOG & EDIT) =================
function setupTradeModal() {
  const modal = $('#modalTrade');
  const btnAdd = $('#btnAddTrade');
  const btnClose = $('#btnCloseModal');
  const btnCancel = $('#btnCancelTrade');
  const form = $('#tradeForm');

  if (btnAdd) {
    btnAdd.onclick = () => {
      $('#modalTitle').textContent = I18N[appState.language]?.logTradeTitle || 'Log New Trade';
      $('#editTradeId').value = '';
      form.reset();
      $('#tDate').value = todayDateStr();
      $('#tSide').value = 'BUY';
      $('#tStatus').value = 'PROFIT';
      $('#tLot').value = '1.00';
      modal.classList.remove('hidden');
    };
  }

  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');
  if (btnCancel) btnCancel.onclick = () => modal.classList.add('hidden');

  // Auto-zero P&L on Break Even
  $('#tStatus').onchange = e => {
    if (e.target.value === 'BREAK EVEN') {
      $('#tPL').value = '0.00';
    }
  };

  form.onsubmit = async e => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const editId = $('#editTradeId').value;
    const tradeData = {
      id: editId || 'tr-' + Date.now(),
      accountId: appState.activeAccountId,
      date: $('#tDate').value,
      pair: $('#tPair').value.trim().toUpperCase(),
      side: $('#tSide').value,
      status: $('#tStatus').value,
      lot: parseFloat($('#tLot').value) || 1.00,
      entry: parseFloat($('#tEntry').value) || 0,
      exit: $('#tExit').value ? parseFloat($('#tExit').value) : null,
      pl: $('#tStatus').value === 'BREAK EVEN' ? 0.0 : parseFloat($('#tPL').value) || 0,
      notes: $('#tNotes').value.trim()
    };

    if (editId) {
      const idx = user.trades.findIndex(t => t.id === editId);
      if (idx !== -1) user.trades[idx] = tradeData;
    } else {
      user.trades = user.trades || [];
      user.trades.push(tradeData);
    }

    saveCurrentUser(user);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/trades/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, trade: tradeData })
        });
      } catch (err) { console.error(err); }
    }

    modal.classList.add('hidden');
    render();
    showToast(`Trade on ${tradeData.pair} saved.`, 'success');
  };
}

window.editTrade = function(tradeId) {
  const user = getCurrentUser();
  if (!user) return;
  const t = (user.trades || []).find(x => x.id === tradeId);
  if (!t) return;

  $('#modalTitle').textContent = 'Edit Trade Execution';
  $('#editTradeId').value = t.id;
  $('#tDate').value = t.date;
  $('#tPair').value = t.pair;
  $('#tSide').value = t.side;
  $('#tStatus').value = t.status || 'PROFIT';
  $('#tLot').value = (parseFloat(t.lot) || 1.00).toFixed(2);
  $('#tEntry').value = t.entry;
  $('#tExit').value = t.exit || '';
  $('#tPL').value = t.pl;
  $('#tNotes').value = t.notes || '';

  $('#modalTrade').classList.remove('hidden');
};

window.deleteTrade = async function(tradeId) {
  const user = getCurrentUser();
  if (!user) return;

  if (confirm('Permanently delete this trade from your journal?')) {
    user.trades = (user.trades || []).filter(t => t.id !== tradeId);
    saveCurrentUser(user);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/trades/delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, tradeId })
        });
      } catch (e) { console.error(e); }
    }

    render();
    showToast('Trade deleted.', 'info');
  }
};

window.updateTradeStatus = async function(tradeId, newStatus) {
  const user = getCurrentUser();
  if (!user) return;
  const t = (user.trades || []).find(x => x.id === tradeId);
  if (!t) return;

  t.status = newStatus;
  if (newStatus === 'BREAK EVEN') {
    t.pl = 0.00;
  }
  saveCurrentUser(user);

  if (isServerOnline) {
    try {
      await fetch(`${API_BASE}/api/trades/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, trade: t })
      });
    } catch (e) { console.error(e); }
  }

  render();
  showToast(`Updated status to ${newStatus}`, 'info');
};

// ================= BULK ACTIONS & JOURNAL FILTERS =================
function setupJournalFilters() {
  const search = $('#filterSearch');
  const status = $('#filterStatus');

  if (search) {
    search.oninput = e => {
      appState.filterSearch = e.target.value.trim().toUpperCase();
      renderTable();
    };
  }
  if (status) {
    status.onchange = e => {
      appState.filterStatus = e.target.value;
      renderTable();
    };
  }
}

function updateBulkBar() {
  const bar = $('#bulkActionsBar');
  const countBadge = $('#bulkCountBadge');
  const selectAll = $('#selectAllTrades');

  const count = appState.selectedTradeIds.size;
  if (count > 0) {
    bar.classList.remove('hidden');
    countBadge.textContent = count;
  } else {
    bar.classList.add('hidden');
  }

  const trades = getActiveAccountTrades();
  if (selectAll) {
    selectAll.checked = trades.length > 0 && trades.every(t => appState.selectedTradeIds.has(t.id));
  }
}

function setupBulkActions() {
  const selectAll = $('#selectAllTrades');
  if (selectAll) {
    selectAll.onchange = e => {
      const trades = getActiveAccountTrades();
      if (e.target.checked) {
        trades.forEach(t => appState.selectedTradeIds.add(t.id));
      } else {
        appState.selectedTradeIds.clear();
      }
      renderTable();
    };
  }

  window.toggleSelectTrade = function(id, isChecked) {
    if (isChecked) appState.selectedTradeIds.add(id);
    else appState.selectedTradeIds.delete(id);
    updateBulkBar();
  };

  $('#btnCancelBulk').onclick = () => {
    appState.selectedTradeIds.clear();
    renderTable();
  };

  $('#btnApplyBulkStatus').onclick = async () => {
    const newStatus = $('#bulkStatusSelect').value;
    if (!newStatus) {
      showToast('Please select a trade status to apply.', 'warning');
      return;
    }
    const user = getCurrentUser();
    if (!user) return;

    user.trades.forEach(t => {
      if (appState.selectedTradeIds.has(t.id)) {
        t.status = newStatus;
        if (newStatus === 'BREAK EVEN') t.pl = 0.00;
      }
    });

    saveCurrentUser(user);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/trades/bulk-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, tradeIds: Array.from(appState.selectedTradeIds), status: newStatus })
        });
      } catch (e) { console.error(e); }
    }

    const modifiedCount = appState.selectedTradeIds.size;
    appState.selectedTradeIds.clear();
    render();
    showToast(`Batch updated ${modifiedCount} trade(s) to ${newStatus}.`, 'success');
  };

  $('#btnApplyBulkDelete').onclick = async () => {
    const count = appState.selectedTradeIds.size;
    if (confirm(`Delete ${count} selected trade execution(s) permanently?`)) {
      const user = getCurrentUser();
      if (!user) return;

      user.trades = (user.trades || []).filter(t => !appState.selectedTradeIds.has(t.id));
      saveCurrentUser(user);

      if (isServerOnline) {
        try {
          await fetch(`${API_BASE}/api/trades/bulk-delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, tradeIds: Array.from(appState.selectedTradeIds) })
          });
        } catch (e) { console.error(e); }
      }

      appState.selectedTradeIds.clear();
      render();
      showToast(`Deleted ${count} trade execution(s).`, 'info');
    }
  };
}

// ================= RENDER ENGINE =================
function render() {
  const metrics = calculateAccountMetrics();

  // Hero Card
  const pnlEl = $('#monthPL');
  const isProf = metrics.netPL >= 0;
  pnlEl.textContent = (isProf ? '+' : '') + fmt(metrics.netPL);
  pnlEl.className = `hero-pnl-value ${isProf ? 'positive' : 'negative'}`;

  const changeText = $('#monthChangeText');
  if (changeText) {
    changeText.textContent = `${isProf ? '+' : ''}${metrics.winRate.toFixed(1)}% Realized Win`;
  }

  $('#winRate').textContent = metrics.winRate.toFixed(1) + '%';
  $('#pf').textContent = metrics.pf.toFixed(2);
  $('#tradeCount').textContent = metrics.tradeCount;

  // 4 Metrics Grid
  $('#grossProfit').textContent = fmt(metrics.grossProfit);
  $('#grossLoss').textContent = fmt(metrics.grossLoss);
  $('#totalLots').textContent = metrics.totalLots.toFixed(2) + ' Lots';
  $('#avgLot').textContent = metrics.avgLot.toFixed(2);
  $('#drawdown').textContent = fmt(metrics.maxDD);

  // Analytics Page
  const bestEl = $('#best');
  if (bestEl) bestEl.textContent = fmt(metrics.best);
  const worstEl = $('#worst');
  if (worstEl) worstEl.textContent = fmt(metrics.worst);
  const streakEl = $('#streak');
  if (streakEl) streakEl.textContent = metrics.streak;
  const expEl = $('#expectancy');
  if (expEl) expEl.textContent = fmt(metrics.expectancy);

  const aWins = $('#aCountProfit');
  if (aWins) aWins.textContent = metrics.wins;
  const aLoss = $('#aCountLoss');
  if (aLoss) aLoss.textContent = metrics.losses;
  const aBE = $('#aCountBE');
  if (aBE) aBE.textContent = metrics.beCount;
  const aOpen = $('#aCountOpen');
  if (aOpen) aOpen.textContent = metrics.openCount;

  const aTL = $('#aTotalLots');
  if (aTL) aTL.textContent = metrics.totalLots.toFixed(2) + ' Lots';
  const aAL = $('#aAvgLot');
  if (aAL) aAL.textContent = metrics.avgLot.toFixed(2) + ' Lots';
  const aWin = $('#aWin');
  if (aWin) aWin.textContent = metrics.winRate.toFixed(1) + '%';
  const aPF = $('#aPF');
  if (aPF) aPF.textContent = metrics.pf.toFixed(2);

  const aAW = $('#aAW');
  if (aAW) aAW.textContent = fmt(metrics.aw);
  const aALL = $('#aAL');
  if (aALL) aALL.textContent = fmt(metrics.al);
  const aMDD = $('#aMaxDD');
  if (aMDD) aMDD.textContent = fmt(metrics.maxDD);
  const aNet = $('#aNetTotal');
  if (aNet) aNet.textContent = fmt(metrics.netPL);

  drawChart();
  renderBars();
  renderTable();
  renderMonthlyDailyPerformance();
  renderAchievements();

  if (isCurrentMasterAdmin()) {
    renderMasterAdminDesk();
  }
}

// 10. Table Renderer with Notes Column
function renderTable() {
  const tb = $('#tradeTable');
  if (!tb) return;

  const trades = getActiveAccountTrades();
  let filtered = trades.slice().reverse();

  if (appState.filterStatus !== 'ALL') {
    filtered = filtered.filter(t => t.status === appState.filterStatus);
  }

  if (appState.filterSearch) {
    filtered = filtered.filter(t => 
      t.pair.includes(appState.filterSearch) || 
      (t.notes && t.notes.toUpperCase().includes(appState.filterSearch))
    );
  }

  if (filtered.length === 0) {
    tb.innerHTML = `
      <tr>
        <td colspan="11" style="text-align: center; padding: 36px; color: var(--text-muted);">
          No executions found for this trading account. Click "<b>+ Log New Trade</b>" or "<b>MT4 / MT5 Sync</b>" to log executions.
        </td>
      </tr>
    `;
    updateBulkBar();
    return;
  }

  tb.innerHTML = filtered.map(t => {
    const statusClass = (t.status || 'PROFIT').toLowerCase().replace(/\s+/g, '-');
    const pnlClass = t.status === 'BREAK EVEN' ? 'be' : (t.status === 'OPEN' ? 'open' : (t.pl >= 0 ? 'profit' : 'loss'));
    const pnlSign = t.pl > 0 ? '+' : '';
    const formattedDate = new Date(t.date).toLocaleDateString(I18N[appState.language]?.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const lotDisplay = (parseFloat(t.lot) || 1.00).toFixed(2);
    const isChecked = appState.selectedTradeIds.has(t.id);
    const notePreview = t.notes && t.notes.trim() ? (t.notes.length > 22 ? t.notes.slice(0, 20) + '...' : t.notes) : '+ Add Note';

    return `
      <tr>
        <td style="text-align: center;">
          <input type="checkbox" class="trade-checkbox" value="${t.id}" ${isChecked ? 'checked' : ''} onchange="toggleSelectTrade('${t.id}', this.checked)" style="cursor: pointer; accent-color: var(--primary);">
        </td>
        <td>${formattedDate}</td>
        <td><span class="trade-pair-badge">${t.pair}</span></td>
        <td><span class="side-badge ${t.side.toLowerCase()}">${t.side}</span></td>
        <td><span class="lot-badge">${lotDisplay} Lot</span></td>
        <td>${t.entry.toLocaleString()}</td>
        <td>${t.exit ? t.exit.toLocaleString() : '<span style="color:var(--open);">Active</span>'}</td>
        <td class="pnl-val ${pnlClass}">
          ${t.status === 'OPEN' ? '<span style="color:var(--open);">Open</span>' : pnlSign + fmt(t.pl)}
        </td>
        <td>
          <div class="status-dropdown-wrap">
            <select class="status-select status-${statusClass}" title="Click to change trade status" onchange="updateTradeStatus('${t.id}', this.value)">
              <option value="PROFIT" ${t.status === 'PROFIT' ? 'selected' : ''}>PROFIT</option>
              <option value="LOSS" ${t.status === 'LOSS' ? 'selected' : ''}>LOSS</option>
              <option value="BREAK EVEN" ${t.status === 'BREAK EVEN' ? 'selected' : ''}>BREAK EVEN</option>
              <option value="OPEN" ${t.status === 'OPEN' ? 'selected' : ''}>OPEN</option>
            </select>
          </div>
        </td>
        <!-- 10. Notes & Reflections Button -->
        <td>
          <button type="button" class="btn-note-view ${t.notes ? 'has-note' : ''}" onclick="openNoteModal('${t.id}')" title="Click to view or edit reflection notes">
            📝 <span>${notePreview}</span>
          </button>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon" onclick="editTrade('${t.id}')" title="Edit Trade">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-icon delete" onclick="deleteTrade('${t.id}')" title="Delete Trade">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  updateBulkBar();
}

// ================= MONTHLY DAILY PERFORMANCE & CALENDAR =================
function renderMonthlyDailyPerformance() {
  const grid = $('#calendarDaysGrid');
  if (!grid) return;

  const curYear = appState.calDate.getFullYear();
  const curMonth = appState.calDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  $('#calMonthTitle').textContent = `${monthNames[curMonth]} ${curYear}`;

  const trades = getActiveAccountTrades();
  const dailyMap = {};

  trades.forEach(t => {
    if (t.status === 'OPEN') return;
    const d = new Date(t.date);
    if (d.getFullYear() === curYear && d.getMonth() === curMonth) {
      const dayNum = d.getDate();
      if (!dailyMap[dayNum]) {
        dailyMap[dayNum] = { pl: 0, trades: 0, lots: 0 };
      }
      dailyMap[dayNum].pl += (parseFloat(t.pl) || 0);
      dailyMap[dayNum].trades += 1;
      dailyMap[dayNum].lots += (parseFloat(t.lot) || 1.0);
    }
  });

  // Monthly KPIs
  let greenDays = 0;
  let redDays = 0;
  let beDays = 0;
  let bestDayPL = 0;

  Object.values(dailyMap).forEach(day => {
    if (day.pl > 0) {
      greenDays++;
      if (day.pl > bestDayPL) bestDayPL = day.pl;
    } else if (day.pl < 0) {
      redDays++;
    } else {
      beDays++;
    }
  });

  const totalTradingDays = greenDays + redDays + beDays;
  const profitableDayRate = totalTradingDays > 0 ? (greenDays / totalTradingDays) * 100 : 0;

  $('#kpiGreenDays').textContent = `${greenDays} Days`;
  $('#kpiRedDays').textContent = `${redDays} Days`;
  $('#kpiBEDays').textContent = `${beDays} Days`;
  $('#kpiDayRate').textContent = `${profitableDayRate.toFixed(1)}%`;
  $('#kpiBestDay').textContent = fmt(bestDayPL);

  // Render Grid
  const firstDayIndex = new Date(curYear, curMonth, 1).getDay();
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();

  let html = '';
  for (let i = 0; i < firstDayIndex; i++) {
    html += '<div class="cal-day-cell empty"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const data = dailyMap[day];
    let dayClass = 'no-trades';
    let plText = '';
    let metaText = '';

    if (data) {
      if (data.pl > 0) {
        dayClass = 'profit';
        plText = '+' + fmt(data.pl);
      } else if (data.pl < 0) {
        dayClass = 'loss';
        plText = fmt(data.pl);
      } else {
        dayClass = 'breakeven';
        plText = fmt(0);
      }
      metaText = `${data.trades} trade${data.trades > 1 ? 's' : ''} • ${data.lots.toFixed(1)}L`;
    }

    html += `
      <div class="cal-day-cell ${dayClass}">
        <span class="cal-day-num">${day}</span>
        ${plText ? `<div class="cal-day-pl">${plText}</div>` : ''}
        ${metaText ? `<div class="cal-day-meta">${metaText}</div>` : ''}
      </div>
    `;
  }

  grid.innerHTML = html;
}

function setupCalendarNav() {
  $('#calPrev').onclick = () => {
    appState.calDate.setMonth(appState.calDate.getMonth() - 1);
    renderMonthlyDailyPerformance();
  };
  $('#calToday').onclick = () => {
    appState.calDate = new Date();
    renderMonthlyDailyPerformance();
  };
  $('#calNext').onclick = () => {
    appState.calDate.setMonth(appState.calDate.getMonth() + 1);
    renderMonthlyDailyPerformance();
  };
}

// ================= CHARTS ENGINE =================
function drawChart() {
  const canvas = $('#equityChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  const trades = getActiveAccountTrades();
  const sorted = trades.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  const points = [0];
  let running = 0;
  sorted.forEach(t => {
    if (t.status === 'OPEN') return;
    running += (parseFloat(t.pl) || 0);
    points.push(running);
  });

  if (points.length < 2) {
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Execute trades in this account to plot portfolio curve.', w / 2, h / 2);
    return;
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = (max - min) || 1;
  const pad = 24;

  const getX = i => pad + (i / (points.length - 1)) * (w - pad * 2);
  const getY = val => h - pad - ((val - min) / range) * (h - pad * 2);

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 3;
  points.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Gradient under curve
  ctx.lineTo(getX(points.length - 1), h);
  ctx.lineTo(getX(0), h);
  ctx.closePath();
  const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
  fillGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  fillGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Highlight points
  points.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);
    ctx.beginPath();
    ctx.fillStyle = '#06b6d4';
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#07090e';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function renderBars() {
  const container = $('#bars');
  if (!container) return;

  const trades = getActiveAccountTrades();
  const last12 = trades.slice().reverse().slice(0, 12);

  if (last12.length === 0) {
    container.innerHTML = '<span style="font-size:12px; color:var(--text-muted); margin:auto;">No recent executions recorded.</span>';
    return;
  }

  const maxAbs = Math.max(...last12.map(t => Math.abs(t.pl || 0)), 100);

  container.innerHTML = last12.map(t => {
    const pl = parseFloat(t.pl) || 0;
    const isProf = pl >= 0 && t.status !== 'BREAK EVEN';
    const isBE = t.status === 'BREAK EVEN' || pl === 0;
    const barHeight = Math.max(8, (Math.abs(pl) / maxAbs) * 100);
    const barClass = isBE ? 'be' : (isProf ? 'profit' : 'loss');

    return `
      <div class="bar-col" title="${t.pair}: ${pl >= 0 ? '+' : ''}${fmt(pl)} (${t.lot} Lot)">
        <div class="bar-fill ${barClass}" style="height: ${barHeight}%;"></div>
        <span class="bar-label">${t.pair.slice(0, 4)}</span>
      </div>
    `;
  }).join('');
}

// ================= MASTER ADMIN DESK =================
async function renderMasterAdminDesk() {
  if (!isCurrentMasterAdmin()) return;

  const db = getUsersDB();
  const allUsers = Object.values(db);

  // Platform KPIs
  const totalTraders = allUsers.length;
  let totalAccounts = 0;
  let globalLots = 0;
  let globalPL = 0;

  allUsers.forEach(u => {
    totalAccounts += (u.accounts ? u.accounts.length : 0);
    (u.trades || []).forEach(t => {
      globalLots += (parseFloat(t.lot) || 1.00);
      globalPL += (t.pl || 0);
    });
  });

  const pendingCount = allUsers.filter(u => u.status === 'pending').length;
  const pendingEl = $('#admPendingTraders');
  if (pendingEl) pendingEl.textContent = pendingCount;

  $('#admTotalTraders').textContent = totalTraders;
  $('#admTotalLots').textContent = globalLots.toFixed(2) + ' Lots';
  const pnlEl = $('#admGlobalPL');
  pnlEl.textContent = (globalPL >= 0 ? '+' : '') + fmt(globalPL);
  pnlEl.style.color = globalPL >= 0 ? 'var(--profit)' : 'var(--loss)';

  // Traders Table
  const tb = $('#adminTradersTable');
  if (tb) {
    const search = (appState.adminSearch || '').toLowerCase();
    const filteredUsers = allUsers.filter(u => 
      u.email.toLowerCase().includes(search) || 
      (u.name && u.name.toLowerCase().includes(search))
    );

    tb.innerHTML = filteredUsers.map(u => {
      const accCount = u.accounts ? u.accounts.length : 0;
      const accNames = (u.accounts || []).map(a => a.name).join(', ') || 'None';
      const trades = u.trades || [];
      const userLots = trades.reduce((sum, t) => sum + (parseFloat(t.lot) || 1.00), 0);
      const userPL = trades.reduce((sum, t) => sum + (t.pl || 0), 0);

      const isMe = u.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
      const status = u.status || 'approved';

      let statusBadge = `<span class="status-badge-approved">✓ APPROVED</span>`;
      if (status === 'pending') {
        statusBadge = `<span class="status-badge-pending">⏳ PENDING</span>`;
      } else if (status === 'suspended') {
        statusBadge = `<span style="background:rgba(244,63,94,0.15); color:var(--loss); border:1px solid var(--loss-border); padding:3px 8px; border-radius:4px; font-size:10px; font-weight:800;">✕ SUSPENDED</span>`;
      }

      let actionsHtml = '';
      if (isMe) {
        actionsHtml = '<span style="color:var(--text-dim); font-size:11px;">Primary Desk</span>';
      } else if (status === 'pending') {
        actionsHtml = `
          <div class="admin-action-group">
            <button class="btn-approve-trader" onclick="approveTrader('${u.email}')" title="Grant terminal access">
              <span>✓ Approve</span>
            </button>
            <button class="btn-delete-trader" onclick="rejectTrader('${u.email}')" title="Decline request">
              <span>✕ Decline</span>
            </button>
          </div>
        `;
      } else {
        actionsHtml = `
          <div class="admin-action-group">
            <button class="btn-inspect" onclick="inspectTrader('${u.email}')" title="Inspect Trader Dashboard">
              <span>Inspect &rarr;</span>
            </button>
            <button class="btn-revoke-trader" onclick="toggleSuspendTrader('${u.email}')" title="${status==='approved'?'Suspend access':'Restore access'}">
              <span>${status==='approved'?'Suspend':'Unsuspend'}</span>
            </button>
            <button class="btn-delete-trader" onclick="deleteTrader('${u.email}')" title="Permanently Delete Trader Account">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        `;
      }

      return `
        <tr>
          <td>
            <b>${u.email}</b>
            ${isMe ? ' <span style="color:#facc15; font-size:10px; font-weight:800;">[YOU]</span>' : ''}
          </td>
          <td>${u.name || 'Trader'}</td>
          <td>${statusBadge}</td>
          <td style="max-width: 200px; white-space: normal;">
            <small style="color: var(--cyan);">${accCount} Account(s):</small><br>
            <span style="font-size: 11px; color: var(--text-muted);">${accNames}</span>
          </td>
          <td>${trades.length}</td>
          <td><span class="lot-badge">${userLots.toFixed(2)} Lot</span></td>
          <td style="font-weight:700; color: ${userPL >= 0 ? 'var(--profit)' : 'var(--loss)'};">
            ${(userPL >= 0 ? '+' : '') + fmt(userPL)}
          </td>
          <td>${actionsHtml}</td>
        </tr>
      `;
    }).join('');
  }

  // 9. Load Feedbacks for Super Admin
  loadAdminFeedbacks();

  // 7. Load Questionnaires for Super Admin
  loadAdminQuestionnaires();
}

async function loadAdminFeedbacks() {
  const fbTable = $('#adminFeedbackTable');
  const countBadge = $('#adminFeedbackCount');
  if (!fbTable) return;

  let feedbacks = [];
  if (isServerOnline) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/feedback`);
      if (res.ok) {
        const payload = await res.json();
        feedbacks = payload.feedbacks || [];
      }
    } catch (e) { console.error(e); }
  }

  if (feedbacks.length === 0) {
    // Sample fallback
    feedbacks = [
      { created_at: '2026-10-08 14:22', user_email: 'alex.turner@alphatrading.com', user_name: 'Alex Turner', rating: 5, category: 'Feature Request', message: 'The lot sizing and calendar view are phenomenal. Would love automatic MT5 trade syncing!' },
      { created_at: '2026-10-09 10:15', user_email: 'sarah.miller@forexdesk.com', user_name: 'Sarah Miller', rating: 5, category: 'User Experience', message: 'The dark theme and daily crown reminders have completely changed my discipline.' }
    ];
  }

  if (countBadge) countBadge.textContent = `${feedbacks.length} Submissions`;

  fbTable.innerHTML = feedbacks.map(fb => `
    <tr>
      <td style="font-size: 11px; color: var(--text-muted);">${fb.created_at || 'Recent'}</td>
      <td><b>${fb.user_name || 'Trader'}</b><br><small style="color: var(--text-dim);">${fb.user_email}</small></td>
      <td style="color: #facc15; font-size: 13px;">${'★'.repeat(fb.rating || 5)}</td>
      <td><span class="trade-pair-badge">${fb.category || 'General'}</span></td>
      <td style="max-width: 300px; white-space: normal; line-height: 1.4;">${fb.message}</td>
      <td><span style="color: var(--profit); font-weight: 700; font-size: 11px;">✓ Received</span></td>
    </tr>
  `).join('');
}

async function loadAdminQuestionnaires() {
  const qTable = $('#adminQuestionnaireTable');
  const countBadge = $('#adminQuestionnaireCount');
  if (!qTable) return;

  let surveys = [];
  if (isServerOnline) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/questionnaires`);
      if (res.ok) {
        const payload = await res.json();
        surveys = payload.questionnaires || [];
      }
    } catch (e) { console.error(e); }
  }

  if (surveys.length === 0) {
    surveys = [
      { created_at: '2026-10-02 09:30', user_email: 'alex.turner@alphatrading.com', goal: 'Pass Prop Firm Evaluation (FTMO / Apex)', source: 'Prop Firm Discord Community', target_milestone: '$10,000+ Net Profit Target' },
      { created_at: '2026-10-06 11:45', user_email: 'marcus.vance@hedgefund.com', goal: 'Institutional Fund Allocation', source: 'TradingView Community', target_milestone: 'Consistent 5% monthly return under 2% drawdown' }
    ];
  }

  if (countBadge) countBadge.textContent = `${surveys.length} Responses`;

  qTable.innerHTML = surveys.map(q => `
    <tr>
      <td style="font-size: 11px; color: var(--text-muted);">${q.created_at || 'Recent'}</td>
      <td><b>${q.user_email}</b></td>
      <td style="color: var(--cyan); font-weight: 600;">${q.goal}</td>
      <td>${q.source}</td>
      <td style="font-weight: 700; color: var(--profit);">${q.target_milestone}</td>
    </tr>
  `).join('');
}

// Master Admin: Approve trader
window.approveTrader = async function(email) {
  const db = getUsersDB();
  if (!db[email]) return;
  db[email].status = 'approved';
  saveUsersDB(db);

  if (isServerOnline) {
    try {
      await fetch(`${API_BASE}/api/admin/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (e) { console.error(e); }
  }

  renderMasterAdminDesk();
  showToast(`Access granted for ${email}! Trader can now sign in.`, 'success');
};

// Master Admin: Decline trader
window.rejectTrader = async function(email) {
  if (confirm(`Decline access request for ${email}? This will remove their pending registration.`)) {
    const db = getUsersDB();
    delete db[email];
    saveUsersDB(db);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/admin/decline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      } catch (e) { console.error(e); }
    }

    renderMasterAdminDesk();
    showToast(`Access request for ${email} declined.`, 'info');
  }
};

window.toggleSuspendTrader = function(email) {
  const db = getUsersDB();
  if (!db[email]) return;
  const currentStatus = db[email].status || 'approved';
  db[email].status = currentStatus === 'approved' ? 'suspended' : 'approved';
  saveUsersDB(db);
  renderMasterAdminDesk();
  showToast(`Access for ${email} is now ${db[email].status.toUpperCase()}.`, 'info');
};

window.deleteTrader = async function(email) {
  if (email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) {
    showToast('Cannot delete the Master Admin account.', 'error');
    return;
  }
  if (confirm(`⚠️ MASTER ADMIN PERMANENT ACTION:\n\nAre you sure you want to permanently delete trader account "${email}" along with all their trading accounts and trades?\n\nThis action cannot be undone.`)) {
    const db = getUsersDB();
    delete db[email];
    saveUsersDB(db);

    if (isServerOnline) {
      try {
        await fetch(`${API_BASE}/api/admin/delete-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      } catch (e) { console.error(e); }
    }

    renderMasterAdminDesk();
    showToast(`Trader account "${email}" permanently deleted.`, 'warning');
  }
};

window.inspectTrader = function(email) {
  const db = getUsersDB();
  const targetUser = db[email];
  if (!targetUser) return;

  appState.inspectingUserEmail = email;
  appState.activeAccountId = targetUser.activeAccountId || (targetUser.accounts && targetUser.accounts[0] ? targetUser.accounts[0].id : null);

  $('#inspectUserEmail').textContent = `${targetUser.name} (${targetUser.email})`;
  $('#inspectBanner').classList.remove('hidden');

  enterDashboard();
  const dashBtn = $$('.nav-link')[0];
  if (dashBtn) dashBtn.click();

  showToast(`Now inspecting trader: ${targetUser.email}`, 'info');
};

function setupAdminEvents() {
  const searchInput = $('#adminSearchTrader');
  if (searchInput) {
    searchInput.oninput = e => {
      appState.adminSearch = e.target.value.trim();
      renderMasterAdminDesk();
    };
  }
}

// ================= BOOTSTRAP SYSTEM =================
window.addEventListener('DOMContentLoaded', async () => {
  // Initialize Themes, Language, and Server Sync
  setTheme(appState.theme);
  setLanguage(appState.language);
  await initServerSync();

  initAuth();
  setupAuthEvents();
  setupAccountModal();
  setupProfileModal();
  setupFeedbackModal();
  setupNoteModal();
  setupSharePnLModal();
  setupMTSyncModal();
  setupCertModal();
  setupNav();
  setupTradeModal();
  setupJournalFilters();
  setupBulkActions();
  setupCalendarNav();
  setupAdminEvents();

  window.addEventListener('resize', () => {
    drawChart();
  });
});
