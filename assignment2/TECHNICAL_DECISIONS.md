# Technical Decisions

This document outlines the technical decisions and assumptions made during the initial setup of the shopping site application.

---

### 1. Tooling

-   **Choice:** Create React App (CRA)
-   **Reasoning:** CRA was chosen over alternatives like Vite because:
    -   Provides a well-known, stable, and widely used setup.
    -   Offers zero-configuration setup suitable for beginners and small-medium projects.
    -   Comes with built-in scripts for testing, building, and running the project.
    -   Easier to follow CRA documentation and support for Create React App aligns with the assignment’s context.
-   **Assumption:** The project is small enough that CRA’s slightly heavier build time is acceptable.
