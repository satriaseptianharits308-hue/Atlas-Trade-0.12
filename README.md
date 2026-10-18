# ATLAS TRADE — Institutional Performance Desk

An ultra-sleek, professional trading performance system and trade journal designed for prop firm traders, fund managers, and retail trading desks.

---

## 🌟 11 New Core Features

### 1. Multi-Device Server-Side Storage (`server.py` + SQLite)
- **True Multi-Device Access**: Accounts, journals, trade executions, profile settings, feedback, and surveys are saved directly on the server database (`atlas_data.db`) rather than isolated in `localStorage`.
- **Cross-Device Continuity**: Log in from your PC, Mac, tablet, or phone — your data, open accounts, and journal are always synchronized.
- **Graceful Fallback**: If the server is offline, intelligent local caching ensures seamless uninterrupted operation.

### 2. Share PnL as High-Definition Image
- **Instant PnL Card Generator**: Click the **📸 Share PnL** button in the dashboard hero card to generate a broadcast-quality institutional graphic.
- **Features**: Glowing realized P&L typography, win rate %, profit factor, total lots, trader avatar, verified execution watermark, and the golden *"DISCIPLINE IS YOUR CROWN"* emblem.
- **Actions**: One-click **Download PNG** or **Copy Image to Clipboard** ready for Twitter/X, Discord, Instagram, and Telegram.

### 3. MetaTrader 4 & MetaTrader 5 Sync Hub
- **Direct Statement Import**: Drag & drop or upload detailed HTML/CSV reports exported from MetaTrader 4 or MetaTrader 5. Automatically parses ticket numbers, open/close times, symbols, lot sizes, and realized profit into your journal.
- **Live Broker Bridge**: Connect your MT4/MT5 Broker Server, Account Number, and Read-Only Investor Password for automated synchronization.
- **Quick Test Sync**: Simulate pulling realistic verified executions from MetaTrader with 1-click.

### 4. Trader Profile Customization
- **Profile Photo & Avatar**: Upload custom profile photos (with circular avatar display) or select from institutional badges (🦁, 🐂, 🦅, 🐺, 💎, 👑).
- **Edit Username & Callsign**: Update your trader display name, callsign, and trading style/bio on the fly.
- **Persistent Sync**: Changes update across headers, share cards, and persist directly to the server.

### 5 & 6. Multilingual Engine (11 Languages)
- **11 Native Languages Supported**:
  1. 🇬🇧 English (`en`)
  2. 🇮🇩 Bahasa Indonesia (`id`)
  3. 🇲🇾 Bahasa Melayu (`ms`)
  4. 🇩🇪 Deutsch (`de`)
  5. 🇫🇷 Français (`fr`)
  6. 🇪🇸 Español (`es`)
  7. 🇮🇹 Italiano (`it`)
  8. 🇨🇳 简体中文 (`zh`)
  9. 🇯🇵 日本語 (`ja`)
  10. 🇹🇭 ภาษาไทย (`th`)
  11. 🇸🇦 العربية (`ar` - with native RTL typography!)
- **Accessible Everywhere**: Switch languages directly on the **Sign In / Register screen** or at any time from the **Top Header** without logging out.

### 7. Post-Registration Onboarding Questionnaire
- When a new trader creates an account, an interactive survey modal is presented:
  1. *What is your primary trading goal?* (Prop firm funding, full-time independent, discipline & psychology, strategy validation)
  2. *How did you discover Atlas Trade?* (Trader mentor referral, YouTube, Discord/Telegram, TradingView)
  3. *What is your trading profit target & milestone?* (Consistent $1K-$3K/month, pass $100K challenge, $10,000+ net gain)
- Saved to server and viewable by the Super Admin in the Master Admin Desk.

### 8. Multi-Theme Engine (5 Themes)
- Not just dark and light — switch instantly between:
  1. **Default** ✨: Atlas Signature Obsidian Gold & Cyan.
  2. **Classic** 🏛️: Wall Street / Bloomberg Terminal (Slate charcoal with warm amber accents).
  3. **Deep** 🌌: Deep Midnight OLED & Cyber Sapphire Blue.
  4. **Dark** 🌑: Carbon Graphite Minimalist.
  5. **Light** ☀️: Crisp Institutional Clean Ivory.

### 9. Top-Bar Share Feedback (Super Admin Only Desk)
- Traders can click **💬 Feedback** in the top navigation bar to submit a rating (1-5 stars), feedback category, and suggestions.
- Shows instant confirmation toast: **"thanks for your feedback"**.
- **Super Admin Oversight**: Only the Master Admin (`satriatrader1@gmail.com`) can inspect and review trader feedback submissions from the dedicated **Trader Feedback Desk**.

### 10. Trade Reflection Notes in Journal
- **Notes & Reflections Column**: Added to the Trade Journal table with clickable preview badges (`📝 View / Add Note`).
- **Interactive Note Drawer**: Read and write detailed setup rationale, emotional state, technical triggers, and lessons learned.
- **Searchable**: Search through trade notes directly from the journal search filter.

### 11. Trader Achievements & Milestone Accolades
- Dedicated **🏆 Achievements** desk tracking institutional milestones:
  - 🥉 **100 Dollar Pertama**: First $100 in realized net trading profit.
  - 🥈 **1000 Dollar Pertama**: Surpassing $1,000 cumulative profit.
  - 🥇 **High Roller Club ($10,000)**: Elite portfolio milestone.
  - 🎯 **First Blood**: Logging your first verified trade.
  - 👑 **Discipline Crown**: Achieving a 5-day profitable winning streak.
  - 🛡️ **Risk Sovereign**: Maintaining 60%+ win rate over 5+ executions.
  - 📜 **Master Journalist**: Logging notes on 5+ trades.
  - ⚡ **Centurion Desk**: Executing 50 verified trades.
- **Official Award Certificate**: Unlocked achievements feature a **View Official Award Certificate** button that renders a certificate canvas ready for download or sharing.

---

## 🚀 Quick Start

Start the Python backend server:
```bash
python3 server.py
```
Then visit `http://localhost:8000` in any web browser on your computer, tablet, or phone!

### Default Credentials
- **Master Admin Email**: `satriatrader1@gmail.com`
- **Master Admin Password**: `satria308`
- **Sample Trader**: `alex.turner@alphatrading.com` / `password123`
