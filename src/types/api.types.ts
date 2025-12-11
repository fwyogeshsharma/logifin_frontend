// src/types/api.types.ts

/**
 * API-related TypeScript type definitions
 */

import type { ID } from './common.types';

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// API Error response
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    stack?: string;
  };
  timestamp: string;
}

// API Request config
export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  timeout?: number;
  signal?: AbortSignal;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  roleId: number;
  companyId?: number;
}

export interface AuthUser {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  companyId?: number;
  companyName?: string;
  isCompanyAdmin?: boolean;
  role: string;
}

// Login response - user data is directly in the response, not nested
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId?: number;
  companyName?: string;
  isCompanyAdmin?: boolean;
}

export interface RegisterResponse {
  message: string;
  user?: AuthUser;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

// Query params for list endpoints
export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, string | number | boolean>;
}

// Batch operations
export interface BatchRequest<T> {
  items: T[];
}

export interface BatchResponse<T> {
  successful: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
}

// WebSocket message types
export interface WsMessage<T = unknown> {
  type: string;
  payload: T;
  timestamp: string;
}

export interface WsError {
  type: 'error';
  code: string;
  message: string;
}

// File upload
export interface UploadRequest {
  file: File;
  folder?: string;
  metadata?: Record<string, string>;
}

export interface UploadResponse {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

// Document types
export interface DocumentType {
  id: number;
  name: string;
  description?: string;
  isRequired?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TripDocument {
  documentTypeId: number;
  documentNumber: string;
  documentBase64: string;
}

// Trip types
export interface CreateTripRequest {
  pickup: string;
  destination: string;
  sender: string;
  receiver: string;
  transporter: string;
  loanAmount: number;
  interestRate: number;
  maturityDays: number;
  distanceKm: number;
  loadType: string;
  weightKg: number;
  notes?: string;
  status: string;
  documents: TripDocument[];
}

export interface Trip {
  id: ID;
  pickup: string;
  destination: string;
  sender: string;
  receiver: string;
  transporter: string;
  loanAmount: number;
  interestRate: number;
  maturityDays: number;
  distanceKm: number;
  loadType: string;
  weightKg: number;
  notes?: string;
  status: string;
  documents?: TripDocument[];
  createdAt?: string;
  updatedAt?: string;
}
