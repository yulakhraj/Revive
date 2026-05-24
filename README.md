# Revive — India's Premium Second-Hand Fashion Marketplace

Revive is a highly polished, premium marketplace for pre-loved fashion. It allows users to browse, buy, and track authenticated, verified clothing at unbeatable prices. The application is built using a modern Next.js framework, featuring a glassmorphic dark-themed design system, smooth animations, and robust client-side storage fallback capabilities.

---

## 🚀 Key Features

* **Advanced Shop & Dynamic Filtering**: Filter clothes by gender, category, condition (New with tags, Like New, Good, Fair), size, price range, and sort by relevance, rating, discount, or popularity.
* **Synchronized Catalog**: Over 80+ pre-seeded products across Men, Women, and Unisex categories (including dedicated Jeans, Innerwear, and Unisex Gen X Retro sections) with high-quality, verified fashion flatlays and descriptions.
* **Dynamic Local Storage Synchronization**: Seamless client-side syncing ensures any custom seller listings, products, or order statuses are automatically persisted in `localStorage` and shared across pages.
* **Shopping Cart & Checkout Flow**: Intuitive cart drawers, item quantity management, test-mode payment gateway, and a beautiful order confirmation flow.
* **User Profile & Order History**: Dedicated user dashboard to view wishlisted items, default billing/shipping addresses, and detailed order progression.
* **Full-Featured Admin Panel**: Admin controls to monitor sales statistics, create/edit/delete products, manage user orders, and update shipping statuses.

---

## 🛠️ Technology Stack

* **Core**: Next.js 16 (Turbopack, App Router)
* **Logic**: React 19, TypeScript
* **State Management**: Zustand
* **Styling**: TailwindCSS & Vanilla CSS
* **Animations**: Framer Motion
* **Database & Auth**: Supabase SSR (with seamless fallback to mock database / Local Storage)
* **Icons**: Lucide React

---

## 📁 Project Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router (pages and layouts)
│   │   ├── category/       # Dynamic category pages
│   │   ├── product/        # Product detail views
│   │   ├── admin/          # Admin Dashboard (Products, Orders, Stats)
│   │   ├── profile/        # User Account, Orders, and Addresses
│   │   └── shop/           # Shop catalog and filter pages
│   ├── components/         # Reusable UI & layout components
│   ├── data/               # Seed databases (mockProducts, mockCategories)
│   ├── features/           # Auth and Global stores
│   ├── lib/                # Supabase client & local storage fallback wrapper
│   └── types/              # TypeScript typings
├── supabase_schema.sql     # Database structure definitions
├── task.md                 # Project roadmap and build tracker
└── README.md               # Project documentation
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Verify Code Quality & Type Integrity
Verify that the codebase has no type errors:
```bash
npx tsc --noEmit
```

### 4. Build for Production
Create an optimized production bundle:
```bash
npm run build
```

