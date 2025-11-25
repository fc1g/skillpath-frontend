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
ENV INTERNAL_API_URL=${INTERNAL_API_URL}

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

COPY . .

RUN pnpm build

FROM base AS runner

ARG HTTP_PORT
ENV HTTP_PORT=${HTTP_PORT}

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts

COPY --from=deps /usr/src/app/node_modules ./node_modules

EXPOSE ${HTTP_PORT}

CMD ["pnpm", "start"]