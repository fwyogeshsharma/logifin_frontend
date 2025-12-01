// src/services/api/client.ts

import { envConfig } from '@/config/env.config';
import { API, HTTP_STATUS, STORAGE_KEYS } from '@/config/constants';
import type { ApiResponse, ApiError, ApiRequestConfig, HttpMethod } from '@/types/api.types';

/**
 * API Client
 * Centralized HTTP client for all API requests
 */

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = envConfig.apiBaseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: response.statusText || 'An unknown error occurred',
        },
        timestamp: new Date().toISOString(),
      }));

      // Handle specific status codes
      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        // Clear auth tokens and redirect to login
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        window.location.href = '/login';
      }

      throw error;
    }

    return response.json();
  }

  async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      params,
      body,
      timeout = API.TIMEOUT,
      signal,
    } = config;

    // Build URL with query params
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          ...this.defaultHeaders,
          ...this.getAuthHeader(),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: signal || controller.signal,
      });

      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
