// src/services/companies/companies.service.ts

import { apiClient } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import type { ApiResponse } from '@/types/api.types';

/**
 * Company type from API
 */
export interface Company {
  id: number;
  name: string;
  displayName?: string;
  logoBase64?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  gstNumber?: string;
  panNumber?: string;
  companyRegistrationNumber?: string;
  isActive?: boolean;
  isVerified?: boolean;
  verifiedAt?: string;
  verifiedById?: number;
  verifiedByName?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create company request
 */
export interface CreateCompanyRequest {
  name: string;
  displayName?: string;
  logoBase64?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  gstNumber?: string;
  panNumber?: string;
  companyRegistrationNumber?: string;
}

/**
 * Companies Service
 * Handles fetching and creating companies
 */
class CompaniesService {
  async searchCompanies(query: string): Promise<ApiResponse<Company[]>> {
    const response = await apiClient.get<Company[]>(ENDPOINTS.COMPANIES.SEARCH, {
      search: query,
    });
    return response;
  }

  async getCompanyById(id: number): Promise<ApiResponse<Company>> {
    const response = await apiClient.get<Company>(ENDPOINTS.COMPANIES.BY_ID(id));
    return response;
  }

  async createCompany(data: CreateCompanyRequest): Promise<ApiResponse<Company>> {
    const response = await apiClient.post<Company>(ENDPOINTS.COMPANIES.BASE, data);
    return response;
  }
}

export const companiesService = new CompaniesService();
