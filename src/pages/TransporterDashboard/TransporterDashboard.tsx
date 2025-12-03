// src/pages/TransporterDashboard/TransporterDashboard.tsx

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout, type NavSection } from '@/components/layout';
import { ROUTES } from '@/config/routes';
import { formatCurrency } from '@/utils';
import styles from './TransporterDashboard.module.css';

// Navigation Icons
const DashboardIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
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

const SearchIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const WalletIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const CalendarIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

const MapPinIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PackageIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const ClockIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  { label: 'Active Trips', value: '5', trend: 12, icon: <TruckIcon />, color: 'Blue' },
  { label: 'Available Loads', value: '28', trend: 18, icon: <SearchIcon />, color: 'Green' },
  { label: 'This Month Earnings', value: formatCurrency(485000), trend: 25, icon: <WalletIcon />, color: 'Orange' },
  { label: 'Completed Trips', value: '156', trend: 8, icon: <CalendarIcon />, color: 'Purple' },
];

const availableLoads = [
  { id: 'LD-001', from: 'Mumbai', to: 'Pune', amount: 25000, weight: '12 Ton', distance: '150 km', posted: '2 hours ago' },
  { id: 'LD-002', from: 'Delhi', to: 'Jaipur', amount: 35000, weight: '18 Ton', distance: '280 km', posted: '4 hours ago' },
  { id: 'LD-003', from: 'Chennai', to: 'Bangalore', amount: 42000, weight: '20 Ton', distance: '350 km', posted: '5 hours ago' },
  { id: 'LD-004', from: 'Kolkata', to: 'Patna', amount: 28000, weight: '15 Ton', distance: '540 km', posted: '6 hours ago' },
];

const activeTrips = [
  { id: 'TR-2024-001', from: 'Mumbai', to: 'Delhi', status: 'En Route', vehicle: 'MH-01-AB-1234', eta: '12 hours' },
  { id: 'TR-2024-002', from: 'Pune', to: 'Hyderabad', status: 'Loading', vehicle: 'MH-14-CD-5678', eta: '2 days' },
  { id: 'TR-2024-003', from: 'Chennai', to: 'Coimbatore', status: 'Active', vehicle: 'TN-01-EF-9012', eta: '6 hours' },
];

const fleetStats = [
  { label: 'Total Vehicles', value: '12', type: '' },
  { label: 'On Trip', value: '5', type: 'Active' },
  { label: 'Available', value: '5', type: 'Idle' },
  { label: 'Maintenance', value: '2', type: 'Maintenance' },
];

const TransporterDashboard = memo(function TransporterDashboard(): JSX.Element {
  const navSections: NavSection[] = useMemo(
    () => [
      {
        title: 'Main',
        items: [
          { path: ROUTES.TRANSPORTER_DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
          { path: ROUTES.TRANSPORTER_LOADS, label: 'Find Loads', icon: <SearchIcon />, badge: 28 },
          { path: ROUTES.TRANSPORTER_TRIPS, label: 'My Trips', icon: <TruckIcon /> },
          { path: ROUTES.TRANSPORTER_FLEET, label: 'Fleet Management', icon: <CalendarIcon /> },
        ],
      },
      {
        title: 'Finance',
        items: [
          { path: ROUTES.TRANSPORTER_EARNINGS, label: 'Earnings', icon: <WalletIcon /> },
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
      case 'En Route':
        return styles.badgeEnRoute ?? '';
      case 'Loading':
        return styles.badgeLoading ?? '';
      case 'Active':
        return styles.badgeActive ?? '';
      case 'Completed':
        return styles.badgeCompleted ?? '';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      navSections={navSections}
      roleLabel="Transporter"
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
            <SearchIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Find Loads</p>
            <p className={styles.actionDesc}>Browse available shipments</p>
          </div>
        </button>

        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <TruckIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Add Vehicle</p>
            <p className={styles.actionDesc}>Register a new truck</p>
          </div>
        </button>

        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <WalletIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Request Advance</p>
            <p className={styles.actionDesc}>Get trip financing</p>
          </div>
        </button>
      </div>

      {/* Available Loads */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Available Loads Near You</h2>
          <Link to={ROUTES.TRANSPORTER_LOADS} className={styles.viewAllLink}>
            View All Loads
          </Link>
        </div>
        <div className={styles.loadsGrid}>
          {availableLoads.map((load) => (
            <div key={load.id} className={styles.loadCard}>
              <div className={styles.loadHeader}>
                <div className={styles.loadRoute}>
                  <span>{load.from}</span>
                  <span className={styles.loadArrow}><ArrowRightIcon /></span>
                  <span>{load.to}</span>
                </div>
                <span className={styles.loadAmount}>{formatCurrency(load.amount)}</span>
              </div>
              <div className={styles.loadDetails}>
                <span className={styles.loadDetail}>
                  <PackageIcon />
                  {load.weight}
                </span>
                <span className={styles.loadDetail}>
                  <MapPinIcon />
                  {load.distance}
                </span>
                <span className={styles.loadDetail}>
                  <ClockIcon />
                  {load.posted}
                </span>
              </div>
              <div className={styles.loadFooter}>
                <span className={styles.loadMeta}>ID: {load.id}</span>
                <button type="button" className={styles.bidButton}>
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid */}
      <div className={styles.gridTwoCol}>
        {/* Active Trips */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Active Trips</h2>
            <Link to={ROUTES.TRANSPORTER_TRIPS} className={styles.viewAllLink}>
              View All
            </Link>
          </div>
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {activeTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td className={styles.tripId}>{trip.id}</td>
                    <td>
                      <div className={styles.route}>
                        <span>{trip.from}</span>
                        <span className={styles.routeArrow}><ArrowRightIcon /></span>
                        <span>{trip.to}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${getStatusBadgeClass(trip.status)}`}>
                        {trip.status}
                      </span>
                    </td>
                    <td>{trip.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet & Earnings */}
        <div className={styles.section}>
          {/* Fleet Overview */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Fleet Overview</h2>
          </div>
          <div className={styles.fleetCard}>
            <div className={styles.fleetStats}>
              {fleetStats.map((stat) => (
                <div
                  key={stat.label}
                  className={`${styles.fleetStat} ${stat.type ? styles[`fleetStat${stat.type}`] : ''}`}
                >
                  <p className={styles.fleetStatValue}>{stat.value}</p>
                  <p className={styles.fleetStatLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Card */}
          <div className={styles.earningsCard} style={{ marginTop: '1rem' }}>
            <div className={styles.earningsHeader}>
              <p className={styles.earningsTitle}>Total Earnings</p>
              <span className={styles.earningsPeriod}>This Month</span>
            </div>
            <p className={styles.earningsAmount}>{formatCurrency(485000)}</p>
            <div className={styles.earningsChange}>
              <TrendUpIcon />
              <span>+25% from last month</span>
            </div>
            <div className={styles.earningsBreakdown}>
              <div className={styles.earningsItem}>
                <p className={styles.earningsItemValue}>23</p>
                <p className={styles.earningsItemLabel}>Trips</p>
              </div>
              <div className={styles.earningsItem}>
                <p className={styles.earningsItemValue}>8,450 km</p>
                <p className={styles.earningsItemLabel}>Distance</p>
              </div>
              <div className={styles.earningsItem}>
                <p className={styles.earningsItemValue}>92%</p>
                <p className={styles.earningsItemLabel}>On-Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
});

TransporterDashboard.displayName = 'TransporterDashboard';

export default TransporterDashboard;
