# Ensign Technical Assignment

[![Build Status](https://github.com/gowribhat/Ensign-Technical-Assignment/actions/workflows/deploy.yml/badge.svg)](https://github.com/gowribhat/Ensign-Technical-Assignment/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://gowribhat.github.io/Ensign-Technical-Assignment/#/)

[![Node.js](https://img.shields.io/badge/Node-16+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Jest](https://img.shields.io/badge/Tests-Jest-brightgreen?logo=jest)](https://jestjs.io/)

This repository contains my submission for the technical assignment. The project is divided into two assignments:

1. **Assignment 1** — Static Kanban board
2. **Assignment 2** — Interactive React shopping cart

## Assignment 1 — Static Kanban board

Implemented as a single HTML/CSS page based on the provided [`design.png`](./assignment1/design.png). No frameworks were used.

**Highlights:**

- Semantic HTML structure
- Handcrafted CSS with responsive breakpoints
- Responsive layout

[View Assignment 1 README →](./assignment1/README.md)

## Assignment 2 — Shopping Cart (React App)

Interactive shopping cart application using React, Tailwind CSS, and React Router. Fetches products from [FakeStoreAPI](https://fakestoreapi.com).

**Highlights:**

- Product listing & detail pages
- Global cart state with `CartContext` and persistent localStorage
- Quantity management, removal, and order summary
- Responsive UI, toast notifications, and Tailwind styling
- Unit and integration tests using Jest and React Testing Library
- CI/CD pipeline with GitHub Actions

**Technical Decisions & Documentation:**

- State management approach
- Component design choices
- Routing & navigation
- Testing strategy
- Automated deployment pipeline

[View Assignment 2 README →](./assignment2/README.md)

[View Technical Decisions →](./assignment2/TECHNICAL_DECISIONS.md)

[Live Site →](https://gowribhat.github.io/Ensign-Technical-Assignment/#/)

---

## Getting started

### Clone the Repository

```bash
git clone https://github.com/gowribhat/Ensign-Technical-Assignment.git
```

### Assignment 1

Open `assignment1/index.html` in your browser or serve via a static server:

```bash
cd assignment1
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Assignment 2

Read the instructions in the [Assignment 2 README](./assignment2/README.md).
