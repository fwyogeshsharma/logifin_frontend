// src/components/common/Button/Button.tsx

import { memo, forwardRef } from 'react';
import { cx } from '@/utils';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Button component
 * A reusable button with multiple variants, sizes, and states
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        variant = 'primary',
        size = 'md',
        fullWidth = false,
        isLoading = false,
        leftIcon,
        rightIcon,
        children,
        className,
        disabled,
        type = 'button',
        ...props
      },
      ref
    ) => {
      const buttonClasses = cx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.loading]: isLoading,
        },
        className
      );

      return (
        <button
          ref={ref}
          type={type}
          className={buttonClasses}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading && <span className={styles.spinner} />}
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </button>
      );
    }
  )
);

Button.displayName = 'Button';
