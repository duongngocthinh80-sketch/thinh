# 🌿 Ninh Binh Valley Homestay - Landing Page & Admin Management Suite

> A modern, high-converting eco-resort landing page and full-featured administrative booking management portal built for **Ninh Binh Valley Homestay** (Thung Nắng, Ninh Hải, Hoa Lư, Ninh Bình).

![Ninh Binh Valley Homestay](z3846263875883_04be3a563d63375eb258976cdf3d349c.jpg)

---

## 🌟 Key Features

### 🏡 Guest Experience ([index.html](index.html))
- **Authentic Local Aesthetics**: 100% real imagery showcasing lakeside bungalows, limestone infinity pool, lotus bamboo boats, and campfire nights.
- **Bilingual Interface (VI / EN)**: 199+ synchronized translation keys for international and domestic guests.
- **Interactive Booking & Pricing Engine**: Dynamic night calculations, date boundaries, room tiers (Lakeview Double, Family Valley, Eco Stilt House), and add-on services (Limousine pickup, BBQ dinner, motorbike rentals).
- **Automated VietQR Dynamic Payment**: Generates instant MBBank QR codes matching booking codes and total amounts.
- **Automated E-Voucher & Email Confirmation**: Digital reservation voucher with printable layout, QR verification, and prefilled mail client.
- **24/7 Virtual Concierge AI Widget**: Real-time interactive assistant answering inquiries about local transport, room rates, and dining.
- **Interactive Google Maps & Directions**: Embedded satellite GPS location and step-by-step travel guides for limousines, trains, and private cars.

### 🛡️ Admin Management Dashboard ([admin.html](admin.html))
- **Role-Based Authentication (RBAC)**: Secure access separating **Main Admin** (`admin`) and **Sub-Admin** (`letan1`). Only Main Admin can create and delete sub-admins.
- **Live Business KPIs**: Total bookings, revenue counters, today's visitors, and conversion rate.
- **Booking Management**: Real-time status toggling (Confirmed / Pending / QR Paid), 1-click email confirmation resend, and CSV export.
- **Visitor Analytics**: Real-time traffic log, referrers, devices, and geo-locations.
- **VietQR Bank Configuration**: Easily update bank accounts and transfer syntax.
- **Firebase Cloud Backup & Sync**: 1-click cloud sync between local storage and Google Firebase Cloud Firestore.

---

## 🚀 Deployment Guide

### 1. 🗄️ Firebase Data Backup Setup (Cloud Firestore)

This project features a **dual-layer data architecture**: it works completely offline using browser `localStorage`, and connects seamlessly to **Google Firebase Firestore** for real-time cloud backup across all your devices.

#### Step 1: Create a Free Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/) and sign in with your Google Account.
2. Click **"Add project"** (e.g. `ninh-binh-valley-homestay`).
3. In the sidebar, navigate to **Build > Firestore Database** and click **"Create database"**.
4. Choose **Start in test mode** (allows read/write during development) and select a region (e.g. `asia-southeast1`).
5. In **Project Settings** (gear icon) > **General**, scroll to **Your apps**, click the **Web icon (`</>`)**, and register your app.
6. Copy the `firebaseConfig` object keys (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).

#### Step 2: Connect to Your Admin Portal
1. Open your deployed website or [admin.html](admin.html).
2. Log in with admin credentials (`admin` / `admin123`).
3. Go to the **Cấu Hình (Settings)** tab > **Firebase Cloud Backup**.
4. Paste your Firebase configuration keys and click **"Kiểm Tra & Lưu Cấu Hình"**.
5. Click **"Sao Lưu Dữ Liệu Lên Cloud (Backup Now)"** to immediately sync all bookings, settings, and visitor logs to Firestore!

---

### 2. 🐙 GitHub Repository Setup

To save and version-control your source code on GitHub:

```bash
# 1. Initialize git repository in this folder
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete Ninh Binh Valley Homestay landing page & admin portal"

# 4. Rename main branch
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/duongngocthinh80-sketch/thinh.git

# 6. Push code to GitHub
git push -u origin main
```

---

### 3. ▲ Deploying Online on Vercel

Vercel provides blazing-fast global hosting with free SSL certificates and automatic continuous deployment from GitHub:

#### Method A: Via Vercel Web Dashboard (Recommended - 1 Click)
1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Select your `ninhbinh-valley-homestay` GitHub repository.
4. Framework Preset: Leave as **Other** (Static Site).
5. Root Directory: `./` (default).
6. Click **"Deploy"**.
7. In ~15 seconds, your website is live at `https://ninhbinh-valley-homestay.vercel.app`!

#### Method B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📁 Project Structure

```text
d:\Homestay/
├── index.html                 # Main Guest Landing Page (Tailwind CSS, Lucide, I18N, VietQR)
├── admin.html                 # Administrative Dashboard & RBAC Sub-Admin Management
├── ai-chat-widget.js          # 24/7 Virtual Concierge AI Chat Widget
├── firebase-config.js         # Real-time Google Firebase Firestore Cloud Sync & Backup Engine
├── vercel.json                # Vercel Edge Serverless Routes, Rewrites & Security Headers
├── .gitignore                 # Git ignore rules for clean repo tracking
├── README.md                  # Comprehensive Documentation & Deployment Manual
└── *.jpg, *.png               # Authentic Photography of Ninh Binh Valley Homestay
```

---

## 🔒 Default Admin Credentials
- **Main Admin**: `admin` / `admin123` (Full permissions: Bookings, Visitors, QR Bank Setup, Sub-Admin CRUD, Firebase Cloud Backup)
- **Sub-Admin**: `letan1` / `letan123` (Receptionist permissions: Bookings Management & Visitor Logs)

---

## 📄 License
© 2026 Ninh Binh Valley Homestay. All rights reserved.
