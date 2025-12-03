// src/components/layout/DashboardLayout/DashboardLayout.tsx

import { memo, useState, useCallback, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { ROUTES } from '@/config/routes';
import styles from './DashboardLayout.module.css';

// Icons
const MenuIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const LogoutIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle: string;
  navSections: NavSection[];
  roleLabel: string;
}

export const DashboardLayout = memo(function DashboardLayout({
  children,
  pageTitle,
  navSections,
  roleLabel,
}: DashboardLayoutProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = authService.getUser();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await authService.logout();
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const getUserInitials = (): string => {
    if (!user) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const getUserFullName = (): string => {
    if (!user) return 'User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to={ROUTES.HOME}>
            <img src="/logiFin.png" alt="LogiFin" className={styles.logo} />
          </Link>
          <button
            type="button"
            className={styles.collapseButton}
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* User Info */}
        <div className={styles.userInfo}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{getUserInitials()}</div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{getUserFullName()}</p>
              <p className={styles.userRole}>{roleLabel}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navSections.map((section) => (
            <div key={section.title} className={styles.navSection}>
              <h4 className={styles.navSectionTitle}>{section.title}</h4>
              <ul className={styles.navList}>
                {section.items.map((item) => (
                  <li key={item.path} className={styles.navItem}>
                    <Link
                      to={item.path}
                      className={`${styles.navLink} ${
                        location.pathname === item.path ? styles.navLinkActive : ''
                      }`}
                      onClick={closeSidebar}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={styles.navBadge}>{item.badge}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Main Content */}
      <main className={styles.main}>
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>
                <SearchIcon />
              </span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
              />
            </div>

            <button type="button" className={styles.iconButton} aria-label="Notifications">
              <BellIcon />
              <span className={styles.notificationDot} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
});

DashboardLayout.displayName = 'DashboardLayout';
