// src/services/users/users.service.ts

import { apiClient } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import type { ApiResponse, AuthUser } from '@/types/api.types';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: string; // Kept for backward compatibility
  roleName?: string; // Actual field from API
  companyId?: number;
  companyName?: string;
  isCompanyAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateRoleRequest {
  roleId: number;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roleId: number;
  companyId?: number;
}

/**
 * Users Service
 * Handles user management operations for admins
 */
class UsersService {
  /**
   * Get all users (Admin only)
   */
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get<User[]>(ENDPOINTS.USERS.BASE);
    return response;
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await apiClient.get<User>(ENDPOINTS.USERS.BY_ID(id));
    return response;
  }

  /**
   * Update user role (Admin only)
   */
  async updateUserRole(userId: number, roleId: number): Promise<ApiResponse<User>> {
    const response = await apiClient.put<User>(
      ENDPOINTS.USERS.UPDATE_ROLE(userId),
      { roleId }
    );
    return response;
  }

  /**
   * Delete user (Admin only)
   */
  async deleteUser(userId: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<void>(ENDPOINTS.USERS.DELETE(userId));
    return response;
  }

  /**
   * Create new user (Admin only)
   */
  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    const response = await apiClient.post<User>(ENDPOINTS.USERS.BASE, data);
    return response;
  }
}

export const usersService = new UsersService();
