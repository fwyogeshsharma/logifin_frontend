// src/components/common/Card/Card.tsx

import { memo, forwardRef } from 'react';
import { cx } from '@/utils';
import type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './Card.types';
import styles from './Card.module.css';

/**
 * Card component
 * A container for grouping related content
 */
export const Card = memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ children, noPadding = false, hoverable = false, className, ...props }, ref) => {
      const cardClasses = cx(
        styles.card,
        noPadding && styles['card--noPadding'],
        hoverable && styles['card--hoverable'],
        className
      );

      return (
        <div ref={ref} className={cardClasses} {...props}>
          {children}
        </div>
      );
    }
  )
);

Card.displayName = 'Card';

/**
 * Card Header component
 */
export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cx(styles.header, className)} {...props}>
        {children}
      </div>
    );
  })
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content component
 */
export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cx(styles.content, className)} {...props}>
        {children}
      </div>
    );
  })
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer component
 */
export const CardFooter = memo(
  forwardRef<HTMLDivElement, CardFooterProps>(({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cx(styles.footer, className)} {...props}>
        {children}
      </div>
    );
  })
);

CardFooter.displayName = 'CardFooter';
