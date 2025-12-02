// src/services/api/endpoints.ts

/**
 * API Endpoints
 * Centralized location for all API endpoint paths
 */

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // Users
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    BY_ID: (id: string | number) => `/users/${id}`,
    AVATAR: (id: string | number) => `/users/${id}/avatar`,
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
    CHARTS: '/dashboard/charts',
  },

  // Settings
  SETTINGS: {
    BASE: '/settings',
    PROFILE: '/settings/profile',
    SECURITY: '/settings/security',
    NOTIFICATIONS: '/settings/notifications',
  },

  // File Upload
  UPLOAD: {
    FILE: '/upload/file',
    IMAGE: '/upload/image',
  },

  // Roles
  ROLES: {
    BASE: '/roles',
    BY_ID: (id: string) => `/roles/${id}`,
  },
} as const;
