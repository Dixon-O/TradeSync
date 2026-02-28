# 🔄 TradeSync

**Local-First POS & Business Hub for Informal Traders**

TradeSync is a Progressive Web App (PWA) built for market vendors, spaza shops, and tuck shops operating in environments with unreliable connectivity and shared devices. It runs **100% offline**, syncs automatically when connectivity returns, and **never loses data**.

---

## ✨ Features

### Core
- **Point of Sale** — Tap-to-sell product grid, cart, and 4 payment methods (Cash, M-Pesa, Airtel Money, Credit)
- **Inventory Management** — Add/edit products with emoji icons, track stock levels, profit margins, and low-stock alerts
- **Customer Credit Tracking** — IOU tabs with phone-based identification, partial payments, and trust scores
- **Deposit Accounts** — Customer pre-pay balances with full transaction history
- **Reports & Analytics** — Revenue, profit, top products, payment breakdowns, and CSV export
- **Digital Receipts** — Auto-generated receipts with QR codes and SHA-256 transaction signatures

### Multi-User & Security
- **PIN Lock Screen** — Shared device support with multiple user profiles
- **Role-Based Access Control** — Admin vs. Staff privileges (stock, reports, settings access)
- **Transaction Signing** — SHA-256 signatures via Web Crypto API for tamper-proof records

### Offline & Sync
- **Local-First Architecture** — All data stored in IndexedDB; internet is optional
- **CRDT Sync Engine** — Field-level merge with Hybrid Logical Clocks and vector clocks
- **Delta Compression** — Only changed fields sync (~90% less data)
- **Exponential Backoff** — Smart retry queue (1s → 2s → 4s → …) with battery/network awareness
- **Service Worker** — Cache-first for assets, network-first for API calls, full offline support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JavaScript (ES Modules) |
| Build | Vite |
| Database | IndexedDB via Dexie.js |
| Styling | CSS Custom Properties, Dark Mode, Glassmorphism |
| PWA | Service Worker, Web App Manifest |
| Sync | Custom CRDT engine with HLC + Vector Clocks |
| Security | Web Crypto API (SHA-256) |
| QR Codes | Custom Reed-Solomon encoder (zero dependencies) |
| Mock Server | Express.js |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
git clone git@github.com:Dixon-O/TradeSync.git
cd TradeSync
npm install
```

### Development

```bash
# Start the frontend dev server
npm run dev
# → http://localhost:5173

# Start the mock sync server (separate terminal)
npm run server
# → http://localhost:3001
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
tradesync/
├── index.html                  # App shell (PIN screen, nav, modals)
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   └── icons/                  # App icons (72, 192, 512px)
├── src/
│   ├── main.js                 # Entry point, router, initialization
│   ├── components/
│   │   ├── pin-lock.js         # PIN screen & profile management
│   │   ├── nav.js              # Bottom navigation
│   │   ├── product-card.js     # Product tiles
│   │   ├── sale-modal.js       # Checkout (Cash/M-Pesa/Airtel/Credit)
│   │   ├── receipt.js          # Receipt renderer with QR
│   │   ├── sync-status.js      # Online/offline indicator
│   │   └── toast.js            # Notifications
│   ├── db/
│   │   ├── database.js         # Dexie.js wrapper, all CRUD ops
│   │   ├── sync-engine.js      # CRDT merge & conflict resolution
│   │   └── sync-queue.js       # Outbound queue with retry
│   ├── pages/
│   │   ├── dashboard.js        # Stats, alerts, quick sell
│   │   ├── sales.js            # POS product grid & cart
│   │   ├── inventory.js        # Stock management
│   │   ├── credits.js          # Customer IOUs & payments
│   │   ├── reports.js          # Analytics & CSV export
│   │   ├── admin-panel.js      # Profile & system management
│   │   └── settings.js         # Config, demo mode, sync log
│   ├── styles/
│   │   ├── index.css           # Variables, reset, base, animations
│   │   ├── components.css      # Component styles
│   │   └── pages.css           # Page-specific styles
│   └── utils/
│       ├── hlc.js              # Hybrid Logical Clock
│       ├── uuid.js             # UUID & device ID generation
│       ├── network.js          # Connectivity & battery detection
│       ├── compression.js      # Delta compression
│       ├── qr-generator.js     # QR code encoder (Reed-Solomon)
│       └── transaction.js      # SHA-256 transaction signing
└── server/
    ├── server.js               # Express mock sync server
    ├── store.js                # In-memory server state
    └── data.json               # Demo product catalogue
```

---

## 🗄️ Database Schema

| Table | Purpose |
|-------|---------|
| `profiles` | Multi-user PIN login (name, pin, role, privileges) |
| `products` | Shared inventory (name, price, stock, emoji, costPrice) |
| `sales` | Transaction log (items, total, paymentMethod, profileName) |
| `credits` | Customer IOUs (customerName, phone, amount, payments) |
| `debits` | Deposit accounts (customerName, balance, transactions) |
| `receipts` | Digital receipts (saleId, receiptData, qrData) |
| `syncQueue` | Outbound sync buffer (table, recordId, operation, delta) |

Every record includes sync metadata: `_hlc`, `_vectorClock`, `_deviceId`, `_tombstone`, `_lastModified`.

---

## 🔄 Sync & Conflict Resolution

TradeSync uses a **CRDT-based sync engine** for conflict-free data merging:

1. **Field-level merge** — Different-field edits from separate devices are both preserved
2. **Last-Writer-Wins (LWW)** — Same-field conflicts resolved via HLC timestamp
3. **Vector clocks** — Detect concurrent vs. sequential edits
4. **Delta compression** — Only changed fields are synced (~90% bandwidth savings)
5. **Battery-aware** — Pauses non-critical sync on low battery

---

## 🌐 PWA & Offline

- Installable on any device (Android, iOS, desktop)
- Full offline operation — all features work without internet
- Service worker with versioned caching (`tradesync-v2`)
- Automatic sync queue flush on reconnect
- Long offline session support (>24h warning, data always preserved)

---

## 👥 Team

Built by a 6-person team for the **48-hour Hackathon** — Informal Economy Infrastructure & Small Business Applications track.

---

## 📄 License

MIT
