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
  TERMS: '/terms',
  PRIVACY: '/privacy',
  HELP: '/help',
  NOT_FOUND: '/404',

  // Shipper routes
  SHIPPER_DASHBOARD: '/shipper',
  SHIPPER_LOADS: '/shipper/loads',
  SHIPPER_TRACKING: '/shipper/tracking',
  SHIPPER_PAYMENTS: '/shipper/payments',
  SHIPPER_INVOICES: '/shipper/invoices',

  // Transporter routes
  TRANSPORTER_DASHBOARD: '/transporter',
  TRANSPORTER_LOADS: '/transporter/loads',
  TRANSPORTER_TRIPS: '/transporter/trips',
  TRANSPORTER_CREATE_TRIP: '/transporter/trips/create',
  TRANSPORTER_FLEET: '/transporter/fleet',
  TRANSPORTER_EARNINGS: '/transporter/earnings',

  // Lender routes
  LENDER_DASHBOARD: '/lender',
  LENDER_OPPORTUNITIES: '/lender/opportunities',
  LENDER_INVESTMENTS: '/lender/investments',
  LENDER_RETURNS: '/lender/returns',
  LENDER_ANALYTICS: '/lender/analytics',

  // Super Admin routes
  SUPER_ADMIN_DASHBOARD: '/admin',
  SUPER_ADMIN_USERS: '/admin/users',
  SUPER_ADMIN_COMPANIES: '/admin/companies',
  SUPER_ADMIN_TRIPS: '/admin/trips',
  SUPER_ADMIN_ROLES: '/admin/roles',
} as const;

// Role to dashboard route mapping
export const ROLE_DASHBOARD_ROUTES: Record<string, string> = {
  ROLE_SHIPPER: ROUTES.SHIPPER_DASHBOARD,
  ROLE_TRANSPORTER: ROUTES.TRANSPORTER_DASHBOARD,
  ROLE_LENDER: ROUTES.LENDER_DASHBOARD,
  ROLE_SUPER_ADMIN: ROUTES.SUPER_ADMIN_DASHBOARD,
  ROLE_ADMIN: ROUTES.SUPER_ADMIN_DASHBOARD,
};

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
