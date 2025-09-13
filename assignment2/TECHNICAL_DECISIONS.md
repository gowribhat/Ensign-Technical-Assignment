# Technical Decisions

This document outlines the technical decisions and assumptions made during the initial setup of the shopping site application.

---

### 1. Tooling

- **Choice:** Create React App (CRA)
- **Reasoning:** CRA was chosen over alternatives like Vite because:
  - Provides a well-known, stable, and widely used setup.
  - Offers zero-configuration setup suitable for beginners and small-medium projects.
  - Comes with built-in scripts for testing, building, and running the project.
  - Easier to follow CRA documentation and support for Create React App aligns with the assignment’s context.
- **Assumption:** The project is small enough that CRA’s slightly heavier build time is acceptable.

### 2. Products Listing

- **Data Fetching with `fetch` + `useEffect`**

  - Used the built-in `fetch` API instead of Axios to avoid extra dependencies.
  - `useEffect` ensures the API call runs once on component mount.
  - Assumes the Fake Store API is reliable and consistent.

- **State Management with `useState`**

  - Local state is sufficient since products are only needed in the `ProductsPage`.
  - Assumes cart state will later require global management (e.g., React Context).

- **Responsive Layout with TailwindCSS Grid**
  - Used Tailwind’s `grid` utilities for responsive product card layout.
  - Assumes grid layout is the natural choice for e-commerce displays.

### 3. Product Details Page

- **Routing with React Router**

  - `react-router-dom` used for navigation.
  - Dynamic route `/products/:id` to fetch individual product details.
  - `useParams` hook allows retrieval of product ID.

- **Product Layout**

  - Full-page layout to provide focus on product details.
  - Responsive two-column layout (`flex-col md:flex-row`) for image and details.
  - Typography hierarchy with clear title, description, price for readability.

- **Quantity Selector**
  - Numeric input with increment/decrement buttons implemented using `useState`.
  - Prevents quantity below 1 or non positive integer values.
  - Button label dynamically updates to reflect chosen quantity.
  - Improves usability and aligns with typical e-commerce expectations.

### 4. Shopping Cart

- **Global State Management with React Context**

  - Created a `CartContext` to manage cart items globally.
  - Provides functions to add, remove, update quantity, and clear cart.
  - Chose Context + `useState` over Redux due to the small scale of the application.
  - This avoids prop drilling and keeps cart accessible across pages.

- **Persistence with LocalStorage**

  - Cart data is saved in `localStorage` whenever items are added, removed, or quantities updated.
  - On app load, cart initializes from `localStorage` if present.
  - Justification: Provides persistence across browser reloads and closures without needing a backend.

- **Cart Page Layout**
  - Lists all products added to the cart with image, title, price, quantity selector, and remove button.
  - Quantity selector allows increment/decrement and manual entry (prevents zero or negative values).
  - Displays total amount dynamically.
  - Includes "Clear Cart" button for convenience.
  - Responsive design using TailwindCSS (`flex-col md:flex-row` for each item).

### 5. MessageScreen Component

- **Decision:** Created a single `MessageScreen` component to handle all **intermediate page states**, including:

  - Loading (`Spinner`)
  - Empty data (e.g., empty cart, no search results)
  - API errors or fetch failures

- **Justification:**
  - Reusability: Instead of duplicating loading/error/empty-state UI across multiple pages, a single component can be configured via props (loading, icon, title, description, callToAction).
  - Consistency: Ensures consistent styling across the application for all transient states.
  - Flexibility: Supports a callToAction prop for actionable links/buttons (e.g., “Start Shopping” from empty cart).
  - SPA-Friendly Navigation: Used React Router <Link> instead of <a> to prevent full page reloads and maintain smooth client-side navigation.

### 6. User Feedback on Actions

- **Choice:** Added [react-hot-toast](https://react-hot-toast.com) for visual confirmations (e.g., “Product added to cart”).
- **Reasoning:**
  - Provides a lightweight, dependency-free, and highly customizable toast system.
  - Allows quick, non-intrusive feedback without requiring custom modal or alert implementations.
  - Offers built-in accessibility (screen-reader support) and theming options that fit well with the UI.
- **Assumption:** Using a popular, well-documented library like `react-hot-toast` will be acceptable since it balances UX benefits with minimal overhead.

### 7. Preventing Duplicate Cart Entries

- **Choice:** Introduced an `adding` state (`useState`) for the "Add to Cart" button.
- **Reasoning:**
  - Prevents accidental multiple submissions if a user double-clicks quickly.
  - Improves UX by disabling the button briefly and providing real-time feedback (`Adding...` state).
  - Keeps logic simple and contained within the component — no need for external state management here.
- **Technical Note:** Used `setTimeout` to re-enable the button after a short delay (500ms). This ensures a balance between responsiveness and safety.

### 8. NumberSelector Component

- **Decision:** Created a reusable `NumberSelector` component for selecting the quantity of products.
- **Reasoning:**
  - **Reusability:** Quantity selection is required in both the **Product Details** page and the **Cart Page**. Creating a single component prevents duplication of code and ensures consistent behavior and styling.
  - **User Experience:** Provides a clear and intuitive interface for users to increment, decrement, or directly type in the desired quantity.
  - **Consistency:** Ensures consistent styling (buttons, input field) and interactions (min/max constraints, validation) across the app.
- **Implementation Choices:**
  - Accepts `value` and `onChange` props for controlled behavior.
  - Includes increment (`+`) and decrement (`-`) buttons alongside a numeric input.
  - Validates input to prevent values less than 1.
- **Assumptions:**
  - Quantities cannot be negative or zero.
  - Users may either type a number directly or use buttons to adjust quantity.

### 9. Linking Cart Items to Product Details

- **Decision:** Make each product in the cart clickable, linking to its respective product details page (`/products/:id`).
- **Reasoning:**
  - **User Experience:** Allows users to quickly revisit product details, check specifications, or adjust quantity before purchasing.
  - **Consistency:** Mirrors common e-commerce behavior where cart items are interactive.
  - **Technical Implementation:** Used `react-router-dom`'s `Link` component around the product image and title.
  - **Layout Consideration:** The link is styled with `flex` to ensure the clickable area is large but doesn’t interfere with quantity selectors or the remove button.
- **Assumptions:**
  - Users expect cart items to be interactive.
  - Only the image and title are clickable, while quantity controls and remove button retain their original functionality.
