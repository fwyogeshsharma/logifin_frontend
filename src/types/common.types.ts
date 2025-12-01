// src/types/common.types.ts

/**
 * Common TypeScript type definitions
 */

// Generic ID type
export type ID = string | number;

// Nullable type helper
export type Nullable<T> = T | null;

// Optional type helper
export type Optional<T> = T | undefined;

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export type ActiveStatus = 'active' | 'inactive' | 'pending' | 'suspended';

// Sorting
export type SortOrder = 'asc' | 'desc';

export interface SortConfig<T = string> {
  field: T;
  order: SortOrder;
}

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Base entity with common fields
export interface BaseEntity {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: ActiveStatus;
}

export type UserRole = 'admin' | 'manager' | 'user' | 'viewer';

// Form types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
}

export interface FormState<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Select option type
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

// Date range
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

// File upload
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

// Generic callback types
export type VoidCallback = () => void;
export type Callback<T> = (value: T) => void;
export type AsyncCallback<T> = (value: T) => Promise<void>;

// Component props helpers
export interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface WithTestId {
  'data-testid'?: string;
}

export type CommonProps = WithClassName & WithTestId;
