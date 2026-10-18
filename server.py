#!/usr/bin/env python3
"""
ATLAS TRADE — Institutional Performance Desk Server
High-performance REST API & Static Server with SQLite persistence.
Zero third-party dependencies — runs on standard Python 3.
"""

import http.server
import socketserver
import urllib.parse
import json
import os
import sys
import sqlite3
import mimetypes
from datetime import datetime

PORT = int(os.environ.get("PORT", 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "atlas_data.db")

# Initialize SQLite Database
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    # Users table
    c.execute('''
    CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'trader',
        status TEXT NOT NULL DEFAULT 'pending',
        avatar TEXT DEFAULT '',
        bio TEXT DEFAULT '',
        currency TEXT DEFAULT 'USD',
        theme TEXT DEFAULT 'default',
        language TEXT DEFAULT 'en',
        active_account_id TEXT DEFAULT '',
        created_at TEXT NOT NULL
    )''')

    # Accounts table
    c.execute('''
    CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        user_email TEXT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE
    )''')

    # Trades table
    c.execute('''
    CREATE TABLE IF NOT EXISTS trades (
        id TEXT PRIMARY KEY,
        user_email TEXT NOT NULL,
        account_id TEXT NOT NULL,
        date TEXT NOT NULL,
        pair TEXT NOT NULL,
        side TEXT NOT NULL,
        lot REAL NOT NULL DEFAULT 1.0,
        entry REAL NOT NULL DEFAULT 0.0,
        exit REAL NOT NULL DEFAULT 0.0,
        pl REAL NOT NULL DEFAULT 0.0,
        status TEXT NOT NULL DEFAULT 'OPEN',
        notes TEXT DEFAULT '',
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE
    )''')

    # Feedbacks table (Only readable by super admin)
    c.execute('''
    CREATE TABLE IF NOT EXISTS feedbacks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT NOT NULL,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        category TEXT NOT NULL DEFAULT 'General',
        message TEXT NOT NULL,
        created_at TEXT NOT NULL,
        status TEXT DEFAULT 'unread'
    )''')

    # Questionnaires table (Post-registration onboarding)
    c.execute('''
    CREATE TABLE IF NOT EXISTS questionnaires (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT NOT NULL,
        goal TEXT NOT NULL,
        source TEXT NOT NULL,
        target_milestone TEXT NOT NULL,
        created_at TEXT NOT NULL
    )''')

    # MetaTrader sync log / connections
    c.execute('''
    CREATE TABLE IF NOT EXISTS mt_connections (
        id TEXT PRIMARY KEY,
        user_email TEXT NOT NULL,
        account_id TEXT NOT NULL,
        platform TEXT NOT NULL,
        broker_server TEXT NOT NULL,
        account_login TEXT NOT NULL,
        last_sync TEXT NOT NULL,
        status TEXT NOT NULL
    )''')

    conn.commit()

    # Seed Master Admin & Sample Traders if users table is empty
    c.execute("SELECT COUNT(*) FROM users")
    count = c.fetchone()[0]
    if count == 0:
        seed_database(conn)
    conn.close()

def seed_database(conn):
    c = conn.cursor()
    # 1. Master Admin
    c.execute('''
    INSERT OR REPLACE INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'satriatrader1@gmail.com', 'satria308', 'Satria (Master Admin)', 'admin', 'approved',
        '', 'Desk Administrator & Lead Market Strategist', 'USD', 'default', 'en', 'acc-satria-1', '2026-10-01'
    ))

    # Master Accounts
    c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
              ('acc-satria-1', 'satriatrader1@gmail.com', 'Apex 150K Funded (Master)', 'Prop Firm Funded', '2026-10-01'))
    c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
              ('acc-satria-2', 'satriatrader1@gmail.com', 'Topstep 100K Express', 'Prop Firm Challenge', '2026-10-01'))

    # Master Trades
    sat_trades = [
        ('tr-sat-1', 'satriatrader1@gmail.com', 'acc-satria-1', '2026-10-01', 'XAUUSD', 'BUY', 2.00, 2642.50, 2665.20, 2270.00, 'PROFIT', 'London breakout continuation', '2026-10-01'),
        ('tr-sat-2', 'satriatrader1@gmail.com', 'acc-satria-1', '2026-10-02', 'NAS100', 'SELL', 1.50, 20120.00, 20180.00, -450.00, 'LOSS', 'Choppy session stop out', '2026-10-02'),
        ('tr-sat-3', 'satriatrader1@gmail.com', 'acc-satria-1', '2026-10-03', 'EURUSD', 'BUY', 3.00, 1.0850, 1.0850, 0.00, 'BREAK EVEN', 'Risk off before NFP release', '2026-10-03'),
        ('tr-sat-4', 'satriatrader1@gmail.com', 'acc-satria-1', '2026-10-04', 'XAUUSD', 'BUY', 2.50, 2655.00, 2682.40, 3425.00, 'PROFIT', 'NY session expansion', '2026-10-04'),
        ('tr-sat-5', 'satriatrader1@gmail.com', 'acc-satria-1', '2026-10-07', 'BTCUSDT', 'BUY', 1.00, 64100.00, 65800.00, 1700.00, 'PROFIT', 'Breakout above weekly resistance', '2026-10-07'),
        ('tr-sat-6', 'satriatrader1@gmail.com', 'acc-satria-2', '2026-10-05', 'US30', 'SELL', 1.00, 42200.00, 42050.00, 750.00, 'PROFIT', 'Key level rejection', '2026-10-05'),
        ('tr-sat-7', 'satriatrader1@gmail.com', 'acc-satria-2', '2026-10-06', 'XAUUSD', 'SELL', 1.50, 2680.00, 2690.00, -600.00, 'LOSS', 'Failed breakdown', '2026-10-06')
    ]
    c.executemany("INSERT OR REPLACE INTO trades VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", sat_trades)

    # 2. Alex Turner
    c.execute('''
    INSERT OR REPLACE INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ('alex.turner@alphatrading.com', 'password123', 'Alex Turner', 'trader', 'approved', '', 'FX & Commodities Trader', 'USD', 'default', 'en', 'acc-alex-1', '2026-10-02'))
    c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
              ('acc-alex-1', 'alex.turner@alphatrading.com', 'FTMO 100K Funded', 'Prop Firm Funded', '2026-10-02'))
    alex_trades = [
        ('tr-al-1', 'alex.turner@alphatrading.com', 'acc-alex-1', '2026-10-01', 'EURUSD', 'BUY', 2.00, 1.0840, 1.0890, 1000.00, 'PROFIT', 'Daily support bounce', '2026-10-01'),
        ('tr-al-2', 'alex.turner@alphatrading.com', 'acc-alex-1', '2026-10-02', 'GBPUSD', 'BUY', 2.00, 1.3020, 1.3000, -400.00, 'LOSS', 'London stop run', '2026-10-02'),
        ('tr-al-3', 'alex.turner@alphatrading.com', 'acc-alex-1', '2026-10-04', 'XAUUSD', 'SELL', 1.50, 2660.00, 2640.00, 1500.00, 'PROFIT', '4H orderblock mitigation', '2026-10-04')
    ]
    c.executemany("INSERT OR REPLACE INTO trades VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", alex_trades)

    # 3. David Chen
    c.execute('''
    INSERT OR REPLACE INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ('david.chen@propcapital.io', 'password123', 'David Chen', 'trader', 'approved', '', 'Indices & Gold Scalper', 'USD', 'default', 'en', 'acc-dav-1', '2026-10-03'))
    c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
              ('acc-dav-1', 'david.chen@propcapital.io', 'Apex 50K Prop Challenge', 'Prop Firm Challenge', '2026-10-03'))
    dav_trades = [
        ('tr-dv-1', 'david.chen@propcapital.io', 'acc-dav-1', '2026-10-02', 'US30', 'SELL', 1.00, 42150.00, 42300.00, -750.00, 'LOSS', 'Overnight hold loss', '2026-10-02'),
        ('tr-dv-2', 'david.chen@propcapital.io', 'acc-dav-1', '2026-10-04', 'NAS100', 'BUY', 0.80, 20050.00, 20110.00, 480.00, 'PROFIT', 'NY open scalp', '2026-10-04'),
        ('tr-dv-3', 'david.chen@propcapital.io', 'acc-dav-1', '2026-10-06', 'XAUUSD', 'BUY', 1.00, 2650.00, 2645.00, -250.00, 'LOSS', 'Slipped stop', '2026-10-06')
    ]
    c.executemany("INSERT OR REPLACE INTO trades VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", dav_trades)

    # 4. Sarah Miller
    c.execute('''
    INSERT OR REPLACE INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ('sarah.miller@forexdesk.com', 'password123', 'Sarah Miller', 'trader', 'approved', '', 'Swing FX Trader', 'USD', 'default', 'en', 'acc-sar-1', '2026-10-04'))
    c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
              ('acc-sar-1', 'sarah.miller@forexdesk.com', 'The5ers 60K High Stakes', 'Prop Firm Funded', '2026-10-04'))
    sar_trades = [
        ('tr-sr-1', 'sarah.miller@forexdesk.com', 'acc-sar-1', '2026-10-01', 'XAUUSD', 'BUY', 2.00, 2640.00, 2670.00, 3000.00, 'PROFIT', 'Weekly trend following', '2026-10-01'),
        ('tr-sr-2', 'sarah.miller@forexdesk.com', 'acc-sar-1', '2026-10-03', 'EURUSD', 'SELL', 2.50, 1.0880, 1.0820, 1500.00, 'PROFIT', 'ECB speech reaction', '2026-10-03'),
        ('tr-sr-3', 'sarah.miller@forexdesk.com', 'acc-sar-1', '2026-10-05', 'GBPUSD', 'SELL', 2.00, 1.3050, 1.3050, 0.00, 'BREAK EVEN', 'Protected capital', '2026-10-05')
    ]
    c.executemany("INSERT OR REPLACE INTO trades VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", sar_trades)

    # 5. Marcus Vance (Pending Approval)
    c.execute('''
    INSERT OR REPLACE INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ('marcus.vance@hedgefund.com', 'password123', 'Marcus Vance', 'trader', 'pending', '', 'Junior Quantitative Analyst', 'USD', 'default', 'en', 'acc-mar-1', '2026-10-06'))
    c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
              ('acc-mar-1', 'marcus.vance@hedgefund.com', 'Evaluation 50K Desk', 'Prop Firm Challenge', '2026-10-06'))

    # Sample Feedbacks for demonstration in Super Admin Desk
    c.execute('''
    INSERT INTO feedbacks (user_email, user_name, rating, category, message, created_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', ('alex.turner@alphatrading.com', 'Alex Turner', 5, 'Feature Request', 'The lot sizing and calendar view are phenomenal. Would love automatic MT5 trade syncing!', '2026-10-08 14:22:00', 'unread'))

    c.execute('''
    INSERT INTO feedbacks (user_email, user_name, rating, category, message, created_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', ('sarah.miller@forexdesk.com', 'Sarah Miller', 5, 'User Experience', 'The dark theme and daily crown reminders have completely changed my discipline.', '2026-10-09 10:15:00', 'unread'))

    # Sample Questionnaire
    c.execute('''
    INSERT INTO questionnaires (user_email, goal, source, target_milestone, created_at)
    VALUES (?, ?, ?, ?, ?)
    ''', ('alex.turner@alphatrading.com', 'Pass Prop Firm Evaluation (FTMO / Apex)', 'Prop Firm Discord Community', '$10,000+ Net Profit Target', '2026-10-02 09:30:00'))

    c.execute('''
    INSERT INTO questionnaires (user_email, goal, source, target_milestone, created_at)
    VALUES (?, ?, ?, ?, ?)
    ''', ('marcus.vance@hedgefund.com', 'Institutional Fund Allocation', 'TradingView Community', 'Consistent 5% monthly return under 2% drawdown', '2026-10-06 11:45:00'))

    conn.commit()

class AtlasRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for API
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status_code=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            return {}
        raw = self.rfile.read(content_length).decode('utf-8')
        try:
            return json.loads(raw)
        except Exception:
            return {}

    def get_db(self):
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        return conn

    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        path = url.path
        query = urllib.parse.parse_qs(url.query)

        # API: Server Health
        if path == '/api/health':
            self.send_json({
                'status': 'online',
                'service': 'Atlas Institutional Desk Server v2.0',
                'server_time': datetime.now().isoformat(),
                'storage': 'SQLite persistent backend'
            })
            return

        # API: Full DB Dump for Master Admin or Client Sync
        if path == '/api/db':
            conn = self.get_db()
            c = conn.cursor()
            
            # Fetch all users
            c.execute("SELECT * FROM users")
            users_rows = c.fetchall()
            users_dict = {}
            for u in users_rows:
                email = u['email']
                # Fetch accounts for user
                c.execute("SELECT * FROM accounts WHERE user_email = ?", (email,))
                accs = [dict(a) for a in c.fetchall()]
                # Fetch trades for user
                c.execute("SELECT * FROM trades WHERE user_email = ? ORDER BY date DESC", (email,))
                trades = [dict(t) for t in c.fetchall()]
                
                users_dict[email] = {
                    'email': u['email'],
                    'password': u['password'],
                    'name': u['name'],
                    'role': u['role'],
                    'status': u['status'],
                    'avatar': u['avatar'] or '',
                    'bio': u['bio'] or '',
                    'currency': u['currency'] or 'USD',
                    'theme': u['theme'] or 'default',
                    'language': u['language'] or 'en',
                    'activeAccountId': u['active_account_id'] or (accs[0]['id'] if accs else ''),
                    'createdAt': u['created_at'],
                    'accounts': accs,
                    'trades': trades
                }
            conn.close()
            self.send_json({'success': True, 'users': users_dict})
            return

        # API: Get Feedbacks (Super Admin only)
        if path == '/api/admin/feedback':
            conn = self.get_db()
            c = conn.cursor()
            c.execute("SELECT * FROM feedbacks ORDER BY created_at DESC")
            feedbacks = [dict(r) for r in c.fetchall()]
            conn.close()
            self.send_json({'success': True, 'feedbacks': feedbacks})
            return

        # API: Get Questionnaires (Super Admin only)
        if path == '/api/admin/questionnaires':
            conn = self.get_db()
            c = conn.cursor()
            c.execute("SELECT * FROM questionnaires ORDER BY created_at DESC")
            items = [dict(r) for r in c.fetchall()]
            conn.close()
            self.send_json({'success': True, 'questionnaires': items})
            return

        # Default: Serve static files
        return super().do_GET()

    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        path = url.path
        body = self.read_json_body()
        conn = self.get_db()
        c = conn.cursor()

        try:
            # 1. AUTH: REGISTER
            if path == '/api/auth/register':
                email = (body.get('email') or '').strip().lower()
                password = body.get('password') or ''
                name = body.get('name') or email.split('@')[0].capitalize()
                account_name = body.get('accountName') or 'Primary Funded Desk'

                if not email or not password:
                    self.send_json({'success': False, 'message': 'Email and password required'}, 400)
                    return

                c.execute("SELECT email FROM users WHERE email = ?", (email,))
                if c.fetchone():
                    self.send_json({'success': False, 'message': 'Trader account already exists with this email'}, 400)
                    return

                now = datetime.now().strftime('%Y-%m-%d')
                acc_id = f"acc-{int(datetime.now().timestamp() * 1000)}"

                c.execute('''
                INSERT INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
                VALUES (?, ?, ?, 'trader', 'pending', '', '', 'USD', 'default', 'en', ?, ?)
                ''', (email, password, name, acc_id, now))

                c.execute('''
                INSERT INTO accounts (id, user_email, name, type, created_at)
                VALUES (?, ?, ?, 'Prop Firm Challenge', ?)
                ''', (acc_id, email, account_name, now))

                conn.commit()
                self.send_json({
                    'success': True,
                    'status': 'pending',
                    'message': 'Account registered successfully. Awaiting Master Admin approval.'
                })
                return

            # 2. AUTH: LOGIN
            elif path == '/api/auth/login':
                email = (body.get('email') or '').strip().lower()
                password = body.get('password') or ''

                c.execute("SELECT * FROM users WHERE email = ?", (email,))
                user = c.fetchone()
                if not user or user['password'] != password:
                    self.send_json({'success': False, 'message': 'Invalid trader email or password'}, 401)
                    return

                if user['status'] != 'approved' and user['role'] != 'admin':
                    self.send_json({
                        'success': False,
                        'pending': True,
                        'message': 'Account is awaiting verification from the Desk Administrator.'
                    }, 403)
                    return

                # Fetch accounts and trades
                c.execute("SELECT * FROM accounts WHERE user_email = ?", (email,))
                accounts = [dict(a) for a in c.fetchall()]
                c.execute("SELECT * FROM trades WHERE user_email = ? ORDER BY date DESC", (email,))
                trades = [dict(t) for t in c.fetchall()]

                self.send_json({
                    'success': True,
                    'user': {
                        'email': user['email'],
                        'name': user['name'],
                        'role': user['role'],
                        'status': user['status'],
                        'avatar': user['avatar'] or '',
                        'bio': user['bio'] or '',
                        'currency': user['currency'] or 'USD',
                        'theme': user['theme'] or 'default',
                        'language': user['language'] or 'en',
                        'activeAccountId': user['active_account_id'] or (accounts[0]['id'] if accounts else ''),
                        'accounts': accounts,
                        'trades': trades
                    }
                })
                return

            # 3. ONBOARDING QUESTIONNAIRE
            elif path == '/api/onboarding':
                email = (body.get('email') or '').strip().lower()
                goal = body.get('goal', 'Prop Firm Funded')
                source = body.get('source', 'Community Referral')
                target = body.get('target', '$5,000 / month')
                now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                c.execute('''
                INSERT INTO questionnaires (user_email, goal, source, target_milestone, created_at)
                VALUES (?, ?, ?, ?, ?)
                ''', (email, goal, source, target, now))
                conn.commit()
                self.send_json({'success': True, 'message': 'Onboarding questionnaire saved'})
                return

            # 4. FEEDBACK (Top bar share feedback)
            elif path == '/api/feedback':
                email = (body.get('email') or '').strip().lower()
                name = body.get('name') or 'Trader'
                rating = int(body.get('rating', 5))
                category = body.get('category', 'Feedback')
                message = body.get('message', '').strip()
                now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                if not message:
                    self.send_json({'success': False, 'message': 'Message cannot be empty'}, 400)
                    return

                c.execute('''
                INSERT INTO feedbacks (user_email, user_name, rating, category, message, created_at, status)
                VALUES (?, ?, ?, ?, ?, ?, 'unread')
                ''', (email, name, rating, category, message, now))
                conn.commit()
                self.send_json({'success': True, 'message': 'Thanks for your feedback'})
                return

            # 5. PROFILE EDIT (Username, Avatar, Bio, Theme, Language)
            elif path == '/api/profile':
                email = (body.get('email') or '').strip().lower()
                name = body.get('name')
                avatar = body.get('avatar')
                bio = body.get('bio')
                currency = body.get('currency')
                theme = body.get('theme')
                language = body.get('language')
                active_acc = body.get('activeAccountId')

                # Build dynamic update
                updates = []
                params = []
                if name is not None:
                    updates.append("name = ?"); params.append(name)
                if avatar is not None:
                    updates.append("avatar = ?"); params.append(avatar)
                if bio is not None:
                    updates.append("bio = ?"); params.append(bio)
                if currency is not None:
                    updates.append("currency = ?"); params.append(currency)
                if theme is not None:
                    updates.append("theme = ?"); params.append(theme)
                if language is not None:
                    updates.append("language = ?"); params.append(language)
                if active_acc is not None:
                    updates.append("active_account_id = ?"); params.append(active_acc)

                if updates:
                    params.append(email)
                    c.execute(f"UPDATE users SET {', '.join(updates)} WHERE email = ?", params)
                    conn.commit()

                self.send_json({'success': True, 'message': 'Trader profile updated on server'})
                return

            # 6. TRADE ACTIONS: SAVE / LOG
            elif path == '/api/trades/save':
                trade = body.get('trade', {})
                email = (trade.get('user_email') or body.get('email') or '').strip().lower()
                tid = trade.get('id') or f"tr-{int(datetime.now().timestamp() * 1000)}"
                acc_id = trade.get('accountId')
                t_date = trade.get('date') or datetime.now().strftime('%Y-%m-%d')
                pair = trade.get('pair', 'XAUUSD').upper()
                side = trade.get('side', 'BUY').upper()
                lot = float(trade.get('lot', 1.0))
                entry = float(trade.get('entry', 0.0))
                exit_price = float(trade.get('exit', 0.0)) if trade.get('exit') else 0.0
                pl = float(trade.get('pl', 0.0))
                status = trade.get('status', 'OPEN')
                notes = trade.get('notes', '')
                created = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                c.execute('''
                INSERT OR REPLACE INTO trades (id, user_email, account_id, date, pair, side, lot, entry, exit, pl, status, notes, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (tid, email, acc_id, t_date, pair, side, lot, entry, exit_price, pl, status, notes, created))
                conn.commit()
                self.send_json({'success': True, 'tradeId': tid, 'message': 'Trade recorded to server journal'})
                return

            # 7. TRADE ACTIONS: DELETE
            elif path == '/api/trades/delete':
                tid = body.get('tradeId')
                c.execute("DELETE FROM trades WHERE id = ?", (tid,))
                conn.commit()
                self.send_json({'success': True, 'message': 'Trade deleted from server'})
                return

            # 8. BULK TRADES UPDATE
            elif path == '/api/trades/bulk-status':
                trade_ids = body.get('tradeIds', [])
                new_status = body.get('status')
                for tid in trade_ids:
                    if new_status == 'BREAK EVEN':
                        c.execute("UPDATE trades SET status = ?, pl = 0.0 WHERE id = ?", (new_status, tid))
                    else:
                        c.execute("UPDATE trades SET status = ? WHERE id = ?", (new_status, tid))
                conn.commit()
                self.send_json({'success': True, 'message': f'Updated {len(trade_ids)} trades on server'})
                return

            elif path == '/api/trades/bulk-delete':
                trade_ids = body.get('tradeIds', [])
                for tid in trade_ids:
                    c.execute("DELETE FROM trades WHERE id = ?", (tid,))
                conn.commit()
                self.send_json({'success': True, 'message': f'Deleted {len(trade_ids)} trades from server'})
                return

            # 9. METATRADER 4 / 5 SYNC
            elif path == '/api/meta-trader/sync':
                email = (body.get('email') or '').strip().lower()
                acc_id = body.get('accountId')
                platform = body.get('platform', 'MT5')
                broker = body.get('broker', 'MetaQuotes-Demo')
                account_no = body.get('accountNumber', '8892104')
                raw_trades = body.get('trades', [])

                now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                # Log connection
                conn_id = f"mt-{int(datetime.now().timestamp())}"
                c.execute('''
                INSERT OR REPLACE INTO mt_connections (id, user_email, account_id, platform, broker_server, account_login, last_sync, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'CONNECTED')
                ''', (conn_id, email, acc_id, platform, broker, account_no, now))

                imported_count = 0
                for tr in raw_trades:
                    tid = tr.get('id') or f"mt-{int(datetime.now().timestamp() * 1000)}-{imported_count}"
                    c.execute('''
                    INSERT OR REPLACE INTO trades (id, user_email, account_id, date, pair, side, lot, entry, exit, pl, status, notes, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        tid, email, acc_id,
                        tr.get('date', datetime.now().strftime('%Y-%m-%d')),
                        tr.get('pair', 'XAUUSD').upper(),
                        tr.get('side', 'BUY').upper(),
                        float(tr.get('lot', 1.0)),
                        float(tr.get('entry', 0.0)),
                        float(tr.get('exit', 0.0)),
                        float(tr.get('pl', 0.0)),
                        tr.get('status', 'PROFIT' if float(tr.get('pl', 0.0)) > 0 else 'LOSS'),
                        tr.get('notes', f'Synced from {platform} #{account_no}'),
                        now
                    ))
                    imported_count += 1

                conn.commit()
                self.send_json({
                    'success': True,
                    'importedCount': imported_count,
                    'lastSync': now,
                    'platform': platform,
                    'message': f'Successfully synchronized {imported_count} positions from {platform}'
                })
                return

            # 10. ACCOUNT ADD / DELETE
            elif path == '/api/accounts/add':
                email = (body.get('email') or '').strip().lower()
                acc_name = body.get('name', 'New Account')
                acc_type = body.get('type', 'Prop Firm Challenge')
                acc_id = f"acc-{int(datetime.now().timestamp() * 1000)}"
                now = datetime.now().strftime('%Y-%m-%d')

                c.execute("INSERT INTO accounts VALUES (?, ?, ?, ?, ?)", (acc_id, email, acc_name, acc_type, now))
                c.execute("UPDATE users SET active_account_id = ? WHERE email = ?", (acc_id, email))
                conn.commit()
                self.send_json({'success': True, 'account': {'id': acc_id, 'name': acc_name, 'type': acc_type}})
                return

            elif path == '/api/accounts/delete':
                email = (body.get('email') or '').strip().lower()
                acc_id = body.get('accountId')
                c.execute("DELETE FROM accounts WHERE id = ? AND user_email = ?", (acc_id, email))
                c.execute("DELETE FROM trades WHERE account_id = ? AND user_email = ?", (acc_id, email))
                
                # Pick another account for user
                c.execute("SELECT id FROM accounts WHERE user_email = ? LIMIT 1", (email,))
                other = c.fetchone()
                new_active = other[0] if other else ''
                c.execute("UPDATE users SET active_account_id = ? WHERE email = ?", (new_active, email))
                conn.commit()
                self.send_json({'success': True, 'activeAccountId': new_active})
                return

            # 11. ADMIN APPROVALS & ACTIONS
            elif path == '/api/admin/approve':
                target_email = (body.get('email') or '').strip().lower()
                c.execute("UPDATE users SET status = 'approved' WHERE email = ?", (target_email,))
                conn.commit()
                self.send_json({'success': True, 'message': f'Trader {target_email} approved.'})
                return

            elif path == '/api/admin/decline':
                target_email = (body.get('email') or '').strip().lower()
                c.execute("UPDATE users SET status = 'declined' WHERE email = ?", (target_email,))
                conn.commit()
                self.send_json({'success': True, 'message': f'Trader {target_email} declined.'})
                return

            elif path == '/api/admin/delete-user':
                target_email = (body.get('email') or '').strip().lower()
                c.execute("DELETE FROM users WHERE email = ?", (target_email,))
                c.execute("DELETE FROM accounts WHERE user_email = ?", (target_email,))
                c.execute("DELETE FROM trades WHERE user_email = ?", (target_email,))
                c.execute("DELETE FROM feedbacks WHERE user_email = ?", (target_email,))
                c.execute("DELETE FROM questionnaires WHERE user_email = ?", (target_email,))
                conn.commit()
                self.send_json({'success': True, 'message': f'Trader {target_email} permanently removed.'})
                return

            # 12. FULL SYNC (Push & Pull state from client)
            elif path == '/api/sync':
                full_db = body.get('users', {})
                for email, u in full_db.items():
                    email = email.strip().lower()
                    c.execute('''
                    INSERT OR REPLACE INTO users (email, password, name, role, status, avatar, bio, currency, theme, language, active_account_id, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        email, u.get('password', 'password123'), u.get('name', 'Trader'),
                        u.get('role', 'trader'), u.get('status', 'approved'),
                        u.get('avatar', ''), u.get('bio', ''),
                        u.get('currency', 'USD'), u.get('theme', 'default'), u.get('language', 'en'),
                        u.get('activeAccountId', ''), u.get('createdAt', datetime.now().strftime('%Y-%m-%d'))
                    ))
                    # Sync accounts
                    for acc in u.get('accounts', []):
                        c.execute("INSERT OR REPLACE INTO accounts VALUES (?, ?, ?, ?, ?)",
                                  (acc['id'], email, acc['name'], acc['type'], datetime.now().strftime('%Y-%m-%d')))
                    # Sync trades
                    for tr in u.get('trades', []):
                        c.execute('''
                        INSERT OR REPLACE INTO trades (id, user_email, account_id, date, pair, side, lot, entry, exit, pl, status, notes, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ''', (
                            tr['id'], email, tr.get('accountId', ''),
                            tr.get('date', datetime.now().strftime('%Y-%m-%d')),
                            tr.get('pair', 'XAUUSD'), tr.get('side', 'BUY'),
                            float(tr.get('lot', 1.0)), float(tr.get('entry', 0.0)),
                            float(tr.get('exit', 0.0)), float(tr.get('pl', 0.0)),
                            tr.get('status', 'OPEN'), tr.get('notes', ''),
                            datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                        ))
                conn.commit()
                self.send_json({'success': True, 'message': 'Cloud Database synchronized successfully'})
                return

            else:
                self.send_json({'error': 'Not found'}, 404)

        except Exception as e:
            self.send_json({'error': str(e)}, 500)
        finally:
            conn.close()

def run():
    init_db()
    os.chdir(BASE_DIR)
    
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AtlasRequestHandler) as httpd:
        print(f"==================================================")
        print(f" ATLAS TRADE — Institutional Performance Desk")
        print(f" Server active on: http://localhost:{PORT}")
        print(f" Multi-device Cloud SQLite Database: {DB_FILE}")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()

if __name__ == '__main__':
    run()
