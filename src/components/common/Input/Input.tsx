// src/components/common/Input/Input.tsx

import { memo, forwardRef } from 'react';
import { cx } from '@/utils';
import type { InputProps } from './Input.types';
import styles from './Input.module.css';

/**
 * Input component
 * A reusable input field with label, error states, and addons
 */
export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        label,
        size = 'md',
        error,
        helperText,
        leftAddon,
        rightAddon,
        fullWidth = true,
        className,
        id,
        ...props
      },
      ref
    ) => {
      const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

      const wrapperClasses = cx(
        styles.wrapper,
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.error]: !!error,
          [styles.hasLeftAddon]: !!leftAddon,
          [styles.hasRightAddon]: !!rightAddon,
        },
        className
      );

      return (
        <div className={wrapperClasses}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          <div className={styles.inputWrapper}>
            {leftAddon && <span className={styles.leftAddon}>{leftAddon}</span>}
            <input
              ref={ref}
              id={inputId}
              className={styles.input}
              aria-invalid={!!error}
              aria-describedby={error ? `${inputId}-error` : undefined}
              {...props}
            />
            {rightAddon && <span className={styles.rightAddon}>{rightAddon}</span>}
          </div>
          {error && (
            <span id={`${inputId}-error`} className={styles.errorText} role="alert">
              {error}
            </span>
          )}
          {helperText && !error && (
            <span className={styles.helperText}>{helperText}</span>
          )}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';
