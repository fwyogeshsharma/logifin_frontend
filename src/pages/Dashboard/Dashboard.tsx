// src/pages/Dashboard/Dashboard.tsx

import { memo } from 'react';
import { formatCompactNumber, formatCurrency } from '@/utils';
import styles from './Dashboard.module.css';

interface StatCard {
  title: string;
  value: string;
  change: number;
}

const stats: StatCard[] = [
  { title: 'Total Revenue', value: formatCurrency(125430), change: 12.5 },
  { title: 'Active Users', value: formatCompactNumber(8432), change: 8.2 },
  { title: 'New Orders', value: formatCompactNumber(1234), change: -2.4 },
  { title: 'Conversion Rate', value: '3.24%', change: 1.8 },
];

/**
 * Dashboard Page
 * Main dashboard with statistics and overview
 */
const Dashboard = memo(() => {
  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here&apos;s your overview.</p>
      </header>

      <section className={styles.content}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <article key={stat.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{stat.title}</h3>
              <p className={styles.cardValue}>{stat.value}</p>
              <div
                className={`${styles.cardChange} ${
                  stat.change >= 0 ? styles.positive : styles.negative
                }`}
              >
                <span>{stat.change >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(stat.change)}% from last month</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
