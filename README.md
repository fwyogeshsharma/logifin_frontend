# LogiFin Frontend - Development Guidelines & Architecture

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Docker & Deployment](#docker--deployment)
4. [Project Structure](#project-structure)
5. [Code Standards & Rules](#code-standards--rules)
6. [Component Guidelines](#component-guidelines)
7. [Styling Guidelines](#styling-guidelines)
8. [Performance Optimization](#performance-optimization)
9. [Responsive Design](#responsive-design)
10. [State Management](#state-management)
11. [Testing Standards](#testing-standards)
12. [Git Workflow](#git-workflow)

---

## Project Overview

This project is designed to scale to **100 million+ customers**. Every decision must consider performance, maintainability, and scalability.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18+ |
| Language | TypeScript (Strict Mode) |
| Build Tool | Vite |
| Styling | CSS Modules / SCSS |
| State Management | Redux Toolkit / Zustand |
| API Layer | React Query / RTK Query |
| Testing | Jest + React Testing Library |
| Linting | ESLint + Prettier |
| Containerization | Docker + Docker Compose |
| Web Server | Nginx (Production) |

---

## Docker & Deployment

### Quick Start - One Command Setup

```bash
# Local Development
docker compose up local

# Test Environment
docker compose up test

# Demo Environment
docker compose up demo

# Production Environment
docker compose up prod
```

> **Switch environments with ONE line change in `.env` file!**

### Environment Configuration

#### Directory Structure

```
docker/
├── Dockerfile              # Multi-stage build file
├── docker-compose.yml      # Main compose file
├── nginx/
│   ├── nginx.conf         # Base Nginx configuration
│   └── templates/
│       └── default.conf.template
└── scripts/
    └── entrypoint.sh      # Container entrypoint script

config/
├── .env.local             # Local environment variables
├── .env.test              # Test environment variables
├── .env.demo              # Demo environment variables
├── .env.prod              # Production environment variables
└── env.config.ts          # Environment configuration loader
```

### Environment Files

#### .env (Root - Controls Active Environment)

```bash
# ═══════════════════════════════════════════════════════════════
# ENVIRONMENT SELECTOR - Change this ONE line to switch environments
# ═══════════════════════════════════════════════════════════════
APP_ENV=local
# Options: local | test | demo | prod
# ═══════════════════════════════════════════════════════════════
```

#### config/.env.local

```bash
# Local Development Environment
NODE_ENV=development
VITE_APP_ENV=local
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_ENABLE_MOCK=true
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug

# Docker Settings
DOCKER_PORT=3000
DOCKER_HOST_PORT=3000
```

#### config/.env.test

```bash
# Test Environment
NODE_ENV=production
VITE_APP_ENV=test
VITE_API_BASE_URL=https://test-api.logifin.com/api
VITE_WS_URL=wss://test-api.logifin.com
VITE_ENABLE_MOCK=false
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=warn

# Docker Settings
DOCKER_PORT=80
DOCKER_HOST_PORT=8080
```

#### config/.env.demo

```bash
# Demo Environment
NODE_ENV=production
VITE_APP_ENV=demo
VITE_API_BASE_URL=https://demo-api.logifin.com/api
VITE_WS_URL=wss://demo-api.logifin.com
VITE_ENABLE_MOCK=false
VITE_DEBUG_MODE=false
VITE_LOG_LEVEL=error

# Docker Settings
DOCKER_PORT=80
DOCKER_HOST_PORT=8081
```

#### config/.env.prod

```bash
# Production Environment
NODE_ENV=production
VITE_APP_ENV=prod
VITE_API_BASE_URL=https://api.logifin.com/api
VITE_WS_URL=wss://api.logifin.com
VITE_ENABLE_MOCK=false
VITE_DEBUG_MODE=false
VITE_LOG_LEVEL=error

# Docker Settings
DOCKER_PORT=80
DOCKER_HOST_PORT=80

# Production Optimizations
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Dockerfile (Multi-Stage Build)

```dockerfile
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
```

### Docker Compose Configuration

```yaml
# docker/docker-compose.yml

version: '3.9'

services:
  # ═══════════════════════════════════════════════════════════════
  # LOCAL DEVELOPMENT
  # ═══════════════════════════════════════════════════════════════
  local:
    build:
      context: ..
      dockerfile: docker/Dockerfile
      target: development
    container_name: logifin-frontend-local
    ports:
      - "3000:3000"
    volumes:
      - ../src:/app/src:delegated
      - ../public:/app/public:delegated
      - /app/node_modules
    env_file:
      - ../config/.env.local
    environment:
      - CHOKIDAR_USEPOLLING=true
    networks:
      - logifin-network
    profiles:
      - local

  # ═══════════════════════════════════════════════════════════════
  # TEST ENVIRONMENT
  # ═══════════════════════════════════════════════════════════════
  test:
    build:
      context: ..
      dockerfile: docker/Dockerfile
      target: production
      args:
        APP_ENV: test
    container_name: logifin-frontend-test
    ports:
      - "8080:80"
    env_file:
      - ../config/.env.test
    networks:
      - logifin-network
    profiles:
      - test
    restart: unless-stopped

  # ═══════════════════════════════════════════════════════════════
  # DEMO ENVIRONMENT
  # ═══════════════════════════════════════════════════════════════
  demo:
    build:
      context: ..
      dockerfile: docker/Dockerfile
      target: production
      args:
        APP_ENV: demo
    container_name: logifin-frontend-demo
    ports:
      - "8081:80"
    env_file:
      - ../config/.env.demo
    networks:
      - logifin-network
    profiles:
      - demo
    restart: unless-stopped

  # ═══════════════════════════════════════════════════════════════
  # PRODUCTION ENVIRONMENT
  # ═══════════════════════════════════════════════════════════════
  prod:
    build:
      context: ..
      dockerfile: docker/Dockerfile
      target: production
      args:
        APP_ENV: prod
    container_name: logifin-frontend-prod
    ports:
      - "80:80"
    env_file:
      - ../config/.env.prod
    networks:
      - logifin-network
    profiles:
      - prod
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M

networks:
  logifin-network:
    driver: bridge
```

### Nginx Configuration

```nginx
# docker/nginx/nginx.conf

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript
               application/rss+xml application/atom+xml image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    include /etc/nginx/conf.d/*.conf;
}
```

```nginx
# docker/nginx/templates/default.conf.template

server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Serve static files with caching
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy (if needed)
    location /api {
        proxy_pass ${VITE_API_BASE_URL};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # SPA fallback - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Error pages
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### Environment Configuration Loader

```typescript
// src/config/env.config.ts

type Environment = 'local' | 'test' | 'demo' | 'prod';

interface EnvConfig {
  env: Environment;
  apiBaseUrl: string;
  wsUrl: string;
  enableMock: boolean;
  debugMode: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enablePwa: boolean;
  enableAnalytics: boolean;
  sentryDsn?: string;
}

const getEnvConfig = (): EnvConfig => {
  const env = (import.meta.env.VITE_APP_ENV || 'local') as Environment;

  return {
    env,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
    enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    logLevel: (import.meta.env.VITE_LOG_LEVEL || 'debug') as EnvConfig['logLevel'],
    enablePwa: import.meta.env.VITE_ENABLE_PWA === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  };
};

export const envConfig = getEnvConfig();

// Type-safe environment checks
export const isLocal = envConfig.env === 'local';
export const isTest = envConfig.env === 'test';
export const isDemo = envConfig.env === 'demo';
export const isProd = envConfig.env === 'prod';
export const isDevelopment = isLocal || isTest;
export const isProduction = isDemo || isProd;
```

### NPM Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",

    "docker:local": "docker compose -f docker/docker-compose.yml --profile local up --build",
    "docker:test": "docker compose -f docker/docker-compose.yml --profile test up --build -d",
    "docker:demo": "docker compose -f docker/docker-compose.yml --profile demo up --build -d",
    "docker:prod": "docker compose -f docker/docker-compose.yml --profile prod up --build -d",

    "docker:down": "docker compose -f docker/docker-compose.yml down",
    "docker:logs": "docker compose -f docker/docker-compose.yml logs -f",
    "docker:clean": "docker compose -f docker/docker-compose.yml down -v --rmi local"
  }
}
```

### Deployment Commands Summary

| Environment | Command | Port | Description |
|-------------|---------|------|-------------|
| **Local** | `npm run docker:local` | 3000 | Hot-reload development |
| **Test** | `npm run docker:test` | 8080 | Testing/QA environment |
| **Demo** | `npm run docker:demo` | 8081 | Client demos |
| **Prod** | `npm run docker:prod` | 80 | Production deployment |

### Switching Environments

**Method 1: One-Line Change in .env**
```bash
# Edit root .env file
APP_ENV=prod  # Change to: local | test | demo | prod
```

**Method 2: Command Line Override**
```bash
# Override environment at runtime
APP_ENV=prod docker compose -f docker/docker-compose.yml --profile prod up --build
```

**Method 3: Use NPM Scripts**
```bash
npm run docker:prod   # Production
npm run docker:test   # Test
npm run docker:demo   # Demo
npm run docker:local  # Local development
```

### CI/CD Integration Example

```yaml
# .github/workflows/deploy.yml

name: Build and Deploy

on:
  push:
    branches: [main, develop, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set environment based on branch
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            echo "APP_ENV=prod" >> $GITHUB_ENV
          elif [ "${{ github.ref }}" = "refs/heads/staging" ]; then
            echo "APP_ENV=demo" >> $GITHUB_ENV
          else
            echo "APP_ENV=test" >> $GITHUB_ENV
          fi

      - name: Build and Push Docker Image
        run: |
          docker build \
            --build-arg APP_ENV=${{ env.APP_ENV }} \
            --target production \
            -t logifin-frontend:${{ env.APP_ENV }} \
            -f docker/Dockerfile .

      - name: Deploy
        run: |
          docker compose -f docker/docker-compose.yml \
            --profile ${{ env.APP_ENV }} \
            up -d --build
```

### Docker Rules & Best Practices

| Rule | Description |
|------|-------------|
| Multi-stage builds | Always use multi-stage builds to minimize image size |
| .dockerignore | Maintain proper .dockerignore file |
| No secrets in images | Never bake secrets into Docker images |
| Health checks | Always include health check endpoints |
| Resource limits | Set CPU/memory limits for production |
| Non-root user | Run containers as non-root in production |

### .dockerignore

```
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
.env*.local
*.md
.vscode
.idea
coverage
.nyc_output
dist
build
```

---

## Project Structure

```
src/
├── assets/                    # Static assets (images, fonts, icons)
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/                # Reusable UI components
│   ├── common/               # Shared components (Button, Input, Modal, etc.)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   └── ...
│   ├── layout/               # Layout components (Header, Footer, Sidebar)
│   └── forms/                # Form-specific components
│
├── pages/                    # Page components (route-level)
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── Dashboard.module.css
│   │   ├── components/       # Page-specific components
│   │   └── index.ts
│   └── ...
│
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── ...
│
├── services/                 # API services and external integrations
│   ├── api/
│   │   ├── client.ts        # Axios/Fetch configuration
│   │   ├── endpoints.ts
│   │   └── ...
│   └── ...
│
├── store/                    # State management
│   ├── slices/
│   ├── selectors/
│   └── index.ts
│
├── types/                    # TypeScript type definitions
│   ├── api.types.ts
│   ├── common.types.ts
│   └── ...
│
├── utils/                    # Utility functions
│   ├── helpers/
│   ├── constants/
│   ├── validators/
│   └── formatters/
│
├── styles/                   # Global styles
│   ├── variables.css        # CSS custom properties
│   ├── mixins.scss          # SCSS mixins (if using SCSS)
│   ├── breakpoints.css      # Responsive breakpoints
│   ├── reset.css            # CSS reset
│   └── global.css           # Global styles
│
├── config/                   # App configuration
│   ├── routes.ts
│   ├── constants.ts
│   └── env.ts
│
└── App.tsx
```

---

## Code Standards & Rules

### File Size Limits

| Rule | Limit |
|------|-------|
| **Maximum lines per file** | **1500 lines** |
| Recommended lines per file | 300-500 lines |
| Maximum lines per function | 50 lines |
| Maximum lines per component | 200 lines |

> **If a file exceeds 1500 lines, it MUST be refactored and split.**

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS` |
| Types/Interfaces | PascalCase with suffix | `UserDataType`, `IUserProps` |
| CSS Modules | camelCase | `styles.container` |
| CSS Files | Component name | `Button.module.css` |

### TypeScript Rules

```typescript
// ALWAYS enable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Mandatory TypeScript Practices:**

```typescript
// ✅ DO: Explicit return types for functions
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ DON'T: Implicit any or missing types
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ DO: Use interfaces for object shapes
interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ DO: Use type for unions and primitives
type Status = 'pending' | 'active' | 'inactive';
type ID = string | number;

// ❌ DON'T: Use 'any' type
const data: any = fetchData(); // FORBIDDEN

// ✅ DO: Use 'unknown' and type guards instead
const data: unknown = fetchData();
if (isUserProfile(data)) {
  console.log(data.name);
}
```

### Import Order

Maintain consistent import ordering:

```typescript
// 1. React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Store/State management
import { useAppSelector, useAppDispatch } from '@/store';

// 3. Components
import { Button, Modal } from '@/components/common';
import { UserCard } from '@/components/features';

// 4. Hooks
import { useAuth, useDebounce } from '@/hooks';

// 5. Services/API
import { userService } from '@/services';

// 6. Types
import type { UserProfile, ApiResponse } from '@/types';

// 7. Utils/Helpers
import { formatDate, validateEmail } from '@/utils';

// 8. Styles (ALWAYS LAST)
import styles from './Component.module.css';
```

---

## Component Guidelines

### Component Structure

```typescript
// Component.tsx
import React, { memo, useCallback, useMemo } from 'react';
import type { ComponentProps } from './Component.types';
import styles from './Component.module.css';

/**
 * Component description
 * @param props - Component properties
 */
export const Component: React.FC<ComponentProps> = memo(({
  title,
  data,
  onAction
}) => {
  // 1. Hooks (useState, useEffect, custom hooks)
  const [isLoading, setIsLoading] = useState(false);

  // 2. Memoized values
  const processedData = useMemo(() => {
    return data.filter(item => item.active);
  }, [data]);

  // 3. Callbacks
  const handleClick = useCallback(() => {
    onAction(processedData);
  }, [onAction, processedData]);

  // 4. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 5. Early returns (loading, error states)
  if (isLoading) {
    return <Skeleton />;
  }

  // 6. Render
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {/* Component content */}
    </div>
  );
});

Component.displayName = 'Component';
```

### Component Rules

| Rule | Description |
|------|-------------|
| Single Responsibility | Each component should do ONE thing |
| Props Interface | Always define TypeScript interface for props |
| Default Props | Use default parameter values, not defaultProps |
| Memo Wisely | Use `React.memo` for expensive renders |
| No Business Logic | Keep components presentational; logic goes in hooks |
| Max Props | If props exceed 5-7, consider restructuring |

### Folder Structure for Components

```
Button/
├── Button.tsx           # Main component
├── Button.module.css    # Styles
├── Button.types.ts      # TypeScript types
├── Button.test.tsx      # Unit tests
├── Button.stories.tsx   # Storybook (optional)
└── index.ts             # Barrel export
```

**index.ts (Barrel Export):**
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

---

## Styling Guidelines

### CSS Rules

| Rule | Requirement |
|------|-------------|
| **NO INLINE STYLES** | All styles must be in external CSS files |
| CSS Modules | Use `.module.css` for component-scoped styles |
| Global Styles | Only in `src/styles/` directory |
| CSS Variables | Use for theming and consistency |
| Class Naming | Use BEM methodology within modules |

### Forbidden Practices

```tsx
// ❌ FORBIDDEN: Inline styles
<div style={{ padding: '20px', color: 'red' }}>Content</div>

// ❌ FORBIDDEN: Style objects
const boxStyle = { padding: 20, margin: 10 };
<div style={boxStyle}>Content</div>

// ❌ FORBIDDEN: CSS-in-JS libraries (styled-components, emotion)
const StyledDiv = styled.div`
  padding: 20px;
`;
```

### Required Practices

```tsx
// ✅ REQUIRED: External CSS Modules
import styles from './Component.module.css';

<div className={styles.container}>
  <p className={styles.text}>Content</p>
</div>
```

### CSS Module Example

```css
/* Component.module.css */

.container {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background-color: var(--color-background);
}

.title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

/* Modifier classes */
.container--large {
  padding: var(--spacing-xl);
}

/* State classes */
.container--active {
  border-color: var(--color-primary);
}
```

### CSS Variables (Design Tokens)

```css
/* src/styles/variables.css */

:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;

  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;

  /* Typography */
  --font-family-base: 'Inter', -apple-system, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;

  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 1200;
  --z-popover: 1300;
  --z-tooltip: 1400;
}
```

---

## Responsive Design

### Breakpoints

```css
/* src/styles/breakpoints.css */

:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
}

/* Mobile First Media Queries */

/* Small devices (landscape phones) */
@media (min-width: 576px) { }

/* Medium devices (tablets) */
@media (min-width: 768px) { }

/* Large devices (desktops) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops) */
@media (min-width: 1200px) { }

/* Extra extra large devices (4K screens) */
@media (min-width: 1400px) { }
```

### Responsive Component Example

```css
/* Card.module.css */

.card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm);
  width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    flex-direction: row;
    padding: var(--spacing-md);
  }
}

/* Desktop and up */
@media (min-width: 992px) {
  .card {
    padding: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Responsive Rules

| Rule | Description |
|------|-------------|
| Mobile First | Always start with mobile styles, enhance for larger screens |
| Fluid Typography | Use `clamp()` for responsive font sizes |
| Flexible Grids | Use CSS Grid or Flexbox with relative units |
| Touch Targets | Minimum 44x44px for touch elements |
| No Horizontal Scroll | Content must never cause horizontal scrolling |

### Fluid Typography

```css
/* Responsive font sizes using clamp() */
.heading {
  /* Minimum 24px, fluid, maximum 48px */
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

.body {
  /* Minimum 14px, fluid, maximum 18px */
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}
```

### Container System

```css
/* src/styles/layout.css */

.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--spacing-md);
}

@media (min-width: 576px) {
  .container { max-width: 540px; }
}

@media (min-width: 768px) {
  .container { max-width: 720px; }
}

@media (min-width: 992px) {
  .container { max-width: 960px; }
}

@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}

@media (min-width: 1400px) {
  .container { max-width: 1320px; }
}
```

---

## Performance Optimization

### Critical Rules for Scale (100M+ Users)

| Category | Rule |
|----------|------|
| Bundle Size | Keep initial bundle < 200KB (gzipped) |
| Lazy Loading | All routes must be lazy loaded |
| Image Optimization | Use WebP, lazy load, proper sizing |
| Memoization | Use `useMemo`, `useCallback`, `React.memo` strategically |
| Virtual Lists | Use virtualization for lists > 50 items |
| Code Splitting | Split by route and feature |

### Lazy Loading Routes

```typescript
// config/routes.tsx
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/common';

// ✅ Lazy load all page components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
const Profile = lazy(() => import('@/pages/Profile'));

export const routes = [
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    ),
  },
  // ...
];
```

### Memoization Guidelines

```typescript
// ✅ DO: Memoize expensive calculations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// ✅ DO: Memoize callbacks passed to children
const handleSubmit = useCallback((data: FormData) => {
  submitForm(data);
}, [submitForm]);

// ✅ DO: Memoize components that receive objects/arrays
export const ExpensiveList = memo(({ items }: ListProps) => {
  return items.map(item => <ListItem key={item.id} {...item} />);
});

// ❌ DON'T: Memoize everything blindly
// Only memoize when there's a measurable performance benefit
```

### Image Optimization

```tsx
// ✅ Use responsive images with srcSet
<img
  src={image.src}
  srcSet={`
    ${image.small} 480w,
    ${image.medium} 768w,
    ${image.large} 1200w
  `}
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  loading="lazy"
  alt={image.alt}
/>

// ✅ Use modern formats
<picture>
  <source srcSet={image.webp} type="image/webp" />
  <source srcSet={image.jpg} type="image/jpeg" />
  <img src={image.jpg} alt={image.alt} loading="lazy" />
</picture>
```

### Virtual Lists

```typescript
// For lists with 50+ items, use virtualization
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} className={styles.scrollContainer}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: virtualItem.start,
              height: virtualItem.size,
            }}
          >
            <ItemRow data={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### API Data Fetching

```typescript
// Use React Query for caching and deduplication
import { useQuery, useMutation } from '@tanstack/react-query';

// ✅ Efficient data fetching with caching
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// ✅ Paginated queries
const useUsersPaginated = (page: number) => {
  return useQuery({
    queryKey: ['users', 'list', page],
    queryFn: () => userService.getPaginated(page),
    keepPreviousData: true,
  });
};
```

### Performance Checklist

- [ ] Bundle size < 200KB gzipped
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] All images lazy loaded
- [ ] All routes code-split
- [ ] No render-blocking resources
- [ ] Service worker for caching (PWA)

---

## State Management

### State Categories

| Category | Solution | Example |
|----------|----------|---------|
| Server State | React Query | API data, cached responses |
| Global UI State | Zustand/Redux | Theme, sidebar state |
| Form State | React Hook Form | Form inputs, validation |
| Local State | useState | Component-specific state |
| URL State | React Router | Filters, pagination |

### State Management Rules

```typescript
// ✅ DO: Colocate state with its usage
function SearchResults() {
  const [query, setQuery] = useState(''); // Local state - stays here
  const results = useSearchResults(query); // Server state - React Query

  return (/* ... */);
}

// ❌ DON'T: Put everything in global state
// Only global state should be in Redux/Zustand
```

---

## Testing Standards

### Test Coverage Requirements

| Type | Minimum Coverage |
|------|------------------|
| Unit Tests | 80% |
| Integration Tests | 60% |
| E2E Tests | Critical paths |

### Testing Structure

```typescript
// Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Component title="Test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onAction when button is clicked', () => {
      const onAction = jest.fn();
      render(<Component title="Test" onAction={onAction} />);

      fireEvent.click(screen.getByRole('button'));

      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });
});
```

---

## Git Workflow

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/user-authentication` |
| Bug Fix | `fix/description` | `fix/login-validation` |
| Hotfix | `hotfix/description` | `hotfix/payment-crash` |
| Refactor | `refactor/description` | `refactor/api-layer` |

### Commit Messages

```
type(scope): description

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**
```
feat(auth): add password reset functionality
fix(cart): resolve quantity update bug
perf(list): implement virtual scrolling
refactor(api): consolidate endpoint handlers
```

---

## Pre-Commit Checklist

Before every commit, verify:

- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] All tests pass (`npm run test`)
- [ ] No console.log statements (except in development)
- [ ] No inline styles
- [ ] File size < 1500 lines
- [ ] Component follows structure guidelines
- [ ] Responsive design tested
- [ ] Performance impact considered

---

## Quick Reference

### Do's

- Use TypeScript strict mode
- Use CSS Modules for styling
- Implement lazy loading for routes
- Use React Query for server state
- Write unit tests for components
- Follow mobile-first approach
- Use CSS variables for theming
- Memoize expensive computations
- Split files exceeding limits

### Don'ts

- Use `any` type
- Write inline styles
- Skip TypeScript types
- Ignore accessibility
- Create files > 1500 lines
- Use CSS-in-JS libraries
- Neglect mobile users
- Skip code reviews
- Commit console.log statements

---

**Document Version:** 1.0
**Last Updated:** 2025-12-01
**Maintainers:** Architecture Team
