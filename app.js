/* ═══════════════════════════════════════════════════════════════
   BUDGET BUDDY v3 — BUDGET vs ACTUAL
   Screen 1: Set your monthly budget plan
   Screen 2: Track daily spending, watch Buck react in real-time
   ═══════════════════════════════════════════════════════════════ */

// ─── EXPENSE CATEGORIES ───
const CATEGORIES = [
    { id:'housing',     name:'Housing',       icon:'🏠', desc:'Rent, mortgage, HOA, property tax',
      subItems: ['🏠 Rent / Mortgage','📋 HOA Fees','🏛️ Property Tax','🛡️ Home Insurance','🔧 Repairs / Maintenance'] },
    { id:'utilities',   name:'Utilities',     icon:'💡', desc:'Electric, gas, water, internet, phone',
      subItems: ['⚡ Electric','🔥 Gas','💧 Water / Sewer','🌐 Internet','📱 Phone / Cell'] },
    { id:'transport',   name:'Transportation',icon:'🚗', desc:'Car payment, gas, insurance, maintenance',
      subItems: ['🚗 Car Payment','⛽ Gas','🛡️ Car Insurance','🔧 Maintenance / Repairs','🅿️ Parking / Tolls'] },
    { id:'food',        name:'Food & Dining', icon:'🍔', desc:'Groceries, restaurants, delivery, coffee',
      subItems: ['🛒 Groceries','🍽️ Restaurants','🥡 Delivery / Takeout','☕ Coffee / Snacks','🍺 Alcohol / Bars'] },
    { id:'streaming',    name:'Streaming',     icon:'🎬', desc:'Netflix, Hulu, Disney+, Spotify, and more',
      subItems: ['Netflix 🎬','Hulu 📺','Disney+ ✨','Max 🍿','Amazon Prime Video 🛍️','Apple TV+ 🍎','Paramount+ 🎬','Peacock 🦚','YouTube Premium 📺','Crunchyroll 🍥','Discovery+ 🔍','Spotify 🎵','Apple Music 🎶','Tidal 🎵','YouTube Music 🎹','Pandora 📻','Audible 🎧','SiriusXM 📡'] },
    { id:'subscriptions',name:'Subscriptions',icon:'📺', desc:'Gym, apps, memberships, box subscriptions',
      subItems: ['🎵 Music (Spotify, Apple Music)','💪 Gym / Fitness','📱 Apps / Software','📰 Magazines / News','☁️ Cloud Storage','📦 Meal Kits / Boxes'] },
    { id:'shopping',    name:'Shopping',      icon:'🛍️', desc:'Clothes, electronics, Amazon, impulse buys',
      subItems: ['👕 Clothes / Shoes','💻 Electronics / Tech','📦 Amazon / Online','🎁 Gifts','🤷 Impulse / Random'] },
    { id:'entertainment',name:'Fun & Going Out',icon:'🎮', desc:'Movies, games, concerts, bars, hobbies',
      subItems: ['🎬 Movies / Theater','🎮 Games / Gaming','🎤 Concerts / Events','🍸 Bars / Clubs','🎨 Hobbies / Crafts'] },
    { id:'debt',        name:'Debt Payments', icon:'💳', desc:'Credit cards, student loans, personal loans',
      subItems: ['💳 Credit Card','🎓 Student Loan','💰 Personal Loan','🏥 Medical Debt','⏳ Buy Now Pay Later'] },
    { id:'savings',     name:'Savings & Investing',icon:'🏦', desc:'Emergency fund, 401k, stocks, crypto, savings goals',
      subItems: ['🚨 Emergency Fund','🏖️ 401k / Retirement','📈 Stocks / ETFs','₿ Crypto','💎 High-Yield Savings'] },
    { id:'health',      name:'Health & Medical', icon:'🩺', desc:'Doctor visits, prescriptions, therapy, dental, vision',
      subItems: ['🩺 Doctor / Primary Care','💊 Prescriptions / Pharmacy','🏥 Medical Bills / Procedures','🧠 Therapy / Mental Health','🦷 Dental','👁️ Vision / Glasses'] },
    { id:'personal',    name:'Personal Care', icon:'💇', desc:'Haircuts, skincare, nails, grooming, spa',
      subItems: ['✂️ Haircuts / Salon','💄 Skincare / Makeup','💅 Nails / Manicure','👣 Pedicure / Toes','🧴 Spa / Massage','🪒 Grooming / Shaving'] },
    { id:'family',      name:'Family & Pets', icon:'👶', desc:'Kids, pets, childcare, school, gifts',
      subItems: ['👶 Childcare / Daycare','🐕 Pet Food / Supplies','🐈 Vet / Pet Care','🏫 School / Activities','🧸 Kids Clothes / Gear'] },
    { id:'misc',        name:'Everything Else',icon:'🤷', desc:"Random stuff that doesn't fit anywhere",
      subItems: ['🏦 Bank Fees','📮 Postage / Shipping','🔨 Tools / Home','⚖️ Legal / Accounting','🎲 Random One-Off'] }
];

// ─── CATEGORY COLORS FOR CHARTS ───
function getCategoryColor(catId) {
    const colors = {
        housing: '#ef4444', utilities: '#f97316', transport: '#f59e0b',
        food: '#84cc16', streaming: '#8b5cf6', subscriptions: '#06b6d4',
        shopping: '#a855f7', entertainment: '#ec4899', debt: '#dc2626',
        savings: '#10b981', health: '#14b8a6', personal: '#d946ef', family: '#f43f5e', misc: '#64748b'
    };
    return colors[catId] || '#94a3b8';
}

// ─── FUN BUCK SAYINGS ───
const BUCK_SAYINGS = {
    thriving: [
        "Daaaamn, look at you go! Buck is THRIVING! 🌟",
        "Yo, you're basically a money wizard at this point. ✨",
        "Buck's eating gourmet tonight with these numbers! 🥩",
        "Got leftovers? That's the flex of the year. 💪",
        "You're not just budgeting, you're BUDGETING. Respect. 🙌"
    ],
    decent: [
        "Not bad, not bad. Buck's doing okay. 😌",
        "Solid month. Buck appreciates the effort. 👍",
        "You're keeping it together. Buck gives you a nod. 🫡",
        "Tight but manageable. That's called discipline. 📊"
    ],
    tight: [
        "Oof, Buck's getting hungry over here. 🫠",
        "Might wanna ease up on the DoorDash, just saying. 🍕",
        "Buck's looking at you sideways with that spending. 👀",
        "Good gosh, numbers looking a little spicy. 🌶️"
    ],
    underwater: [
        "Buck's about to call a financial intervention. 🆘",
        "Damn, you need to cut back. Like, NOW. ✂️",
        "Buck's on a diet this month — and it ain't by choice. 😭",
        "Woooow. You spent HOW much? Buck is shook. 😵",
        "Underwater alert! Someone throw Buck a life jacket. 🛟"
    ],
    coffee: [
        "Your coffee budget is giving 'I have a problem' vibes. ☕",
        "Buck counted your coffee runs. It was a lot. 👀"
    ],
    goalWarning: [
        "Heads up — you're getting close to your goal limit! ⚠️",
        "Almost there... maybe slow your roll a bit? 🐌",
        "Buck's giving you the side-eye on this category. 👀"
    ],
    goalExceeded: [
        "Welp, you blew past the goal. Buck saw that coming. 😬",
        "Goal? What goal? You yeeted right past it. 🚀",
        "Buck is writing you a strongly worded letter about this goal. 📝"
    ]
};

// ─── ACHIEVEMENT BADGES ───
const BADGES = [
    { id:'first_budget',  name:'First Try',      icon:'🥇', desc:'Complete your first budget' },
    { id:'green_month',   name:'In the Green',   icon:'💚', desc:'Finish a month with money left' },
    { id:'streak_3',      name:'Hot Streak',     icon:'🔥', desc:'3 positive months in a row' },
    { id:'streak_6',      name:'Unstoppable',    icon:'🚀', desc:'6 positive months in a row' },
    { id:'savings_500',   name:'Stacking Up',    icon:'💰', desc:'Save $500 total in your pot' },
    { id:'savings_2000',  name:'Money Bags',     icon:'🏆', desc:'Save $2,000 total in your pot' },
    { id:'frugal_hero',   name:'Frugal Hero',    icon:'🦸', desc:'Spend less than 70% of income' },
    { id:'no_coffee',     name:'Cold Turkey',    icon:'🚫', desc:'Zero coffee spending one month' },
    { id:'debt_free',     name:'Debt Destroyer', icon:'💪', desc:'Zero debt payments for a month' },
    { id:'investor',      name:'Investor',       icon:'📈', desc:'Save 20%+ of income' }
];

// ─── STATE ───
let state = {
    // BUDGET PLAN (set once per month)
    budgetIncome: 0,
    budgetIncomeSources: [],
    budgetCategories: {},  // { catId: budgetedAmount }
    budgetSubItems: {},    // { catId: { 'Rent / Mortgage': 1200, 'Other': 150 } }

    // ACTUAL DAILY SPENDING
    transactions: [],  // { id, date, category, name, amount }

    // Extra income for this month
    extraIncome: [],  // { id, date, name, amount }

    // Rollovers from previous month (already applied to this month's budget)
    rolledOverCategories: [], // [catId, catId, ...]

    // Goals
    goals: {},

    // Gamification
    savingsPots: [
        {
            id: 'pot-' + Date.now(),
            name: "My Dream Vacation",
            total: 0,
            history: [],
            targetAmount: 5000,
            createdAt: new Date().toISOString()
        }
    ],
    badges: [],
    monthHistory: [],
    currentMonth: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),

    // Flags
    setupComplete: false,

    // Recurring template (cross-month)
    recurringBudget: {},  // { catId: { subName: amount } }
    recurringIncome: 0,
    recurringIncomeSources: [],

    // Yearly Bills (Subscription Sinking Fund)
    yearlyBills: [],

    // Legacy (for migration)
    income: 0,
    incomeSources: [],
    expenses: {}
};

// Month key helper: "June 2026" → "2026-06"
function getMonthKey(monthStr) {
    const d = new Date(monthStr + ' 1');
    if (isNaN(d)) return new Date().toISOString().slice(0, 7);
    return d.toISOString().slice(0, 7);
}

function getAllMonthKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('budgetBuddy_')) {
            keys.push(k.replace('budgetBuddy_', ''));
        }
    }
    return keys.sort();
}

function getGlobalState() {
    const saved = localStorage.getItem('budgetBuddy_global');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Migrate old single savingsPot to array
            if (parsed.savingsPot && !parsed.savingsPots) {
                parsed.savingsPots = [{
                    id: 'pot-migrated',
                    name: parsed.savingsPot.name || "My Dream Vacation",
                    total: parsed.savingsPot.total || 0,
                    history: parsed.savingsPot.history || [],
                    targetAmount: 5000,
                    createdAt: new Date().toISOString()
                }];
            }
            return parsed;
        } catch (e) {}
    }
    return { savingsPots: state.savingsPots, badges: state.badges, monthHistory: state.monthHistory };
}

function saveGlobalState() {
    localStorage.setItem('budgetBuddy_global', JSON.stringify({
        savingsPots: state.savingsPots,
        badges: state.badges,
        monthHistory: state.monthHistory,
        yearlyBills: state.yearlyBills
    }));
}

// ─── RECURRING TEMPLATE ───
function loadRecurring() {
    const saved = localStorage.getItem('budgetBuddy_recurring');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.recurringBudget = parsed.recurringBudget || {};
            state.recurringIncome = parsed.recurringIncome || 0;
            state.recurringIncomeSources = parsed.recurringIncomeSources || [];
        } catch (e) {}
    }
}

function saveRecurring() {
    localStorage.setItem('budgetBuddy_recurring', JSON.stringify({
        recurringBudget: state.recurringBudget,
        recurringIncome: state.recurringIncome,
        recurringIncomeSources: state.recurringIncomeSources
    }));
}

// Load + migrate from localStorage (month-based)
function loadState() {
    const monthKey = getMonthKey(state.currentMonth);
    const saved = localStorage.getItem('budgetBuddy_' + monthKey);

    // Load global state first
    const global = getGlobalState();
    if (global.savingsPots) {
        state.savingsPots = global.savingsPots;
    } else if (global.savingsPot) {
        // Migrate old single pot
        state.savingsPots = [{
            id: 'pot-migrated',
            name: global.savingsPot.name || "My Dream Vacation",
            total: global.savingsPot.total || 0,
            history: global.savingsPot.history || [],
            targetAmount: 5000,
            createdAt: new Date().toISOString()
        }];
    }
    state.badges = global.badges || state.badges;
    state.monthHistory = global.monthHistory || state.monthHistory;
    state.yearlyBills = global.yearlyBills || [];

    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Merge month-specific data, keep global data
            state.budgetIncome = parsed.budgetIncome || 0;
            state.budgetIncomeSources = parsed.budgetIncomeSources || [];
            state.budgetCategories = parsed.budgetCategories || {};
            state.budgetSubItems = parsed.budgetSubItems || {};
            state.transactions = parsed.transactions || [];
            state.extraIncome = parsed.extraIncome || [];
            state.goals = parsed.goals || {};
            state.rolledOverCategories = parsed.rolledOverCategories || [];
            state.setupComplete = parsed.setupComplete || false;
            state.income = parsed.income || 0;
            state.incomeSources = parsed.incomeSources || [];
            state.expenses = parsed.expenses || {};
            migrateState();
            return true;
        } catch (e) { console.error('bad state', e); }
    }
    return false;
}

function saveState() {
    const monthKey = getMonthKey(state.currentMonth);
    // Save month-specific data
    const monthData = {
        budgetIncome: state.budgetIncome,
        budgetIncomeSources: state.budgetIncomeSources,
        budgetCategories: state.budgetCategories,
        budgetSubItems: state.budgetSubItems,
        transactions: state.transactions,
        extraIncome: state.extraIncome,
        goals: state.goals,
        rolledOverCategories: state.rolledOverCategories,
        setupComplete: state.setupComplete,
        income: state.income,
        incomeSources: state.incomeSources,
        expenses: state.expenses
    };
    localStorage.setItem('budgetBuddy_' + monthKey, JSON.stringify(monthData));
    // Save global data
    saveGlobalState();
}

function getMonthState(monthKey) {
    const saved = localStorage.getItem('budgetBuddy_' + monthKey);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) { console.error('bad month state', e); }
    }
    return null;
}

function setMonthState(monthKey, data) {
    localStorage.setItem('budgetBuddy_' + monthKey, JSON.stringify(data));
}

function getNextMonthKey(monthKey) {
    const [year, month] = monthKey.split('-').map(Number);
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
    }
    return nextYear + '-' + String(nextMonth).padStart(2, '0');
}

function switchMonth(monthKey) {
    // Save current month first
    saveState();

    // If moving forward to a new month, close out current month's savings
    const currentKey = getMonthKey(state.currentMonth);
    if (monthKey > currentKey) {
        const savingsSubs = state.budgetSubItems['savings'] || {};
        state.savingsPots.forEach(pot => {
            const potKey = `💰 ${pot.name}`;
            const amount = savingsSubs[potKey] || 0;
            if (amount > 0) {
                const alreadyAdded = pot.history.some(h => h.month === state.currentMonth);
                if (!alreadyAdded) {
                    pot.history.push({ month: state.currentMonth, amount });
                    pot.total = (pot.total || 0) + amount;
                }
            }
        });
        if (state.savingsPots.some(p => (savingsSubs[`💰 ${p.name}`] || 0) > 0)) {
            saveGlobalState();
        }
    }

    // Parse month key
    const [year, month] = monthKey.split('-').map(Number);
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    state.currentMonth = monthNames[month - 1] + ' ' + year;
    // Load new month
    const saved = localStorage.getItem('budgetBuddy_' + monthKey);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.budgetIncome = parsed.budgetIncome || 0;
            state.budgetIncomeSources = parsed.budgetIncomeSources || [];
            state.budgetCategories = parsed.budgetCategories || {};
            state.budgetSubItems = parsed.budgetSubItems || {};
            state.transactions = parsed.transactions || [];
            state.extraIncome = parsed.extraIncome || [];
            state.goals = parsed.goals || {};
            state.rolledOverCategories = parsed.rolledOverCategories || [];
            state.setupComplete = parsed.setupComplete || false;
        } catch (e) {}
    } else {
        // New month — pre-fill from recurring template, clear transactions
        state.budgetIncome = state.recurringIncome || 0;
        state.budgetIncomeSources = [...(state.recurringIncomeSources || [])];
        state.budgetSubItems = {};
        state.budgetCategories = {};
        // Pre-fill recurring budget items
        for (const [catId, subs] of Object.entries(state.recurringBudget || {})) {
            state.budgetSubItems[catId] = {};
            let catTotal = 0;
            for (const [subName, amount] of Object.entries(subs)) {
                if (amount > 0) {
                    state.budgetSubItems[catId][subName] = amount;
                    catTotal += amount;
                }
            }
            if (catTotal > 0) {
                state.budgetCategories[catId] = Math.round(catTotal * 100) / 100;
            }
        }
        state.transactions = [];
        state.extraIncome = [];
        state.setupComplete = true; // budget already set from recurring
    }
    saveState();
    initTracker();
    renderDashboard();
    updateMonthSelector();
}

// Migrate old format (v1/v2) to new v3 format
function migrateState() {
    // If we have old expenses but no budgetCategories, convert
    if (state.expenses && Object.keys(state.expenses).length > 0 && Object.keys(state.budgetCategories || {}).length === 0) {
        state.budgetCategories = {};
        for (const [catId, items] of Object.entries(state.expenses)) {
            const total = items.reduce((sum, item) => {
                const monthly = item.freq === 'weekly' ? item.amount * 4.33 : item.amount;
                return sum + monthly;
            }, 0);
            if (total > 0) state.budgetCategories[catId] = Math.round(total * 100) / 100;
        }
        state.budgetIncome = state.income || 0;
        state.budgetIncomeSources = state.incomeSources || [];
        if (state.budgetIncome > 0 || Object.keys(state.budgetCategories).length > 0) {
            state.setupComplete = true;
        }
    }
    if (!state.transactions) state.transactions = [];
    if (!state.budgetCategories) state.budgetCategories = {};
    if (!state.budgetSubItems) state.budgetSubItems = {};
    if (!state.budgetIncomeSources) state.budgetIncomeSources = [];
    if (!state.extraIncome) state.extraIncome = [];
    // Migrate old single savings pot budget key to pot name
    if (state.budgetSubItems['savings'] && state.budgetSubItems['savings']['💰 Savings Pot'] !== undefined && state.savingsPots.length > 0) {
        const firstPot = state.savingsPots[0];
        const amount = state.budgetSubItems['savings']['💰 Savings Pot'];
        state.budgetSubItems['savings'][`💰 ${firstPot.name}`] = amount;
        delete state.budgetSubItems['savings']['💰 Savings Pot'];
    }
}

// ─── AUDIO ENGINE ───
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function ensureAudio() {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playChime() {
    try {
        ensureAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    } catch (e) {}
}

function playChaChing() {
    try {
        ensureAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2000, now);
        osc.frequency.exponentialRampToValueAtTime(3000, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        setTimeout(() => {
            const o2 = audioCtx.createOscillator();
            const g2 = audioCtx.createGain();
            o2.connect(g2);
            g2.connect(audioCtx.destination);
            o2.type = 'sine';
            o2.frequency.setValueAtTime(2200, audioCtx.currentTime);
            o2.frequency.exponentialRampToValueAtTime(3200, audioCtx.currentTime + 0.1);
            g2.gain.setValueAtTime(0.1, audioCtx.currentTime);
            g2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            o2.start(audioCtx.currentTime);
            o2.stop(audioCtx.currentTime + 0.3);
        }, 100);
    } catch (e) {}
}

function playSadTrombone() {
    try {
        ensureAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(200, now + 0.4);
        osc.frequency.linearRampToValueAtTime(150, now + 0.8);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        osc.start(now);
        osc.stop(now + 1.0);
    } catch (e) {}
}

function playWarning() {
    try {
        ensureAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(330, now + 0.15);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } catch (e) {}
}

function playPop() {
    try {
        ensureAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } catch (e) {}
}

// ─── NAVIGATION ───
function goto(sceneId) {
    // Auto-save budget if leaving the budget setup page
    const budgetScene = document.getElementById('scene-budget-setup');
    if (budgetScene && budgetScene.classList.contains('active') && sceneId !== 'budget-setup') {
        saveBudgetPlanSilent();
    }

    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('scene-' + sceneId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
    localStorage.setItem('bb_last_scene', sceneId);
    if (sceneId === 'income') initIncome();
    if (sceneId === 'budget-setup') initBudgetSetup();
    if (sceneId === 'tracker') initTracker();
    if (sceneId === 'dashboard') renderDashboard();
}

// ─── MODAL ───
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// ─── INCOME ───
function toggleChip(btn) {
    btn.classList.toggle('active');
    const type = btn.dataset.type;
    if (btn.classList.contains('active')) {
        if (!state.budgetIncomeSources.includes(type)) state.budgetIncomeSources.push(type);
    } else {
        state.budgetIncomeSources = state.budgetIncomeSources.filter(s => s !== type);
    }
}

function saveIncome() {
    const val = parseFloat(document.getElementById('total-income').value) || 0;
    if (val <= 0) {
        shakeElement(document.getElementById('total-income').parentElement);
        return;
    }
    state.budgetIncome = val;
    state.income = val; // legacy

    // Save recurring income if toggle is on
    const recurringToggle = document.getElementById('income-recurring-toggle');
    if (recurringToggle && recurringToggle.checked) {
        state.recurringIncome = val;
        state.recurringIncomeSources = [...state.budgetIncomeSources];
        saveRecurring();
    }

    saveState();
    playPop();
    goto('budget-setup');
}

function initIncome() {
    // Set month
    const monthEl = document.getElementById('income-top-month');
    if (monthEl) monthEl.textContent = state.currentMonth;

    // Pre-fill income
    const incomeInput = document.getElementById('total-income');
    if (incomeInput) incomeInput.value = state.budgetIncome > 0 ? state.budgetIncome : '';

    // Set chips
    document.querySelectorAll('#scene-income .chip').forEach(chip => {
        chip.classList.toggle('active', state.budgetIncomeSources.includes(chip.dataset.type));
    });

    // Set recurring toggle
    const recurringToggle = document.getElementById('income-recurring-toggle');
    if (recurringToggle) {
        recurringToggle.checked = state.recurringIncome > 0 && state.recurringIncome === state.budgetIncome;
    }

    // Animate Buck's health bar
    const fill = document.getElementById('income-hunger-fill');
    if (fill) {
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = '100%'; }, 100);
    }
}

// ——— BUDGET SETUP ———
function initBudgetSetup() {
    console.log('[initBudgetSetup] starting. state:', {
        currentMonth: state.currentMonth,
        budgetIncome: state.budgetIncome,
        budgetCategories: {...state.budgetCategories},
        budgetSubItems: JSON.parse(JSON.stringify(state.budgetSubItems))
    });
    const container = document.getElementById('budget-categories');
    if (!container) return;
    container.innerHTML = '';

    // Populate income input
    const incomeInput = document.getElementById('budget-income-input');
    if (incomeInput) {
        incomeInput.value = state.budgetIncome > 0 ? state.budgetIncome : '';
        // Remove old listener to avoid duplicates
        const newInput = incomeInput.cloneNode(true);
        incomeInput.parentNode.replaceChild(newInput, incomeInput);
        newInput.addEventListener('input', () => {
            const val = parseFloat(newInput.value) || 0;
            state.budgetIncome = val;
            state.income = val;
            updateBudgetTotal();
            updateBudgetBuck();
            const display = document.getElementById('budget-income-display');
            if (display) display.textContent = '$' + formatMoney(val);
        });
    }

    // Set recurring toggle for income
    const recurringToggle = document.getElementById('budget-income-recurring');
    if (recurringToggle) {
        recurringToggle.checked = state.recurringIncome > 0 && state.recurringIncome === state.budgetIncome;
    }

    // Set income source chips
    document.querySelectorAll('#budget-setup .chip').forEach(chip => {
        chip.classList.toggle('active', state.budgetIncomeSources.includes(chip.dataset.type));
    });

    // Update income display
    const incomeDisplay = document.getElementById('budget-income-display');
    if (incomeDisplay) incomeDisplay.textContent = '$' + formatMoney(state.budgetIncome);

    // Render extra income on budget page
    renderBudgetExtraIncome();
    updateBudgetExtraDisplay();

    // Render Buck on budget page
    updateBudgetBuck();

    CATEGORIES.forEach(cat => {
        const savedSub = state.budgetSubItems[cat.id] || {};
        const hasAny = Object.keys(savedSub).length > 0 || (state.budgetCategories[cat.id] || 0) > 0;

        const wrapper = document.createElement('div');
        wrapper.className = 'budget-cat-wrap' + (hasAny ? ' has-data' : '');
        wrapper.dataset.cat = cat.id;

        // Header row (always visible)
        const total = Object.values(savedSub).reduce((a, b) => a + b, 0);
        const header = document.createElement('div');
        header.className = 'budget-cat-header';
        header.innerHTML = `
            <div class="cat-icon">${cat.icon}</div>
            <div class="cat-info">
                <div class="cat-name">${cat.name}</div>
                <div class="cat-desc">${cat.desc}</div>
            </div>
            <div class="budget-cat-total" id="cat-total-${cat.id}">$${formatMoney(total)}</div>
            <div class="budget-cat-arrow">${hasAny ? '▼' : '▶'}</div>
        `;
        header.onclick = () => toggleCatExpand(wrapper);

        // Expandable sub-items
        const body = document.createElement('div');
        body.className = 'budget-cat-body' + (hasAny ? ' open' : '');
        body.id = 'cat-body-' + cat.id;

        // Predefined sub-items
        const subList = document.createElement('div');
        subList.className = 'sub-item-list';

        cat.subItems.forEach((subName, idx) => {
            const val = savedSub[subName] || '';
            const isRecurring = (state.recurringBudget[cat.id] || {})[subName] !== undefined;
            const row = document.createElement('div');
            row.className = 'sub-item-row';
            row.innerHTML = `
                <span class="sub-item-name">${subName}</span>
                <div class="sub-item-input-wrap">
                    <span class="sub-item-dollar">$</span>
                    <input type="number" class="sub-item-input" data-cat="${cat.id}" data-sub="${subName}" placeholder="0" value="${val}" min="0" step="0.01">
                </div>
                <label class="switch-label" style="margin:0;flex-shrink:0;" title="Recurring every month">
                    <span class="switch small">
                        <input type="checkbox" class="recurring-toggle" data-cat="${cat.id}" data-sub="${subName}" ${isRecurring ? 'checked' : ''}>
                        <span class="slider"></span>
                    </span>
                    <span class="switch-text">Recurring</span>
                </label>
            `;
            subList.appendChild(row);
        });

        // Dynamic savings pot rows (for savings category)
        const potNames = new Set();
        if (cat.id === 'savings') {
            state.savingsPots.forEach(pot => {
                const potKey = `💰 ${pot.name}`;
                potNames.add(potKey);
                const val = savedSub[potKey] || '';
                const isRecurring = (state.recurringBudget[cat.id] || {})[potKey] !== undefined;
                const row = document.createElement('div');
                row.className = 'sub-item-row pot-row';
                row.innerHTML = `
                    <span class="sub-item-name" style="color:var(--accent);font-weight:600;">${potKey}</span>
                    <div class="sub-item-input-wrap">
                        <span class="sub-item-dollar">$</span>
                        <input type="number" class="sub-item-input" data-cat="${cat.id}" data-sub="${potKey}" placeholder="0" value="${val}" min="0" step="0.01">
                    </div>
                    <label class="switch-label" style="margin:0;flex-shrink:0;" title="Recurring every month">
                        <span class="switch small">
                            <input type="checkbox" class="recurring-toggle" data-cat="${cat.id}" data-sub="${potKey}" ${isRecurring ? 'checked' : ''}>
                            <span class="slider"></span>
                        </span>
                        <span class="switch-text">Recurring</span>
                    </label>
                `;
                subList.appendChild(row);
            });
        }

        // Custom "Other" items from saved state
        Object.entries(savedSub).forEach(([subName, val]) => {
            if (!cat.subItems.includes(subName) && !potNames.has(subName)) {
                const isRecurring = (state.recurringBudget[cat.id] || {})[subName] !== undefined;
                const row = document.createElement('div');
                row.className = 'sub-item-row custom';
                row.innerHTML = `
                    <input type="text" class="sub-item-custom-name" value="${escapeHtml(subName)}" placeholder="What is it?">
                    <div class="sub-item-input-wrap">
                        <span class="sub-item-dollar">$</span>
                        <input type="number" class="sub-item-input" data-cat="${cat.id}" data-sub="__custom__" placeholder="0" value="${val}" min="0" step="0.01">
                    </div>
                    <label class="switch-label" style="margin:0;flex-shrink:0;" title="Recurring every month">
                        <span class="switch small">
                            <input type="checkbox" class="recurring-toggle" data-cat="${cat.id}" data-sub="__custom__" ${isRecurring ? 'checked' : ''}>
                            <span class="slider"></span>
                        </span>
                        <span class="switch-text">Recurring</span>
                    </label>
                    <button class="sub-item-remove" onclick="this.parentElement.remove();updateCatTotal('${cat.id}')">✕</button>
                `;
                subList.appendChild(row);
            }
        });

        // Add Other button
        const addOther = document.createElement('button');
        addOther.className = 'btn-add-sub';
        addOther.textContent = '+ Add another item';
        addOther.onclick = (e) => {
            e.stopPropagation();
            const row = document.createElement('div');
            row.className = 'sub-item-row custom';
            row.innerHTML = `
                <input type="text" class="sub-item-custom-name" placeholder="What is it?">
                <div class="sub-item-input-wrap">
                    <span class="sub-item-dollar">$</span>
                    <input type="number" class="sub-item-input" data-cat="${cat.id}" data-sub="__custom__" placeholder="0" min="0" step="0.01">
                </div>
                <label class="switch-label" style="margin:0;flex-shrink:0;" title="Recurring every month">
                    <span class="switch small">
                        <input type="checkbox" class="recurring-toggle" data-cat="${cat.id}" data-sub="__custom__">
                        <span class="slider"></span>
                    </span>
                    <span class="switch-text">Recurring</span>
                </label>
                <button class="sub-item-remove" onclick="this.parentElement.remove();updateCatTotal('${cat.id}')">✕</button>
            `;
            subList.appendChild(row);
            row.querySelector('.sub-item-custom-name').focus();
        };

        body.appendChild(subList);
        body.appendChild(addOther);

        wrapper.appendChild(header);
        wrapper.appendChild(body);
        container.appendChild(wrapper);
    });

    // Live total updater for all sub-item inputs
    container.querySelectorAll('.sub-item-input').forEach(input => {
        input.addEventListener('input', () => {
            const catId = input.dataset.cat;
            updateCatTotal(catId);
        });
    });

    updateBudgetTotal();

    // Bubble text
    const bubble = document.getElementById('budget-bubble');
    const filled = Object.keys(state.budgetCategories).filter(k => state.budgetCategories[k] > 0).length;
    if (filled === 0) {
        bubble.textContent = "Tap each category to break down your budget. Buck will do the math!";
    } else {
        bubble.textContent = `You've budgeted ${filled} of ${CATEGORIES.length} categories. Tap any to edit the breakdown.`;
    }

    // Render yearly bills and savings goals on budget page
    renderYearlyBills();
    renderSavingsPots();
}

function updateBudgetBuck() {
    const health = getBuckHealth();
    const fill = document.getElementById('budget-hunger-fill');
    const mouth = document.getElementById('budget-buck-mouth');
    const bubble = document.getElementById('budget-bubble');
    const plannedBudget = getTotalBudgeted();
    const income = state.budgetIncome;
    const totalExtra = getTotalExtraIncome();
    const totalIncome = income + totalExtra;

    if (fill) {
        fill.style.width = health + '%';
        fill.style.background = health >= 60 ? 'var(--accent)' : health >= 30 ? 'var(--warn)' : 'var(--danger)';
    }

    if (!mouth || !bubble) return;

    if (plannedBudget > totalIncome && totalIncome > 0) {
        const overAmt = plannedBudget - totalIncome;
        bubble.textContent = `🚨 Your budget is $${formatMoney(overAmt)} OVER your total income. This plan is impossible before you spend a dime. Cut back or find more income.`;
        mouth.className = 'mouth sad';
    } else if (health >= 80) {
        bubble.textContent = pickRandom(BUCK_SAYINGS.thriving);
        mouth.className = 'mouth happy';
    } else if (health >= 50) {
        bubble.textContent = pickRandom(BUCK_SAYINGS.decent);
        mouth.className = 'mouth';
    } else if (health >= 20) {
        bubble.textContent = pickRandom(BUCK_SAYINGS.tight);
        mouth.className = 'mouth sad';
    } else {
        bubble.textContent = pickRandom(BUCK_SAYINGS.underwater);
        mouth.className = 'mouth sad';
    }
}

// ——— EXTRA INCOME ON BUDGET PAGE ———
let budgetExtraSources = [];

function toggleExtraSourceChip(btn) {
    btn.classList.toggle('active');
    const source = btn.dataset.source;
    if (btn.classList.contains('active')) {
        if (!budgetExtraSources.includes(source)) budgetExtraSources.push(source);
    } else {
        budgetExtraSources = budgetExtraSources.filter(s => s !== source);
    }
}

function addBudgetExtraIncome() {
    const amountIn = document.getElementById('budget-extra-amount');
    const nameIn = document.getElementById('budget-extra-name');
    const amount = parseFloat(amountIn.value) || 0;
    const name = nameIn.value.trim() || 'Extra';

    if (amount <= 0) {
        shakeElement(document.querySelector('.extra-income-card'));
        return;
    }

    state.extraIncome.push({
        id: 'ei-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        name,
        amount,
        sources: [...budgetExtraSources]
    });
    saveState();
    amountIn.value = '';
    nameIn.value = '';
    budgetExtraSources = [];
    document.querySelectorAll('#budget-extra-chips .chip').forEach(c => c.classList.remove('active'));
    playChaChing();
    renderBudgetExtraIncome();
    updateBudgetExtraDisplay();
    updateBudgetBuck();
}

function deleteBudgetExtraIncome(id) {
    state.extraIncome = state.extraIncome.filter(e => e.id !== id);
    saveState();
    renderBudgetExtraIncome();
    updateBudgetExtraDisplay();
    updateBudgetBuck();
    playPop();
}

function renderBudgetExtraIncome() {
    const container = document.getElementById('budget-extra-list');
    if (!container) return;
    if (state.extraIncome.length === 0) {
        container.innerHTML = '';
        return;
    }
    container.innerHTML = '';
    state.extraIncome.slice().reverse().forEach(ei => {
        const sourceTags = (ei.sources || []).map(s => {
            const labels = {
                side: '🚀 Side', freelance: '💻 Freelance', investment: '📈 Investments',
                rental: '🏠 Rental', bonus: '🏆 Bonus', gift: '🎁 Gift',
                reimbursement: '🔄 Reimbursement', sold: '💰 Sold', taxrefund: '📋 Refund', other: '✨ Other'
            };
            return `<span class="extra-source-tag">${labels[s] || s}</span>`;
        }).join('');
        const row = document.createElement('div');
        row.className = 'extra-income-row';
        row.innerHTML = `
            <div class="extra-income-info">
                <span class="extra-income-name">${escapeHtml(ei.name)}</span>
                ${sourceTags ? `<div class="extra-source-tags">${sourceTags}</div>` : ''}
            </div>
            <span class="extra-income-amt">+$${formatMoney(ei.amount)}</span>
            <button class="sub-item-remove" onclick="deleteBudgetExtraIncome('${ei.id}')">✕</button>
        `;
        container.appendChild(row);
    });
}

function updateBudgetExtraDisplay() {
    const display = document.getElementById('budget-extra-display');
    if (display) display.textContent = '$' + formatMoney(getTotalExtraIncome());
}

function toggleCatExpand(wrapper) {
    const body = wrapper.querySelector('.budget-cat-body');
    const arrow = wrapper.querySelector('.budget-cat-arrow');
    const isOpen = body.classList.contains('open');
    if (isOpen) {
        body.classList.remove('open');
        body.style.maxHeight = '0px';
        arrow.textContent = '\u25b6';
    } else {
        body.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 200 + 'px';
        arrow.textContent = '\u25bc';
        // Focus first empty input
        const empty = body.querySelector('.sub-item-input[value=""]');
        if (empty) empty.focus();
    }
}

function updateCatTotal(catId) {
    const wrapper = document.querySelector(`.budget-cat-wrap[data-cat="${catId}"]`);
    if (!wrapper) return;
    const inputs = wrapper.querySelectorAll('.sub-item-input');
    let total = 0;
    inputs.forEach(inp => {
        total += parseFloat(inp.value) || 0;
    });
    const totalEl = document.getElementById('cat-total-' + catId);
    if (totalEl) totalEl.textContent = '$' + formatMoney(total);
    if (total > 0) {
        wrapper.classList.add('has-data');
    } else {
        wrapper.classList.remove('has-data');
    }
    updateBudgetTotal();
}

function updateBudgetTotal() {
    let total = 0;
    document.querySelectorAll('.budget-cat-wrap').forEach(wrap => {
        const inputs = wrap.querySelectorAll('.sub-item-input');
        inputs.forEach(inp => {
            total += parseFloat(inp.value) || 0;
        });
    });
    // Add yearly bill inputs from standalone card
    document.querySelectorAll('.yearly-bill-input').forEach(inp => {
        total += parseFloat(inp.value) || 0;
    });
    const totalIncome = state.budgetIncome + getTotalExtraIncome();
    const remaining = totalIncome - total;
    const el = document.getElementById('budget-total-display');
    if (el) {
        // FIX: green when positive, red only when over
        const color = remaining < 0 ? 'var(--danger)' : 'var(--accent)';
        el.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:2px dashed #e2e8f0;">
                <span style="font-weight:700;font-size:15px;">Total Budgeted</span>
                <span style="font-weight:800;font-size:18px;">$${formatMoney(total)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">
                <span style="font-size:14px;color:var(--text-light);">Remaining to allocate</span>
                <span style="font-weight:700;font-size:16px;color:${color};">${remaining < 0 ? '-$' : '$'}${formatMoney(Math.abs(remaining))}</span>
            </div>
        `;
    }
}

// ─── STREAMING SERVICES QUICK-ADD ───


function saveBudgetPlanSilent() {
    // Save income from budget page
    const incomeInput = document.getElementById('budget-income-input');
    const incomeVal = parseFloat(incomeInput?.value) || 0;
    if (incomeVal > 0) {
        state.budgetIncome = incomeVal;
        state.income = incomeVal;
    }

    // Save recurring income toggle
    const incomeRecurringToggle = document.getElementById('budget-income-recurring');
    if (incomeRecurringToggle && incomeRecurringToggle.checked && incomeVal > 0) {
        state.recurringIncome = incomeVal;
        state.recurringIncomeSources = [...state.budgetIncomeSources];
        saveRecurring();
    } else if (incomeRecurringToggle && !incomeRecurringToggle.checked) {
        if (state.recurringIncome === incomeVal) {
            state.recurringIncome = 0;
            state.recurringIncomeSources = [];
            saveRecurring();
        }
    }

    const newBudget = { ...state.budgetCategories };
    const newSubItems = JSON.parse(JSON.stringify(state.budgetSubItems || {}));
    const newRecurring = JSON.parse(JSON.stringify(state.recurringBudget || {}));

    // We'll re-collect yearly bills separately; remove old yearly_bills totals first
    delete newBudget['yearly_bills'];
    delete newSubItems['yearly_bills'];

    document.querySelectorAll('.budget-cat-wrap').forEach(wrap => {
        const catId = wrap.dataset.cat;
        let catTotal = 0;
        const catSubs = {};

        wrap.querySelectorAll('.sub-item-row').forEach(row => {
            const customName = row.querySelector('.sub-item-custom-name');
            const input = row.querySelector('.sub-item-input');
            const recurringToggle = row.querySelector('.recurring-toggle');
            const name = customName ? (customName.value.trim() || 'Other') : input.dataset.sub;
            const val = parseFloat(input.value) || 0;
            if (val > 0) {
                catTotal += val;
                catSubs[name] = val;
            }
            if (recurringToggle && recurringToggle.checked && val > 0) {
                if (!newRecurring[catId]) newRecurring[catId] = {};
                newRecurring[catId][name] = val;
            } else if (recurringToggle && !recurringToggle.checked && newRecurring[catId]) {
                delete newRecurring[catId][name];
                if (Object.keys(newRecurring[catId]).length === 0) delete newRecurring[catId];
            }
        });

        if (catTotal > 0) {
            newBudget[catId] = Math.round(catTotal * 100) / 100;
            newSubItems[catId] = catSubs;
        } else {
            delete newBudget[catId];
            delete newSubItems[catId];
        }
    });

    // Collect yearly bill inputs
    const yearlyBillSubs = {};
    let yearlyBillTotal = 0;
    document.querySelectorAll('.yearly-bill-input').forEach(input => {
        const billId = input.dataset.bill;
        const bill = state.yearlyBills.find(b => b.id === billId);
        if (!bill) return;
        const val = parseFloat(input.value) || 0;
        if (val > 0) {
            const key = `📅 ${bill.name}`;
            yearlyBillSubs[key] = val;
            yearlyBillTotal += val;
        }
    });
    if (yearlyBillTotal > 0) {
        newBudget['yearly_bills'] = yearlyBillTotal;
        newSubItems['yearly_bills'] = yearlyBillSubs;
    }

    const totalBudgeted = Object.values(newBudget).reduce((a, b) => a + b, 0);
    if (totalBudgeted === 0) {
        return false;
    }

    state.budgetCategories = newBudget;
    state.budgetSubItems = newSubItems;
    state.recurringBudget = newRecurring;
    state.setupComplete = true;

    saveState();
    saveGlobalState();
    saveRecurring();
    return true;
}

function saveBudgetPlan() {
    console.log('[saveBudgetPlan] starting. current state:', {
        budgetIncome: state.budgetIncome,
        budgetCategories: {...state.budgetCategories},
        budgetSubItems: JSON.parse(JSON.stringify(state.budgetSubItems)),
        currentMonth: state.currentMonth
    });

    const saved = saveBudgetPlanSilent();
    if (!saved) {
        shakeElement(document.getElementById('budget-categories'));
        return;
    }

    // Accumulate yearly bill savings (only on explicit save)
    const yearlySubItems = state.budgetSubItems['yearly_bills'] || {};
    state.yearlyBills.forEach(bill => {
        if (bill.status !== 'active') return;
        const key = `📅 ${bill.name}`;
        const savedAmt = yearlySubItems[key] || 0;
        if (savedAmt > 0) {
            bill.savedAmount = (bill.savedAmount || 0) + savedAmt;
        }
    });
    saveGlobalState();

    console.log('[saveBudgetPlan] final state to save:', {
        budgetCategories: {...state.budgetCategories},
        budgetSubItems: JSON.parse(JSON.stringify(state.budgetSubItems))
    });

    playChaChing();
    fireConfetti();
    goto('tracker');
}

// ─── DAILY TRACKER (MAIN SCREEN) ───
function initTracker() {
    updateMonthSelector();

    // Default date to today
    const dateIn = document.getElementById('tracker-date');
    if (dateIn && !dateIn.value) {
        dateIn.value = new Date().toISOString().split('T')[0];
    }

    // Buck health
    const health = getBuckHealth();
    updateBuckVisuals(health);

    // Numbers
    const totalBudget = getTotalBudgeted();
    const totalActual = getTotalActual();
    const totalExtra = getTotalExtraIncome();
    const totalIncome = state.budgetIncome + totalExtra;
    const left = totalIncome - totalActual;

    document.getElementById('tracker-income').textContent = '$' + formatMoney(state.budgetIncome);
    document.getElementById('tracker-extra-income').textContent = '$' + formatMoney(totalExtra);
    document.getElementById('tracker-actual').textContent = '$' + formatMoney(totalActual);
    document.getElementById('tracker-left').textContent = (left < 0 ? '-$' : '$') + formatMoney(Math.abs(left));

    const leftEl = document.getElementById('tracker-left');
    leftEl.style.color = left < 0 ? 'var(--danger)' : left < totalIncome * 0.1 ? 'var(--warn)' : 'var(--accent)';

    // Category dropdown
    const catSelect = document.getElementById('tracker-cat-select');
    catSelect.innerHTML = '<option value="">Pick a category...</option>';
    CATEGORIES.forEach(cat => {
        const budgeted = state.budgetCategories[cat.id] || 0;
        if (budgeted > 0) {
            const actual = getCategoryActual(cat.id);
            const remaining = budgeted - actual;
            catSelect.innerHTML += `<option value="${cat.id}">${cat.icon} ${cat.name} ($${formatMoney(remaining)} left)</option>`;
        }
    });

    // Recent transactions
    renderTrackerTransactions();

    // Category progress bars
    renderTrackerBars();

    // Extra income list
    renderExtraIncome();

    // Pie chart
    renderPieChart(totalIncome, totalActual, left);

    // Saying
    const bubble = document.getElementById('tracker-bubble');
    const mouth = document.getElementById('tracker-buck-mouth');
    const plannedBudget = getTotalBudgeted();

    // Check yearly bill reminders first (most urgent takes priority)
    const billReminder = checkYearlyBillReminders();
    if (billReminder) {
        bubble.textContent = billReminder.msg;
        mouth.className = billReminder.level === 'urgent' ? 'mouth sad' : 'mouth';
    } else if (totalActual > totalIncome && totalIncome > 0) {
        // Actual spending has already exceeded income — this is the real problem
        const overAmt = totalActual - totalIncome;
        bubble.textContent = `🚨 You've spent $${formatMoney(overAmt)} more than your income. You're $${formatMoney(overAmt)} in the hole.`;
        mouth.className = 'mouth sad';
    } else if (plannedBudget > totalIncome && totalIncome > 0) {
        const overAmt = plannedBudget - totalIncome;
        bubble.textContent = `🚨 Your budget plan is $${formatMoney(overAmt)} over your income. Cut back or find more income before you spend a dime.`;
        mouth.className = 'mouth sad';
    } else if (health >= 80) {
        bubble.textContent = pickRandom(BUCK_SAYINGS.thriving);
        mouth.className = 'mouth happy';
    } else if (health >= 50) {
        bubble.textContent = pickRandom(BUCK_SAYINGS.decent);
        mouth.className = 'mouth';
    } else if (health >= 20) {
        bubble.textContent = pickRandom(BUCK_SAYINGS.tight);
        mouth.className = 'mouth sad';
    } else {
        bubble.textContent = pickRandom(BUCK_SAYINGS.underwater);
        mouth.className = 'mouth sad';
    }
}

function addTransaction() {
    const catSelect = document.getElementById('tracker-cat-select');
    const amountIn = document.getElementById('tracker-amount');
    const nameIn = document.getElementById('tracker-name');
    const dateIn = document.getElementById('tracker-date');

    const category = catSelect.value;
    const amount = parseFloat(amountIn.value) || 0;
    const name = nameIn.value.trim() || 'Purchase';
    const date = dateIn.value || new Date().toISOString().split('T')[0];

    if (!category || amount <= 0) {
        shakeElement(document.querySelector('.tracker-quick-add'));
        return;
    }

    const tx = {
        id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        date,
        category,
        name,
        amount
    };

    state.transactions.push(tx);
    saveState();

    // Clear inputs but keep date
    amountIn.value = '';
    nameIn.value = '';
    catSelect.value = '';

    playPop();

    // Re-render
    initTracker();

    // Check if we just blew a category budget
    const budgeted = state.budgetCategories[category] || 0;
    const actual = getCategoryActual(category);
    if (actual > budgeted && budgeted > 0) {
        playWarning();
        const cat = CATEGORIES.find(c => c.id === category);
        const bubble = document.getElementById('tracker-bubble');
        bubble.textContent = `🚨 You just went over your ${cat.name} budget! Buck is stressed.`;
    }
}

function deleteTransaction(id) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveState();
    initTracker();
    playPop();
}

// ─── EXTRA INCOME ───
function getTotalExtraIncome() {
    return state.extraIncome.reduce((s, e) => s + e.amount, 0);
}

function addExtraIncome() {
    const amountIn = document.getElementById('extra-income-amount');
    const nameIn = document.getElementById('extra-income-name');
    const amount = parseFloat(amountIn.value) || 0;
    const name = nameIn.value.trim() || 'Extra';

    if (amount <= 0) {
        shakeElement(document.querySelector('.extra-income-card'));
        return;
    }

    state.extraIncome.push({
        id: 'ei-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        name,
        amount
    });
    saveState();
    amountIn.value = '';
    nameIn.value = '';
    playChaChing();
    initTracker();
}

function deleteExtraIncome(id) {
    state.extraIncome = state.extraIncome.filter(e => e.id !== id);
    saveState();
    initTracker();
}

function renderExtraIncome() {
    // Tracker compact view
    const compactContainer = document.getElementById('tracker-extra-list-compact');
    const totalEl = document.getElementById('tracker-extra-total');
    if (totalEl) totalEl.textContent = '$' + formatMoney(getTotalExtraIncome());
    if (!compactContainer) return;
    if (state.extraIncome.length === 0) {
        compactContainer.innerHTML = '<p class="help-text" style="margin:0;">No extra income yet</p>';
        return;
    }
    compactContainer.innerHTML = '';
    state.extraIncome.slice().reverse().forEach(ei => {
        const sourceTags = (ei.sources || []).map(s => {
            const labels = {
                side: '🚀', freelance: '💻', investment: '📈',
                rental: '🏠', bonus: '🏆', gift: '🎁',
                reimbursement: '🔄', sold: '💰', taxrefund: '📋', other: '✨'
            };
            return `<span class="extra-source-tag compact">${labels[s] || s}</span>`;
        }).join('');
        const row = document.createElement('div');
        row.className = 'extra-income-row compact';
        row.innerHTML = `
            <span class="extra-income-name">${escapeHtml(ei.name)} ${sourceTags}</span>
            <span class="extra-income-amt">+$${formatMoney(ei.amount)}</span>
        `;
        compactContainer.appendChild(row);
    });
}

// ─── PIE CHART ───
function renderPieChart(totalIncome, totalActual, left) {
    // ─── BUDGET ALLOCATION CHART (before spending) ───
    const budgetSvg = document.getElementById('tracker-pie-budget');
    const budgetLegend = document.getElementById('tracker-pie-budget-legend');
    const budgetPctEl = document.getElementById('tracker-pie-budget-pct');

    if (budgetSvg) {
        const totalBudget = getTotalBudgeted();
        const r = 40, cx = 50, cy = 50;
        const circ = 2 * Math.PI * r;
        let offset = 0;
        let slices = [];

        if (totalBudget > 0 && totalIncome > 0) {
            CATEGORIES.forEach(cat => {
                // Try budgetCategories first, then fall back to sum of subItems
                let amt = state.budgetCategories[cat.id] || 0;
                if (amt === 0 && state.budgetSubItems[cat.id]) {
                    amt = Object.values(state.budgetSubItems[cat.id]).reduce((a, b) => a + b, 0);
                }
                if (amt > 0) {
                    const pct = (amt / totalIncome) * 100;
                    const dash = (pct / 100) * circ;
                    slices.push({ pct, dash, offset, color: getCategoryColor(cat.id), name: cat.name, amt });
                    offset += dash;
                }
            });
            // Unallocated slice
            const unallocated = Math.max(0, totalIncome - totalBudget);
            if (unallocated > 0) {
                const pct = (unallocated / totalIncome) * 100;
                const dash = (pct / 100) * circ;
                slices.push({ pct, dash, offset, color: '#cbd5e1', name: 'Unallocated', amt: unallocated });
            }
        }

        if (slices.length === 0) {
            budgetSvg.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="12" />`;
        } else if (totalBudget > totalIncome && totalIncome > 0) {
            // Over-budget: show categories as % of budget, with over-budget portion in red
            const overPct = ((totalBudget - totalIncome) / totalBudget) * 100;
            let catOffset = 0;
            let svgHTML = '';
            CATEGORIES.forEach(cat => {
                let amt = state.budgetCategories[cat.id] || 0;
                if (amt === 0 && state.budgetSubItems[cat.id]) {
                    amt = Object.values(state.budgetSubItems[cat.id]).reduce((a, b) => a + b, 0);
                }
                if (amt > 0) {
                    const pct = (amt / totalBudget) * 100;
                    const dash = (pct / 100) * circ;
                    svgHTML += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${getCategoryColor(cat.id)}" stroke-width="12"
                        stroke-dasharray="${circ}" stroke-dashoffset="${circ - dash}"
                        transform="rotate(${-90 + (catOffset / circ) * 360} ${cx} ${cy})" />`;
                    catOffset += dash;
                }
            });
            // Over-budget slice in red
            const overDash = (overPct / 100) * circ;
            svgHTML += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--danger)" stroke-width="12"
                stroke-dasharray="${circ}" stroke-dashoffset="${circ - overDash}"
                transform="rotate(${-90 + (catOffset / circ) * 360} ${cx} ${cy})" />`;
            budgetSvg.innerHTML = svgHTML;
        } else {
            budgetSvg.innerHTML = slices.map((s, i) => `
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="12"
                    stroke-dasharray="${circ}" stroke-dashoffset="${circ - s.dash}"
                    transform="rotate(${-90 + (s.offset / circ) * 360} ${cx} ${cy})" />
            `).join('');
        }

        if (budgetPctEl) {
            const allocatedPct = totalIncome > 0 ? Math.min(100, Math.round((totalBudget / totalIncome) * 100)) : 0;
            if (totalBudget > totalIncome && totalIncome > 0) {
                budgetPctEl.textContent = 'OVER';
                budgetPctEl.style.color = 'var(--danger)';
                budgetPctEl.style.fontSize = '16px';
            } else {
                budgetPctEl.textContent = allocatedPct + '%';
                budgetPctEl.style.color = '';
                budgetPctEl.style.fontSize = '';
            }
        }

        if (budgetLegend) {
            let legendHTML = slices.slice(0, 4).map(s => `
                <div class="pie-legend-item"><span class="pie-dot" style="background:${s.color}"></span> ${s.name} ($${formatMoney(s.amt)})</div>
            `).join('');
            if (totalBudget > totalIncome && totalIncome > 0) {
                const overAmt = totalBudget - totalIncome;
                legendHTML += `<div class="pie-legend-item"><span class="pie-dot" style="background:var(--danger)"></span> Over Budget ($${formatMoney(overAmt)})</div>`;
            }
            budgetLegend.innerHTML = legendHTML;
        }
    }

    // ——— ACTUAL SPENDING CHART (after spending) ———
    const actualSvg = document.getElementById('tracker-pie-actual');
    const actualLegend = document.getElementById('tracker-pie-actual-legend');
    const actualPctEl = document.getElementById('tracker-pie-actual-pct');

    if (actualSvg) {
        const r = 40, cx = 50, cy = 50;
        const circ = 2 * Math.PI * r;
        const totalWithExtra = totalIncome + getTotalExtraIncome();
        const plannedBudget = getTotalBudgeted();

        // If budget plan itself exceeds income, show warning regardless of spending
        if (plannedBudget > totalIncome && totalIncome > 0) {
            actualSvg.innerHTML = `
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--danger)" stroke-width="12"
                    stroke-dasharray="${circ}" stroke-dashoffset="0" transform="rotate(-90 ${cx} ${cy})" />
            `;
            if (actualPctEl) {
                actualPctEl.textContent = 'OVER';
                actualPctEl.style.color = 'var(--danger)';
                actualPctEl.style.fontSize = '16px';
            }
            if (actualLegend) {
                const overAmt = plannedBudget - totalIncome;
                actualLegend.innerHTML = `
                    <div class="pie-legend-item"><span class="pie-dot" style="background:var(--danger)"></span> Plan is $${formatMoney(overAmt)} over income</div>
                `;
            }
        } else {
            const spentPct = totalWithExtra > 0 ? Math.min(100, (totalActual / totalWithExtra) * 100) : 0;
            const leftPct = Math.max(0, 100 - spentPct);
            const spentOffset = circ * (1 - spentPct / 100);
            const spentColor = spentPct > 100 ? 'var(--danger)' : spentPct > 85 ? 'var(--warn)' : '#94a3b8';

            actualSvg.innerHTML = `
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${spentColor}" stroke-width="12"
                    stroke-dasharray="${circ}" stroke-dashoffset="${spentOffset}" transform="rotate(-90 ${cx} ${cy})" />
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="12"
                    stroke-dasharray="${circ}" stroke-dashoffset="0"
                    transform="rotate(-90 ${cx} ${cy})"
                    style="opacity:${leftPct > 0 ? 1 : 0.3}" />
            `;

            if (actualPctEl) {
                actualPctEl.textContent = Math.round(leftPct) + '%';
                actualPctEl.style.color = '';
                actualPctEl.style.fontSize = '';
            }

            if (actualLegend) {
                actualLegend.innerHTML = `
                    <div class="pie-legend-item"><span class="pie-dot" style="background:${spentColor}"></span> Spent ($${formatMoney(totalActual)})</div>
                    <div class="pie-legend-item"><span class="pie-dot" style="background:var(--accent)"></span> Left ($${formatMoney(Math.max(0, left))})</div>
                `;
            }
        }
    }
}

// ─── MONTH SELECTOR ───
function onMonthChange(select) {
    if (!select.value) return;
    switchMonth(select.value);
}

function updateMonthSelector() {
    // Build list of all months (existing + current + next 3)
    const keys = getAllMonthKeys();
    const currentKey = getMonthKey(state.currentMonth);
    if (!keys.includes(currentKey)) keys.push(currentKey);
    // Also ensure we have current month even on first visit with no data
    const thisMonthKey = new Date().toISOString().slice(0, 7);
    if (!keys.includes(thisMonthKey)) keys.push(thisMonthKey);
    // Add next 3 months
    const now = new Date();
    for (let i = 1; i <= 3; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const k = d.toISOString().slice(0, 7);
        if (!keys.includes(k)) keys.push(k);
    }
    keys.sort();

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const opts = keys.map(k => {
        const [y, m] = k.split('-').map(Number);
        const label = monthNames[m - 1] + ' ' + y;
        return `<option value="${k}"${k === currentKey ? ' selected' : ''}>${label}</option>`;
    }).join('');

    ['tracker-month-select','dash-month-select','budget-month-select'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<option value="">Select month...</option>' + opts;
    });

    // Update the new tracker top month display
    const topMonth = document.getElementById('tracker-top-month');
    if (topMonth) topMonth.textContent = state.currentMonth;
    const budgetTopMonth = document.getElementById('budget-top-month');
    if (budgetTopMonth) budgetTopMonth.textContent = state.currentMonth;
    const dashTopMonth = document.getElementById('dash-top-month');
    if (dashTopMonth) dashTopMonth.textContent = state.currentMonth;
}

function renderTrackerTransactions() {
    const container = document.getElementById('tracker-transactions');
    if (!container) return;

    const recent = [...state.transactions].reverse().slice(0, 10);

    if (recent.length === 0) {
        container.innerHTML = '<p class="tracker-empty">No purchases yet today. Buck is waiting! 👀</p>';
        return;
    }

    container.innerHTML = '';
    recent.forEach(tx => {
        const cat = CATEGORIES.find(c => c.id === tx.category);
        const dateStr = tx.date ? new Date(tx.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
        const row = document.createElement('div');
        row.className = 'tracker-tx-row';
        row.innerHTML = `
            <div class="tracker-tx-info">
                <span class="tracker-tx-cat">${cat ? cat.icon : '📦'} ${cat ? cat.name : tx.category}</span>
                <span class="tracker-tx-name">${escapeHtml(tx.name)}</span>
                ${dateStr ? `<span class="tracker-tx-date">${dateStr}</span>` : ''}
            </div>
            <div class="tracker-tx-right">
                <span class="tracker-tx-amt">-$${formatMoney(tx.amount)}</span>
                <button class="tracker-tx-del" onclick="deleteTransaction('${tx.id}')">✕</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function renderTrackerBars() {
    const container = document.getElementById('tracker-bars');
    if (!container) return;
    container.innerHTML = '';

    const cats = CATEGORIES.filter(c => (state.budgetCategories[c.id] || 0) > 0);
    if (cats.length === 0) {
        container.innerHTML = '<p class="tracker-empty">Set up your budget to see progress bars here!</p>';
        return;
    }

    cats.forEach(cat => {
        const budgeted = state.budgetCategories[cat.id];
        const actual = getCategoryActual(cat.id);
        const pct = budgeted > 0 ? Math.min(100, (actual / budgeted) * 100) : 0;
        const remaining = budgeted - actual;
        const over = actual > budgeted;

        const bar = document.createElement('div');
        bar.className = 'tracker-bar-row';
        bar.innerHTML = `
            <div class="tracker-bar-header">
                <span class="tracker-bar-name">${cat.icon} ${cat.name}</span>
                <span class="tracker-bar-nums">${over ? 'OVER ' : ''}$${formatMoney(actual)} / $${formatMoney(budgeted)}</span>
            </div>
            <div class="tracker-bar-bg">
                <div class="tracker-bar-fill" style="width:${pct}%;background:${over ? 'var(--danger)' : pct > 80 ? 'var(--warn)' : 'var(--accent)'}"></div>
            </div>
            <div class="tracker-bar-remaining">${over ? 'Over by $' + formatMoney(actual - budgeted) : '$' + formatMoney(remaining) + ' left'}</div>
        `;
        container.appendChild(bar);
    });
}

// ——— BUCK HEALTH (time-weighted budget adherence) ———
function getBuckHealth() {
    const totalBudget = getTotalBudgeted();
    const totalActual = getTotalActual();
    const totalExtra = getTotalExtraIncome();
    const income = state.budgetIncome + totalExtra;

    // If no income or no baseline, neutral
    if (income <= 0) return 50;

    const today = new Date().getDate();
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const timeProgress = Math.max(0.05, today / daysInMonth);

    let health = 100;

    // Start with pacing health (based on actual spending vs budget pace)
    const baseline = totalBudget > 0 ? totalBudget : income;
    const expectedSpend = baseline * timeProgress;
    const paceDiff = totalActual - expectedSpend;

    if (paceDiff > 0) {
        const dailyBudget = baseline / daysInMonth;
        const daysOver = paceDiff / dailyBudget;
        health -= daysOver * 12;
    } else {
        health = Math.min(100, health + 5);
    }

    // If actual spending has blown past income, that's critical
    if (totalActual > income) {
        const overPct = (totalActual - income) / income;
        // Over by 10% income -> 25 health, over by 50% -> 5 health
        const actualHealth = Math.max(5, Math.round(35 - overPct * 60));
        health = Math.min(health, actualHealth);
    }

    // If actual spending has blown past total budget, also bad
    if (totalActual > totalBudget && totalBudget > 0) {
        health = Math.min(health, 35);
    }

    // If the planned budget itself exceeds income, cap health low
    if (totalBudget > income) {
        const overPct = (totalBudget - income) / income;
        const planHealth = Math.max(5, Math.round(50 - overPct * 80));
        health = Math.min(health, planHealth);
    }

    // If still in the green, floor at 50 so "healthy" isn't too pessimistic
    const left = income - totalActual;
    if (left > 0 && totalActual < income) {
        health = Math.max(health, 50);
    }

    return Math.max(0, Math.round(health));
}

function updateBuckVisuals(health) {
    const fill = document.getElementById('tracker-hunger-fill');
    if (fill) {
        fill.style.width = health + '%';
        fill.style.background = health >= 60 ? 'var(--accent)' : health >= 30 ? 'var(--warn)' : 'var(--danger)';
    }
}

// ═══ YEARLY BILLS (Subscription Sinking Fund) ═══
function getYearlyBillMonthlyAmount(bill) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    let targetYear = currentYear;
    let targetMonth = bill.dueMonth;

    // If due date has passed this year, target next year
    if (targetMonth < currentMonth || (targetMonth === currentMonth && bill.dueDay < currentDay)) {
        targetYear++;
    }

    const dueDate = new Date(targetYear, targetMonth, bill.dueDay);
    const daysLeft = Math.max(1, Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24)));
    const monthsLeft = Math.max(1, Math.ceil(daysLeft / 30));

    const remaining = Math.max(0, bill.yearlyAmount - (bill.savedAmount || 0));

    if (bill.savingsMode === 'steady') {
        return Math.round(bill.yearlyAmount / 12);
    }
    // Catch-up mode
    return Math.round(remaining / monthsLeft);
}

function getYearlyBillDaysUntil(bill) {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetYear = currentYear;
    let targetMonth = bill.dueMonth;

    if (targetMonth < now.getMonth() || (targetMonth === now.getMonth() && bill.dueDay < now.getDate())) {
        targetYear++;
    }

    const dueDate = new Date(targetYear, targetMonth, bill.dueDay);
    return Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
}

function getYearlyBillReminder(bill) {
    const daysLeft = getYearlyBillDaysUntil(bill);
    const monthsLeft = Math.floor(daysLeft / 30);

    if (daysLeft <= 0) return { level: 'urgent', msg: `🚨 ${bill.name} is due!` };
    if (daysLeft <= 31) return { level: 'warn', msg: `⚠️ ${bill.name} due in ${daysLeft} days!` };
    if (monthsLeft <= 3) return { level: 'info', msg: `⏰ ${bill.name} due in ${monthsLeft} month${monthsLeft > 1 ? 's' : ''}` };
    return null;
}

function renderYearlyBills() {
    const container = document.getElementById('yearly-bills-list');
    if (!container) return;
    container.innerHTML = '';

    if (state.yearlyBills.length === 0) {
        container.innerHTML = '<p class="help-text" style="text-align:center;padding:20px;">No yearly bills yet. Add one and Buck will help you save monthly!</p>';
        return;
    }

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const savedSub = state.budgetSubItems['yearly_bills'] || {};
    let totalMonthly = 0;

    state.yearlyBills.forEach(bill => {
        if (bill.status === 'cancelled') return;

        const monthlyAmt = getYearlyBillMonthlyAmount(bill);
        const saved = bill.savedAmount || 0;
        const pct = Math.min(100, (saved / bill.yearlyAmount) * 100);
        const reminder = getYearlyBillReminder(bill);
        const isCancelAfterTerm = bill.status === 'cancel_after_term';
        const key = `📅 ${bill.name}`;
        const budgeted = savedSub[key] || monthlyAmt;
        totalMonthly += budgeted;

        const el = document.createElement('div');
        el.className = 'yearly-bill-row' + (isCancelAfterTerm ? ' cancelling' : '');
        el.innerHTML = `
            <div class="yearly-bill-main">
                <div class="yearly-bill-info">
                    <div class="yearly-bill-name">
                        ${escapeHtml(bill.name)}
                        ${isCancelAfterTerm ? '<span class="yearly-bill-badge">Cancelling</span>' : ''}
                    </div>
                    <div class="yearly-bill-meta">
                        $${formatMoney(saved)} saved / $${formatMoney(bill.yearlyAmount)} yearly
                        · Due ${monthNames[bill.dueMonth]} ${bill.dueDay}
                        ${reminder ? `<span class="yearly-bill-reminder ${reminder.level}">${reminder.msg}</span>` : ''}
                    </div>
                    <div class="yearly-bill-save">Save <strong>$${formatWhole(monthlyAmt)}</strong>/mo</div>
                </div>
                <div class="yearly-bill-actions">
                    ${saved >= bill.yearlyAmount ? `<button class="btn-icon" onclick="markYearlyBillPaid('${bill.id}')" title="Mark Paid">
                        <span class="btn-icon-emoji">💳</span><span class="btn-icon-label">Pay</span>
                    </button>` : ''}
                    <button class="btn-icon" onclick="editYearlyBill('${bill.id}')" title="Edit">
                        <span class="btn-icon-emoji">✏️</span><span class="btn-icon-label">Edit</span>
                    </button>
                    ${!isCancelAfterTerm ? `<button class="btn-icon" onclick="toggleCancelYearlyBill('${bill.id}')" title="Cancel after term">
                        <span class="btn-icon-emoji">🛑</span><span class="btn-icon-label">Cancel</span>
                    </button>` : `<button class="btn-icon" onclick="toggleCancelYearlyBill('${bill.id}')" title="Reactivate">
                        <span class="btn-icon-emoji">🔄</span><span class="btn-icon-label">Reactivate</span>
                    </button>`}
                    <button class="btn-icon" onclick="deleteYearlyBill('${bill.id}')" title="Delete">
                        <span class="btn-icon-emoji">🗑️</span><span class="btn-icon-label">Delete</span>
                    </button>
                </div>
            </div>
            <div class="yearly-bill-progress">
                <div class="yearly-bill-fill" style="width:${pct}%"></div>
            </div>
            <div class="yearly-bill-budget-row">
                <span class="sub-item-dollar">$</span>
                <input type="number" class="yearly-bill-input" data-bill="${bill.id}" placeholder="0" value="${budgeted > 0 ? Math.round(budgeted) : ''}" min="0" step="1">
                <span class="yearly-bill-input-label">/mo in budget</span>
            </div>
        `;
        container.appendChild(el);
    });

    // Add total row
    if (totalMonthly > 0) {
        const totalEl = document.createElement('div');
        totalEl.className = 'yearly-bill-total-row';
        totalEl.innerHTML = `<strong>Total:</strong> $${formatWhole(totalMonthly)}/mo for yearly bills`;
        container.appendChild(totalEl);
    }

    // Wire up inputs
    container.querySelectorAll('.yearly-bill-input').forEach(input => {
        input.addEventListener('input', () => {
            const billId = input.dataset.bill;
            const bill = state.yearlyBills.find(b => b.id === billId);
            if (!bill) return;
            const key = `📅 ${bill.name}`;
            const val = parseFloat(input.value) || 0;
            if (!state.budgetSubItems['yearly_bills']) state.budgetSubItems['yearly_bills'] = {};
            state.budgetSubItems['yearly_bills'][key] = val;
            // Re-render total
            renderYearlyBills();
        });
    });
}

function startNewYearlyBill() {
    document.getElementById('yearly-bill-modal-title').textContent = 'Add Yearly Bill';
    document.getElementById('yearly-bill-id').value = '';
    document.getElementById('yearly-bill-name').value = '';
    document.getElementById('yearly-bill-amount').value = '';
    document.getElementById('yearly-bill-month').value = new Date().getMonth().toString();
    document.getElementById('yearly-bill-day').value = '1';
    setYearlyBillMode('catchup');
    updateYearlyBillPreview();
    openModal('yearly-bill-modal');
}

function editYearlyBill(billId) {
    const bill = state.yearlyBills.find(b => b.id === billId);
    if (!bill) return;
    document.getElementById('yearly-bill-modal-title').textContent = 'Edit Yearly Bill';
    document.getElementById('yearly-bill-id').value = billId;
    document.getElementById('yearly-bill-name').value = bill.name;
    document.getElementById('yearly-bill-amount').value = bill.yearlyAmount;
    document.getElementById('yearly-bill-month').value = bill.dueMonth.toString();
    document.getElementById('yearly-bill-day').value = bill.dueDay;
    setYearlyBillMode(bill.savingsMode || 'catchup');
    updateYearlyBillPreview();
    openModal('yearly-bill-modal');
}

function setYearlyBillMode(mode) {
    document.getElementById('yearly-bill-mode').value = mode;
    document.getElementById('mode-catchup').classList.toggle('active', mode === 'catchup');
    document.getElementById('mode-steady').classList.toggle('active', mode === 'steady');
    updateYearlyBillPreview();
}

function updateYearlyBillPreview() {
    const amount = parseFloat(document.getElementById('yearly-bill-amount').value) || 0;
    const month = parseInt(document.getElementById('yearly-bill-month').value) || 0;
    const day = parseInt(document.getElementById('yearly-bill-day').value) || 1;
    const mode = document.getElementById('yearly-bill-mode').value;

    if (amount <= 0) {
        document.getElementById('yearly-bill-preview').textContent = 'Enter an amount to see your monthly savings plan';
        return;
    }

    const previewBill = {
        yearlyAmount: amount,
        dueMonth: month,
        dueDay: day,
        savingsMode: mode,
        savedAmount: 0
    };
    const monthly = getYearlyBillMonthlyAmount(previewBill);
    const modeText = mode === 'catchup' ? 'Catch-up mode' : 'Steady mode';
    document.getElementById('yearly-bill-preview').innerHTML = `<strong>${modeText}:</strong> Save <strong>$${formatWhole(monthly)}</strong> per month`;
}

function saveYearlyBill() {
    const id = document.getElementById('yearly-bill-id').value;
    const name = document.getElementById('yearly-bill-name').value.trim();
    const amount = parseFloat(document.getElementById('yearly-bill-amount').value) || 0;
    const month = parseInt(document.getElementById('yearly-bill-month').value);
    const day = parseInt(document.getElementById('yearly-bill-day').value) || 1;
    const mode = document.getElementById('yearly-bill-mode').value;

    if (!name) { shakeElement(document.getElementById('yearly-bill-name')); return; }
    if (amount <= 0) { shakeElement(document.getElementById('yearly-bill-amount').parentElement); return; }

    if (id) {
        const bill = state.yearlyBills.find(b => b.id === id);
        if (bill) {
            bill.name = name;
            bill.yearlyAmount = amount;
            bill.dueMonth = month;
            bill.dueDay = Math.min(day, 31);
            bill.savingsMode = mode;
        }
    } else {
        state.yearlyBills.push({
            id: 'yb-' + Date.now(),
            name,
            yearlyAmount: amount,
            dueMonth: month,
            dueDay: Math.min(day, 31),
            status: 'active',
            savingsMode: mode,
            savedAmount: 0,
            history: [],
            createdAt: new Date().toISOString()
        });
    }

    saveGlobalState();
    closeModal('yearly-bill-modal');
    renderYearlyBills();

    // Auto-refresh budget setup if on that page
    const budgetScene = document.getElementById('scene-budget-setup');
    if (budgetScene && budgetScene.classList.contains('active')) {
        initBudgetSetup();
    }

    playPop();
}

function markYearlyBillPaid(billId) {
    const bill = state.yearlyBills.find(b => b.id === billId);
    if (!bill) return;

    const saved = bill.savedAmount || 0;
    const monthKey = getMonthKey(state.currentMonth);

    // Log as a transaction in Tracker
    state.transactions.push({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        category: 'subscriptions',
        name: `${bill.name} (Yearly)`,
        amount: Math.min(saved, bill.yearlyAmount)
    });

    // Record in bill history
    bill.history.push({
        month: monthKey,
        amount: Math.min(saved, bill.yearlyAmount),
        paid: true
    });

    // Reset saved amount for next year
    bill.savedAmount = Math.max(0, saved - bill.yearlyAmount);
    bill.lastPaidMonth = monthKey;

    // If cancelling, mark as cancelled after this payment
    if (bill.status === 'cancel_after_term') {
        bill.status = 'cancelled';
    }

    saveState();
    saveGlobalState();
    renderYearlyBills();
    initTracker();
    playCoinSound();

    // Buck celebration
    const bubble = document.getElementById('tracker-bubble') || document.getElementById('status-message');
    if (bubble) {
        bubble.textContent = `🎉 ${bill.name} paid! Starting fresh for next year.`;
        setTimeout(() => { if(bubble) bubble.textContent = 'Let\'s see how you\'re doing!'; }, 4000);
    }
}

function toggleCancelYearlyBill(billId) {
    const bill = state.yearlyBills.find(b => b.id === billId);
    if (!bill) return;

    if (bill.status === 'active') {
        if (!confirm(`Cancel "${bill.name}" after the current term ends? It will stop appearing in your budget.`)) return;
        bill.status = 'cancel_after_term';
    } else if (bill.status === 'cancel_after_term') {
        bill.status = 'active';
    }

    saveGlobalState();
    renderYearlyBills();
}

function deleteYearlyBill(billId) {
    if (!confirm('Delete this yearly bill? The savings history will be lost.')) return;
    state.yearlyBills = state.yearlyBills.filter(b => b.id !== billId);
    saveGlobalState();
    renderYearlyBills();
}

function checkYearlyBillReminders() {
    const reminders = state.yearlyBills
        .filter(b => b.status === 'active')
        .map(getYearlyBillReminder)
        .filter(r => r !== null);

    if (reminders.length === 0) return null;

    // Return the most urgent reminder
    const priority = { urgent: 3, warn: 2, info: 1 };
    reminders.sort((a, b) => priority[b.level] - priority[a.level]);
    return reminders[0];
}

// Hook into budget setup to show yearly bills as a dynamic category
function getYearlyBillsBudgetItems() {
    return state.yearlyBills
        .filter(b => b.status === 'active')
        .map(bill => {
            const monthly = getYearlyBillMonthlyAmount(bill);
            return {
                key: `📅 ${bill.name}`,
                amount: monthly,
                billId: bill.id
            };
        });
}

function rollOverCategory(catId) {
    const budgeted = state.budgetCategories[catId] || 0;
    const actual = getCategoryActual(catId);
    const leftover = Math.max(0, budgeted - actual);
    if (leftover <= 0) return;

    const currentKey = getMonthKey(state.currentMonth);
    const nextKey = getNextMonthKey(currentKey);

    // Load next month's state (or start fresh)
    let nextState = getMonthState(nextKey);
    if (!nextState) {
        nextState = {
            budgetIncome: state.recurringIncome || 0,
            budgetIncomeSources: [...(state.recurringIncomeSources || [])],
            budgetCategories: {},
            budgetSubItems: {},
            transactions: [],
            extraIncome: [],
            goals: {},
            rolledOverCategories: [],
            setupComplete: false,
            income: state.recurringIncome || 0,
            incomeSources: [],
            expenses: {}
        };
        // Pre-fill recurring budget
        for (const [cid, subs] of Object.entries(state.recurringBudget || {})) {
            nextState.budgetSubItems[cid] = {};
            let catTotal = 0;
            for (const [subName, amount] of Object.entries(subs)) {
                if (amount > 0) {
                    nextState.budgetSubItems[cid][subName] = amount;
                    catTotal += amount;
                }
            }
            nextState.budgetCategories[cid] = catTotal;
        }
    }

    // Add leftover to next month's category budget
    nextState.budgetCategories[catId] = (nextState.budgetCategories[catId] || 0) + leftover;

    // Mark current category as rolled over
    if (!state.rolledOverCategories.includes(catId)) {
        state.rolledOverCategories.push(catId);
    }

    setMonthState(nextKey, nextState);
    saveState();
    renderDashboard();
    playPop();
}

function renderRollovers() {
    const list = document.getElementById('rollover-list');
    if (!list) return;
    list.innerHTML = '';

    const candidates = CATEGORIES.map(cat => {
        const budgeted = state.budgetCategories[cat.id] || 0;
        const actual = getCategoryActual(cat.id);
        const leftover = budgeted - actual;
        return { cat, budgeted, actual, leftover };
    }).filter(c => c.budgeted > 0 && c.leftover > 0 && !state.rolledOverCategories.includes(c.cat.id))
      .sort((a, b) => b.leftover - a.leftover);

    if (candidates.length === 0) {
        list.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:16px 0;margin:0;">No leftover money to roll over this month.</p>';
        return;
    }

    candidates.forEach(({ cat, budgeted, actual, leftover }) => {
        const row = document.createElement('div');
        row.className = 'rollover-row';
        row.innerHTML = `
            <div class="rollover-info">
                <div class="rollover-name">${cat.icon} ${cat.name}</div>
                <div class="rollover-detail">Budget $${formatWhole(budgeted)} · Spent $${formatWhole(actual)} · <strong>$${formatWhole(leftover)} left</strong></div>
            </div>
            <button class="btn-secondary rollover-btn" onclick="rollOverCategory('${cat.id}')">Roll Over</button>
        `;
        list.appendChild(row);
    });
}

// ═══ DASHBOARD ═══
function renderYearlyBillsSummary() {
    const container = document.getElementById('yearly-bills-summary-list');
    const totalEl = document.getElementById('yearly-bills-summary-total');
    if (!container || !totalEl) return;

    if (state.yearlyBills.length === 0) {
        container.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:12px 0;margin:0;">No yearly bills set up yet.</p>';
        totalEl.textContent = '$0';
        return;
    }

    let total = 0;
    container.innerHTML = state.yearlyBills.map(bill => {
        const monthly = getYearlyBillMonthlyAmount(bill);
        total += monthly;
        const daysLeft = getYearlyBillDaysUntil(bill);
        return `
            <div class="yearly-bill-summary-row">
                <div class="yearly-bill-summary-name">${bill.icon || '📋'} ${bill.name}</div>
                <div class="yearly-bill-summary-amount">$${formatMoney(monthly)}<span class="yearly-bill-summary-period">/mo</span></div>
                <div class="yearly-bill-summary-due">${daysLeft <= 31 ? '⚠️ ' : ''}${daysLeft} days left</div>
            </div>
        `;
    }).join('');

    totalEl.textContent = '$' + formatMoney(total);
}

function renderDashboard() {
    updateMonthSelector();

    const totalBudget = getTotalBudgeted();
    const totalActual = getTotalActual();
    const totalExtra = getTotalExtraIncome();
    const totalIncome = state.budgetIncome + totalExtra;
    const left = totalIncome - totalActual;
    const health = getBuckHealth();

    // Numbers
    document.getElementById('dash-income').textContent = '$' + formatMoney(totalIncome);
    document.getElementById('dash-spent').textContent = '$' + formatMoney(totalActual);
    document.getElementById('dash-left').textContent = (left < 0 ? '-$' : '$') + formatMoney(Math.abs(left));

    const leftContainer = document.getElementById('left-container');
    leftContainer.className = 'number-item left' + (left < 0 ? ' negative' : '');

    // Buck status (dashboard version)
    const hungerFill = document.getElementById('hunger-fill');
    hungerFill.style.width = health + '%';
    hungerFill.style.background = health >= 60 ? 'var(--accent)' : health >= 30 ? 'var(--warn)' : 'var(--danger)';

    const mouth = document.getElementById('buck-mouth');
    const statusHeadline = document.getElementById('status-headline');
    const statusMessage = document.getElementById('status-message');

    // Check yearly bill reminders
    const billReminder = checkYearlyBillReminders();

    if (billReminder) {
        mouth.className = billReminder.level === 'urgent' ? 'mouth sad' : 'mouth';
        statusHeadline.textContent = billReminder.msg;
        statusMessage.textContent = 'Check your Yearly Bills on the Dashboard for details.';
    } else if (health >= 80) {
        mouth.className = 'mouth happy';
        statusHeadline.textContent = pickRandom(BUCK_SAYINGS.thriving);
        statusMessage.textContent = `Budget health at ${health}%. You're crushing this month!`;
    } else if (health >= 50) {
        mouth.className = 'mouth';
        statusHeadline.textContent = pickRandom(BUCK_SAYINGS.decent);
        statusMessage.textContent = `Budget health at ${health}%. Staying on track.`;
    } else if (health >= 20) {
        mouth.className = 'mouth sad';
        statusHeadline.textContent = pickRandom(BUCK_SAYINGS.tight);
        statusMessage.textContent = `Budget health at ${health}%. Buck is getting worried.`;
    } else {
        mouth.className = 'mouth sad';
        statusHeadline.textContent = pickRandom(BUCK_SAYINGS.underwater);
        statusMessage.textContent = `Budget health at ${health}%. Time to cut back!`;
    }

    // Coffee roast
    const coffeeTx = state.transactions.filter(t =>
        t.category === 'food' && (
            t.name.toLowerCase().includes('coffee') ||
            t.name.toLowerCase().includes('starbucks') ||
            t.name.toLowerCase().includes('dunkin')
        )
    );
    const coffeeSpent = coffeeTx.reduce((s, t) => s + t.amount, 0);
    if (coffeeSpent > 80) {
        statusMessage.textContent += " " + pickRandom(BUCK_SAYINGS.coffee);
    }

    // Water status
    const waterCard = document.getElementById('water-card');
    const waterText = document.getElementById('water-text');
    const waterFill = document.getElementById('water-fill');
    const spendPct = totalIncome > 0 ? (totalActual / totalIncome) * 100 : 0;

    waterFill.style.width = Math.min(100, spendPct) + '%';
    if (spendPct > 100) {
        waterCard.className = 'card water-card underwater';
        waterText.textContent = `You're ${(spendPct - 100).toFixed(0)}% over income! 💸`;
        waterFill.style.width = '100%';
    } else if (spendPct > 85) {
        waterCard.className = 'card water-card warning';
        waterText.textContent = `Cutting it close — ${(100 - spendPct).toFixed(0)}% of income left.`;
    } else {
        waterCard.className = 'card water-card';
        waterText.textContent = `Safe zone — ${(100 - spendPct).toFixed(0)}% of income unspent.`;
    }

    // Savings Pot
    renderSavingsPots();

    // Yearly Bills Summary
    renderYearlyBillsSummary();

    // Rollovers
    renderRollovers();

    // Breakdown (budget vs actual)
    renderBreakdown();

    // Badges
    checkAndAwardBadges(left, totalActual);
    renderBadges();
}

function renderSavingsPots() {
    const containers = [
        document.getElementById('savings-pots-list'),
        document.getElementById('budget-savings-pots-list')
    ].filter(Boolean);

    if (containers.length === 0) return;
    containers.forEach(c => c.innerHTML = '');

    if (state.savingsPots.length === 0) {
        containers.forEach(c => c.innerHTML = '<p class="help-text">No savings goals yet. Start one below!</p>');
        return;
    }

    const savingsSubs = state.budgetSubItems['savings'] || {};

    state.savingsPots.forEach((pot) => {
        const historicalTotal = pot.history.reduce((sum, h) => sum + (h.amount || 0), 0);
        const potKey = `💰 ${pot.name}`;
        const monthlySavings = savingsSubs[potKey] || 0;
        const runningTotal = historicalTotal + monthlySavings;
        const goalAmount = pot.targetAmount || 5000;
        const fillPct = Math.min(100, (runningTotal / goalAmount) * 100);

        const potEl = document.createElement('div');
        potEl.className = 'pot-display' + (state.savingsPots.length > 1 ? ' pot-compact' : '');
        potEl.innerHTML = `
            <div class="pot-jar" id="pot-jar-${pot.id}">
                <div class="pot-fill" id="pot-fill-${pot.id}" style="height:${fillPct}%"></div>
                <div class="pot-coins" id="pot-coins-${pot.id}"></div>
            </div>
            <div class="pot-info">
                <div class="pot-name-row">
                    <span class="pot-name">${escapeHtml(pot.name)}</span>
                    <div class="pot-actions">
                        <button class="btn-icon" onclick="editPotBudget('${pot.id}')" title="Edit Monthly Amount">
                            <span class="btn-icon-emoji">💵</span>
                            <span class="btn-icon-label">Monthly</span>
                        </button>
                        <button class="btn-icon" onclick="editPotGoal('${pot.id}')" title="Edit Goal">
                            <span class="btn-icon-emoji">📊</span>
                            <span class="btn-icon-label">Goal</span>
                        </button>
                        <button class="btn-icon" onclick="renamePot('${pot.id}')" title="Rename">
                            <span class="btn-icon-emoji">✏️</span>
                            <span class="btn-icon-label">Rename</span>
                        </button>
                        <button class="btn-icon" onclick="deletePot('${pot.id}')" title="Delete">
                            <span class="btn-icon-emoji">🗑️</span>
                            <span class="btn-icon-label">Delete</span>
                        </button>
                    </div>
                </div>
                <div class="pot-total">$${formatMoney(runningTotal)}</div>
                <p class="pot-desc">${monthlySavings > 0 ? `+$${formatMoney(monthlySavings)} this month — ` : ''}Goal: $${formatMoney(goalAmount)}</p>
            </div>
        `;
        containers.forEach(container => container.appendChild(potEl.cloneNode(true)));

        // Coin animation for pots with monthly savings (only on first container to avoid double animation)
        if (monthlySavings > 0 && containers[0]) {
            const coinsContainer = containers[0].querySelector(`#pot-coins-${pot.id}`);
            if (coinsContainer) {
                for (let i = 0; i < Math.min(5, Math.floor(monthlySavings / 50) + 1); i++) {
                    const coin = document.createElement('div');
                    coin.className = 'pot-coin';
                    coin.style.left = (10 + Math.random() * 60) + '%';
                    coin.style.bottom = (Math.random() * 60) + '%';
                    coin.style.animationDelay = (i * 0.1) + 's';
                    coinsContainer.appendChild(coin);
                    setTimeout(() => coin.remove(), 1000);
                }
            }
        }
    });
}

// ——— SAVINGS POT MANAGEMENT ———
let _renamePotId = null;

function renamePot(potId) {
    const pot = state.savingsPots.find(p => p.id === potId);
    if (!pot) return;
    _renamePotId = potId;
    document.getElementById('pot-name-input').value = pot.name;
    document.getElementById('pot-rename-id').value = potId;
    openModal('rename-pot-modal');
}

function savePotName() {
    const val = document.getElementById('pot-name-input').value.trim();
    const potId = _renamePotId || document.getElementById('pot-rename-id').value;
    if (val && potId) {
        const pot = state.savingsPots.find(p => p.id === potId);
        if (pot) {
            const oldKey = `💰 ${pot.name}`;
            const newKey = `💰 ${val}`;
            // Migrate budget sub-item if it exists
            if (state.budgetSubItems['savings'] && state.budgetSubItems['savings'][oldKey] !== undefined) {
                state.budgetSubItems['savings'][newKey] = state.budgetSubItems['savings'][oldKey];
                delete state.budgetSubItems['savings'][oldKey];
            }
            // Migrate recurring budget if it exists
            if (state.recurringBudget['savings'] && state.recurringBudget['savings'][oldKey] !== undefined) {
                state.recurringBudget['savings'][newKey] = state.recurringBudget['savings'][oldKey];
                delete state.recurringBudget['savings'][oldKey];
            }
            pot.name = val;
        }
    }
    _renamePotId = null;
    saveState();
    closeModal('rename-pot-modal');
    renderDashboard();
}

function editPotGoal(potId) {
    const pot = state.savingsPots.find(p => p.id === potId);
    if (!pot) return;
    document.getElementById('edit-goal-pot-id').value = potId;
    document.getElementById('edit-goal-amount').value = pot.targetAmount || 5000;
    openModal('edit-goal-modal');
}

function editPotBudget(potId) {
    const pot = state.savingsPots.find(p => p.id === potId);
    if (!pot) return;
    goto('budget-setup');
    // Wait for budget setup to render, then expand savings and focus the pot input
    setTimeout(() => {
        const wrapper = document.querySelector('.budget-cat-wrap[data-cat="savings"]');
        if (wrapper) {
            const body = wrapper.querySelector('.budget-cat-body');
            const arrow = wrapper.querySelector('.budget-cat-arrow');
            if (body && !body.classList.contains('open')) {
                body.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 200 + 'px';
                if (arrow) arrow.textContent = '\u25bc';
            }
            // Find the input for this pot
            const potKey = `💰 ${pot.name}`;
            const inputs = wrapper.querySelectorAll('.sub-item-input');
            inputs.forEach(inp => {
                if (inp.dataset.sub === potKey) {
                    inp.focus();
                    inp.select();
                    // Flash highlight
                    inp.style.transition = 'background 0.3s ease';
                    inp.style.background = 'rgba(34,197,94,0.2)';
                    setTimeout(() => { inp.style.background = ''; }, 1500);
                }
            });
            // Scroll into view
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 150);
}

function savePotGoal() {
    const potId = document.getElementById('edit-goal-pot-id').value;
    const amount = parseFloat(document.getElementById('edit-goal-amount').value) || 0;
    if (potId && amount > 0) {
        const pot = state.savingsPots.find(p => p.id === potId);
        if (pot) pot.targetAmount = amount;
    }
    saveState();
    closeModal('edit-goal-modal');
    renderDashboard();
}

function startNewPot() {
    const name = prompt("What are you saving for?", "New Goal");
    if (!name) return;
    const newPot = {
        id: 'pot-' + Date.now(),
        name: name.trim(),
        total: 0,
        history: [],
        targetAmount: 5000,
        createdAt: new Date().toISOString()
    };
    state.savingsPots.push(newPot);
    saveState();
    renderDashboard();
    playChaChing();
}

function deletePot(potId) {
    if (!confirm('Delete this savings goal? The history will be lost.')) return;
    const pot = state.savingsPots.find(p => p.id === potId);
    if (pot && state.budgetSubItems['savings']) {
        const key = `💰 ${pot.name}`;
        delete state.budgetSubItems['savings'][key];
    }
    state.savingsPots = state.savingsPots.filter(p => p.id !== potId);
    saveState();
    renderDashboard();
    playPop();
}

function renderBreakdown() {
    const breakdownList = document.getElementById('breakdown-list');
    breakdownList.innerHTML = '';

    const catData = CATEGORIES.map(cat => {
        const budgeted = state.budgetCategories[cat.id] || 0;
        const actual = getCategoryActual(cat.id);
        return { cat, budgeted, actual };
    }).filter(c => c.budgeted > 0 || c.actual > 0)
      .sort((a, b) => b.actual - a.actual);

    if (catData.length === 0) {
        breakdownList.innerHTML = '<p style="color:#94a3b8;text-align:center;padding:20px;">Set up your budget to see the breakdown!</p>';
        return;
    }

    catData.forEach(({ cat, budgeted, actual }) => {
        const diff = actual - budgeted;
        const isOver = diff > 0;
        const pctOfBudget = budgeted > 0 ? Math.min(100, (actual / budgeted) * 100) : 0;
        const overPct = budgeted > 0 && isOver ? Math.min(100, (diff / budgeted) * 100) : 0;

        let statusText = '';
        let statusClass = '';
        if (budgeted === 0) {
            statusText = `$${formatWhole(actual)} spent (no budget)`;
            statusClass = 'neutral';
        } else if (isOver) {
            statusText = `$${formatWhole(actual)} spent · $${formatWhole(diff)} over budget`;
            statusClass = 'over';
        } else if (diff === 0) {
            statusText = `$${formatWhole(actual)} spent · right on budget`;
            statusClass = 'on';
        } else {
            statusText = `$${formatWhole(actual)} spent · $${formatWhole(Math.abs(diff))} under budget`;
            statusClass = 'under';
        }

        const row = document.createElement('div');
        row.className = 'breakdown-item';
        row.innerHTML = `
            <div class="breakdown-icon" style="background:${getCatColor(cat.id)}">${cat.icon}</div>
            <div class="breakdown-info">
                <div class="breakdown-name">${cat.name}</div>
                <div class="breakdown-single-bar">
                    <div class="breakdown-fill" style="width:${pctOfBudget}%;background:${getCatColor(cat.id)}"></div>
                    ${isOver ? `<div class="breakdown-over" style="width:${overPct}%;background:var(--danger)"></div>` : ''}
                </div>
                <div class="breakdown-status ${statusClass}">${statusText}</div>
            </div>
        `;
        breakdownList.appendChild(row);
    });
}

// ─── BADGES ───
function checkAndAwardBadges(left, totalActual) {
    const totalExtra = getTotalExtraIncome();
    const totalIncome = state.budgetIncome + totalExtra;
    const pctSpent = totalIncome > 0 ? totalActual / totalIncome : 0;
    const prevCount = state.badges.length;

    if (!hasBadge('first_budget') && totalActual > 0) awardBadge('first_budget');
    if (!hasBadge('green_month') && left > 0) awardBadge('green_month');

    if (left > 0) {
        const recent = state.monthHistory.slice(-5);
        const posCount = recent.filter(m => m.left > 0).length;
        if (!hasBadge('streak_3') && posCount >= 2) awardBadge('streak_3');
        if (!hasBadge('streak_6') && posCount >= 5) awardBadge('streak_6');
    }

    const savingsSubs = state.budgetSubItems['savings'] || {};
    const allPotsTotal = state.savingsPots.reduce((sum, pot) => {
        const historicalTotal = pot.history.reduce((s, h) => s + (h.amount || 0), 0);
        const budgeted = savingsSubs[`💰 ${pot.name}`] || 0;
        return sum + historicalTotal + budgeted;
    }, 0);
    if (!hasBadge('savings_500') && allPotsTotal >= 500) awardBadge('savings_500');
    if (!hasBadge('savings_2000') && allPotsTotal >= 2000) awardBadge('savings_2000');

    if (!hasBadge('frugal_hero') && pctSpent < 0.7 && totalActual > 0) awardBadge('frugal_hero');

    const savingsTx = state.transactions.filter(t => t.category === 'savings');
    const savingsActual = savingsTx.reduce((s, t) => s + t.amount, 0);
    if (!hasBadge('investor') && savingsActual >= totalIncome * 0.2) awardBadge('investor');

    const coffee = state.transactions.filter(t =>
        t.category === 'food' && (
            t.name.toLowerCase().includes('coffee') ||
            t.name.toLowerCase().includes('starbucks')
        )
    );
    const foodTx = state.transactions.filter(t => t.category === 'food');
    if (!hasBadge('no_coffee') && coffee.length === 0 && foodTx.length > 0) awardBadge('no_coffee');

    const debtTx = state.transactions.filter(t => t.category === 'debt');
    if (!hasBadge('debt_free') && debtTx.length === 0 && state.transactions.length > 0) awardBadge('debt_free');

    if (state.badges.length > prevCount) saveState();
}

function hasBadge(id) { return state.badges.includes(id); }

function awardBadge(id) {
    if (hasBadge(id)) return;
    state.badges.push(id);
    playChime();
}

function renderBadges() {
    const row = document.getElementById('badges-row');
    row.innerHTML = '';
    BADGES.forEach(badge => {
        const unlocked = hasBadge(badge.id);
        const el = document.createElement('div');
        el.className = 'badge' + (unlocked ? ' unlocked' : '');
        el.title = badge.desc;
        el.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        `;
        row.appendChild(el);
    });
}

// ─── NEW MONTH ───
function newMonth() {
    openModal('new-month-modal');
    document.getElementById('recurring-list').innerHTML =
        '<p class="help-text">Starting a new month resets your transactions and rolls your budgeted savings into your pot. Recurring items carry over automatically!</p>';
}

function confirmNewMonth() {
    // Close modal immediately so user isn't stuck staring at it
    closeModal('new-month-modal');

    const totalActual = getTotalActual();
    const totalExtra = getTotalExtraIncome();
    const totalIncome = state.budgetIncome + totalExtra;
    const left = totalIncome - totalActual;

    // Add budgeted savings pot amounts to history if not already there
    const savingsSubs = state.budgetSubItems['savings'] || {};
    state.savingsPots.forEach(pot => {
        const potKey = `💰 ${pot.name}`;
        const amount = savingsSubs[potKey] || 0;
        if (amount > 0) {
            const alreadyAdded = pot.history.some(h => h.month === state.currentMonth);
            if (!alreadyAdded) {
                pot.history.push({ month: state.currentMonth, amount });
                pot.total = (pot.total || 0) + amount;
            }
        }
    });

    state.monthHistory.push({
        month: state.currentMonth,
        income: totalIncome,
        spent: totalActual,
        left: left
    });

    // Determine next month
    const [year, month] = getMonthKey(state.currentMonth).split('-').map(Number);
    let nextYear = year, nextMonth = month + 1;
    if (nextMonth > 12) { nextMonth = 1; nextYear++; }
    const nextKey = `${nextYear}-${String(nextMonth).padStart(2, '0')}`;

    // Save current month before switching
    saveState();

    // Switch to next month (this will pre-fill recurring items)
    switchMonth(nextKey);

    playChaChing();
    goto('tracker');
}

// ——— PRINT / PDF ———
function printReport() {
    const totalActual = getTotalActual();
    const totalExtra = getTotalExtraIncome();
    const totalIncome = state.budgetIncome + totalExtra;
    const left = totalIncome - totalActual;

    document.getElementById('print-month').textContent = state.currentMonth;
    document.getElementById('print-income').textContent = '$' + formatMoney(totalIncome);
    document.getElementById('print-spent').textContent = '$' + formatMoney(totalActual);
    document.getElementById('print-left').textContent = (left < 0 ? '-$' : '$') + formatMoney(Math.abs(left));

    const breakdown = document.getElementById('print-breakdown');
    breakdown.innerHTML = '';

    const catData = CATEGORIES.map(cat => {
        const budgeted = state.budgetCategories[cat.id] || 0;
        const actual = getCategoryActual(cat.id);
        return { cat, budgeted, actual };
    }).filter(c => c.budgeted > 0 || c.actual > 0)
      .sort((a, b) => b.actual - a.actual);

    catData.forEach(({ cat, budgeted, actual }) => {
        const row = document.createElement('div');
        row.className = 'print-row';
        row.innerHTML = `<span>${cat.icon} ${cat.name}</span><span>$${formatMoney(actual)}${budgeted > 0 ? ' / $' + formatMoney(budgeted) + ' budgeted' : ''}</span>`;
        breakdown.appendChild(row);
    });

    const totalRow = document.createElement('div');
    totalRow.className = 'print-total';
    totalRow.innerHTML = `<span>Total Spent</span><span>$${formatMoney(totalActual)}</span>`;
    breakdown.appendChild(totalRow);

    // Transactions list with dates
    const txContainer = document.getElementById('print-transactions');
    if (txContainer) {
        txContainer.innerHTML = '';
        if (state.transactions.length === 0) {
            txContainer.innerHTML = '<p style="color:#666;">No transactions this month.</p>';
        } else {
            const sorted = [...state.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
            sorted.forEach(tx => {
                const cat = CATEGORIES.find(c => c.id === tx.category);
                const dateStr = tx.date ? new Date(tx.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                const row = document.createElement('div');
                row.className = 'print-row';
                row.innerHTML = `<span>${dateStr ? dateStr + ' — ' : ''}${cat ? cat.icon + ' ' + cat.name : tx.category} — ${escapeHtml(tx.name)}</span><span>-$${formatMoney(tx.amount)}</span>`;
                txContainer.appendChild(row);
            });
        }
    }

    window.print();
}

// ─── HELPERS ───
function getTotalBudgeted() {
    // First try budgetCategories (saved plan), then fall back to subItems
    const catTotal = Object.values(state.budgetCategories).reduce((a, b) => a + b, 0);
    if (catTotal > 0) return catTotal;
    // Calculate from subItems if categories hasn't been saved yet
    let subTotal = 0;
    for (const catSubs of Object.values(state.budgetSubItems || {})) {
        subTotal += Object.values(catSubs).reduce((a, b) => a + b, 0);
    }
    return subTotal;
}

function getTotalActual() {
    return state.transactions.reduce((s, t) => s + t.amount, 0);
}

function getCategoryActual(catId) {
    return state.transactions
        .filter(t => t.category === catId)
        .reduce((s, t) => s + t.amount, 0);
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatMoney(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatWhole(n) {
    return Math.round(n).toLocaleString('en-US');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake 0.5s ease';
}

function getCatColor(id) {
    const colors = {
        housing:'#ef4444', utilities:'#f97316', transport:'#eab308',
        food:'#22c55e', subscriptions:'#a855f7', shopping:'#ec4899',
        entertainment:'#3b82f6', debt:'#dc2626', savings:'#06b6d4',
        personal:'#14b8a6', family:'#f59e0b', misc:'#8b5cf6'
    };
    return colors[id] || '#94a3b8';
}

// ─── DASHBOARD ACTIONS ───
function editBudget() {
    goto('budget-setup');
}

function resetBudget() {
    if (!confirm("Start completely over? This deletes EVERYTHING \u2014 budget, transactions, savings history, all of it.")) return;

    // Clear all Budget Buddy data from localStorage
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('budgetBuddy_')) localStorage.removeItem(key);
    });

    state = {
        budgetIncome: 0,
        budgetIncomeSources: [],
        budgetCategories: {},
        budgetSubItems: {},
        transactions: [],
        goals: {},
        savingsPots: [{
            id: 'pot-' + Date.now(),
            name: "My Dream Vacation",
            total: 0,
            history: [],
            targetAmount: 5000,
            createdAt: new Date().toISOString()
        }],
        badges: [],
        monthHistory: [],
        currentMonth: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
        setupComplete: false,
        income: 0,
        incomeSources: [],
        expenses: {},
        recurringIncome: 0,
        recurringIncomeSources: [],
        recurringBudget: {},
        extraIncome: []
    };
    saveState();
    window.location.reload();
}

// ─── CONFETTI ───
function fireConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#22c55e','#3b82f6','#f59e0b','#ec4899','#06b6d4','#8b5cf6'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 4 + 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed; p.vy += 0.1;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
        });
        frame++;
        if (frame < 120) requestAnimationFrame(animate);
        else canvas.remove();
    }
    animate();
}

// ─── THEME ───
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (html.dataset.theme === 'dark') {
        html.dataset.theme = 'light';
        btn.textContent = '🌙';
        localStorage.setItem('bb_theme', 'light');
    } else {
        html.dataset.theme = 'dark';
        btn.textContent = '☀️';
        localStorage.setItem('bb_theme', 'dark');
    }
}

// ——— INIT ———
document.addEventListener('DOMContentLoaded', () => {
    // Register service worker for PWA / offline support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }

    const savedTheme = localStorage.getItem('bb_theme');
    if (savedTheme === 'light') {
        document.documentElement.dataset.theme = 'light';
        document.getElementById('theme-toggle').textContent = '🌙';
    } else {
        // Default to dark mode
        document.documentElement.dataset.theme = 'dark';
        document.getElementById('theme-toggle').textContent = '☀️';
        if (!savedTheme) localStorage.setItem('bb_theme', 'dark');
    }

    loadState();
    loadRecurring();

    const lastScene = localStorage.getItem('bb_last_scene');
    const hasData = state.setupComplete || state.budgetIncome > 0 || state.transactions.length > 0;
    if (lastScene && hasData) {
        goto(lastScene);
    } else if (hasData) {
        goto('tracker');
    } else {
        goto('welcome');
    }

    document.getElementById('total-income').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveIncome();
    });

    // Tracker inputs: Enter to submit
    const trackerAmount = document.getElementById('tracker-amount');
    const trackerName = document.getElementById('tracker-name');
    if (trackerAmount) {
        trackerAmount.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTransaction();
        });
    }

    // Yearly bill modal: live preview updates
    const ybAmount = document.getElementById('yearly-bill-amount');
    const ybMonth = document.getElementById('yearly-bill-month');
    const ybDay = document.getElementById('yearly-bill-day');
    if (ybAmount) ybAmount.addEventListener('input', updateYearlyBillPreview);
    if (ybMonth) ybMonth.addEventListener('change', updateYearlyBillPreview);
    if (ybDay) ybDay.addEventListener('input', updateYearlyBillPreview);
    if (trackerName) {
        trackerName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTransaction();
        });
    }

    // Re-init current scene when restored from bfcache so stale forms don't show
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            const lastScene = localStorage.getItem('bb_last_scene') || 'tracker';
            console.log('[pageshow] restored from bfcache, re-init scene:', lastScene);
            if (lastScene === 'income') initIncome();
            if (lastScene === 'budget-setup') initBudgetSetup();
            if (lastScene === 'tracker') initTracker();
            if (lastScene === 'dashboard') renderDashboard();
        }
    });
});
