FROM node:20-alpine AS base
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
RUN corepack enable
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN --mount=type=cache,target=/root/.cache/pnpm pnpm install --frozen-lockfile

FROM base AS builder
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,target=/app/.next/cache pnpm build

FROM base AS runner
RUN corepack enable
RUN adduser -D appuser
USER appuser
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm","start"]
