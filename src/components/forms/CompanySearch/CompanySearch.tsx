// src/components/forms/CompanySearch/CompanySearch.tsx

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { companiesService, type Company } from '@/services/companies';
import { Spinner } from '@/components/common';
import styles from './CompanySearch.module.css';

// Icons
const BuildingIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
    <path d="M9 9h1" />
    <path d="M9 13h1" />
    <path d="M9 17h1" />
  </svg>
);

const PlusIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CheckIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface CompanySearchProps {
  value: string;
  selectedCompany: Company | null;
  onChange: (value: string) => void;
  onSelect: (company: Company | null) => void;
  onAddNew: () => void;
  disabled?: boolean;
  error?: string;
}

/**
 * CompanySearch Component
 * Autocomplete search for companies with add new option
 */
const CompanySearch = memo(function CompanySearch({
  value,
  selectedCompany,
  onChange,
  onSelect,
  onAddNew,
  disabled = false,
  error,
}: CompanySearchProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search companies
  const searchCompanies = useCallback(async (query: string) => {
    if (query.length < 3) {
      setCompanies([]);
      setSearchPerformed(false);
      return;
    }

    setIsLoading(true);
    setSearchPerformed(true);

    try {
      const response = await companiesService.searchCompanies(query);
      if (response.success && response.data) {
        setCompanies(response.data);
      } else {
        setCompanies([]);
      }
    } catch (err) {
      console.error('Failed to search companies:', err);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle input change with debounce
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Clear selected company when typing
      if (selectedCompany) {
        onSelect(null);
      }

      // Debounce search
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (newValue.length >= 3) {
        setIsOpen(true);
        debounceRef.current = setTimeout(() => {
          searchCompanies(newValue);
        }, 300);
      } else {
        setCompanies([]);
        setSearchPerformed(false);
        if (newValue.length === 0) {
          setIsOpen(false);
        }
      }
    },
    [onChange, onSelect, selectedCompany, searchCompanies]
  );

  // Handle company selection
  const handleSelectCompany = useCallback(
    (company: Company) => {
      onSelect(company);
      onChange(company.name);
      setIsOpen(false);
    },
    [onSelect, onChange]
  );

  // Handle add new company
  const handleAddNew = useCallback(() => {
    setIsOpen(false);
    onAddNew();
  }, [onAddNew]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    if (value.length >= 3 && !selectedCompany) {
      setIsOpen(true);
      if (!searchPerformed) {
        searchCompanies(value);
      }
    }
  }, [value, selectedCompany, searchPerformed, searchCompanies]);

  // Clear selection
  const handleClear = useCallback(() => {
    onChange('');
    onSelect(null);
    setCompanies([]);
    setSearchPerformed(false);
    inputRef.current?.focus();
  }, [onChange, onSelect]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <label className={styles.label}>Company (Optional)</label>
      <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''} ${disabled ? styles.inputDisabled : ''}`}>
        <span className={styles.icon}>
          <BuildingIcon />
        </span>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder="Search or add company"
          disabled={disabled}
          autoComplete="off"
        />
        {selectedCompany && (
          <span className={styles.selectedBadge}>
            <CheckIcon />
          </span>
        )}
        {value && !disabled && (
          <button type="button" className={styles.clearButton} onClick={handleClear}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <Spinner size="sm" />
              <span>Searching...</span>
            </div>
          ) : (
            <>
              {companies.length > 0 ? (
                <ul className={styles.list}>
                  {companies.map((company) => (
                    <li key={company.id}>
                      <button
                        type="button"
                        className={`${styles.option} ${selectedCompany?.id === company.id ? styles.optionSelected : ''}`}
                        onClick={() => handleSelectCompany(company)}
                      >
                        <div className={styles.optionIcon}>
                          <BuildingIcon />
                        </div>
                        <div className={styles.optionContent}>
                          <span className={styles.optionName}>{company.name}</span>
                          {company.city && (
                            <span className={styles.optionMeta}>{company.city}{company.state ? `, ${company.state}` : ''}</span>
                          )}
                        </div>
                        {selectedCompany?.id === company.id && (
                          <span className={styles.optionCheck}>
                            <CheckIcon />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : searchPerformed ? (
                <div className={styles.noResults}>
                  <p>No companies found for "{value}"</p>
                </div>
              ) : null}

              {/* Add new company option */}
              {value.length >= 3 && (
                <button type="button" className={styles.addNewButton} onClick={handleAddNew}>
                  <span className={styles.addNewIcon}>
                    <PlusIcon />
                  </span>
                  <span>Add "{value}" as new company</span>
                </button>
              )}
            </>
          )}
        </div>
      )}

      <p className={styles.hint}>
        Leave empty if individual. Type 3+ characters to search companies.
      </p>
    </div>
  );
});

CompanySearch.displayName = 'CompanySearch';

export { CompanySearch };
export type { CompanySearchProps };
