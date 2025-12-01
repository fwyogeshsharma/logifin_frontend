# docker/Dockerfile

# ═══════════════════════════════════════════════════════════════
# Stage 1: Dependencies
# ═══════════════════════════════════════════════════════════════
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ═══════════════════════════════════════════════════════════════
# Stage 2: Builder
# ═══════════════════════════════════════════════════════════════
FROM node:20-alpine AS builder
WORKDIR /app

# Accept build arguments for environment
ARG APP_ENV=local
ENV APP_ENV=${APP_ENV}

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy environment-specific config
COPY config/.env.${APP_ENV} .env

# Build application
RUN npm run build

# ═══════════════════════════════════════════════════════════════
# Stage 3: Development Server
# ═══════════════════════════════════════════════════════════════
FROM node:20-alpine AS development
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ═══════════════════════════════════════════════════════════════
# Stage 4: Production Server (Nginx)
# ═══════════════════════════════════════════════════════════════
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets from builder
COPY --from=builder /app/dist .

# Copy nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/templates/default.conf.template /etc/nginx/templates/

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
