# Olive & Oak — Shopping Cart (Assignment 2)

This repo contains **Assignment 2** — a small shopping-cart React app.

---

## Features

- [x] Product listing page (retrieves items from https://fakestoreapi.com)
- [x] Product detail page with quantity selector and add to cart
- [x] Global cart with:
  - [x] Add / update / remove products
  - [x] Item count displayed on navbar
  - [x] Persistent state via localStorage
- [x] Cart page with:
  - [x] Table-style product list
  - [x] Order summary card (subtotal, tax, delivery fee, total)
- [x] Responsive UI styled with Tailwind CSS
- [x] User feedback via toast notifications (react-hot-toast)

---

## Tech stack

- React (Create React App)
- React Router
- Tailwind CSS
- Heroicons
- react-hot-toast
- Browser `localStorage` for cart persistence

## Getting started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+)

### 1. Clone the Repository

```bash
git clone https://github.com/gowribhat/Ensign-Technical-Assignment.git
```

### 2. Install Dependencies

```bash
cd assignment2
npm install
```

### 3. Start Development Server

```bash
npm run start
```

- Open http://localhost:3000 to view the site.
- The page will reload when you make changes.

### 3. Build React App

Create a `build` folder with optimized production assets for deployment.

```bash
npm run build
```

### 4. Install Server and Deploy

```bash
npm install -g serve
serve -s build
```

This will start a local server, usually on http://localhost:3000 or a similar port, allowing you to view and test your production build in a local environment.
