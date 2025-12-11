// src/components/forms/AddCompanyModal/AddCompanyModal.tsx

import { memo, useState, useCallback, useEffect, type FormEvent } from 'react';
import { Button, Input } from '@/components/common';
import { companiesService, type Company, type CreateCompanyRequest } from '@/services/companies';
import styles from './AddCompanyModal.module.css';

// Icons
const CloseIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BuildingIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
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

interface AddCompanyModalProps {
  isOpen: boolean;
  initialName: string;
  onClose: () => void;
  onSuccess: (company: Company) => void;
}

interface FormData extends CreateCompanyRequest {
  name: string;
}

/**
 * AddCompanyModal Component
 * Modal form for creating a new company
 */
const AddCompanyModal = memo(function AddCompanyModal({
  isOpen,
  initialName,
  onClose,
  onSuccess,
}: AddCompanyModalProps): JSX.Element | null {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    displayName: '',
    email: '',
    phone: '',
    website: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    gstNumber: '',
    panNumber: '',
    companyRegistrationNumber: '',
    description: '',
    logoBase64: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Set initial name when modal opens
  useEffect(() => {
    if (isOpen && initialName) {
      setFormData((prev) => ({ ...prev, name: initialName, displayName: initialName }));
    }
  }, [isOpen, initialName]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        displayName: '',
        email: '',
        phone: '',
        website: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        gstNumber: '',
        panNumber: '',
        companyRegistrationNumber: '',
        description: '',
        logoBase64: '',
      });
      setLogoPreview(null);
      setErrors({});
      setApiError(null);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\+?[1-9]\d{9,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Please enter a valid GST number';
    }

    if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number';
    }

    if (formData.pincode && !/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setApiError(null);
    },
    []
  );

  const handleLogoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, logo: 'Please select an image file' }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: 'Image size must be less than 2MB' }));
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        // Remove the data:image/xxx;base64, prefix for API
        const base64Data = base64.split(',')[1];
        setFormData((prev) => ({ ...prev, logoBase64: base64Data }));
        setErrors((prev) => ({ ...prev, logo: '' }));
      };
      reader.onerror = () => {
        setErrors((prev) => ({ ...prev, logo: 'Failed to read image file' }));
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleRemoveLogo = useCallback(() => {
    setLogoPreview(null);
    setFormData((prev) => ({ ...prev, logoBase64: '' }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsLoading(true);
      setApiError(null);

      try {
        const response = await companiesService.createCompany(formData);
        if (response.success && response.data) {
          onSuccess(response.data);
        }
      } catch (error: unknown) {
        const apiErr = error as { error?: { message?: string } };
        setApiError(apiErr.error?.message || 'Failed to create company. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, onSuccess]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <BuildingIcon />
          </div>
          <div>
            <h2 className={styles.title}>Add New Company</h2>
            <p className={styles.subtitle}>Fill in the company details</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
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
            <h3 className={styles.sectionTitle}>Basic Information</h3>

            {/* Logo Upload */}
            <div className={styles.logoSection}>
              <label className={styles.logoLabel}>Company Logo</label>
              <div className={styles.logoUploadArea}>
                {logoPreview ? (
                  <div className={styles.logoPreviewContainer}>
                    <img src={logoPreview} alt="Logo preview" className={styles.logoPreview} />
                    <button
                      type="button"
                      className={styles.logoRemoveButton}
                      onClick={handleRemoveLogo}
                      disabled={isLoading}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ) : (
                  <label className={styles.logoUploadLabel}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className={styles.logoInput}
                      disabled={isLoading}
                    />
                    <div className={styles.logoUploadContent}>
                      <div className={styles.logoUploadIcon}>
                        <UploadIcon />
                      </div>
                      <p className={styles.logoUploadText}>Click to upload logo</p>
                      <p className={styles.logoUploadHint}>PNG, JPG up to 2MB</p>
                    </div>
                  </label>
                )}
              </div>
              {errors.logo && <p className={styles.logoError}>{errors.logo}</p>}
            </div>

            <div className={styles.grid}>
              <Input
                label="Company Name *"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Enter company name"
                disabled={isLoading}
              />
              <Input
                label="Display Name"
                type="text"
                name="displayName"
                value={formData.displayName || ''}
                onChange={handleInputChange}
                placeholder="Display name (optional)"
                disabled={isLoading}
              />
            </div>
            <div className={styles.fullWidth}>
              <label className={styles.textareaLabel}>Description</label>
              <textarea
                name="description"
                className={styles.textarea}
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Brief description of the company"
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <div className={styles.grid}>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="company@example.com"
                disabled={isLoading}
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="+91 98765 43210"
                disabled={isLoading}
              />
            </div>
            <Input
              label="Website"
              type="url"
              name="website"
              value={formData.website || ''}
              onChange={handleInputChange}
              placeholder="https://www.company.com"
              disabled={isLoading}
            />
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <Input
              label="Address Line 1"
              type="text"
              name="addressLine1"
              value={formData.addressLine1 || ''}
              onChange={handleInputChange}
              placeholder="Street address"
              disabled={isLoading}
            />
            <Input
              label="Address Line 2"
              type="text"
              name="addressLine2"
              value={formData.addressLine2 || ''}
              onChange={handleInputChange}
              placeholder="Apt, suite, building (optional)"
              disabled={isLoading}
            />
            <div className={styles.grid}>
              <Input
                label="City"
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                placeholder="City"
                disabled={isLoading}
              />
              <Input
                label="State"
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleInputChange}
                placeholder="State"
                disabled={isLoading}
              />
            </div>
            <div className={styles.grid}>
              <Input
                label="Pincode"
                type="text"
                name="pincode"
                value={formData.pincode || ''}
                onChange={handleInputChange}
                error={errors.pincode}
                placeholder="6-digit pincode"
                disabled={isLoading}
              />
              <Input
                label="Country"
                type="text"
                name="country"
                value={formData.country || ''}
                onChange={handleInputChange}
                placeholder="Country"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Registration Details</h3>
            <div className={styles.grid}>
              <Input
                label="GST Number"
                type="text"
                name="gstNumber"
                value={formData.gstNumber || ''}
                onChange={handleInputChange}
                error={errors.gstNumber}
                placeholder="22AAAAA0000A1Z5"
                disabled={isLoading}
              />
              <Input
                label="PAN Number"
                type="text"
                name="panNumber"
                value={formData.panNumber || ''}
                onChange={handleInputChange}
                error={errors.panNumber}
                placeholder="AAAAA0000A"
                disabled={isLoading}
              />
            </div>
            <Input
              label="Company Registration Number"
              type="text"
              name="companyRegistrationNumber"
              value={formData.companyRegistrationNumber || ''}
              onChange={handleInputChange}
              placeholder="CIN / LLPIN"
              disabled={isLoading}
            />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Create Company
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

AddCompanyModal.displayName = 'AddCompanyModal';

export { AddCompanyModal };
export type { AddCompanyModalProps };
