// src/pages/Login/Login.tsx

import { memo, useState, useCallback, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/common';
import { authService } from '@/services/auth';
import { ROUTES } from '@/config/routes';
import type { LoginRequest, ApiError } from '@/types/api.types';
import styles from './Login.module.css';

// Icons
const MailIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const TruckIcon = (): JSX.Element => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ShieldIcon = (): JSX.Element => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ClockIcon = (): JSX.Element => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/**
 * Login Page
 * User authentication page with email and password
 */
const Login = memo(function Login(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsLoading(true);
      setApiError(null);

      try {
        const response = await authService.login(formData);
        if (response.success) {
          navigate(ROUTES.DASHBOARD);
        }
      } catch (error) {
        const apiErr = error as ApiError;
        setApiError(apiErr.error?.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate]
  );

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={styles.container}>
        {/* Left side - Form */}
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            <Link to={ROUTES.HOME} className={styles.logoLink}>
              <img src="/logiFin.png" alt="LogiFin" className={styles.logo} />
            </Link>

            <div className={styles.header}>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>
                Sign in to access your logistics financing dashboard
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

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
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
              </div>

              <div className={styles.inputGroup}>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  leftAddon={<LockIcon />}
                />
                <Link to="/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className={styles.submitButton}
              >
                Sign In
              </Button>
            </form>

            <div className={styles.divider}>
              <span>New to LogiFin?</span>
            </div>

            <Link to={ROUTES.REGISTER} className={styles.signupButton}>
              Create an Account
            </Link>

            <p className={styles.terms}>
              By signing in, you agree to our{' '}
              <Link to={ROUTES.TERMS}>Terms of Service</Link> and{' '}
              <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className={styles.brandSection}>
          <div className={styles.brandOverlay} />
          <div className={styles.brandContent}>
            <div className={styles.brandHeader}>
              <h2 className={styles.brandTitle}>
                Fast Financing for India's Trucking Industry
              </h2>
              <p className={styles.brandSubtitle}>
                Connect load providers, vehicle providers, and lenders on one seamless platform.
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <ClockIcon />
                </div>
                <div className={styles.featureText}>
                  <h4>Quick Approval</h4>
                  <p>Get financing in 24-48 hours</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <ShieldIcon />
                </div>
                <div className={styles.featureText}>
                  <h4>Secure Platform</h4>
                  <p>Bank-grade security for all transactions</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <TruckIcon />
                </div>
                <div className={styles.featureText}>
                  <h4>10,000+ Trips</h4>
                  <p>Successfully financed and completed</p>
                </div>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>₹25Cr+</span>
                <span className={styles.statLabel}>Financed</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>8-12%</span>
                <span className={styles.statLabel}>Returns</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>500+</span>
                <span className={styles.statLabel}>Partners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Login.displayName = 'Login';

export default Login;
