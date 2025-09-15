# Boardly – Kanban Board (Assignment 1)

## Overview

This is my implementation of Assignment 1: creating a static board layout using only HTML and CSS (no frameworks).  
The design is based on the provided `design.png`. The content is hardcoded.

## Decisions & Assumptions

- **No frameworks**: Stuck to plain HTML and CSS as required.
- **Font choice**:
  - Used [Dancing Script](https://fonts.google.com/specimen/Dancing+Script) for the app name "Boardly" to make it stand out
  - Used [Roboto](https://fonts.google.com/specimen/Roboto) for body text for readability.
- **CSS organization**: All CSS is in a single file with clear section comments (General, Header, Board, Cards, Responsive). This keeps things simple for the scope of this project.
- **Responsive design**:
  - Added media queries so the layout adapts from 3-column → 2-column → 1-column views.
  - Hides user name on mobile.
- **Styling choices**:
  - Search bar styled with transitions for a more polished look.
  - Cards have subtle shadows and hover states for visual feedback.
  - Dates use color coding (red for overdue, green for upcoming/today).
- **No JavaScript**: Only HTML and CSS are used, as required.
