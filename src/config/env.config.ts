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
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://34.93.247.3:5000/api/v1',
    wsUrl: import.meta.env.VITE_WS_URL || 'ws://34.93.247.3:5000',
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
