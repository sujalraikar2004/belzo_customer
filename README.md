# Belzo - Food Delivery Expo Mobile Application

**Good food. Delivered.**  
A complete, production-grade React Native & Expo mobile frontend application built strictly to reproduce the Google Stitch design specification with full navigational flow, responsive mobile design tokens, realistic mock backend abstraction, live order tracking, menu customization, and full cart & checkout engine.

---

## 📱 Tech Stack & Libraries

- **Framework**: React Native (0.76.x) + Expo SDK 52
- **Language**: TypeScript 5.3+ (Strict Mode)
- **Navigation**: Expo Router v4 (File-based navigation with typed routes)
- **State Management**: Zustand (Global client state: cart, auth, favorites, location)
- **Data Querying**: TanStack Query / Service Layer Abstraction
- **Styling & Tokens**: Custom Design System matching Stitch (Colors, Typography, Spacing, Shadows)
- **Icons**: Lucide React Native & Vector Icons
- **Safe Area**: React Native Safe Area Context
- **Secure Storage**: Expo SecureStore (for JWTs and credentials)
- **Animations**: React Native Reanimated & React Native SVG

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- Expo Go app on iOS / Android or iOS Simulator / Android Emulator

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo development server
npx expo start
```

### Expo CLI Options
- Press `i` to launch in the **iOS Simulator**
- Press `a` to launch in the **Android Emulator**
- Press `w` to run on **Web**
- Scan the terminal QR code with the **Expo Go** camera (iOS) or Expo Go app (Android)

---

## 🗂️ Project Structure

```text
customer/
├── app/                           # Expo Router File-based Routes
│   ├── _layout.tsx                # Root layout with SafeAreaProvider & Font loaders
│   ├── index.tsx                  # Launch gateway & Splash check
│   ├── (auth)/                    # Authentication flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx              # Phone number & Social SSO
│   │   ├── signup.tsx             # Complete registration & dietary preferences
│   │   └── otp.tsx                # 6-digit SMS verification with countdown
│   ├── (tabs)/                    # Persistent bottom tab navigation
│   │   ├── _layout.tsx            # Custom tab bar matching Stitch design
│   │   ├── index.tsx              # Home & Discovery (Hero, Cuisines, Recommended)
│   │   ├── search.tsx             # Search & Filters with trending chips & dual tabs
│   │   ├── orders.tsx             # Active tracking card & recent order history
│   │   └── profile.tsx            # Customer profile, VIP Gold tier, addresses
│   ├── onboarding/
│   │   └── location.tsx           # Brooklyn interactive map location permission
│   ├── restaurant/
│   │   └── [id].tsx               # Restaurant menu, categories, dietary toggle
│   ├── food/
│   │   └── [id].tsx               # Food details & customization sheet
│   ├── cart.tsx                   # Full cart with priority delivery & tip selector
│   ├── checkout.tsx               # Delivery address, notes, payment selector
│   ├── coupons.tsx                # Belzo Gold VIP & available coupon cards
│   ├── favorites.tsx              # Saved places, favorite bites, repeat cravings
│   ├── order/
│   │   ├── success.tsx            # Order placed confirmation, coins, ETA
│   │   └── track.tsx              # Live tracking route map & 5-stage timeline
│   ├── chat/
│   │   └── driver.tsx             # Courier two-way chat & call simulation
│   └── rating/
│       └── [id].tsx               # Food & delivery 5-star rating, tags, photos
├── components/                    # Reusable UI component modules
│   ├── common/                    # Button, Input, StarRating, Header
│   ├── restaurant/                # RestaurantCard, CategoryBubble, DishCard
│   ├── cart/                      # CartItemRow, PriceBreakdown, TipSelector
│   └── tracking/                  # LiveMapCanvas, CourierCard, ProgressTimeline
├── mock/                          # Realistic Brooklyn artisanal mock data
│   ├── restaurants.ts
│   ├── coupons.ts
│   ├── orders.ts
│   └── user.ts
├── services/                      # Decoupled backend abstraction services
│   ├── api.ts                     # HTTP client with artificial latency for test
│   ├── auth.service.ts
│   ├── restaurant.service.ts
│   ├── order.service.ts
│   └── payment.service.ts
├── store/                         # Zustand global state stores
│   ├── useCartStore.ts            # Cart, bill calculations, coupons, tips
│   ├── useAuthStore.ts            # Auth token, user profile, login/logout
│   ├── useFavoritesStore.ts       # Favorited restaurants & dishes
│   └── useLocationStore.ts        # Selected delivery address & coordinates
├── theme/                         # Centralized design tokens
│   ├── colors.ts                  # Stitch primary (#b61715), secondary (#9f4122)
│   ├── typography.ts              # Plus Jakarta Sans & Inter scale
│   └── spacing.ts                 # Consistent 4pt/8pt grid
└── types/                         # Centralized TypeScript models
```

---

## 🎯 Implemented User Flows

1. **Launch → Onboarding & Location**:
   - Brooklyn map underlay with animated SVG delivery scooter route.
   - One-tap "Use Current Location" or "Enter Address Manually".
2. **Authentication (Login, Signup & OTP)**:
   - Country code selector (+1 US, +91 India).
   - 6-digit OTP boxes with auto-countdown resend timer and fallback WhatsApp/Call channels.
   - Dietary preferences (Vegetarian, Non-Veg, Vegan, Halal, Gluten-Free) stored in user state.
3. **Home & Discovery**:
   - Sticky search & voice trigger bar.
   - Promotional carousel banners (FLAT 50% OFF, Zero Delivery Fee).
   - Cuisine bubbles with real food photography (Biryani, Burgers, Pizza, South Indian, Healthy Bowls, Desserts).
   - Horizontal and vertical restaurant feeds (The Urban Grill, Bella Napoli, The Prime Patty).
4. **Interactive Search & Filtering**:
   - Live query matching across both dishes and restaurants.
   - Quick trending pills (Butter Chicken, Smash Burger, Cold Brew).
   - Filter segmented controls (Fast Delivery <30m, Pure Veg, Rating 4.5+).
5. **Restaurant Menu & Customization Drawer**:
   - Verified kitchen header, delivery metrics, offer ribbon.
   - Bestseller dish list with quantity steppers.
   - Customization bottom sheet: "Choose Your Cheese" (single choice), "Extra Indulgence Add-ons" (multi-choice), special cooking instructions, dynamic total recalculation.
6. **Cart, Coupons & Checkout**:
   - Priority delivery countdown window (20–25 mins).
   - "Frequently ordered with this" pair & save row.
   - Delivery instructions multi-select toggles (Leave at door, Avoid ringing bell, Contactless).
   - Delivery partner tipping (₹20, ₹30, ₹50, Custom).
   - Transparent bill breakdown (Item Total, Delivery Partner Fee with strikethrough discount, Packaging, Taxes, Coupon, Tip).
7. **Order Placement, Live Tracking & Driver Chat**:
   - Order success splash with Belzo Gold coins reward.
   - Live GPS-style vector map route canvas showing origin, destination, and live scooter pulse pin.
   - 5-stage order timeline with active stage pulsing.
   - Two-way courier chat with driver notes, quick replies, route snippet, and phone call modal.
8. **Delivered Order Review & Ratings**:
   - Dual 5-star ratings for Food and Courier.
   - Highlight feedback chips (Tasted Amazing, Super Fresh, Safe Driving).
   - Food snapshot photo upload preview with reward coin bonus.
9. **Favorites & Order History**:
   - Reorder actions that immediately populate the cart.
   - Invoice receipt view simulation.

---

## 🔌 Connecting to a Real Backend

To replace the mock layer with a live backend:

1. **API Endpoints**:
   Update `services/api.ts` to replace the mock delays with Axios or Fetch pointing to `process.env.EXPO_PUBLIC_API_URL`.
2. **Authentication**:
   Implement standard Bearer token injection in `services/api.ts` request interceptors reading from `expo-secure-store`.
3. **Payments**:
   In `services/payment.service.ts`, import `@razorpay/react-native` or `@stripe/stripe-react-native`. The store already expects standard `PaymentProcessResult` return values.
4. **Live Location & Socket.IO**:
   In `app/order/track.tsx` and `app/chat/driver.tsx`, replace the simulated coordinates with `socket.io-client` listening on `socket.on('courier:location_update')`.

---

## 📦 Building for Production

To create standalone iOS and Android binaries using EAS Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure EAS project
eas build:configure

# Build Android APK / AAB
eas build --platform android --profile preview

# Build iOS IPA
eas build --platform ios --profile preview
```
