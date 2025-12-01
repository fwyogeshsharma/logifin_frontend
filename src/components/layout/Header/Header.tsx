// src/components/layout/Header/Header.tsx

import { memo } from 'react';
import { Button } from '@/components/common';
import styles from './Header.module.css';

export interface HeaderProps {
  /** User name to display */
  userName?: string;
  /** Callback when logout is clicked */
  onLogout?: () => void;
}

/**
 * Header component
 * Main navigation header for the application
 */
export const Header = memo<HeaderProps>(({ userName, onLogout }) => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        LogiFin
      </a>

      <nav className={styles.nav}>
        <a href="/dashboard" className={styles.navLink}>
          Dashboard
        </a>
        <a href="/reports" className={styles.navLink}>
          Reports
        </a>
        <a href="/settings" className={styles.navLink}>
          Settings
        </a>
      </nav>

      <div className={styles.actions}>
        {userName && <span>Hello, {userName}</span>}
        {onLogout && (
          <Button variant="ghost" size="sm" onClick={onLogout}>
            Logout
          </Button>
        )}
        <button className={styles.menuButton} aria-label="Open menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
