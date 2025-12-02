// src/services/roles/roles.service.ts

import { apiClient } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import type { ApiResponse } from '@/types/api.types';

/**
 * Role type from API
 */
export interface Role {
  id: number;
  roleName: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Roles Service
 * Handles fetching roles from the API
 */
class RolesService {
  async getRoles(): Promise<ApiResponse<Role[]>> {
    const response = await apiClient.get<Role[]>(ENDPOINTS.ROLES.BASE);
    return response;
  }

  async getRoleById(id: string): Promise<ApiResponse<Role>> {
    const response = await apiClient.get<Role>(ENDPOINTS.ROLES.BY_ID(id));
    return response;
  }
}

export const rolesService = new RolesService();
