// src/pages/ShipperDashboard/ShipperDashboard.tsx

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout, type NavSection } from '@/components/layout';
import { ROUTES } from '@/config/routes';
import { formatCurrency } from '@/utils';
import styles from './ShipperDashboard.module.css';

// Navigation Icons
const DashboardIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const PackageIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TruckIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const WalletIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const FileTextIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const SettingsIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HelpIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const PlusIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MapPinIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRightIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TrendUpIcon = (): JSX.Element => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = (): JSX.Element => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

// Mock data
const stats = [
  { label: 'Active Loads', value: '12', trend: 8, icon: <PackageIcon />, color: 'Blue' },
  { label: 'In Transit', value: '7', trend: 15, icon: <TruckIcon />, color: 'Green' },
  { label: 'Pending Payments', value: formatCurrency(245000), trend: -5, icon: <WalletIcon />, color: 'Orange' },
  { label: 'Completed This Month', value: '34', trend: 22, icon: <FileTextIcon />, color: 'Purple' },
];

const recentLoads = [
  { id: 'LD-2024-001', from: 'Mumbai', to: 'Delhi', status: 'In Transit', amount: 85000, date: '2024-12-01' },
  { id: 'LD-2024-002', from: 'Chennai', to: 'Bangalore', status: 'Pending', amount: 42000, date: '2024-12-01' },
  { id: 'LD-2024-003', from: 'Kolkata', to: 'Hyderabad', status: 'Matched', amount: 120000, date: '2024-11-30' },
  { id: 'LD-2024-004', from: 'Pune', to: 'Ahmedabad', status: 'Delivered', amount: 55000, date: '2024-11-29' },
  { id: 'LD-2024-005', from: 'Jaipur', to: 'Lucknow', status: 'In Transit', amount: 38000, date: '2024-11-28' },
];

const activities = [
  { text: 'Load LD-2024-001 picked up by Transporter', time: '2 hours ago', type: 'blue' },
  { text: 'Payment received for LD-2024-004', time: '5 hours ago', type: 'green' },
  { text: 'New quote received for LD-2024-002', time: '1 day ago', type: 'orange' },
  { text: 'Load LD-2024-003 matched with transporter', time: '1 day ago', type: 'blue' },
];

const ShipperDashboard = memo(function ShipperDashboard(): JSX.Element {
  const navSections: NavSection[] = useMemo(
    () => [
      {
        title: 'Main',
        items: [
          { path: ROUTES.SHIPPER_DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
          { path: ROUTES.SHIPPER_LOADS, label: 'My Loads', icon: <PackageIcon />, badge: 12 },
          { path: ROUTES.SHIPPER_TRACKING, label: 'Track Shipments', icon: <TruckIcon /> },
          { path: ROUTES.SHIPPER_PAYMENTS, label: 'Payments', icon: <WalletIcon /> },
        ],
      },
      {
        title: 'Reports',
        items: [
          { path: ROUTES.SHIPPER_INVOICES, label: 'Invoices', icon: <FileTextIcon /> },
        ],
      },
      {
        title: 'Account',
        items: [
          { path: ROUTES.SETTINGS, label: 'Settings', icon: <SettingsIcon /> },
          { path: ROUTES.HELP, label: 'Help & Support', icon: <HelpIcon /> },
        ],
      },
    ],
    []
  );

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'In Transit':
        return styles.badgeInTransit ?? '';
      case 'Pending':
        return styles.badgePending ?? '';
      case 'Delivered':
        return styles.badgeDelivered ?? '';
      case 'Matched':
        return styles.badgeMatched ?? '';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      navSections={navSections}
      roleLabel="Shipper"
    >
      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={`${styles.statIcon} ${styles[`statIcon${stat.color}`]}`}>
                {stat.icon}
              </div>
              <div className={`${styles.statTrend} ${stat.trend >= 0 ? styles.trendUp : styles.trendDown}`}>
                {stat.trend >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                {Math.abs(stat.trend)}%
              </div>
            </div>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <PlusIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Post New Load</p>
            <p className={styles.actionDesc}>Create a new shipment request</p>
          </div>
        </button>

        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <MapPinIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Track Shipment</p>
            <p className={styles.actionDesc}>Real-time tracking updates</p>
          </div>
        </button>

        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <ClockIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>View Quotes</p>
            <p className={styles.actionDesc}>3 pending quotes</p>
          </div>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className={styles.gridTwoCol}>
        {/* Recent Loads */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Loads</h2>
            <Link to={ROUTES.SHIPPER_LOADS} className={styles.viewAllLink}>
              View All
            </Link>
          </div>
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Load ID</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentLoads.map((load) => (
                  <tr key={load.id}>
                    <td className={styles.loadId}>{load.id}</td>
                    <td>
                      <div className={styles.route}>
                        <span>{load.from}</span>
                        <span className={styles.routeArrow}><ArrowRightIcon /></span>
                        <span>{load.to}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${getStatusBadgeClass(load.status)}`}>
                        {load.status}
                      </span>
                    </td>
                    <td>{formatCurrency(load.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
          </div>
          <div className={styles.activityFeed}>
            {activities.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={`${styles.activityDot} ${styles[`dot${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}`]}`} />
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{activity.text}</p>
                  <p className={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
});

ShipperDashboard.displayName = 'ShipperDashboard';

export default ShipperDashboard;
