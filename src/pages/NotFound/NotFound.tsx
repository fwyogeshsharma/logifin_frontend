// src/pages/NotFound/NotFound.tsx

import { memo } from 'react';
import { Button } from '@/components/common';
import styles from './NotFound.module.css';

/**
 * NotFound Page (404)
 * Displayed when a route is not found
 */
const NotFound = memo(() => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className={styles.container}>
      <span className={styles.errorCode}>404</span>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
        <Button variant="outline" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </main>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
