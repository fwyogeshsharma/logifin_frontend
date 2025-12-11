// src/pages/CreateTrip/CreateTrip.tsx

import { memo, useState, useCallback, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout, type NavSection } from '@/components/layout';
import { Button, Input } from '@/components/common';
import { tripsService } from '@/services/trips';
import { ROUTES } from '@/config/routes';
import type { CreateTripRequest } from '@/types/api.types';
import styles from './CreateTrip.module.css';

// Navigation Icons (reusing from TransporterDashboard pattern)
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

const UploadIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrashIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const FileTextIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

interface FormData extends CreateTripRequest {
  ewayBillNumber: string;
}

const CreateTrip = memo(function CreateTrip(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    ewayBillNumber: '',
    ewayBillImageBase64: '',
    pickup: '',
    destination: '',
    sender: '',
    receiver: '',
    transporter: '',
    loanAmount: 0,
    interestRate: 0,
    maturityDays: 0,
    distanceKm: 0,
    loadType: '',
    weightKg: 0,
    notes: '',
    status: 'ACTIVE',
  });
  const [ewayBillPreview, setEwayBillPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navSections: NavSection[] = [
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
  ];

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.ewayBillNumber.trim()) {
      newErrors.ewayBillNumber = 'E-way Bill Number is required';
    }

    if (!formData.ewayBillImageBase64) {
      newErrors.ewayBillImage = 'E-way Bill Image is required';
    }

    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Pickup location is required';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.sender.trim()) {
      newErrors.sender = 'Sender is required';
    }

    if (!formData.receiver.trim()) {
      newErrors.receiver = 'Receiver is required';
    }

    if (!formData.transporter.trim()) {
      newErrors.transporter = 'Transporter is required';
    }

    if (!formData.loanAmount || formData.loanAmount <= 0) {
      newErrors.loanAmount = 'Valid loan amount is required';
    }

    if (!formData.interestRate || formData.interestRate <= 0) {
      newErrors.interestRate = 'Valid interest rate is required';
    }

    if (!formData.maturityDays || formData.maturityDays <= 0) {
      newErrors.maturityDays = 'Valid maturity days is required';
    }

    if (!formData.distanceKm || formData.distanceKm <= 0) {
      newErrors.distanceKm = 'Valid distance is required';
    }

    if (!formData.loadType.trim()) {
      newErrors.loadType = 'Load type is required';
    }

    if (!formData.weightKg || formData.weightKg <= 0) {
      newErrors.weightKg = 'Valid weight is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setApiError(null);
    },
    []
  );

  const handleEwayBillImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, ewayBillImage: 'Please select an image file' }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, ewayBillImage: 'Image size must be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setEwayBillPreview(base64);
        setFormData((prev) => ({ ...prev, ewayBillImageBase64: base64 }));
        setErrors((prev) => ({ ...prev, ewayBillImage: '' }));
      };
      reader.onerror = () => {
        setErrors((prev) => ({ ...prev, ewayBillImage: 'Failed to read image file' }));
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleRemoveEwayBillImage = useCallback(() => {
    setEwayBillPreview(null);
    setFormData((prev) => ({ ...prev, ewayBillImageBase64: '' }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsLoading(true);
      setApiError(null);

      try {
        const response = await tripsService.createTrip(formData);
        if (response.success && response.data) {
          navigate(ROUTES.TRANSPORTER_TRIPS);
        }
      } catch (error: unknown) {
        const apiErr = error as { error?: { message?: string } };
        setApiError(apiErr.error?.message || 'Failed to create trip. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate]
  );

  return (
    <DashboardLayout
      pageTitle="Create New Trip"
      navSections={navSections}
      roleLabel="Transporter"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FileTextIcon />
          </div>
          <div>
            <h1 className={styles.title}>Create New Trip</h1>
            <p className={styles.subtitle}>Fill in the trip details and upload E-way Bill</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {apiError && (
            <div className={styles.errorAlert}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>{apiError}</span>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>E-way Bill Information</h3>

            <Input
              label="E-way Bill Number *"
              type="text"
              name="ewayBillNumber"
              value={formData.ewayBillNumber}
              onChange={handleInputChange}
              error={errors.ewayBillNumber}
              placeholder="EWB123456789"
              disabled={isLoading}
            />

            <div className={styles.imageUploadSection}>
              <label className={styles.imageLabel}>E-way Bill Image *</label>
              <div className={styles.imageUploadArea}>
                {ewayBillPreview ? (
                  <div className={styles.imagePreviewContainer}>
                    <img src={ewayBillPreview} alt="E-way Bill" className={styles.imagePreview} />
                    <button
                      type="button"
                      className={styles.imageRemoveButton}
                      onClick={handleRemoveEwayBillImage}
                      disabled={isLoading}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ) : (
                  <label className={styles.imageUploadLabel}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEwayBillImageChange}
                      className={styles.imageInput}
                      disabled={isLoading}
                    />
                    <div className={styles.imageUploadContent}>
                      <div className={styles.imageUploadIcon}>
                        <UploadIcon />
                      </div>
                      <p className={styles.imageUploadText}>Click to upload E-way Bill image</p>
                      <p className={styles.imageUploadHint}>PNG, JPG up to 5MB</p>
                    </div>
                  </label>
                )}
              </div>
              {errors.ewayBillImage && <p className={styles.imageError}>{errors.ewayBillImage}</p>}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Route Information</h3>
            <div className={styles.grid}>
              <Input
                label="Pickup Location *"
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleInputChange}
                error={errors.pickup}
                placeholder="Mumbai, Maharashtra"
                disabled={isLoading}
              />
              <Input
                label="Destination *"
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                error={errors.destination}
                placeholder="Delhi, NCR"
                disabled={isLoading}
              />
            </div>
            <Input
              label="Distance (km) *"
              type="number"
              name="distanceKm"
              value={formData.distanceKm || ''}
              onChange={handleInputChange}
              error={errors.distanceKm}
              placeholder="1400.5"
              disabled={isLoading}
            />
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Party Information</h3>
            <div className={styles.grid}>
              <Input
                label="Sender *"
                type="text"
                name="sender"
                value={formData.sender}
                onChange={handleInputChange}
                error={errors.sender}
                placeholder="ABC Traders"
                disabled={isLoading}
              />
              <Input
                label="Receiver *"
                type="text"
                name="receiver"
                value={formData.receiver}
                onChange={handleInputChange}
                error={errors.receiver}
                placeholder="XYZ Industries"
                disabled={isLoading}
              />
            </div>
            <Input
              label="Transporter *"
              type="text"
              name="transporter"
              value={formData.transporter}
              onChange={handleInputChange}
              error={errors.transporter}
              placeholder="Fast Logistics Pvt Ltd"
              disabled={isLoading}
            />
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Load Details</h3>
            <div className={styles.grid}>
              <Input
                label="Load Type *"
                type="text"
                name="loadType"
                value={formData.loadType}
                onChange={handleInputChange}
                error={errors.loadType}
                placeholder="Electronics"
                disabled={isLoading}
              />
              <Input
                label="Weight (kg) *"
                type="number"
                name="weightKg"
                value={formData.weightKg || ''}
                onChange={handleInputChange}
                error={errors.weightKg}
                placeholder="5000"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Loan Details</h3>
            <div className={styles.grid}>
              <Input
                label="Loan Amount (₹) *"
                type="number"
                name="loanAmount"
                value={formData.loanAmount || ''}
                onChange={handleInputChange}
                error={errors.loanAmount}
                placeholder="100000"
                disabled={isLoading}
              />
              <Input
                label="Interest Rate (%) *"
                type="number"
                name="interestRate"
                value={formData.interestRate || ''}
                onChange={handleInputChange}
                error={errors.interestRate}
                placeholder="12.5"
                disabled={isLoading}
              />
            </div>
            <Input
              label="Maturity Days *"
              type="number"
              name="maturityDays"
              value={formData.maturityDays || ''}
              onChange={handleInputChange}
              error={errors.maturityDays}
              placeholder="30"
              disabled={isLoading}
            />
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Additional Notes</h3>
            <div className={styles.fullWidth}>
              <label className={styles.textareaLabel}>Notes</label>
              <textarea
                name="notes"
                className={styles.textarea}
                value={formData.notes || ''}
                onChange={handleInputChange}
                placeholder="Handle with care - fragile items"
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(ROUTES.TRANSPORTER_DASHBOARD)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Create Trip
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
});

CreateTrip.displayName = 'CreateTrip';

export default CreateTrip;
