FROM oven/bun:1.0 AS builder

# Install OpenSSL 3.0
RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production

# Copy Prisma files first
COPY prisma .
RUN bunx prisma generate

# Copy everything else
COPY . .
RUN bun run build

FROM oven/bun:1.0
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server .
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080
CMD ["./server"]