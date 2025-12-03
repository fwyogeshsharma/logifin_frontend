// src/pages/LenderDashboard/LenderDashboard.tsx

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout, type NavSection } from '@/components/layout';
import { ROUTES } from '@/config/routes';
import { formatCurrency } from '@/utils';
import styles from './LenderDashboard.module.css';

// Navigation Icons
const DashboardIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const WalletIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const TrendingUpIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

const PieChartIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
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
  { label: 'Total Invested', value: formatCurrency(2500000), trend: 15, icon: <WalletIcon />, color: 'Blue' },
  { label: 'Active Investments', value: '24', trend: 8, icon: <TrendingUpIcon />, color: 'Green' },
  { label: 'Avg. Return Rate', value: '10.5%', trend: 2, icon: <PieChartIcon />, color: 'Orange' },
  { label: 'Total Returns', value: formatCurrency(285000), trend: 18, icon: <FileTextIcon />, color: 'Purple' },
];

const opportunities = [
  {
    id: 'OPP-001',
    route: 'Mumbai → Delhi',
    amount: 150000,
    returnRate: '12%',
    duration: '7 days',
    risk: 'Low',
    transporter: 'ABC Logistics',
  },
  {
    id: 'OPP-002',
    route: 'Chennai → Hyderabad',
    amount: 85000,
    returnRate: '10%',
    duration: '4 days',
    risk: 'Low',
    transporter: 'XYZ Transport',
  },
  {
    id: 'OPP-003',
    route: 'Kolkata → Guwahati',
    amount: 120000,
    returnRate: '14%',
    duration: '6 days',
    risk: 'Medium',
    transporter: 'Fast Movers',
  },
];

const activeInvestments = [
  { id: 'INV-2024-001', route: 'Mumbai → Pune', amount: 200000, status: 'Active', return: '+₹24,000', dueDate: 'Dec 8, 2024' },
  { id: 'INV-2024-002', route: 'Delhi → Jaipur', amount: 150000, status: 'Active', return: '+₹15,750', dueDate: 'Dec 10, 2024' },
  { id: 'INV-2024-003', route: 'Bangalore → Chennai', amount: 85000, status: 'Pending', return: 'Est. ₹9,350', dueDate: 'Dec 12, 2024' },
  { id: 'INV-2024-004', route: 'Hyderabad → Mumbai', amount: 300000, status: 'Completed', return: '+₹36,000', dueDate: 'Dec 1, 2024' },
];

const riskDistribution = [
  { label: 'Low Risk', percentage: 60, type: 'Low' },
  { label: 'Medium Risk', percentage: 30, type: 'Medium' },
  { label: 'High Risk', percentage: 10, type: 'High' },
];

const LenderDashboard = memo(function LenderDashboard(): JSX.Element {
  const navSections: NavSection[] = useMemo(
    () => [
      {
        title: 'Main',
        items: [
          { path: ROUTES.LENDER_DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
          { path: ROUTES.LENDER_OPPORTUNITIES, label: 'Opportunities', icon: <SearchIcon />, badge: 15 },
          { path: ROUTES.LENDER_INVESTMENTS, label: 'My Investments', icon: <WalletIcon /> },
          { path: ROUTES.LENDER_RETURNS, label: 'Returns', icon: <TrendingUpIcon /> },
        ],
      },
      {
        title: 'Reports',
        items: [
          { path: ROUTES.LENDER_ANALYTICS, label: 'Analytics', icon: <PieChartIcon /> },
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
      case 'Active':
        return styles.badgeActive ?? '';
      case 'Pending':
        return styles.badgePending ?? '';
      case 'Completed':
        return styles.badgeCompleted ?? '';
      default:
        return '';
    }
  };

  const getRiskClass = (risk: string): string => {
    switch (risk) {
      case 'Low':
        return styles.riskLow ?? '';
      case 'Medium':
        return styles.riskMedium ?? '';
      case 'High':
        return styles.riskHigh ?? '';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      navSections={navSections}
      roleLabel="Lender"
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

      {/* Portfolio Summary */}
      <div className={styles.portfolioCard}>
        <div className={styles.portfolioHeader}>
          <div>
            <p className={styles.portfolioTitle}>Total Portfolio Value</p>
            <p className={styles.portfolioValue}>{formatCurrency(2785000)}</p>
          </div>
          <div className={styles.portfolioChange}>
            <TrendUpIcon />
            <span>+11.4% this month</span>
          </div>
        </div>
        <div className={styles.portfolioStats}>
          <div className={styles.portfolioStat}>
            <p className={styles.portfolioStatValue}>{formatCurrency(2500000)}</p>
            <p className={styles.portfolioStatLabel}>Invested</p>
          </div>
          <div className={styles.portfolioStat}>
            <p className={styles.portfolioStatValue}>{formatCurrency(285000)}</p>
            <p className={styles.portfolioStatLabel}>Total Returns</p>
          </div>
          <div className={styles.portfolioStat}>
            <p className={styles.portfolioStatValue}>24</p>
            <p className={styles.portfolioStatLabel}>Active Trips</p>
          </div>
          <div className={styles.portfolioStat}>
            <p className={styles.portfolioStatValue}>98%</p>
            <p className={styles.portfolioStatLabel}>Success Rate</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <PlusIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>New Investment</p>
            <p className={styles.actionDesc}>Fund a new trip</p>
          </div>
        </button>

        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <SearchIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Browse Opportunities</p>
            <p className={styles.actionDesc}>15 new opportunities</p>
          </div>
        </button>

        <button type="button" className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <WalletIcon />
          </div>
          <div className={styles.actionContent}>
            <p className={styles.actionTitle}>Withdraw Funds</p>
            <p className={styles.actionDesc}>Transfer to bank</p>
          </div>
        </button>
      </div>

      {/* Investment Opportunities */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recommended Opportunities</h2>
          <Link to={ROUTES.LENDER_OPPORTUNITIES} className={styles.viewAllLink}>
            View All
          </Link>
        </div>
        <div className={styles.opportunitiesGrid}>
          {opportunities.map((opp) => (
            <div key={opp.id} className={styles.opportunityCard}>
              <div className={styles.opportunityHeader}>
                <span className={styles.opportunityRoute}>{opp.route}</span>
                <span className={`${styles.opportunityRisk} ${getRiskClass(opp.risk)}`}>
                  {opp.risk} Risk
                </span>
              </div>
              <div className={styles.opportunityDetails}>
                <div className={styles.opportunityDetail}>
                  <p className={styles.opportunityDetailLabel}>Amount</p>
                  <p className={styles.opportunityDetailValue}>{formatCurrency(opp.amount)}</p>
                </div>
                <div className={styles.opportunityDetail}>
                  <p className={styles.opportunityDetailLabel}>Return</p>
                  <p className={`${styles.opportunityDetailValue} ${styles.opportunityDetailHighlight}`}>
                    {opp.returnRate}
                  </p>
                </div>
                <div className={styles.opportunityDetail}>
                  <p className={styles.opportunityDetailLabel}>Duration</p>
                  <p className={styles.opportunityDetailValue}>{opp.duration}</p>
                </div>
                <div className={styles.opportunityDetail}>
                  <p className={styles.opportunityDetailLabel}>Transporter</p>
                  <p className={styles.opportunityDetailValue}>{opp.transporter}</p>
                </div>
              </div>
              <div className={styles.opportunityFooter}>
                <button type="button" className={styles.investButton}>
                  Invest Now
                </button>
                <button type="button" className={styles.detailsButton}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid */}
      <div className={styles.gridTwoCol}>
        {/* Active Investments */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Active Investments</h2>
            <Link to={ROUTES.LENDER_INVESTMENTS} className={styles.viewAllLink}>
              View All
            </Link>
          </div>
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>
                {activeInvestments.map((inv) => (
                  <tr key={inv.id}>
                    <td className={styles.investmentId}>{inv.id}</td>
                    <td>{inv.route}</td>
                    <td>
                      <span className={`${styles.badge} ${getStatusBadgeClass(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className={inv.status !== 'Pending' ? styles.returnPositive : ''}>
                      {inv.return}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Risk Distribution</h2>
          </div>
          <div className={styles.riskDistribution}>
            <div className={styles.riskBars}>
              {riskDistribution.map((risk) => (
                <div key={risk.label} className={styles.riskBar}>
                  <div className={styles.riskBarHeader}>
                    <span className={styles.riskBarLabel}>{risk.label}</span>
                    <span className={styles.riskBarValue}>{risk.percentage}%</span>
                  </div>
                  <div className={styles.riskBarTrack}>
                    <div
                      className={`${styles.riskBarFill} ${styles[`riskBar${risk.type}`]}`}
                      style={{ width: `${risk.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Returns Chart Placeholder */}
          <div className={styles.chartCard} style={{ marginTop: '1rem' }}>
            <div className={styles.sectionHeader} style={{ marginBottom: '1rem' }}>
              <h2 className={styles.sectionTitle}>Monthly Returns</h2>
            </div>
            <div className={styles.chartPlaceholder}>
              Chart visualization will be displayed here
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
});

LenderDashboard.displayName = 'LenderDashboard';

export default LenderDashboard;
