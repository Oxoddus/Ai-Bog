# =========================================================
# UBAYHUB BLORA - AUTOMATED DOCKERFILE FOR CLOUD & DEPLOYMENT
# =========================================================

# Stage 1: Build Phase
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy application source code
COPY . .

# Run production compilation
RUN npm run build

# Stage 2: Production Execution Phase
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifest
COPY package.json ./

# Install only production dependencies
RUN npm install --only=production --ignore-scripts

# Copy compiled outputs from builder stage
COPY --from=builder /app/dist ./dist

# Expose internal container port 3000
EXPOSE 3000

# Container health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start server entry point
CMD ["npm", "start"]
