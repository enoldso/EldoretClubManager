# Eldoret Golf Club Management System - Design Guidelines

## Design Approach

**Hybrid Reference-Based Approach**: Drawing inspiration from premium hospitality platforms (Airbnb booking flows, luxury hotel systems) combined with modern SaaS dashboard patterns (Linear, Notion) for admin interfaces. The design balances traditional golf club prestige with contemporary digital convenience.

**Core Design Principles**:
- Premium Heritage: Reflect the club's 1924 establishment through refined, classic design elements
- Dual Experience: Distinct but cohesive interfaces for members and administrators
- Information Clarity: Complex data (tee times, bookings, billing) presented elegantly
- Seamless Transactions: Frictionless booking, ordering, and payment flows

## Typography System

**Font Families** (via Google Fonts):
- Primary: 'Playfair Display' (serif) - Headings, hero text, section titles (weights: 600, 700)
- Secondary: 'Inter' (sans-serif) - Body text, UI elements, data tables (weights: 400, 500, 600)

**Type Scale**:
- Hero/Page Titles: text-5xl md:text-6xl lg:text-7xl (Playfair Display, font-bold)
- Section Headings: text-3xl md:text-4xl (Playfair Display, font-semibold)
- Card Titles: text-xl md:text-2xl (Playfair Display, font-semibold)
- Subsections: text-lg font-semibold (Inter)
- Body Text: text-base (Inter, font-normal)
- Labels/Meta: text-sm (Inter, font-medium)
- Captions: text-xs (Inter, font-normal)

## Layout System

**Spacing Primitives**: Consistently use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for padding, margins, and gaps.

**Grid Structure**:
- Container max-widths: max-w-7xl for main content, max-w-6xl for forms/dashboards
- Section padding: py-16 md:py-20 lg:py-24
- Component spacing: gap-6 to gap-8 for card grids
- Form spacing: space-y-6 for stacked inputs

**Responsive Breakpoints**:
- Mobile-first approach with md: (768px) and lg: (1024px) as primary breakpoints
- Single column on mobile, 2-3 columns on desktop for dashboards
- Collapsible sidebar navigation on mobile

## Component Library

### Navigation Components

**Member Portal Header**:
- Full-width sticky header with club logo (left), horizontal navigation (center), member profile dropdown (right)
- Navigation items: Dashboard, Book Tee Time, Dining, Events, My Account
- Mobile: Hamburger menu with slide-out drawer

**Admin Dashboard Sidebar**:
- Fixed left sidebar (w-64) with collapsible sections
- Sections: Members, Bookings, Caddies, Dining, Events, Billing, Analytics, Settings
- Icon + label pattern for each menu item
- Active state: subtle background with accent border-left

### Authentication

**Login Pages** (separate for Members & Admin):
- Centered card layout (max-w-md) on gradient background
- Club logo at top
- Email/password inputs with show/hide toggle
- "Remember me" checkbox
- Primary CTA button: "Sign In"
- Links: "Forgot Password?" and role switcher ("Admin Login" / "Member Login")

**Test Credentials Display**: Provide in subtle alert box below login form

### Dashboard Components

**Member Dashboard**:
- Hero section: Personalized greeting with member name, handicap badge, membership tier
- Quick action cards (4-column grid): Book Tee Time, Make Reservation, View Events, Order Food
- Recent bookings timeline
- Upcoming events carousel
- Loyalty points progress bar with tier indicator

**Admin Dashboard**:
- Stats overview: 4-card grid showing total members, today's bookings, active caddies, pending payments
- Charts: Line graph for monthly revenue, bar chart for booking trends
- Recent activity feed: Latest member registrations, bookings, orders
- Quick management table: Today's tee times with status badges

### Booking Interface

**Tee Time Booking**:
- Calendar view with available slots (inspired by Airbnb date picker)
- Time slot selection: Grid of available times with visual availability indicators
- Caddie selection: Profile cards with photo placeholder, name, rating (stars), handicap range
- Party size selector
- Booking summary sidebar (sticky on desktop)

**Dining Reservations**:
- Date/time picker
- Table size selector with visual table layout
- Special requests textarea
- Pre-order menu option toggle

### Menu & Ordering System

**Food Ordering Interface**:
- Category tabs: Breakfast, Lunch, Dinner, Beverages, Bar
- Menu item cards: Image placeholder (16:9), name, description, price
- Add to cart button with quantity stepper
- Cart sidebar (slide-in on mobile): Line items, subtotal, tax, total
- Order type: Dine-in table selection, Takeaway, Delivery (if applicable)

### Events & Calendar

**Events Listing**:
- Featured upcoming event: Large hero card with background image placeholder
- Event grid (2-3 columns): Card with image, title, date/time, capacity indicator
- Filters: Event type (Tournament, Social, Training), Date range
- Registration button with member discount badge if applicable

**Event Detail Page**:
- Hero image placeholder (full-width, 40vh)
- Event info grid: Date, time, location, capacity, registration fee
- Description with rich text formatting
- Registration form or "Registered" status badge
- Related events section

### Billing & Payments

**Payment Integration** (Stripe):
- Clean checkout form: Card element, billing address fields
- Payment summary: Itemized breakdown
- Secure payment badge
- Payment history table: Date, description, amount, status, download receipt

**Membership Renewal**:
- Current membership card: Tier, expiry date, status badge
- Renewal options: Annual, quarterly with pricing comparison
- Auto-renewal toggle with explanation text

### Loyalty & Rewards

**Points Dashboard**:
- Large points balance display with animated counter
- Tier badge: Bronze/Silver/Gold/Platinum with progress bar to next tier
- Points earning activities: Grid cards showing ways to earn (bookings, dining, events)
- Rewards catalog: Grid of redeemable perks (free rounds, dining credits, guest passes)
- Transaction history: Points earned/redeemed timeline

### Profile Management

**Member Profile**:
- Profile header: Avatar placeholder, name, member ID, join date
- Editable sections: Personal info, Contact details, Emergency contact, Preferences
- Handicap tracking: Current handicap, history graph, recent rounds
- Document uploads: Profile photo, ID verification

**Caddie Profiles** (Admin managed):
- Photo, name, experience years, rating
- Availability calendar
- Assignment history
- Performance notes field

### Tables & Data Display

**Admin Tables** (members, bookings, orders):
- Sortable columns with arrow indicators
- Search bar with filters dropdown
- Status badges: Active/Inactive, Confirmed/Pending/Cancelled, Paid/Unpaid
- Action buttons: View, Edit, Delete icons
- Pagination controls
- Export to CSV button

### Forms

**Standard Form Pattern**:
- Labels: font-medium text-sm above inputs
- Input fields: Full-width with rounded corners, consistent height (h-12)
- Required field indicator: Red asterisk
- Error states: Red border with error message below
- Success states: Green checkmark icon
- Multi-step forms: Progress stepper at top

### Notifications

**Notification System**:
- Bell icon with unread count badge in header
- Dropdown panel: List of recent notifications (max 5), "View All" link
- Notification types: Booking confirmations, event reminders, payment receipts, system announcements
- Toast notifications: Slide-in from top-right for real-time updates

**Email Notifications**: Transactional emails for bookings, payments, membership status

## Images & Visual Assets

**Icons**: Use **Heroicons** (via CDN) consistently throughout - outline style for navigation/UI, solid style for badges/status indicators

**Photography Requirements**:

1. **Public Landing Page Hero**: Full-width, full-height hero image of pristine golf course (preferably with club visible in background), overlaid with welcome message and "Member Login" / "Explore Membership" CTAs
2. **Dashboard Backgrounds**: Subtle, low-opacity golf course imagery for hero sections
3. **Event Cards**: Placeholder images for tournament/social events (16:9 ratio)
4. **Menu Items**: Food photography placeholders (1:1 ratio for thumbnails)
5. **Caddie Profiles**: Headshot placeholders (1:1 ratio, professional style)
6. **Member Avatars**: Circular placeholders with initials fallback
7. **Marketing Sections**: Course amenities, clubhouse facilities (if public-facing sections exist)

**Image Treatment**: All hero images with subtle gradient overlay for text readability. Buttons on images use backdrop-blur-md for glass-morphism effect.

## Animation Guidelines

**Minimal, Purposeful Animations**:
- Page transitions: Smooth fade-in (300ms) for dashboard content
- Card hovers: Subtle lift with shadow increase (transform: translateY(-2px))
- Button states: Standard hover/active built into components
- Modals: Slide-up animation for mobile, fade-in for desktop
- Loading states: Skeleton screens for data tables, spinner for form submissions
- **No parallax, scroll-triggered, or decorative animations**

## Accessibility Standards

- Consistent focus states: Ring offset pattern for all interactive elements
- ARIA labels for icon-only buttons
- Skip navigation link for keyboard users
- Form inputs with associated labels (explicit association)
- Sufficient contrast ratios maintained throughout
- Responsive touch targets (min 44x44px)

---

This design system creates a sophisticated, professional golf club management platform that honors Eldoret Club's heritage while providing modern, intuitive digital experiences for both members and administrators.