// src/pages/Signup/Signup.tsx

import { memo, useState, useCallback, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Spinner } from '@/components/common';
import { CompanySearch, AddCompanyModal } from '@/components/forms';
import { authService } from '@/services/auth';
import { rolesService, type Role } from '@/services/roles';
import { type Company } from '@/services/companies';
import { ROUTES } from '@/config/routes';
import type { ApiError } from '@/types/api.types';
import styles from './Signup.module.css';

// Icons
const UserIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


const LockIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const TruckIcon = (): JSX.Element => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const PackageIcon = (): JSX.Element => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const WalletIcon = (): JSX.Element => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const CheckIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Role name to UI mapping
const ROLE_CONFIG: Record<string, { label: string; description: string; icon: JSX.Element }> = {
  ROLE_SHIPPER: {
    label: 'Shipper',
    description: 'I have goods to transport',
    icon: <PackageIcon />,
  },
  ROLE_TRANSPORTER: {
    label: 'Transporter',
    description: 'I provide trucking services',
    icon: <TruckIcon />,
  },
  ROLE_LENDER: {
    label: 'Lender',
    description: 'I want to finance trips',
    icon: <WalletIcon />,
  },
};

// Filter order - show roles in this specific order
const ROLE_ORDER = ['ROLE_SHIPPER', 'ROLE_TRANSPORTER', 'ROLE_LENDER'];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  roleId: number | null;
}

/**
 * Signup Page
 * User registration page with multiple fields
 */
const Signup = memo(function Signup(): JSX.Element {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    roleId: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Company search state
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await rolesService.getRoles();
        if (response.success && response.data) {
          // Filter only the roles we want and sort by our defined order
          const filteredRoles = response.data
            .filter((role) => ROLE_ORDER.includes(role.roleName))
            .sort((a, b) => ROLE_ORDER.indexOf(a.roleName) - ROLE_ORDER.indexOf(b.roleName));

          setRoles(filteredRoles);

          // Set default role to first available role
          const firstRole = filteredRoles[0];
          if (firstRole) {
            setFormData((prev) => ({ ...prev, roleId: firstRole.id }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !/^\+?[1-9]\d{9,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setApiError(null);
    },
    []
  );

  const handleRoleChange = useCallback((roleId: number): void => {
    setFormData((prev) => ({ ...prev, roleId }));
  }, []);

  // Company handlers
  const handleCompanySearchChange = useCallback((value: string): void => {
    setCompanySearchValue(value);
  }, []);

  const handleCompanySelect = useCallback((company: Company | null): void => {
    setSelectedCompany(company);
  }, []);

  const handleAddCompanyClick = useCallback((): void => {
    setShowAddCompanyModal(true);
  }, []);

  const handleAddCompanySuccess = useCallback((company: Company): void => {
    setSelectedCompany(company);
    setCompanySearchValue(company.name);
    setShowAddCompanyModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      if (!validateForm()) return;

      if (!formData.roleId) {
        setApiError('Please select a role');
        return;
      }

      setIsLoading(true);
      setApiError(null);

      try {
        const registerData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          roleId: formData.roleId,
          companyId: selectedCompany?.id,
        };
        const response = await authService.register(registerData);
        if (response.success) {
          setSuccessMessage('Registration successful! Redirecting to login...');
          setTimeout(() => {
            navigate(ROUTES.LOGIN);
          }, 2000);
        }
      } catch (error) {
        const apiErr = error as ApiError;
        setApiError(apiErr.error?.message || 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, selectedCompany, validateForm, navigate]
  );

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={styles.container}>
        {/* Left side - Branding */}
        <div className={styles.brandSection}>
          <div className={styles.brandOverlay} />
          <div className={styles.brandContent}>
            <div className={styles.brandHeader}>
              <h2 className={styles.brandTitle}>
                Join India's Leading Logistics Financing Platform
              </h2>
              <p className={styles.brandSubtitle}>
                Connect with thousands of businesses and transform your logistics financing experience.
              </p>
            </div>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckIcon />
                </div>
                <span>Get invoice financing in 24-48 hours</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckIcon />
                </div>
                <span>Competitive interest rates (8-12% p.a.)</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckIcon />
                </div>
                <span>100% digital documentation</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckIcon />
                </div>
                <span>Transparent & secure transactions</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckIcon />
                </div>
                <span>Dedicated support team</span>
              </div>
            </div>

            <div className={styles.testimonial}>
              <p className={styles.testimonialText}>
                "LogiFin has transformed how we manage our fleet financing. Quick approvals and transparent process."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>RS</div>
                <div>
                  <p className={styles.testimonialName}>Rajesh Sharma</p>
                  <p className={styles.testimonialRole}>Fleet Owner, Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            <Link to={ROUTES.HOME} className={styles.logoLink}>
              <img src="/logiFin.png" alt="LogiFin" className={styles.logo} />
            </Link>

            <div className={styles.header}>
              <h1 className={styles.title}>Create Account</h1>
              <p className={styles.subtitle}>
                Get started with your free account today
              </p>
            </div>

            {apiError && (
              <div className={styles.errorAlert} role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span>{apiError}</span>
              </div>
            )}

            {successMessage && (
              <div className={styles.successAlert} role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Role Selector */}
              <div className={styles.roleSelector}>
                <label className={styles.roleLabel}>I am a</label>
                {rolesLoading ? (
                  <div className={styles.rolesLoading}>
                    <Spinner size="sm" />
                    <span>Loading roles...</span>
                  </div>
                ) : (
                  <div className={styles.roleOptions}>
                    {roles.map((role) => {
                      const config = ROLE_CONFIG[role.roleName];
                      if (!config) return null;

                      return (
                        <button
                          key={role.id}
                          type="button"
                          className={`${styles.roleOption} ${
                            formData.roleId === role.id ? styles.roleOptionActive : ''
                          }`}
                          onClick={() => handleRoleChange(role.id)}
                        >
                          <div className={styles.roleIconWrapper}>
                            {config.icon}
                          </div>
                          <span className={styles.roleOptionLabel}>{config.label}</span>
                          <span className={styles.roleOptionDesc}>{config.description}</span>
                          {formData.roleId === role.id && (
                            <div className={styles.roleCheck}>
                              <CheckIcon />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className={styles.row}>
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  placeholder="John"
                  autoComplete="given-name"
                  disabled={isLoading}
                  leftAddon={<UserIcon />}
                />

                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  placeholder="Doe"
                  autoComplete="family-name"
                  disabled={isLoading}
                  leftAddon={<UserIcon />}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="name@company.com"
                autoComplete="email"
                disabled={isLoading}
                leftAddon={<MailIcon />}
              />

              <Input
                label="Phone (Optional)"
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                disabled={isLoading}
                leftAddon={<PhoneIcon />}
              />

              <CompanySearch
                value={companySearchValue}
                selectedCompany={selectedCompany}
                onChange={handleCompanySearchChange}
                onSelect={handleCompanySelect}
                onAddNew={handleAddCompanyClick}
                disabled={isLoading}
              />

              <div className={styles.row}>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Min 8 characters"
                  autoComplete="new-password"
                  disabled={isLoading}
                  leftAddon={<LockIcon />}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  leftAddon={<LockIcon />}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className={styles.submitButton}
              >
                Create Account
              </Button>
            </form>

            <p className={styles.terms}>
              By creating an account, you agree to our{' '}
              <Link to={ROUTES.TERMS}>Terms of Service</Link> and{' '}
              <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
            </p>

            <div className={styles.divider}>
              <span>Already have an account?</span>
            </div>

            <Link to={ROUTES.LOGIN} className={styles.signinButton}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Add Company Modal */}
      <AddCompanyModal
        isOpen={showAddCompanyModal}
        initialName={companySearchValue}
        onClose={() => setShowAddCompanyModal(false)}
        onSuccess={handleAddCompanySuccess}
      />
    </div>
  );
});

Signup.displayName = 'Signup';

export default Signup;
