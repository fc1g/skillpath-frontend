# SkillPath Frontend

SkillPath Frontend is the web client for the **SkillPath** learning platform.

It is built with **Next.js (App Router)** and is designed as a dedicated consumer of the SkillPath BFF/API layer. The
frontend does not talk directly to internal microservices — all communication goes through the public BFF endpoints.

## Features

- Course and lesson browsing
- Progress-aware learning experience
- Quizzes and interactive challenges
- Integration with the SkillPath code runner (for coding tasks)
- Authentication and user profile flows via BFF
- Ready for SEO-friendly, production-grade deployment

## Getting Started

### Prerequisites

- Node.js (LTS)
- pnpm
- Running SkillPath backend/BFF (see root `skillpath` README and `skillpath-bff`)

### Installation

Install dependencies:

```bash
pnpm install
```

### Environment

Create `.env.development.local` in this directory and configure your API/BFF endpoint, for example:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

(Use the actual URL exposed by your SkillPath BFF.)

### Development

Start the local development server:

```bash
pnpm dev
```

The app will be available at:

```text
http://localhost:3000
```

### Build

Create an optimized production build:

```bash
pnpm build
```

Run the production server:

```bash
pnpm start
```

## Project Structure

Key directories:

- `app/` — application routes and layouts
- `public/` — static assets
- other feature modules are organized to keep UI, API calls, and shared logic modular and maintainable

## Related Repositories

This project is part of the **SkillPath** setup:

- Root monorepo / shell: coordinates frontend, backend and infra
- `skillpath-bff` — BFF/API gateway and backend services

Refer to the root `README.md` for full architecture and setup details.