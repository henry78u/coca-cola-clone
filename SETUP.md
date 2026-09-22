# Coca-Cola Clone — Multi-Page Public Website & Investment Dashboard

An educational frontend architecture project expanding a full-screen cinematic hero into a complete multi-page design system and simulated beverage equity investment terminal.

---

## 1. Installation Commands

To install dependencies and start the development environment:

```bash
# Install required runtime dependencies
npm install react-router-dom framer-motion lucide-react recharts

# Run the local development server (configured for port 3000)
npm run dev

# Build the production bundle
npm run build
```

---

## 2. Authentication Flow & Demo Credentials

Authentication runs entirely in the browser using `localStorage` (`cokeclone_users` and `cokeclone_session`). No backend or external API keys are required.

### Pre-Seeded Demo Accounts:
| Role | Email Address | Password | Permissions & Views |
| :--- | :--- | :--- | :--- |
| **Viewer** | `demo@cokeclone.dev` | `demo123` | Dashboard Overview, Invest in KO, Portfolio, Market, News, Settings |
| **Admin** | `admin@cokeclone.dev` | `admin123` | All Viewer views + Products Mgmt, Customer Orders, Commercial Analytics |

### Authentication Architecture:
- **`signUp()`**: Validates inputs, hashes password using `btoa()`, writes user to `cokeclone_users`, and creates a session. Assigns `role: "admin"` if email is `admin@cokeclone.dev`.
- **`signIn()`**: Validates credentials against `localStorage.cokeclone_users` and creates `cokeclone_session`.
- **`signOut()`**: Clears session token and redirects to home.
- **Route Guards**:
  - `ProtectedRoute`: Redirects unauthenticated visitors to `/login` with return intent (`state.from`).
  - `AdminRoute`: Verifies admin status; redirects non-admin users to `/dashboard` with an informative toast notice.

---

## 3. Comprehensive Route Map

### Public Routes (`PublicLayout` with Navbar & Footer):
- `/` — Cinematic Video Hero + Servings Counter + Featured Products Showcase
- `/products` — Category-Filtered Catalog (12 Products) with Particles Background
- `/products/:id` — Detail View with Nutritional Accordion & Cart Additions
- `/about` — Origins, 3-Column Core Values & Executive Profile
- `/history` — Alternating Chronological Milestone Timeline (1886–2026)
- `/locator` — Flagship Interactive Map Directory with Beacon Pins
- `/blog` — The Fizz Journal Grid (6 Articles)
- `/blog/:slug` — Single Article Read Layout with Author Metadata
- `/contact` — Client-side Validated Inquiries Form with Success State
- `*` — 404 Route with Gradient ShinyText

### Authentication Route (Standalone, Full-screen):
- `/login` — Sign In / Sign Up Card with Demo Credential Quick-Fill

### Protected Investor Terminal Routes (`DashboardLayout` with Sidebar & Ticker):
- `/dashboard` — Portfolio Net Worth, Today's Gain, KO Snapshot & Activity Trail
- `/dashboard/invest` — KO Price Area Chart, Buy/Sell Simulator, Metrics & Peer Grid
- `/dashboard/portfolio` — Asset Holdings DataTable, Gain/Loss & Allocation Pie Chart
- `/dashboard/market` — Sector Ticker Grid with SVG Sparklines, Top Gainers/Losers
- `/dashboard/news` — Category Filtered Financial Dispatches & SEC Filings
- `/dashboard/settings` — Profile Viewer, UI Theme Preference & Session Controls

### Admin-Only Routes (`AdminRoute` Guarded):
- `/dashboard/products` — Catalog Inventory Table, SKU Additions & Removal Actions
- `/dashboard/orders` — 20 Filterable Customer Order Fulfillments with Status Badges
- `/dashboard/analytics` — Revenue Trend Area Chart, Geographic Sales & Weekly Orders

---

## 4. File Tree Structure

```
src/
├── App.tsx                      # Root router configuration (Public, Protected, Admin)
├── main.tsx                     # Vite entry point
├── index.css                    # Tailwind CSS imports, animations, custom scrollbars
├── theme.ts                     # Centralized design tokens (colors, typography, radii, motion)
├── lib/
│   └── auth.ts                  # Client-side localStorage authentication engine
├── data/
│   ├── products.ts              # 12 fictional Coca-Cola products with nutritional profiles
│   ├── stores.ts                # 5 flagship store locations with geo-coordinates
│   ├── posts.ts                 # 6 in-depth articles for The Fizz Journal
│   ├── investment.ts            # KO stock metrics, 30-day prices, peers, watchlist, news
│   └── orders.ts                # 20 customer fulfillment order records
├── components/
│   ├── ShinyText.tsx            # Continuous text-clip gradient animation component
│   ├── Button.tsx               # Primary and Ghost button variants with link/action handling
│   ├── Container.tsx            # Standard max-w-7xl responsive wrapper
│   ├── SectionHeading.tsx       # Eyebrow, H2 scale, and ShinyText title component
│   ├── Card.tsx                 # Glassmorphic card surface with red hover states
│   ├── StatCard.tsx             # Metric card with delta indicators and lucide icons
│   ├── DataTable.tsx            # Reusable responsive glassmorphic table
│   ├── TickerStrip.tsx          # Real-time topbar market ticker preview
│   ├── AvatarDropdown.tsx       # Profile menu with status badge and sign-out action
│   ├── ProtectedRoute.tsx       # Route guard redirecting to /login
│   ├── AdminRoute.tsx           # Route guard verifying admin privilege
│   ├── Navbar.tsx               # Fixed/transparent navigation pill with Invest link & avatar
│   ├── Footer.tsx               # 4-column footer with mandatory educational disclaimer
│   ├── PageHero.tsx             # Reusable cinematic inner-page hero component
│   └── backgrounds/
│       ├── VideoBackground.tsx    # Looping CloudFront video background with dark overlay
│       ├── ParticleBackground.tsx # Canvas-based effervescent red particles
│       ├── GradientBackground.tsx # CSS animated fluid gradient sweep
│       └── GridBackground.tsx     # Radial dot-grid matrix with subtle red illumination
├── layouts/
│   ├── PublicLayout.tsx         # Unified layout wrapping Navbar, Outlet, and Footer
│   └── DashboardLayout.tsx      # Sidebar + Topbar + Market Ticker + Outlet + Footer
└── pages/
    ├── Home.tsx                 # Full-screen original hero + featured showcase
    ├── Products.tsx             # Category-filtered product catalog (12 products)
    ├── ProductDetail.tsx        # Dynamic detail view with quantity stepper and accordions
    ├── About.tsx                # Project origins, 3-column values, and curator profile
    ├── History.tsx              # Alternating chronological vertical timeline (1886–2026)
    ├── StoreLocator.tsx         # Interactive store directory and vector map with beacon pins
    ├── Blog.tsx                 # Grid of 6 design and craft journal articles
    ├── BlogPost.tsx             # Deep-read prose column with author/date header
    ├── Contact.tsx              # Interactive contact form with validation and success state
    ├── NotFound.tsx             # Polished 404 state with shiny gradient and return link
    ├── Login.tsx                # Standalone sign in / sign up card with quick-fill demo buttons
    └── dashboard/
        ├── Overview.tsx         # Net worth, 30-day line chart, KO snapshot, activity
        ├── Invest.tsx           # KO area chart, buy/sell calculator, thesis, peers
        ├── Portfolio.tsx        # Holdings table, unrealized P/L, allocation pie chart
        ├── Market.tsx           # Sector quotes, SVG sparklines, gainers and losers
        ├── InvestNews.tsx       # Financial news articles with category filters
        ├── Settings.tsx         # Investor preferences, notifications, theme toggle
        ├── ProductsMgmt.tsx     # [Admin] Inventory catalog table and SKU modal
        ├── Orders.tsx           # [Admin] 20 orders filterable by fulfillment status
        └── Analytics.tsx        # [Admin] Revenue area chart, region pie chart, weekly bar chart
```

---

## 5. Educational Use Disclaimer

> **DISCLAIMER:**  
> This project is an independent educational assignment created strictly for design and engineering instructional purposes. It is **not affiliated with, endorsed by, or sponsored by The Coca-Cola Company**. Stock metrics, tickers, and financial figures are simulated for demonstration.
