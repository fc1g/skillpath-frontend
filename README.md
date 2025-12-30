# SkillPath Frontend

SkillPath Frontend is the web client for the **SkillPath** learning platform,
built as part of my CS50x final project.

The frontend is implemented using **Next.js (App Router)** and is designed to be
a clean, scalable, and SEO-friendly user interface for exploring courses,
lessons, and learning progress.  
It does not communicate directly with internal backend microservices — all data
flows through a dedicated Backend For Frontend (BFF) layer.

---

## Purpose of the Frontend

The main goal of the frontend is to provide a smooth learning experience while
keeping client-side logic simple and maintainable.

The frontend is responsible for:

- Rendering courses and lessons
- Managing navigation and layouts
- Handling authentication-related UI flows
- Displaying user progress and learning state
- Preparing the UI for future interactive coding challenges

All business logic and data aggregation are intentionally handled on the backend
side.

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **React**
- **pnpm** for package management

The App Router was chosen to take advantage of modern routing, layouts, and
server-side rendering capabilities.

---

## Architecture Notes

The frontend follows a strict separation of concerns:

- UI components focus only on presentation
- API communication is centralized
- No direct access to internal services (Auth, Courses, etc.)

This approach reduces coupling and allows backend services to evolve without
requiring frontend changes.

---

## Project Structure

Key directories in the project:

- `app/`  
  Contains routes, layouts, and pages using the Next.js App Router.

- `public/`  
  Static assets such as images and icons.

- Feature-based modules,  
  UI components, API helpers, and shared logic are organized to keep the
  codebase modular and maintainable.

---

## Environment Configuration

Create a `.env.development.local` file in the root of this repository.

Example configuration:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

This variable should point to the SkillPath BFF endpoint.

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- pnpm
- Running SkillPath backend and BFF services

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at: (<http://localhost:3000>)

### Production Build

Create an optimized production build:

```bash
pnpm build
```

Run the production server:

```bash
pnpm start
```

---

## Design Decisions

- **BFF-only communication**  
  The frontend never communicates directly with backend microservices.

- **App Router over Pages Router**  
  Chosen for better layout composition and future scalability.

- **SEO-first mindset**  
  The project is structured to support server-side rendering and metadata
  generation.

---

## Relation to the Main Project

This repository represents only the frontend part of **SkillPath**.

For full system architecture, backend services, Docker setup, and infrastructure
details, refer to the root SkillPath repository.

---

## Final Notes

This frontend was designed to be clean, extensible, and production-oriented
rather than feature-heavy.  
It reflects my focus on maintainable architecture and modern React patterns
learned during CS50x.
