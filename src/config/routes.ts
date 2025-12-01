// src/config/routes.ts

import { lazy } from 'react';

/**
 * Route Configuration
 * All routes should be lazy loaded for optimal performance
 */

// Lazy load page components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType>;
  exact?: boolean;
  auth?: boolean;
  roles?: string[];
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    auth: false,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    auth: true,
  },
  {
    path: '*',
    component: NotFound,
  },
];

// Route path constants for type-safe navigation
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
