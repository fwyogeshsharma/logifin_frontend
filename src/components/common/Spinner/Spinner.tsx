// src/components/common/Spinner/Spinner.tsx

import { memo } from 'react';
import { cx } from '@/utils';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Loading label */
  label?: string;
  /** Show full page overlay */
  fullPage?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Spinner component
 * A loading indicator with multiple sizes
 */
export const Spinner = memo<SpinnerProps>(
  ({ size = 'md', label, fullPage = false, className }) => {
    const spinner = (
      <span
        className={cx(styles.spinner, styles[size], className)}
        role="status"
        aria-label={label || 'Loading'}
      />
    );

    if (fullPage || label) {
      return (
        <div className={cx(styles.wrapper, { [styles.fullPage]: fullPage })}>
          {spinner}
          {label && <span className={styles.label}>{label}</span>}
        </div>
      );
    }

    return spinner;
  }
);

Spinner.displayName = 'Spinner';
