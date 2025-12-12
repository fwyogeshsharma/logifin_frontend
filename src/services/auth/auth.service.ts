// src/services/auth/auth.service.ts

import { apiClient } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import { STORAGE_KEYS } from '@/config/constants';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ApiResponse,
  AuthUser,
} from '@/types/api.types';

/**
 * Authentication Service
 * Handles all auth-related API calls and token management
 */
class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success && response.data) {
      // Store token
      this.setToken(response.data.accessToken);

      // Build user object from flat response
      const user: AuthUser = {
        id: response.data.userId,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        role: response.data.role,
        companyId: response.data.companyId,
        companyName: response.data.companyName,
        isCompanyAdmin: response.data.isCompanyAdmin,
      };
      this.setUser(user);
    }

    return response;
  }

  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await apiClient.post<RegisterResponse>(
      ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response;
  }

  logout(): void {
    // Clear authentication data from localStorage
    // No backend API call needed - token invalidation happens on backend via expiry
    this.clearAuth();
  }

  setToken(accessToken: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  setUser(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export const authService = new AuthService();
