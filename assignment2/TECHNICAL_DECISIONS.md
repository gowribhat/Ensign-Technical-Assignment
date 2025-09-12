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
