// src/components/layout/DashboardLayout/DashboardLayout.tsx

import { memo, useState, useCallback, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { ROUTES } from '@/config/routes';
import styles from './DashboardLayout.module.css';

// Icons
const MenuIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const LogoutIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronDownIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const UserIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const user = authService.getUser();

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleProfileDropdown = useCallback(() => {
    setProfileDropdownOpen((prev) => !prev);
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

  // Flatten nav sections for top nav
  const allNavItems = navSections.flatMap((section) => section.items);

  return (
    <div className={styles.layout}>
      {/* Top Navigation Bar */}
      <header className={styles.topNav}>
        <div className={styles.topNavContainer}>
          {/* Left Section - Logo & Brand */}
          <div className={styles.topNavLeft}>
            <Link to={ROUTES.HOME} className={styles.logoLink}>
              <img src="/logiFin.png" alt="LogiFin" className={styles.logo} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className={styles.desktopNav}>
              {allNavItems.slice(0, 5).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.navLinkActive : ''
                  }`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={styles.navBadge}>{item.badge}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section - Search, Notifications, Profile */}
          <div className={styles.topNavRight}>
            {/* Search Bar */}
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>
                <SearchIcon />
              </span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                aria-label="Search"
              />
            </div>

            {/* Notifications */}
            <button type="button" className={styles.iconButton} aria-label="Notifications">
              <BellIcon />
              <span className={styles.notificationDot} />
            </button>

            {/* Profile Dropdown */}
            <div className={styles.profileDropdown}>
              <button
                type="button"
                className={styles.profileButton}
                onClick={toggleProfileDropdown}
                aria-label="User menu"
              >
                <div className={styles.userAvatar}>{getUserInitials()}</div>
                <div className={styles.profileInfo}>
                  <span className={styles.userName}>{getUserFullName()}</span>
                  <span className={styles.userRole}>{roleLabel}</span>
                </div>
                <ChevronDownIcon />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div
                    className={styles.dropdownBackdrop}
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className={styles.dropdownMenu}>
                    <Link to={ROUTES.SETTINGS} className={styles.dropdownItem}>
                      <UserIcon />
                      <span>Profile</span>
                    </Link>
                    <Link to={ROUTES.SETTINGS} className={styles.dropdownItem}>
                      <SettingsIcon />
                      <span>Settings</span>
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <button
                      type="button"
                      className={`${styles.dropdownItem} ${styles.logoutItem}`}
                      onClick={handleLogout}
                    >
                      <LogoutIcon />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <>
            <div className={styles.mobileMenuBackdrop} onClick={closeMobileMenu} />
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                {navSections.map((section) => (
                  <div key={section.title} className={styles.mobileNavSection}>
                    <h4 className={styles.mobileNavTitle}>{section.title}</h4>
                    <ul className={styles.mobileNavList}>
                      {section.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`${styles.mobileNavLink} ${
                              location.pathname === item.path ? styles.mobileNavLinkActive : ''
                            }`}
                            onClick={closeMobileMenu}
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
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
        </div>

        {/* Page Content */}
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
});

DashboardLayout.displayName = 'DashboardLayout';
