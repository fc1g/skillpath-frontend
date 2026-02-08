FROM node:23-alpine AS base

WORKDIR /usr/src/app

RUN corepack enable pnpm

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json next.config.ts ./

RUN pnpm install --frozen-lockfile

FROM deps AS dev

ARG HTTP_PORT
ENV HTTP_PORT=${HTTP_PORT}

ENV NODE_ENV=development

COPY . .

EXPOSE ${HTTP_PORT}

CMD ["pnpm", "dev"]

FROM deps AS builder

ARG INTERNAL_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL

COPY . .

RUN pnpm build

FROM base AS runner

ARG HTTP_PORT
ENV HTTP_PORT=${HTTP_PORT}
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

EXPOSE ${HTTP_PORT}

CMD ["node", "server.js"]