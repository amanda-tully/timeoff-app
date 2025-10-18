# TimeOff App

## Welcome
Hi and welcome to my assignment. In this README you can find how to set up the project and in LOG.md you can find a short log about when I did what and some of my though processes and issues I ran into.

## Description
A cross-platform time-off management application built with **Ionic React**.
The app allows employees to request time off and supervisors to review, approve, or reject those requests. It features a modern UI, robust form validation, and supports both web and mobile platforms.


## Features

- **Employee View:**  
  - Submit new time-off requests (vacation, sick-day, etc.)
  - View request history with pagination

- **Supervisor View:**  
  - See pending requests to process
  - Approve or reject requests with optional notes
  - View request history with pagination

- **Modern UI:**  
  - Responsive design using Ionic components
  - Custom theming with primary orange and complementary purple
  - Accessible, keyboard-friendly modals and forms

- **Testing:**  
  - Unit tests with Vitest and Testing Library
  - E2E tests with Cypress
  - Storybook for UI component development

## Tech Stack

- **Framework:** React 19, Ionic React 8
- **Mobile:** Capacitor (Android/iOS)
- **Routing:** React Router 5
- **Testing:** Vitest, Testing Library, Cypress
- **Storybook:** For isolated UI development
- **Linting:** ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the App

#### Development (Web)

Run the Vite dev server (default port 5173):

```bash
npm run dev
```

#### Storybook

```bash
npm run storybook
```

#### Unit Tests

```bash
npm run test.unit
```

#### E2E Tests

```bash
npm run test.e2e
```

### Mobile
To run on Android/iOS, use Capacitor:

```bash
npx cap sync
npx cap open android
npx cap open ios
```

## Project Structure

- `src/pages/` — Main app pages (EmployeePage, SupervisorPage)
- `src/components/` — Reusable UI components (FormCard, RequestList, Pagination, Header)
- `src/api/` — API types and logic (mocked for demo)
- `src/context/` — React context for user/session
- `src/hooks/` — Custom React hooks
- `src/data/` — Static/mock data
- `src/theme/` — CSS variables and theming
- `src/stories/` — Storybook stories
- `cypress/` — E2E tests





