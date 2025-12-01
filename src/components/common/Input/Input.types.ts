// src/components/common/Input/Input.types.ts

import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Input size */
  size?: InputSize;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left addon (icon or text) */
  leftAddon?: ReactNode;
  /** Right addon (icon or text) */
  rightAddon?: ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}
