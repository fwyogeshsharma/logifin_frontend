// src/config/constants.ts

/**
 * Application Constants
 * Centralized location for all app-wide constants
 */

// API Configuration
export const API = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'logifin_auth_token',
  REFRESH_TOKEN: 'logifin_refresh_token',
  USER: 'logifin_user',
  THEME: 'logifin_theme',
  LANGUAGE: 'logifin_language',
  SIDEBAR_COLLAPSED: 'logifin_sidebar_collapsed',
} as const;

// Theme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

// Languages
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

// Date Formats
export const DATE_FORMATS = {
  DEFAULT: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DISPLAY_DATETIME: 'MMM DD, YYYY HH:mm',
  TIME: 'HH:mm',
  TIME_12H: 'hh:mm A',
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  FILE_MAX_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Regex Patterns
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

// Breakpoints (match CSS breakpoints)
export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
} as const;

// Animation Durations (match CSS transitions)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Feature Flags
export const FEATURES = {
  DARK_MODE: true,
  NOTIFICATIONS: true,
  ANALYTICS: true,
  PWA: true,
} as const;
