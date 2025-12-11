// src/components/forms/CreateTripModal/CreateTripModal.tsx

import { memo, useState, useCallback, useEffect, type FormEvent } from 'react';
import { Button, Input } from '@/components/common';
import { tripsService } from '@/services/trips';
import { documentTypesService } from '@/services/documentTypes';
import type { CreateTripRequest, Trip, DocumentType } from '@/types/api.types';
import styles from './CreateTripModal.module.css';

// Icons
const CloseIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
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

const MapPinIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FileTextIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const PackageIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (trip: Trip) => void;
}

interface DocumentUpload {
  documentTypeId: number;
  documentNumber: string;
  documentBase64: string;
  preview: string | null;
}

interface FormData {
  pickup: string;
  destination: string;
  sender: string;
  receiver: string;
  transporter: string;
  loanAmount: number;
  interestRate: number;
  maturityDays: number;
  distanceKm: number;
  loadType: string;
  weightKg: number;
  notes: string;
  status: string;
}

const STEPS = [
  { id: 0, title: 'Trip Details', icon: <MapPinIcon />, description: 'Route and cargo information' },
  { id: 1, title: 'Documents', icon: <FileTextIcon />, description: 'Upload required documents' },
  { id: 2, title: 'Review', icon: <CheckIcon />, description: 'Confirm trip details' },
];

// Default document type names as fallback
const DEFAULT_DOCUMENT_TYPES = [
  { name: 'E-way Bill', placeholder: 'E.g., 123456789012' },
  { name: 'Bilty', placeholder: 'E.g., BLT-2024-001' },
  { name: 'Truck Invoice', placeholder: 'E.g., INV-2024-001' },
  { name: 'POD', placeholder: 'E.g., POD-2024-001' },
  { name: 'Final Invoice', placeholder: 'E.g., FIN-2024-001' },
];

const CreateTripModal = memo(function CreateTripModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTripModalProps): JSX.Element | null {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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

  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch document types on mount and initialize documents array
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await documentTypesService.getDocumentTypes();
        if (response.success && response.data && response.data.length > 0) {
          setDocumentTypes(response.data);

          // Initialize documents array with actual document type IDs from API
          const initialDocuments = response.data.map(docType => ({
            documentTypeId: docType.id,
            documentNumber: '',
            documentBase64: '',
            preview: null,
          }));

          setDocuments(initialDocuments);

          console.log('Document types loaded from API:', response.data.map(dt => ({
            id: dt.id,
            name: dt.name
          })));
        } else {
          // Fallback: use default document types if API fails
          const fallbackDocs = DEFAULT_DOCUMENT_TYPES.map((_, index) => ({
            documentTypeId: index + 1,
            documentNumber: '',
            documentBase64: '',
            preview: null,
          }));
          setDocuments(fallbackDocs);
        }
      } catch (error) {
        console.error('Failed to fetch document types:', error);
        // Fallback: use default document types
        const fallbackDocs = DEFAULT_DOCUMENT_TYPES.map((_, index) => ({
          documentTypeId: index + 1,
          documentNumber: '',
          documentBase64: '',
          preview: null,
        }));
        setDocuments(fallbackDocs);
      }
    };

    if (isOpen) {
      fetchDocumentTypes();
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setFormData({
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
      setDocuments([]);
      setDocumentTypes([]);
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

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      // Validate trip details
      if (!formData.pickup.trim()) newErrors.pickup = 'Pickup location is required';
      if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
      if (!formData.sender.trim()) newErrors.sender = 'Sender name is required';
      if (!formData.receiver.trim()) newErrors.receiver = 'Receiver name is required';
      if (!formData.transporter.trim()) newErrors.transporter = 'Transporter name is required';
      if (!formData.loanAmount || formData.loanAmount <= 0) {
        newErrors.loanAmount = 'Enter a valid loan amount';
      }
      if (!formData.interestRate || formData.interestRate <= 0) {
        newErrors.interestRate = 'Enter a valid interest rate';
      }
      if (!formData.maturityDays || formData.maturityDays <= 0) {
        newErrors.maturityDays = 'Enter valid maturity days';
      }
      if (!formData.distanceKm || formData.distanceKm <= 0) {
        newErrors.distanceKm = 'Enter valid distance in kilometers';
      }
      if (!formData.loadType.trim()) newErrors.loadType = 'Load type is required';
      if (!formData.weightKg || formData.weightKg <= 0) {
        newErrors.weightKg = 'Enter valid weight in kilograms';
      }
    } else if (step === 1) {
      // Validate documents - at least one document file is required
      const hasAtLeastOneDoc = documents.some(
        doc => doc.documentBase64 && doc.documentBase64.trim()
      );
      if (!hasAtLeastOneDoc) {
        newErrors.documents = 'Please upload at least one document';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, documents]);

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

  const handleDocumentNumberChange = useCallback(
    (index: number, value: string) => {
      setDocuments(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], documentNumber: value };
        return updated;
      });
      setErrors(prev => ({ ...prev, documents: '' }));
    },
    []
  );

  const handleFileUpload = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          [`doc${index}`]: 'Please upload an image or PDF file',
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [`doc${index}`]: 'File size must be less than 5MB',
        }));
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];

        setDocuments(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            documentBase64: base64Data,
            preview: file.type.startsWith('image/') ? base64 : null,
          };
          return updated;
        });
        setErrors(prev => ({ ...prev, [`doc${index}`]: '', documents: '' }));
      };
      reader.onerror = () => {
        setErrors(prev => ({
          ...prev,
          [`doc${index}`]: 'Failed to read file',
        }));
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleRemoveDocument = useCallback((index: number) => {
    setDocuments(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        documentBase64: '',
        preview: null,
      };
      return updated;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  }, [currentStep, validateStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  }, [currentStep]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (currentStep < STEPS.length - 1) {
        handleNext();
        return;
      }

      if (!validateStep(0) || !validateStep(1)) {
        setApiError('Please complete all required fields');
        return;
      }

      setIsLoading(true);
      setApiError(null);

      try {
        // Prepare documents for API - include all uploaded documents with base64 data
        const tripDocuments = documents
          .filter(doc => doc.documentBase64 && doc.documentBase64.trim())
          .map(doc => ({
            documentTypeId: doc.documentTypeId,
            documentNumber: doc.documentNumber || '', // Use empty string if not provided
            documentBase64: doc.documentBase64,
          }));

        // Log for debugging
        console.log('📄 Documents being sent to API:');
        tripDocuments.forEach((doc, index) => {
          const docType = documentTypes.find(dt => dt.id === doc.documentTypeId);
          console.log(`  ${index + 1}. ${docType?.name || 'Unknown'} (ID: ${doc.documentTypeId})`);
          console.log(`     - Document Number: ${doc.documentNumber || '(not provided)'}`);
          console.log(`     - Base64 Length: ${doc.documentBase64.length} chars`);
        });

        const requestData: CreateTripRequest = {
          ...formData,
          documents: tripDocuments,
        };

        const response = await tripsService.createTrip(requestData);

        if (response.success && response.data) {
          onSuccess(response.data);
          onClose();
        } else {
          // Check if there are validation errors in the response
          if (response.data && typeof response.data === 'object') {
            const validationErrors: Record<string, string> = {};
            let hasFieldErrors = false;

            // Map API validation errors to form field errors
            Object.entries(response.data).forEach(([field, message]) => {
              if (typeof message === 'string') {
                validationErrors[field] = message;
                hasFieldErrors = true;
              }
            });

            if (hasFieldErrors) {
              setErrors(validationErrors);

              // Go back to step 0 if there are errors in trip details fields
              const step0Fields = ['pickup', 'destination', 'sender', 'receiver', 'transporter',
                                   'loanAmount', 'interestRate', 'maturityDays', 'distanceKm',
                                   'loadType', 'weightKg'];
              const hasStep0Errors = Object.keys(validationErrors).some(field =>
                step0Fields.includes(field)
              );

              if (hasStep0Errors) {
                setCurrentStep(0);
                setApiError('Please fix the validation errors and try again.');
              } else {
                setApiError(response.error?.message || 'Validation failed. Please check the form.');
              }
            } else {
              setApiError(response.error?.message || 'Failed to create trip');
            }
          } else {
            setApiError(response.error?.message || 'Failed to create trip');
          }
        }
      } catch (error: any) {
        console.error('Error creating trip:', error);

        // Check if error response has validation errors
        if (error?.response?.data?.data && typeof error.response.data.data === 'object') {
          const validationErrors: Record<string, string> = {};
          let hasFieldErrors = false;

          Object.entries(error.response.data.data).forEach(([field, message]) => {
            if (typeof message === 'string') {
              validationErrors[field] = message;
              hasFieldErrors = true;
            }
          });

          if (hasFieldErrors) {
            setErrors(validationErrors);

            // Go back to step 0 if there are errors in trip details fields
            const step0Fields = ['pickup', 'destination', 'sender', 'receiver', 'transporter',
                                 'loanAmount', 'interestRate', 'maturityDays', 'distanceKm',
                                 'loadType', 'weightKg'];
            const hasStep0Errors = Object.keys(validationErrors).some(field =>
              step0Fields.includes(field)
            );

            if (hasStep0Errors) {
              setCurrentStep(0);
              setApiError(error.response.data.message || 'Please fix the validation errors and try again.');
            } else {
              setApiError(error.response.data.message || 'Validation failed. Please check the form.');
            }
          } else {
            setApiError(error?.message || 'Failed to create trip. Please try again.');
          }
        } else {
          setApiError(error?.message || 'Failed to create trip. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [currentStep, formData, documents, validateStep, onSuccess, onClose, handleNext]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && !isLoading) {
        onClose();
      }
    },
    [onClose, isLoading]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <PackageIcon />
            </div>
            <div className={styles.headerText}>
              <h2 className={styles.title}>Create New Trip</h2>
              <p className={styles.subtitle}>Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Progress Steps */}
        <div className={styles.stepsWrapper}>
          <div className={styles.steps}>
            {STEPS.map((step, index) => (
              <div key={step.id} className={styles.stepItem}>
                <div className={styles.stepIndicator}>
                  <div
                    className={`${styles.stepCircle} ${
                      index === currentStep
                        ? styles.stepCircleActive
                        : index < currentStep
                        ? styles.stepCircleCompleted
                        : styles.stepCirclePending
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckIcon />
                    ) : (
                      <span className={styles.stepNumber}>{index + 1}</span>
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`${styles.stepLine} ${
                        index < currentStep ? styles.stepLineCompleted : ''
                      }`}
                    />
                  )}
                </div>
                <div className={styles.stepLabel}>
                  <div className={styles.stepLabelTitle}>{step.title}</div>
                  <div className={styles.stepLabelDescription}>{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formBody}>
            {/* API Error Display */}
            {apiError && (
              <div className={styles.errorAlert} role="alert">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{apiError}</span>
              </div>
            )}

          {/* Step 0: Trip Details */}
          {currentStep === 0 && (
            <div className={styles.stepPanel}>
              <h3 className={styles.stepTitle}>
                <MapPinIcon />
                <span>Trip Information</span>
              </h3>

              <div className={styles.formGrid}>
                <div className={styles.formSection}>
                  <h4 className={styles.sectionLabel}>Route Details</h4>
                  <Input
                    label="Pickup Location *"
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleInputChange}
                    error={errors.pickup}
                    placeholder="E.g., Mumbai, Maharashtra"
                    disabled={isLoading}
                    required
                  />
                  <Input
                    label="Destination *"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    error={errors.destination}
                    placeholder="E.g., Delhi, India"
                    disabled={isLoading}
                    required
                  />
                  <Input
                    label="Distance (km) *"
                    type="number"
                    name="distanceKm"
                    value={formData.distanceKm || ''}
                    onChange={handleInputChange}
                    error={errors.distanceKm}
                    placeholder="E.g., 1450"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className={styles.formSection}>
                  <h4 className={styles.sectionLabel}>Party Information</h4>
                  <Input
                    label="Sender Name *"
                    type="text"
                    name="sender"
                    value={formData.sender}
                    onChange={handleInputChange}
                    error={errors.sender}
                    placeholder="E.g., ABC Company"
                    disabled={isLoading}
                    required
                  />
                  <Input
                    label="Receiver Name *"
                    type="text"
                    name="receiver"
                    value={formData.receiver}
                    onChange={handleInputChange}
                    error={errors.receiver}
                    placeholder="E.g., XYZ Enterprises"
                    disabled={isLoading}
                    required
                  />
                  <Input
                    label="Transporter Name *"
                    type="text"
                    name="transporter"
                    value={formData.transporter}
                    onChange={handleInputChange}
                    error={errors.transporter}
                    placeholder="E.g., National Transport Co."
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className={styles.formSection}>
                  <h4 className={styles.sectionLabel}>Cargo Information</h4>
                  <Input
                    label="Load Type *"
                    type="text"
                    name="loadType"
                    value={formData.loadType}
                    onChange={handleInputChange}
                    error={errors.loadType}
                    placeholder="E.g., Electronics, Textiles"
                    disabled={isLoading}
                    required
                  />
                  <Input
                    label="Weight (kg) *"
                    type="number"
                    name="weightKg"
                    value={formData.weightKg || ''}
                    onChange={handleInputChange}
                    error={errors.weightKg}
                    placeholder="E.g., 5000"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className={styles.formSection}>
                  <h4 className={styles.sectionLabel}>Financial Details</h4>
                  <Input
                    label="Loan Amount (₹) *"
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount || ''}
                    onChange={handleInputChange}
                    error={errors.loanAmount}
                    placeholder="E.g., 50000"
                    disabled={isLoading}
                    required
                  />
                  <Input
                    label="Interest Rate (%) *"
                    type="number"
                    name="interestRate"
                    value={formData.interestRate || ''}
                    onChange={handleInputChange}
                    error={errors.interestRate}
                    placeholder="E.g., 12.5"
                    disabled={isLoading}
                    step="0.1"
                    required
                  />
                  <Input
                    label="Maturity Period (days) *"
                    type="number"
                    name="maturityDays"
                    value={formData.maturityDays || ''}
                    onChange={handleInputChange}
                    error={errors.maturityDays}
                    placeholder="E.g., 30"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className={styles.formSection}>
                  <h4 className={styles.sectionLabel}>Additional Information</h4>
                  <div className={styles.textareaWrapper}>
                    <label className={styles.textareaLabel}>Notes (Optional)</label>
                    <textarea
                      name="notes"
                      className={styles.textarea}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Add any additional information about this trip..."
                      disabled={isLoading}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Documents */}
          {currentStep === 1 && (
            <div className={styles.stepPanel}>
              <h3 className={styles.stepTitle}>
                <FileTextIcon />
                <span>Upload Required Documents</span>
              </h3>
              <p className={styles.stepSubtitle}>
                Upload at least one document. Accepted formats: JPG, PNG, PDF (Max 5MB per file)
              </p>

              {errors.documents && (
                <div className={styles.errorMessage} role="alert">
                  {errors.documents}
                </div>
              )}

              <div className={styles.documentsGrid}>
                  {documentTypes.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                      Loading document types...
                    </div>
                  ) : (
                    documentTypes.map((docType, index) => (
                      <div key={docType.id} className={styles.documentCard}>
                        <div className={styles.documentHeader}>
                          <h4 className={styles.documentTitle}>{docType.name}</h4>
                          {documents[index]?.documentBase64 && (
                            <span className={styles.documentBadge}>Uploaded</span>
                          )}
                        </div>

                        <Input
                          label="Document Number"
                          type="text"
                          value={documents[index]?.documentNumber || ''}
                          onChange={(e) => handleDocumentNumberChange(index, e.target.value)}
                          placeholder={`E.g., ${docType.name}-001`}
                          disabled={isLoading}
                        />

                      {documents[index]?.preview ? (
                        <div className={styles.documentPreview}>
                          <img
                            src={documents[index].preview!}
                            alt={`${docType.name} preview`}
                            className={styles.previewImage}
                          />
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => handleRemoveDocument(index)}
                            disabled={isLoading}
                            aria-label={`Remove ${docType.name}`}
                          >
                            <TrashIcon />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : documents[index]?.documentBase64 ? (
                        <div className={styles.documentPreview}>
                          <div className={styles.pdfPreview}>
                            <FileTextIcon />
                            <span>PDF Uploaded</span>
                          </div>
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => handleRemoveDocument(index)}
                            disabled={isLoading}
                            aria-label={`Remove ${docType.name}`}
                          >
                            <TrashIcon />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <label className={styles.uploadArea}>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleFileUpload(index, e)}
                            className={styles.fileInput}
                            disabled={isLoading}
                          />
                          <div className={styles.uploadContent}>
                            <UploadIcon />
                            <span className={styles.uploadText}>Click to upload</span>
                            <span className={styles.uploadHint}>JPG, PNG, PDF (Max 5MB)</span>
                          </div>
                        </label>
                      )}

                        {errors[`doc${index}`] && (
                          <p className={styles.errorText}>{errors[`doc${index}`]}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
            </div>
          )}

          {/* Step 2: Review */}
          {currentStep === 2 && (
            <div className={styles.stepPanel}>
              <h3 className={styles.stepTitle}>
                <CheckIcon />
                <span>Review & Confirm</span>
              </h3>
              <p className={styles.stepSubtitle}>
                Please review all information before creating the trip
              </p>

                <div className={styles.reviewGrid}>
                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Route Information</h4>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>From:</span>
                      <span className={styles.reviewValue}>{formData.pickup}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>To:</span>
                      <span className={styles.reviewValue}>{formData.destination}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Distance:</span>
                      <span className={styles.reviewValue}>{formData.distanceKm} km</span>
                    </div>
                  </div>

                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Party Details</h4>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Sender:</span>
                      <span className={styles.reviewValue}>{formData.sender}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Receiver:</span>
                      <span className={styles.reviewValue}>{formData.receiver}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Transporter:</span>
                      <span className={styles.reviewValue}>{formData.transporter}</span>
                    </div>
                  </div>

                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Cargo Details</h4>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Load Type:</span>
                      <span className={styles.reviewValue}>{formData.loadType}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Weight:</span>
                      <span className={styles.reviewValue}>{formData.weightKg} kg</span>
                    </div>
                  </div>

                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Financial Details</h4>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Loan Amount:</span>
                      <span className={styles.reviewValueHighlight}>
                        ₹{formData.loanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Interest Rate:</span>
                      <span className={styles.reviewValue}>{formData.interestRate}%</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Maturity Period:</span>
                      <span className={styles.reviewValue}>{formData.maturityDays} days</span>
                    </div>
                  </div>

                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Documents Uploaded</h4>
                    <div className={styles.documentsList}>
                      {documents
                        .map((doc, index) => ({ doc, index }))
                        .filter(({ doc }) => doc.documentBase64)
                        .map(({ doc, index }) => {
                          const docTypeName = documentTypes[index]?.name || `Document ${index + 1}`;
                          return (
                            <div key={index} className={styles.documentBadgeLarge}>
                              <CheckIcon />
                              <span>{docTypeName}</span>
                            </div>
                          );
                        })}
                      {!documents.some(doc => doc.documentBase64) && (
                        <p className={styles.noDocuments}>No documents uploaded</p>
                      )}
                    </div>
                  </div>

                  {formData.notes && (
                    <div className={styles.reviewCard}>
                      <h4 className={styles.reviewCardTitle}>Additional Notes</h4>
                      <p className={styles.reviewNotes}>{formData.notes}</p>
                    </div>
                  )}
                </div>
            </div>
          )}

          </div>

          {/* Modal Footer - Actions */}
          <div className={styles.footer}>
            <div className={styles.footerActions}>
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              <div className={styles.footerRight}>
                <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  {currentStep === STEPS.length - 1 ? 'Create Trip' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

CreateTripModal.displayName = 'CreateTripModal';

export { CreateTripModal };
export type { CreateTripModalProps };
