// src/pages/TransporterDashboard/TransporterDashboard.tsx

import { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { DashboardLayout, type NavSection } from '@/components/layout';
import { CreateTripModal } from '@/components/forms/CreateTripModal';
import { tripsService } from '@/services/trips';
import { authService } from '@/services/auth';
import { ROUTES } from '@/config/routes';
import { formatCurrency } from '@/utils';
import type { Trip } from '@/types/api.types';
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

const PlusIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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

const ArrowRightIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TrendingUpIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ClockIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FileTextIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const AlertCircleIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const TransporterDashboard = memo(function TransporterDashboard(): JSX.Element {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all');

  const navSections: NavSection[] = useMemo(
    () => [
      {
        title: 'Main',
        items: [
          { path: ROUTES.TRANSPORTER_DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
          { path: ROUTES.TRANSPORTER_LOADS, label: 'Find Loads', icon: <SearchIcon /> },
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

  // Fetch trips for the logged-in user
  const fetchTrips = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get logged-in user from localStorage
      const user = authService.getUser();

      if (!user || !user.id) {
        console.error('No user found in localStorage');
        setIsLoading(false);
        return;
      }

      // Fetch trips created by this user
      const response = await tripsService.getTripsByUserId(user.id);

      if (response.success) {
        let tripsData: Trip[] = [];

        // Handle different response structures
        if (Array.isArray(response.data)) {
          // Case 1: response.data is directly an array
          tripsData = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // Case 2: response.data might have nested structure
          if (Array.isArray((response.data as any).trips)) {
            tripsData = (response.data as any).trips;
          } else if (Array.isArray((response.data as any).data)) {
            tripsData = (response.data as any).data;
          } else if (Array.isArray((response.data as any).content)) {
            tripsData = (response.data as any).content;
          }
        }

        setTrips(tripsData);
      } else {
        setTrips([]);
      }
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleTripCreated = useCallback((trip: Trip) => {
    setIsModalOpen(false);
    // Refetch all trips to ensure data is in sync with backend
    fetchTrips();
  }, [fetchTrips]);

  const getStatusBadgeClass = (status: string): string => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return styles.badgeActive;
      case 'COMPLETED':
        return styles.badgeCompleted;
      case 'PENDING':
        return styles.badgePending;
      case 'CANCELLED':
        return styles.badgeCancelled;
      default:
        return styles.badgeDefault;
    }
  };

  // Calculate comprehensive stats from trips
  const stats = useMemo(() => {
    // Ensure trips is an array
    const tripsArray = Array.isArray(trips) ? trips : [];

    const activeTrips = tripsArray.filter(t => t.status === 'ACTIVE').length;
    const completedTrips = tripsArray.filter(t => t.status === 'COMPLETED').length;
    const pendingTrips = tripsArray.filter(t => t.status === 'PENDING').length;
    const totalEarnings = tripsArray
      .filter(t => t.status === 'COMPLETED')
      .reduce((sum, t) => sum + (t.loanAmount || 0), 0);
    const pendingPayments = tripsArray
      .filter(t => t.status === 'ACTIVE')
      .reduce((sum, t) => sum + (t.loanAmount || 0), 0);
    const avgTripValue = tripsArray.length > 0
      ? tripsArray.reduce((sum, t) => sum + (t.loanAmount || 0), 0) / tripsArray.length
      : 0;

    return {
      totalTrips: tripsArray.length,
      activeTrips,
      completedTrips,
      pendingTrips,
      totalEarnings,
      pendingPayments,
      avgTripValue,
    };
  }, [trips]);

  // Filter trips based on selected filter
  const filteredTrips = useMemo(() => {
    const tripsArray = Array.isArray(trips) ? trips : [];
    if (selectedFilter === 'all') return tripsArray;
    return tripsArray.filter(t => t.status.toLowerCase() === selectedFilter);
  }, [trips, selectedFilter]);

  // Recent activity
  const recentActivity = useMemo(() => {
    const tripsArray = Array.isArray(trips) ? trips : [];
    return tripsArray
      .slice(0, 5)
      .map(trip => ({
        id: trip.id,
        title: `Trip from ${trip.pickup} to ${trip.destination}`,
        status: trip.status,
        time: 'Just now', // You can calculate actual time if you have createdAt field
        amount: trip.loanAmount,
      }));
  }, [trips]);

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      navSections={navSections}
      roleLabel="Transporter"
    >
      {/* Alert Banner - Financial UI Standard */}
      {stats.pendingTrips > 0 && (
        <div className={styles.alertBanner}>
          <div className={styles.alertIcon}>
            <AlertCircleIcon />
          </div>
          <div className={styles.alertContent}>
            <h4 className={styles.alertTitle}>Pending Action Required</h4>
            <p className={styles.alertText}>
              You have {stats.pendingTrips} trip{stats.pendingTrips > 1 ? 's' : ''} pending approval.
              Complete documentation to activate.
            </p>
          </div>
        </div>
      )}

      {/* Primary Stats Grid - Financial UI Standard */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
            <TruckIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.totalTrips}</p>
            <p className={styles.statLabel}>Total Trips</p>
            <div className={styles.statTrend}>
              <TrendingUpIcon />
              <span>+12% from last month</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
            <PackageIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.activeTrips}</p>
            <p className={styles.statLabel}>Active Trips</p>
            <div className={styles.statTrend}>
              <ClockIcon />
              <span>In progress</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
            <CalendarIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.completedTrips}</p>
            <p className={styles.statLabel}>Completed</p>
            <div className={styles.statTrend}>
              <TrendingUpIcon />
              <span>+8% this week</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
            <WalletIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{formatCurrency(stats.totalEarnings)}</p>
            <p className={styles.statLabel}>Total Earnings</p>
            <div className={styles.statTrend}>
              <TrendingUpIcon />
              <span>+15% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards - Two Column Layout */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h3 className={styles.summaryTitle}>Pending Payments</h3>
            <span className={styles.summaryBadge}>{stats.activeTrips} trips</span>
          </div>
          <p className={styles.summaryAmount}>{formatCurrency(stats.pendingPayments)}</p>
          <p className={styles.summarySubtext}>Expected within 30 days</p>
          <div className={styles.summaryProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(stats.activeTrips / stats.totalTrips) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h3 className={styles.summaryTitle}>Average Trip Value</h3>
            <span className={styles.summaryBadgeInfo}>Per trip</span>
          </div>
          <p className={styles.summaryAmount}>{formatCurrency(stats.avgTripValue)}</p>
          <p className={styles.summarySubtext}>Based on {stats.totalTrips} total trips</p>
          <div className={styles.summaryMeta}>
            <span>Min: {formatCurrency(20000)}</span>
            <span>Max: {formatCurrency(150000)}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions - Financial UI Standard */}
      <div className={styles.quickActions}>
        <h3 className={styles.sectionTitleSmall}>Quick Actions</h3>
        <div className={styles.actionGrid}>
          <button
            type="button"
            className={styles.actionCard}
            onClick={handleOpenModal}
          >
            <div className={styles.actionIcon}>
              <PlusIcon />
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>Create Trip</h4>
              <p className={styles.actionText}>Start a new trip request</p>
            </div>
          </button>

          <button type="button" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FileTextIcon />
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>Upload Documents</h4>
              <p className={styles.actionText}>Update trip documents</p>
            </div>
          </button>

          <button type="button" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <WalletIcon />
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>View Earnings</h4>
              <p className={styles.actionText}>Check payment history</p>
            </div>
          </button>

          <button type="button" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <SearchIcon />
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>Find Loads</h4>
              <p className={styles.actionText}>Browse available loads</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity & Trips - Side by Side Layout */}
      <div className={styles.contentGrid}>
        {/* Recent Activity */}
        <div className={styles.activitySection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitleSmall}>Recent Activity</h3>
          </div>
          <div className={styles.activityList}>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityDot} />
                  <div className={styles.activityContent}>
                    <h4 className={styles.activityTitle}>{activity.title}</h4>
                    <p className={styles.activityMeta}>
                      <span className={`${styles.badge} ${getStatusBadgeClass(activity.status)}`}>
                        {activity.status}
                      </span>
                      <span className={styles.activityTime}>{activity.time}</span>
                    </p>
                    <p className={styles.activityAmount}>{formatCurrency(activity.amount)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyActivity}>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Trips Section */}
        <div className={styles.tripsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>My Trips</h2>
              <p className={styles.sectionSubtitle}>Manage and track all your trips</p>
            </div>
            <button
              type="button"
              className={styles.createButton}
              onClick={handleOpenModal}
            >
              <PlusIcon />
              <span>Create Trip</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            <button
              type="button"
              className={`${styles.filterTab} ${selectedFilter === 'all' ? styles.filterTabActive : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Trips <span className={styles.filterCount}>{stats.totalTrips}</span>
            </button>
            <button
              type="button"
              className={`${styles.filterTab} ${selectedFilter === 'active' ? styles.filterTabActive : ''}`}
              onClick={() => setSelectedFilter('active')}
            >
              Active <span className={styles.filterCount}>{stats.activeTrips}</span>
            </button>
            <button
              type="button"
              className={`${styles.filterTab} ${selectedFilter === 'completed' ? styles.filterTabActive : ''}`}
              onClick={() => setSelectedFilter('completed')}
            >
              Completed <span className={styles.filterCount}>{stats.completedTrips}</span>
            </button>
            <button
              type="button"
              className={`${styles.filterTab} ${selectedFilter === 'pending' ? styles.filterTabActive : ''}`}
              onClick={() => setSelectedFilter('pending')}
            >
              Pending <span className={styles.filterCount}>{stats.pendingTrips}</span>
            </button>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Loading trips...</p>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <TruckIcon />
              </div>
              <h3 className={styles.emptyStateTitle}>No trips found</h3>
              <p className={styles.emptyStateText}>
                {selectedFilter === 'all'
                  ? 'Create your first trip to get started with trip management'
                  : `No ${selectedFilter} trips at the moment`
                }
              </p>
              {selectedFilter === 'all' && (
                <button
                  type="button"
                  className={styles.emptyStateButton}
                  onClick={handleOpenModal}
                >
                  <PlusIcon />
                  <span>Create Your First Trip</span>
                </button>
              )}
            </div>
          ) : (
            <div className={styles.tripsList}>
              {filteredTrips.map((trip) => (
                <div key={trip.id} className={styles.tripCard}>
                  <div className={styles.tripHeader}>
                    <div className={styles.tripRoute}>
                      <div className={styles.tripLocation}>
                        <MapPinIcon />
                        <span>{trip.pickup}</span>
                      </div>
                      <ArrowRightIcon />
                      <div className={styles.tripLocation}>
                        <MapPinIcon />
                        <span>{trip.destination}</span>
                      </div>
                    </div>
                    <span className={`${styles.badge} ${getStatusBadgeClass(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>

                  <div className={styles.tripDetails}>
                    <div className={styles.tripDetailItem}>
                      <span className={styles.tripDetailLabel}>Document:</span>
                      <span className={styles.tripDetailValue}>
                        {trip.documents && trip.documents.length > 0
                          ? trip.documents[0].documentNumber
                          : 'N/A'}
                      </span>
                    </div>
                    <div className={styles.tripDetailItem}>
                      <span className={styles.tripDetailLabel}>Load Type:</span>
                      <span className={styles.tripDetailValue}>{trip.loadType}</span>
                    </div>
                    <div className={styles.tripDetailItem}>
                      <span className={styles.tripDetailLabel}>Weight:</span>
                      <span className={styles.tripDetailValue}>{trip.weightKg} kg</span>
                    </div>
                    <div className={styles.tripDetailItem}>
                      <span className={styles.tripDetailLabel}>Distance:</span>
                      <span className={styles.tripDetailValue}>{trip.distanceKm} km</span>
                    </div>
                  </div>

                  <div className={styles.tripFooter}>
                    <div className={styles.tripAmount}>
                      <span className={styles.tripAmountLabel}>Loan Amount</span>
                      <span className={styles.tripAmountValue}>{formatCurrency(trip.loanAmount)}</span>
                    </div>
                    <div className={styles.tripMeta}>
                      <span>{trip.interestRate}% interest</span>
                      <span>•</span>
                      <span>{trip.maturityDays} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Trip Modal */}
      <CreateTripModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleTripCreated}
      />
    </DashboardLayout>
  );
});

TransporterDashboard.displayName = 'TransporterDashboard';

export default TransporterDashboard;
