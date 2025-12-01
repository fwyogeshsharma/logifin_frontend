// src/utils/validators/index.ts

import { REGEX, VALIDATION } from '@/config/constants';

/**
 * Validation utilities
 */

export function isEmail(value: string): boolean {
  return REGEX.EMAIL.test(value);
}

export function isPhone(value: string): boolean {
  return REGEX.PHONE.test(value);
}

export function isUrl(value: string): boolean {
  return REGEX.URL.test(value);
}

export function isUuid(value: string): boolean {
  return REGEX.UUID.test(value);
}

export function isStrongPassword(value: string): boolean {
  return REGEX.PASSWORD.test(value);
}

export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value);
}

export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email
 */
export function validateEmail(email: string): ValidationResult {
  if (isEmpty(email)) {
    return { isValid: false, error: 'Email is required' };
  }
  if (!isEmail(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  if (email.length > VALIDATION.EMAIL_MAX_LENGTH) {
    return { isValid: false, error: `Email must be less than ${VALIDATION.EMAIL_MAX_LENGTH} characters` };
  }
  return { isValid: true };
}

/**
 * Validate password
 */
export function validatePassword(password: string): ValidationResult {
  if (isEmpty(password)) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { isValid: false, error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters` };
  }
  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    return { isValid: false, error: `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters` };
  }
  if (!isStrongPassword(password)) {
    return {
      isValid: false,
      error: 'Password must contain uppercase, lowercase, number, and special character',
    };
  }
  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: unknown, fieldName: string): ValidationResult {
  if (isEmpty(value)) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
}
