# Technical Decisions

This document outlines the technical decisions and assumptions made during the initial setup of the shopping site application.

---

### 1. Tooling

- **Choice:** Create React App (CRA) + Tailwind CSS
- **Reasoning:**
  - The assignment explicitly requires React. CRA was selected because it provides a stable, beginner-friendly boilerplate with minimal setup.
  - Alternatives like Vite were considered, but CRA offers:
    - Mature documentation and wide community support.
    - Built-in scripts for testing, linting, building, and deployment.
    - Simplicity, suitable for a small-to-medium project like this.
  - Tailwind CSS was added (bonus requirement) to beautify the UI, enabling rapid styling with responsive utilities and consistent spacing/typography.
- **Assumptions:**
  - The small scope of the project makes CRA's slower build times acceptable.
  - Since no backend is needed, CRA's static build output is sufficient for deployment.

### 2. Routing & Navigation

- **Choice:** `react-router-dom`
- **Reasoning:**
  - The brief requires multiple pages (products listing → product detail → cart).
  - React Router provides simple client-side navigation with dynamic routes (`/products/:id`).
- **Assumption:** Client-side routing is sufficient since backend integration is out of scope.

### 2. Products Listing

- **Data Fetching with `fetch` + `useEffect`**
  - Used the built-in `fetch` API instead of Axios to avoid extra dependencies.
  - `useEffect` ensures the API call runs after component has been rendered and mounted to the DOM.
  - Assumed the API is reliable and returns consistent data.
- **State Management with `useState`**
  - Local state is sufficient since products are only needed in the `ProductsPage`.
- **Responsive Layout with TailwindCSS Grid**
  - Used Tailwind’s `grid` utilities for responsive product card layout.
  - Assumes grid layout is the natural choice for e-commerce displays.
  - Product card emphasizes **name + price** (most important) with minimal description, since details are shown on the product page.

### 3. Product Details Page

- **Data Fetching with `fetch` + `useEffect`**
  - Dynamic route `/products/:id` to fetch individual product details.
  - `useParams` hook allows retrieval of product ID.
- **Layout**
  - Full-page layout to provide focus on product details.
  - Responsive two-column layout (`flex-col md:flex-row`) for image and details.
  - Typography hierarchy with clear title, description, price for readability.
- **Number Selector**
  - Numeric input with increment/decrement buttons implemented using `useState`.
  - Prevents quantity below 1 or non positive integer values.
  - Button label dynamically updates to reflect chosen quantity.
  - Improves usability and aligns with typical e-commerce expectations.

### 4. Shopping Cart

- **Global State Management with React Context**
  - Created a `CartContext` to manage cart items globally.
  - Provides `addToCart`, `removeFromCart`, `updateQuantity`, and `clearCart`.
  - Chose React Context + `useState` over Redux for simplicity (small scope).
  - This avoids prop drilling and keeps cart accessible across the entire application.
- **Data Persistence with LocalStorage**
  - Cart saved to `localStorage` on every update.
  - Initializes from `localStorage` on app load.
  - Provides persistence across browser reloads and closures without needing a backend.
- **Cart Page Layout**
  - Each item displays image, title, price, quantity, and remove button.
  - Includes "Clear Cart" option for convenience.
  - Shows **total amount** dynamically.
  - Responsive: stacked on mobile, side-by-side on desktop.
- **Sticky Order Summary**
  - On large screens, summary is `sticky` (`lg:sticky lg:top-24`), keeping summary visible during scroll.
  - On small screens, summary stacks below for usability.

### 5. MessageScreen Component

- **Purpose:** Centralized handling of loading, empty, and error states.
- **Reasoning:**
  - Reusable across products, product details, and cart.
  - Ensures consistent UI and avoids repeating spinners/messages.
  - Supports optional call-to-action buttons (e.g., "Start Shopping").
  - SPA-Friendly Navigation: Used React Router <Link> instead of <a> to prevent full page reloads and maintain smooth client-side navigation.
- **Implementation:** Configurable via props (`loading`, `title`, `description`, `callToAction`).

### 6. User Feedback on Actions

- **Choice:** Added [react-hot-toast](https://react-hot-toast.com) for visual confirmations (e.g., “Product added to cart”).
- **Reasoning:**
  - Provides a lightweight, dependency-free, and highly customizable toast system.
  - Allows quick, non-intrusive feedback without requiring custom modal or alert implementations.
  - Offers built-in accessibility (screen-reader support) and theming options that fit well with the UI.
  - Centralizing toast logic in the `CartContext` ensures **all cart-related actions** (add, remove, clear) automatically trigger user feedback, reducing code duplication across pages.
- **Assumption:** Using a popular, well-documented library like `react-hot-toast` will be acceptable since it balances UX benefits with minimal overhead.

### 7. Preventing Duplicate Cart Entries

- **Choice:** Introduced an `adding` state (`useState`) for the "Add to Cart" button.
- **Reasoning:**
  - Prevents accidental multiple submissions if a user double-clicks quickly.
  - Improves UX by disabling the button briefly and providing real-time feedback (`Adding...` state).
  - Keeps logic simple and contained within the component — no need for external state management here.
- **Technical Note:** Used `setTimeout` to re-enable the button after a short delay. This ensures a balance between responsiveness and safety.
- **Assumption:** The short delay does not hamper the user flow.

### 8. NumberSelector Component

- **Reusability:** Used on both product detail page and cart page.
- **Validation:** Enforces minimum value of 1 and checks for valid values.
- **Props:** Accepts `value` and `onChange` for controlled usage.
- **Justification:** Avoids duplicate code and keeps quantity interactions consistent across the app.
- **Assumptions:**
  - Quantities cannot be negative or zero.
  - Users may either type a number directly or use buttons to adjust quantity.

### 9. Linking Cart Items to Product Details

- **Choice:** Make each product in the cart clickable, linking to its respective product details page (`/products/:id`).
- **Reasoning:**
  - **User Experience:** Allows users to quickly revisit product details, check specifications, or adjust quantity before purchasing.
  - **Consistency:** Mirrors common e-commerce behavior where cart items are interactive.
  - **Technical Implementation:** Used `react-router-dom`'s `Link` component around the product image and title.
  - **Layout Consideration:** The link is styled with `flex` to ensure the clickable area is large but doesn’t interfere with quantity selectors or the remove button.
- **Assumptions:**
  - Users expect cart items to be interactive.
  - Only the image and title are clickable, while quantity controls and remove button retain their original functionality.

### 10. Cart Page – Sticky Order Summary

- **Choice:** The order summary on the right uses `lg:sticky lg:top-24 h-fit` (Tailwind).
  - `sticky` keeps it visible while scrolling within its container.
  - `top-24` offsets it from the top to avoid overlapping headers.
  - `h-fit` adapts height to content.
  - Sticky behavior is **applied only on large screens** (`lg:`) for responsiveness; on smaller screens, the layout stacks naturally.
- **Rationale:**
  - Keeps critical purchase information (totals, checkout actions) visible to improve usability and encourage conversions.
  - Mirrors familiar e-commerce patterns, enhancing user trust and experience.
  - Tailwind CSS sticky implementation avoids extra JS scroll handling, simplifying code.
- **Assumptions:**
  - Cart content may vary in length; height adapts dynamically.
  - Mobile users benefit from stacked layout rather than sticky elements to prevent overlap or cramped views.
  - Users prefer a receipt-like order summary.

### 11. Testing Strategy & Decisions

- **Framework & Tools:**

  - **React Testing Library (RTL)** for rendering components and simulating user interactions in a way that mirrors real user behavior.
  - **Jest** as the test runner, leveraging mocking, assertions, and snapshot capabilities where needed.

- **Scope of Tests:**

  - **CartContext:** `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, localStorage persistence, and toast notifications.
  - **CartPage:** Rendering of empty cart, cart items, order summary calculations, quantity changes, and remove/clear actions.

- **Helpers & Factories:**

  - `createCartItem` to generate cart items consistently.
  - `calculateTotals` to compute subtotal, tax, delivery fee, and total, avoiding duplicate calculations in multiple tests.
  - `renderWithCart` to wrap components in `CartContext.Provider`, simulating realistic state for tests.

- **Test Reliability:**

  - `data-testid` attributes added for interactive elements like quantity inputs and increment/decrement buttons.
  - Verified elements exist before interacting to prevent false positives or flaky tests.
  - Mocks used for `react-hot-toast` to isolate toast behavior from actual library implementation.

- **Organization & Readability:**

  - Tests grouped in meaningful `describe` blocks.
  - Promotes maintainability and allows others to understand which features each test covers.

- **Assumptions & Reasoning:**

  - Jest mocking ensures tests are focused on cart logic without relying on external libraries or APIs.
  - Network requests (fakestoreapi) are not tested here — assumed to be stable; tests focus on cart logic and UI behavior.
  - Cart functionality is central to the application, so unit and integration tests prioritize correctness and persistence.

- **Benefits:**
  - Prevents regressions in core cart functionality.
  - Documents expected behavior in a clear, executable format.
  - Improves confidence that both state and UI interactions behave as intended under different scenarios.

### 12. CI/CD Pipeline

- **Objective:** Demonstrate a professional, automated deployment workflow that ensures the React app is always live in a stable state.

- **Implementation:** GitHub Actions (`deploy.yml`) automates the following steps on every push to `main`:

  - **Checkout code:** Retrieves the latest changes from the repository.
  - **Set up Node.js environment:** Ensures a consistent Node version across all runs.
  - **Install dependencies:** `npm ci` installs exact versions from `package-lock.json` for reproducible builds.
  - **Run tests:** Executes `npm test -- --watchAll=false` to validate core functionality before deployment.
    - **Why watchAll is false:** We don’t need an interactive watch mode in CI; it ensures tests run once and the workflow completes without hanging.
  - **Build the app:** Creates an optimized, production-ready bundle using `npm run build`.
  - **Deploy to GitHub Pages:** Publishes the build to the `gh-pages` branch using `peaceiris/actions-gh-pages@v3`.

- **Technical Decisions & Rationale:**

  - Automating deployment removes manual steps and reduces the chance of mistakes.
  - Running tests before building guarantees that only working, validated code goes live.
  - Leveraging GitHub Actions and `gh-pages` keeps the workflow simple, reliable, and free of extra infrastructure.

- **Outcome / Benefits:**
  - Ensures the [live site](https://gowribhat.github.io/Ensign-Technical-Assignment/#/) is always up-to-date with the latest changes.
  - Automates deployment so fewer manual steps are needed.
  - Confirms the core functionality is working before publishing.
  - Reduces the risk of human error during deployment.
