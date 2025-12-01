// src/components/layout/Footer/Footer.tsx

import { memo } from 'react';
import styles from './Footer.module.css';

// SVG Icons as components
const MailIcon = (): JSX.Element => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = (): JSX.Element => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPinIcon = (): JSX.Element => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FileTextIcon = (): JSX.Element => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const HelpCircleIcon = (): JSX.Element => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const BookOpenIcon = (): JSX.Element => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Social Icons
const FacebookIcon = (): JSX.Element => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (): JSX.Element => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const LinkedinIcon = (): JSX.Element => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (): JSX.Element => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (): JSX.Element => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
  </svg>
);

/**
 * Footer component
 * Site-wide footer with company info, links, and contact details
 */
export const Footer = memo(function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* About Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About LogiFin</h3>
            <p className={styles.sectionText}>
              LogiFin is a comprehensive logistics financing platform connecting transporters,
              lenders, and load owners for seamless trip financing and investment opportunities.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Help & Resources */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Help & Resources</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/help/getting-started" className={styles.link}>
                  <BookOpenIcon />
                  Getting Started Guide
                </a>
              </li>
              <li>
                <a href="/help/user-manual" className={styles.link}>
                  <FileTextIcon />
                  User Manual
                </a>
              </li>
              <li>
                <a href="/help/faq" className={styles.link}>
                  <HelpCircleIcon />
                  FAQs
                </a>
              </li>
              <li>
                <a href="/help/video-tutorials" className={styles.link}>
                  <BookOpenIcon />
                  Video Tutorials
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className={styles.link}>
                  <FileTextIcon />
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className={styles.link}>
                  <FileTextIcon />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Us</h3>
            <div className={styles.contactItem}>
              <MailIcon />
              <p className={styles.contactText}>
                <a href="mailto:support@rollingradius.com">support@rollingradius.com</a>
              </p>
            </div>
            <div className={styles.contactItem}>
              <PhoneIcon />
              <p className={styles.contactText}>
                <a href="tel:+919024822434">+91 90248-22434</a>
              </p>
            </div>
            <div className={styles.contactItem}>
              <PhoneIcon />
              <div className={styles.contactText}>
                <p>Support Hours:</p>
                <p>Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                <p>Sat: 10:00 AM - 4:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Address & Office */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Registered Office</h3>
            <div className={styles.address}>
              <MapPinIcon />
              <div className={styles.addressText}>
                <p>121 - 122, Metropolis Tower</p>
                <p>Purani Chungi, Ajmer Road</p>
                <p>Jaipur-302019</p>
                <p>Rajasthan, India</p>
                <a
                  href="https://www.google.com/maps/dir//Manglam+Metropolis+Tower,+238,+Purani+Chungi,+Panchsheel+Colony,+Jaipur,+Rajasthan+302019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} LogiFin. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="/terms-conditions" className={styles.bottomLink}>
              Terms
            </a>
            <a href="/privacy-policy" className={styles.bottomLink}>
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
