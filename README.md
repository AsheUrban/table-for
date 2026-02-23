# Table For

### By *Ashe Urban*

---

## Table of Contents

- [Project Overview](#project-overview)
- [Documentation](#documentation)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Goals & Problems Solved](#goals--problems-solved)
- [Setup / Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Development Roadmap](#development-roadmap)
- [Privacy Policy](#privacy-policy)
- [License](#license)

---

## **Project Overview**

A Table For cuts through the endless group chat back-and-forth of planning dinner out. Know which restaurants your group has in common, see reservation availability for your party size, and book it, all in one place.

Instead of 30 messages negotiating where, when, and who's booking, someone says "let's eat Friday," the app shows which shared places have availability for the group, everyone picks, done.

This project is a ground-up TypeScript rewrite of [Dine-Together](https://github.com/AsheUrban/Dine-Together), the JavaScript/Firebase MVP. It is being rebuilt with Expo/React Native and Supabase to support mobile-first development, a richer social graph, and deeper dining coordination features.

---

**Current Status:** Early development. Stack configured, auth flow planned.

---

**Main branch** is the primary development branch.

| Branch | Status | Focus |
|--------|--------|-------|
| **main** | Active development | TypeScript/Expo/Supabase rewrite |

---

## **Documentation**

| Document | Description |
|----------|-------------|
| [FUTURE_DESIGN.md](./DOCUMENTATION_/FUTURE_DESIGN.md) | Feature roadmap and design targets |
| [VALUES.md](./DOCUMENTATION_/VALUES.md) | Project values and guiding principles |
| [PRIVACY_POLICY.md](./DOCUMENTATION_/PRIVACY_POLICY.md) | Privacy policy — pending rewrite for Supabase stack |
| [LICENSE.md](./DOCUMENTATION_/LICENSE.md) | Source-available license — viewable for learning and review, not licensed for use or redistribution |

---

## **Technologies Used**

| Core | Frontend | APIs / BaaS | Architecture |
|------|----------|-------------|--------------|
| TypeScript 5.9 | React Native 0.81.5 | Supabase (Auth, Database, Storage) | File-based routing (Expo Router) |
| React 19.1 | NativeWind v4 + Tailwind CSS v3 | Google Places API | TanStack Query |
| Expo SDK 54 | React Hook Form + Zod v3 | | |

---

## **Architecture**

Table For uses **Expo Router** for file-based navigation, organized into route groups that map directly to app state:

- **`(auth)/`** — Unauthenticated screens: sign in, sign up, email verification, password reset
- **`(tabs)/`** — Authenticated app: Feed, Explore, Profile

**Auth state guard** — The root `_layout.tsx` listens to Supabase's `onAuthStateChange` and redirects between `(auth)` and `(tabs)` automatically via Expo Router's `Redirect` component.

**Supabase** handles authentication, the relational database, and Row Level Security (RLS) policies — replacing the Firebase Auth + Firestore combination used in the MVP.

**NativeWind** brings Tailwind CSS utility classes to React Native, compiled to native `StyleSheet` objects at build time. This replaces the styled-components system from the Firebase project.

### **Auth Route Structure**

```
app/
  (auth)/
    _layout.tsx          ← Auth layout (no tabs, logo header)
    sign-in.tsx          ← Email/password + OAuth buttons
    sign-up.tsx          ← Email/password + OAuth buttons
    verify-email.tsx     ← "Check your email" confirmation
    forgot-password.tsx  ← Enter email for reset link
    reset-password.tsx   ← Enter new password (deep link target)
  (tabs)/
    _layout.tsx          ← Tab layout (Feed / Explore / Profile)
```

---

## **Goals & Problems Solved**

| Goal | Problem Solved |
|------|----------------|
| Make coordinating dinners easy | Centralize choices, preferences, and scheduling in one place |
| Support local restaurant discovery | Organized, social-first browsing via Google Places integration |
| Build for mobile from the start | Native iOS/Android experience via React Native + Expo |
| Richer social graph than the MVP | Follow, connect, and group features for real dining coordination |

---

## **Setup / Installation**

> Setup instructions will be added as the project matures. Check back as development progresses.

---

## **Project Structure**

```
table-for/
├── app/                       ← Expo Router file-based routes
│   ├── _layout.tsx            ← Root layout (auth state guard)
│   ├── (auth)/                ← Unauthenticated screens
│   └── (tabs)/                ← Authenticated app screens
├── components/                ← Reusable UI components
├── hooks/                     ← Custom React hooks
├── constants/                 ← Shared constants (colors, config)
├── assets/                    ← Fonts, images
├── DOCUMENTATION_/            ← Project documentation
├── global.css                 ← Tailwind directives for NativeWind
├── tailwind.config.js         ← Tailwind config with NativeWind preset
├── babel.config.js            ← Babel config (NativeWind JSX transform)
├── metro.config.js            ← Metro bundler config (NativeWind wrapper)
└── nativewind-env.d.ts        ← TypeScript types for NativeWind
```

---

## **Development Roadmap**

See [FUTURE_DESIGN.md](./DOCUMENTATION_/FUTURE_DESIGN.md) for planned features and design targets.

---

## **Privacy Policy**

The current privacy policy reflects the original Firebase MVP. A full rewrite for the Supabase stack is planned. See [PRIVACY_POLICY.md](./DOCUMENTATION_/PRIVACY_POLICY.md).

---

## **License**

**Source-Available — Not Open Source**

This code is publicly available for transparency, learning, and review. It is **not** licensed for use, modification, or redistribution. See [LICENSE.md](./DOCUMENTATION_/LICENSE.md) for full terms.

Copyright © 2026 *Ashe Urban*

For licensing inquiries or permissions: [theasheurban@gmail.com](mailto:theasheurban@gmail.com)
