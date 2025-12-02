// src/pages/Privacy/Privacy.tsx

import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import styles from './Privacy.module.css';

/**
 * Privacy Policy Page
 * Privacy policy and data protection information for LogiFin platform
 */
const Privacy = memo(function Privacy(): JSX.Element {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <Link to={ROUTES.HOME} className={styles.logoLink}>
            <img src="/logiFin.png" alt="LogiFin" className={styles.logo} />
          </Link>
          <h1 className={styles.title}>Privacy Policy</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {/* Introduction */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.text}>
              LogiFin Technologies Private Limited ("LogiFin," "Company," "we," "our," or "us")
              is committed to protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, disclose, and protect
              your information when you use our logistics financing platform ("Platform").
            </p>
            <p className={styles.text}>
              By accessing or using our Platform, you consent to the collection, use, and
              disclosure of your information as described in this Privacy Policy. If you do
              not agree with our practices, please do not use our Platform.
            </p>
            <p className={styles.text}>
              This Privacy Policy is compliant with the Information Technology Act, 2000, the
              Information Technology (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection
              Act, 2023 (as applicable).
            </p>
          </section>

          {/* Information We Collect */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Information We Collect</h2>

            <h3 className={styles.subTitle}>2.1 Personal Information</h3>
            <p className={styles.text}>We collect the following personal information:</p>
            <ul className={styles.list}>
              <li>
                <strong>Identity Information:</strong> Full name, date of birth, gender,
                photographs, PAN card number, Aadhaar number (with consent), passport details
              </li>
              <li>
                <strong>Contact Information:</strong> Email address, phone number, postal
                address, emergency contact details
              </li>
              <li>
                <strong>Business Information:</strong> Company name, GSTIN, business registration
                documents, authorized signatory details, trade licenses
              </li>
              <li>
                <strong>Financial Information:</strong> Bank account details, credit history,
                income documents, tax returns, financial statements
              </li>
            </ul>

            <h3 className={styles.subTitle}>2.2 KYC and Verification Documents</h3>
            <ul className={styles.list}>
              <li>Government-issued identity documents</li>
              <li>Address proof documents</li>
              <li>Business registration certificates</li>
              <li>Vehicle registration documents (for Transporters)</li>
              <li>Bank statements and financial documents</li>
            </ul>

            <h3 className={styles.subTitle}>2.3 Transaction Information</h3>
            <ul className={styles.list}>
              <li>Details of transactions conducted through the Platform</li>
              <li>Payment history and methods</li>
              <li>Invoice and billing information</li>
              <li>Loan application and repayment history</li>
              <li>Shipping and delivery details</li>
            </ul>

            <h3 className={styles.subTitle}>2.4 Technical Information</h3>
            <ul className={styles.list}>
              <li>Device information (type, model, operating system)</li>
              <li>IP address and browser type</li>
              <li>Location data (with your consent)</li>
              <li>Log files and usage data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className={styles.subTitle}>2.5 Communication Data</h3>
            <ul className={styles.list}>
              <li>Customer support inquiries and correspondence</li>
              <li>Feedback, reviews, and survey responses</li>
              <li>Recorded phone calls (with notification)</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>

            <h3 className={styles.subTitle}>3.1 Service Delivery</h3>
            <ul className={styles.list}>
              <li>Process your registration and create your account</li>
              <li>Verify your identity and conduct KYC checks</li>
              <li>Facilitate transactions between Shippers, Transporters, and Lenders</li>
              <li>Process payments and manage your account</li>
              <li>Provide customer support and respond to inquiries</li>
            </ul>

            <h3 className={styles.subTitle}>3.2 Credit Assessment and Financing</h3>
            <ul className={styles.list}>
              <li>Assess creditworthiness for financing applications</li>
              <li>Generate credit scores and risk profiles</li>
              <li>Determine loan eligibility and terms</li>
              <li>Monitor loan repayments and manage collections</li>
              <li>Report to credit information companies (CICs) as required by law</li>
            </ul>

            <h3 className={styles.subTitle}>3.3 Platform Improvement</h3>
            <ul className={styles.list}>
              <li>Analyze usage patterns to improve our services</li>
              <li>Develop new features and products</li>
              <li>Conduct research and analytics</li>
              <li>Personalize your experience on the Platform</li>
            </ul>

            <h3 className={styles.subTitle}>3.4 Communication</h3>
            <ul className={styles.list}>
              <li>Send transaction alerts and updates</li>
              <li>Provide important notices about your account</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Conduct surveys and collect feedback</li>
            </ul>

            <h3 className={styles.subTitle}>3.5 Legal and Compliance</h3>
            <ul className={styles.list}>
              <li>Comply with applicable laws and regulations</li>
              <li>Prevent fraud, money laundering, and illegal activities</li>
              <li>Enforce our Terms of Service</li>
              <li>Respond to legal requests and court orders</li>
              <li>Protect our rights and the rights of other Users</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Information Sharing and Disclosure</h2>

            <h3 className={styles.subTitle}>4.1 Sharing with Platform Users</h3>
            <p className={styles.text}>
              Certain information may be shared with other Users to facilitate transactions:
            </p>
            <ul className={styles.list}>
              <li>Shippers may see Transporter ratings, fleet information, and verified status</li>
              <li>Transporters may see Shipper ratings and load requirements</li>
              <li>Lenders may see borrower creditworthiness indicators and transaction history</li>
            </ul>

            <h3 className={styles.subTitle}>4.2 Sharing with Third Parties</h3>
            <p className={styles.text}>We may share your information with:</p>
            <ul className={styles.list}>
              <li>
                <strong>Financial Partners:</strong> Banks, NBFCs, and financial institutions
                for credit assessment and loan processing
              </li>
              <li>
                <strong>Credit Information Companies:</strong> CIBIL, Experian, Equifax,
                CRIF High Mark for credit reporting and verification
              </li>
              <li>
                <strong>KYC Verification Providers:</strong> Identity verification services,
                UIDAI for Aadhaar verification (with consent)
              </li>
              <li>
                <strong>Payment Processors:</strong> Payment gateways and banking partners
              </li>
              <li>
                <strong>Service Providers:</strong> Cloud hosting, analytics, communication
                services, and other operational support providers
              </li>
              <li>
                <strong>Insurance Partners:</strong> For cargo and vehicle insurance services
              </li>
            </ul>

            <h3 className={styles.subTitle}>4.3 Legal Disclosure</h3>
            <p className={styles.text}>We may disclose your information:</p>
            <ul className={styles.list}>
              <li>To comply with applicable laws and legal processes</li>
              <li>To respond to lawful requests from government authorities</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h3 className={styles.subTitle}>4.4 Information Not Shared</h3>
            <p className={styles.text}>
              We do not sell, rent, or trade your personal information to third parties for
              their marketing purposes without your explicit consent.
            </p>
          </section>

          {/* Data Security */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Data Security</h2>

            <h3 className={styles.subTitle}>5.1 Security Measures</h3>
            <p className={styles.text}>
              We implement robust security measures to protect your information:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Encryption:</strong> All data transmissions are encrypted using
                SSL/TLS protocols. Sensitive data is encrypted at rest using AES-256 encryption.
              </li>
              <li>
                <strong>Access Controls:</strong> Role-based access controls limit data access
                to authorized personnel only.
              </li>
              <li>
                <strong>Secure Infrastructure:</strong> Our systems are hosted on secure,
                certified cloud infrastructure with regular security audits.
              </li>
              <li>
                <strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection systems.
              </li>
              <li>
                <strong>Employee Training:</strong> Regular security awareness training for all employees.
              </li>
            </ul>

            <h3 className={styles.subTitle}>5.2 Data Breach Response</h3>
            <p className={styles.text}>
              In the event of a data breach, we will notify affected Users and relevant
              authorities as required by applicable law. We maintain incident response
              procedures to quickly identify, contain, and remediate security incidents.
            </p>

            <h3 className={styles.subTitle}>5.3 Your Responsibilities</h3>
            <ul className={styles.list}>
              <li>Keep your login credentials confidential</li>
              <li>Use strong, unique passwords</li>
              <li>Log out after using shared devices</li>
              <li>Report any unauthorized access immediately</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Data Retention</h2>
            <p className={styles.text}>
              We retain your personal information for as long as necessary to:
            </p>
            <ul className={styles.list}>
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal obligations (tax records, KYC documents as per RBI guidelines)</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Support legitimate business purposes</li>
            </ul>
            <p className={styles.text}>
              Retention periods vary by data type:
            </p>
            <ul className={styles.list}>
              <li>KYC Documents: Minimum 5 years after account closure (as per RBI requirements)</li>
              <li>Transaction Records: Minimum 8 years (as per accounting requirements)</li>
              <li>Communication Records: 3 years from date of communication</li>
              <li>Marketing Preferences: Until you opt-out or account deletion</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Your Rights</h2>
            <p className={styles.text}>
              Under applicable data protection laws, you have the following rights:
            </p>

            <h3 className={styles.subTitle}>7.1 Right to Access</h3>
            <p className={styles.text}>
              You can request a copy of the personal information we hold about you.
            </p>

            <h3 className={styles.subTitle}>7.2 Right to Correction</h3>
            <p className={styles.text}>
              You can request correction of inaccurate or incomplete personal information.
            </p>

            <h3 className={styles.subTitle}>7.3 Right to Erasure</h3>
            <p className={styles.text}>
              You can request deletion of your personal information, subject to legal retention
              requirements and legitimate business needs.
            </p>

            <h3 className={styles.subTitle}>7.4 Right to Withdraw Consent</h3>
            <p className={styles.text}>
              You can withdraw consent for optional data processing activities at any time.
              This does not affect the lawfulness of processing before withdrawal.
            </p>

            <h3 className={styles.subTitle}>7.5 Right to Data Portability</h3>
            <p className={styles.text}>
              You can request your data in a structured, commonly used, machine-readable format.
            </p>

            <h3 className={styles.subTitle}>7.6 Right to Object</h3>
            <p className={styles.text}>
              You can object to processing of your personal information for direct marketing purposes.
            </p>

            <h3 className={styles.subTitle}>7.7 Exercising Your Rights</h3>
            <p className={styles.text}>
              To exercise any of these rights, contact our Data Protection Officer at
              privacy@logifin.in. We will respond to your request within 30 days.
            </p>
          </section>

          {/* Cookies */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Cookies and Tracking Technologies</h2>

            <h3 className={styles.subTitle}>8.1 What Are Cookies</h3>
            <p className={styles.text}>
              Cookies are small text files stored on your device when you visit our Platform.
              We use cookies and similar technologies to enhance your experience and analyze usage.
            </p>

            <h3 className={styles.subTitle}>8.2 Types of Cookies We Use</h3>
            <ul className={styles.list}>
              <li>
                <strong>Essential Cookies:</strong> Required for Platform functionality
                (authentication, security, preferences)
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how Users interact
                with our Platform
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences and settings
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Track effectiveness of our marketing
                campaigns (with consent)
              </li>
            </ul>

            <h3 className={styles.subTitle}>8.3 Managing Cookies</h3>
            <p className={styles.text}>
              You can control cookies through your browser settings. Disabling certain
              cookies may affect Platform functionality.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Third-Party Links and Services</h2>
            <p className={styles.text}>
              Our Platform may contain links to third-party websites and services. We are
              not responsible for the privacy practices of these third parties. We encourage
              you to read their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Children's Privacy</h2>
            <p className={styles.text}>
              Our Platform is not intended for individuals under 18 years of age. We do not
              knowingly collect personal information from children. If we become aware that
              we have collected information from a child, we will promptly delete it.
            </p>
          </section>

          {/* International Transfers */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. International Data Transfers</h2>
            <p className={styles.text}>
              Your information may be transferred to and processed in countries outside India
              where our service providers are located. We ensure appropriate safeguards are
              in place for such transfers, including:
            </p>
            <ul className={styles.list}>
              <li>Standard contractual clauses</li>
              <li>Data processing agreements with appropriate security requirements</li>
              <li>Compliance with applicable cross-border transfer regulations</li>
            </ul>
          </section>

          {/* Changes to Policy */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>12. Changes to This Privacy Policy</h2>
            <p className={styles.text}>
              We may update this Privacy Policy periodically. Changes will be posted on this
              page with an updated "Last Updated" date. For material changes, we will provide
              prominent notice (such as email notification or Platform announcement) before
              the changes take effect.
            </p>
            <p className={styles.text}>
              Your continued use of the Platform after changes indicates your acceptance of
              the updated Privacy Policy.
            </p>
          </section>

          {/* Grievance Officer */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>13. Grievance Officer</h2>
            <p className={styles.text}>
              In accordance with Information Technology Act, 2000 and rules made thereunder,
              the name and contact details of the Grievance Officer are provided below:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>Grievance Officer</strong></p>
              <p>Name: Mr. Arun Kumar</p>
              <p>Designation: Chief Compliance Officer</p>
              <p>Email: grievance@logifin.in</p>
              <p>Phone: +91 80 4567 8901</p>
              <p>Address: 123, Tech Park, Whitefield, Bangalore - 560066, Karnataka, India</p>
              <p>Working Hours: Monday to Friday, 10:00 AM to 6:00 PM IST</p>
            </div>
            <p className={styles.text}>
              The Grievance Officer shall address your concerns within 30 days of receipt
              of a complaint.
            </p>
          </section>

          {/* Contact */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>14. Contact Us</h2>
            <p className={styles.text}>
              For questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact us:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>LogiFin Technologies Private Limited</strong></p>
              <p>Data Protection Officer</p>
              <p>Email: privacy@logifin.in</p>
              <p>General Inquiries: support@logifin.in</p>
              <p>Phone: +91 80 4567 8900</p>
              <p>Address: 123, Tech Park, Whitefield, Bangalore - 560066, Karnataka, India</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>15. Acknowledgment</h2>
            <p className={styles.text}>
              By using our Platform, you acknowledge that you have read, understood, and
              agree to be bound by this Privacy Policy. You also acknowledge that this
              Privacy Policy does not create any contractual or other legal rights on
              behalf of any party.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link to={ROUTES.HOME} className={styles.footerLink}>Home</Link>
            <Link to={ROUTES.TERMS} className={styles.footerLink}>Terms of Service</Link>
            <Link to={ROUTES.LOGIN} className={styles.footerLink}>Login</Link>
            <Link to={ROUTES.REGISTER} className={styles.footerLink}>Sign Up</Link>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} LogiFin Technologies Private Limited. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
});

Privacy.displayName = 'Privacy';

export default Privacy;
