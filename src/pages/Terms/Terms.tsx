// src/pages/Terms/Terms.tsx

import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import styles from './Terms.module.css';

/**
 * Terms of Service Page
 * Legal terms and conditions for using the LogiFin platform
 */
const Terms = memo(function Terms(): JSX.Element {
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
          <h1 className={styles.title}>Terms of Service</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {/* Introduction */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.text}>
              Welcome to LogiFin ("Company," "we," "our," or "us"). These Terms of Service
              ("Terms") govern your access to and use of the LogiFin platform, including our
              website, mobile applications, APIs, and all related services (collectively, the "Platform").
            </p>
            <p className={styles.text}>
              By accessing or using our Platform, you agree to be bound by these Terms and our
              Privacy Policy. If you do not agree to these Terms, you may not access or use our Platform.
            </p>
            <p className={styles.text}>
              LogiFin is a logistics financing platform that connects Shippers, Transporters,
              and Lenders to facilitate efficient financing solutions for the logistics industry in India.
            </p>
          </section>

          {/* Definitions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Definitions</h2>
            <ul className={styles.list}>
              <li>
                <strong>"Shipper"</strong> refers to any individual or entity that has goods
                to be transported and seeks logistics services through our Platform.
              </li>
              <li>
                <strong>"Transporter"</strong> refers to any individual or entity that provides
                trucking or logistics services and is registered on our Platform.
              </li>
              <li>
                <strong>"Lender"</strong> refers to any financial institution, NBFC, or
                individual investor providing financing through our Platform.
              </li>
              <li>
                <strong>"User"</strong> refers to any Shipper, Transporter, Lender, or any
                other person accessing or using our Platform.
              </li>
              <li>
                <strong>"Transaction"</strong> refers to any financing arrangement, payment,
                or service exchange facilitated through our Platform.
              </li>
            </ul>
          </section>

          {/* Eligibility */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Eligibility and Registration</h2>
            <h3 className={styles.subTitle}>3.1 Eligibility Requirements</h3>
            <p className={styles.text}>To use our Platform, you must:</p>
            <ul className={styles.list}>
              <li>Be at least 18 years of age</li>
              <li>Be legally capable of entering into binding contracts under Indian law</li>
              <li>Provide accurate and complete registration information</li>
              <li>Have a valid PAN card and other required KYC documents</li>
              <li>For businesses: Be a legally registered entity in India with valid GST registration</li>
            </ul>

            <h3 className={styles.subTitle}>3.2 Account Registration</h3>
            <p className={styles.text}>
              When registering for an account, you agree to provide accurate, current, and
              complete information. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities under your account.
            </p>

            <h3 className={styles.subTitle}>3.3 KYC Verification</h3>
            <p className={styles.text}>
              All Users must complete our Know Your Customer (KYC) verification process,
              which may include identity verification, address verification, and business
              document verification as required by applicable laws and regulations.
            </p>
          </section>

          {/* Platform Services */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Platform Services</h2>
            <h3 className={styles.subTitle}>4.1 For Shippers</h3>
            <ul className={styles.list}>
              <li>Post load requirements and connect with verified Transporters</li>
              <li>Access invoice financing and early payment options</li>
              <li>Track shipments and manage logistics operations</li>
              <li>Generate and manage digital documentation</li>
            </ul>

            <h3 className={styles.subTitle}>4.2 For Transporters</h3>
            <ul className={styles.list}>
              <li>Access available loads and bidding opportunities</li>
              <li>Receive advance payments against verified invoices</li>
              <li>Manage fleet operations and documentation</li>
              <li>Build credit history for better financing terms</li>
            </ul>

            <h3 className={styles.subTitle}>4.3 For Lenders</h3>
            <ul className={styles.list}>
              <li>Access verified lending opportunities in the logistics sector</li>
              <li>Review borrower profiles and transaction histories</li>
              <li>Manage loan portfolios and track repayments</li>
              <li>Receive platform-facilitated collections and settlements</li>
            </ul>
          </section>

          {/* Financial Terms */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Financial Terms and Conditions</h2>
            <h3 className={styles.subTitle}>5.1 Financing Arrangements</h3>
            <p className={styles.text}>
              All financing arrangements facilitated through our Platform are subject to:
            </p>
            <ul className={styles.list}>
              <li>Credit assessment and approval by the respective Lender</li>
              <li>Execution of separate loan agreements between borrower and Lender</li>
              <li>Compliance with Reserve Bank of India (RBI) guidelines</li>
              <li>Applicable interest rates, processing fees, and other charges as disclosed</li>
            </ul>

            <h3 className={styles.subTitle}>5.2 Platform Fees</h3>
            <p className={styles.text}>
              LogiFin charges service fees for transactions facilitated through our Platform.
              All applicable fees will be clearly disclosed before you confirm any Transaction.
              Fees may include:
            </p>
            <ul className={styles.list}>
              <li>Transaction processing fees</li>
              <li>Platform service charges</li>
              <li>Payment gateway charges</li>
              <li>Late payment penalties (as applicable)</li>
            </ul>

            <h3 className={styles.subTitle}>5.3 Payment Terms</h3>
            <p className={styles.text}>
              All payments must be made through approved payment methods on our Platform.
              Users agree to honor all payment obligations arising from Transactions conducted
              through the Platform.
            </p>
          </section>

          {/* User Obligations */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. User Obligations and Conduct</h2>
            <h3 className={styles.subTitle}>6.1 General Obligations</h3>
            <p className={styles.text}>As a User, you agree to:</p>
            <ul className={styles.list}>
              <li>Provide accurate and truthful information at all times</li>
              <li>Maintain updated profile and business information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Honor all commitments made through the Platform</li>
              <li>Maintain appropriate insurance coverage for your operations</li>
            </ul>

            <h3 className={styles.subTitle}>6.2 Prohibited Activities</h3>
            <p className={styles.text}>Users are prohibited from:</p>
            <ul className={styles.list}>
              <li>Providing false, misleading, or fraudulent information</li>
              <li>Using the Platform for any illegal or unauthorized purpose</li>
              <li>Circumventing Platform mechanisms for direct dealings</li>
              <li>Harassing, threatening, or defaming other Users</li>
              <li>Attempting to gain unauthorized access to Platform systems</li>
              <li>Uploading malicious code or interfering with Platform operations</li>
              <li>Money laundering or financing of prohibited activities</li>
            </ul>
          </section>

          {/* Data and Privacy */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Data and Privacy</h2>
            <p className={styles.text}>
              Your privacy is important to us. Our collection, use, and protection of your
              personal information is governed by our{' '}
              <Link to={ROUTES.PRIVACY} className={styles.link}>Privacy Policy</Link>,
              which is incorporated into these Terms by reference.
            </p>
            <p className={styles.text}>
              By using our Platform, you consent to the collection and use of your information
              as described in our Privacy Policy, including sharing of information with Lenders,
              credit bureaus, and other parties as necessary to provide our services.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Intellectual Property</h2>
            <p className={styles.text}>
              All content, features, and functionality of the Platform, including but not limited
              to text, graphics, logos, icons, images, software, and underlying code, are owned
              by LogiFin or its licensors and are protected by Indian and international intellectual
              property laws.
            </p>
            <p className={styles.text}>
              You are granted a limited, non-exclusive, non-transferable license to access and
              use the Platform for its intended purpose. This license does not include the right
              to modify, copy, distribute, or create derivative works.
            </p>
          </section>

          {/* Disclaimers */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Disclaimers and Limitations</h2>
            <h3 className={styles.subTitle}>9.1 Platform Role</h3>
            <p className={styles.text}>
              LogiFin acts as a technology platform facilitating connections between Users.
              We are not a party to the transactions between Shippers, Transporters, and Lenders.
              We do not guarantee the performance, quality, or outcome of any Transaction.
            </p>

            <h3 className={styles.subTitle}>9.2 No Financial Advice</h3>
            <p className={styles.text}>
              Information provided on the Platform does not constitute financial, legal, or
              investment advice. Users should consult qualified professionals before making
              financial decisions.
            </p>

            <h3 className={styles.subTitle}>9.3 Service Availability</h3>
            <p className={styles.text}>
              We strive to maintain Platform availability but do not guarantee uninterrupted
              or error-free service. We reserve the right to modify, suspend, or discontinue
              any aspect of the Platform at any time.
            </p>

            <h3 className={styles.subTitle}>9.4 Limitation of Liability</h3>
            <p className={styles.text}>
              To the maximum extent permitted by law, LogiFin shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from
              your use of the Platform or any Transaction conducted through the Platform.
            </p>
          </section>

          {/* Indemnification */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Indemnification</h2>
            <p className={styles.text}>
              You agree to indemnify, defend, and hold harmless LogiFin, its officers, directors,
              employees, and agents from any claims, damages, losses, or expenses (including
              reasonable legal fees) arising from:
            </p>
            <ul className={styles.list}>
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Any Transaction you conduct through the Platform</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Dispute Resolution</h2>
            <h3 className={styles.subTitle}>11.1 Governing Law</h3>
            <p className={styles.text}>
              These Terms shall be governed by and construed in accordance with the laws of
              India, without regard to its conflict of law provisions.
            </p>

            <h3 className={styles.subTitle}>11.2 Dispute Resolution Process</h3>
            <p className={styles.text}>
              Any dispute arising out of or relating to these Terms or the Platform shall be
              resolved as follows:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Informal Resolution:</strong> Parties shall first attempt to resolve
                disputes informally by contacting LogiFin support.
              </li>
              <li>
                <strong>Mediation:</strong> If informal resolution fails, parties agree to
                attempt mediation before pursuing arbitration or litigation.
              </li>
              <li>
                <strong>Arbitration:</strong> Unresolved disputes shall be settled by binding
                arbitration under the Arbitration and Conciliation Act, 1996, with arbitration
                proceedings held in Bangalore, Karnataka.
              </li>
            </ul>

            <h3 className={styles.subTitle}>11.3 Jurisdiction</h3>
            <p className={styles.text}>
              Subject to the arbitration provisions above, the courts of Bangalore, Karnataka,
              India shall have exclusive jurisdiction over any disputes.
            </p>
          </section>

          {/* Termination */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>12. Termination</h2>
            <h3 className={styles.subTitle}>12.1 Termination by User</h3>
            <p className={styles.text}>
              You may terminate your account at any time by contacting our support team.
              Termination does not relieve you of any obligations arising from Transactions
              conducted before termination.
            </p>

            <h3 className={styles.subTitle}>12.2 Termination by LogiFin</h3>
            <p className={styles.text}>
              We may suspend or terminate your account immediately, without prior notice, for:
            </p>
            <ul className={styles.list}>
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of dues</li>
              <li>Conduct harmful to other Users or the Platform</li>
              <li>Request by law enforcement or government agencies</li>
            </ul>
          </section>

          {/* Modifications */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>13. Modifications to Terms</h2>
            <p className={styles.text}>
              We reserve the right to modify these Terms at any time. Changes will be effective
              upon posting to the Platform. We will notify Users of material changes via email
              or Platform notification. Your continued use of the Platform after changes
              constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Contact */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>14. Contact Information</h2>
            <p className={styles.text}>
              For questions about these Terms or our services, please contact us:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>LogiFin Technologies Private Limited</strong></p>
              <p>Email: legal@logifin.in</p>
              <p>Support: support@logifin.in</p>
              <p>Phone: +91 80 4567 8900</p>
              <p>Address: 123, Tech Park, Whitefield, Bangalore - 560066, Karnataka, India</p>
            </div>
          </section>

          {/* Severability */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>15. General Provisions</h2>
            <h3 className={styles.subTitle}>15.1 Severability</h3>
            <p className={styles.text}>
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions shall continue in full force and effect.
            </p>

            <h3 className={styles.subTitle}>15.2 Entire Agreement</h3>
            <p className={styles.text}>
              These Terms, together with the Privacy Policy and any other legal notices
              published by us, constitute the entire agreement between you and LogiFin
              regarding the Platform.
            </p>

            <h3 className={styles.subTitle}>15.3 Waiver</h3>
            <p className={styles.text}>
              Our failure to enforce any right or provision of these Terms shall not be
              deemed a waiver of such right or provision.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link to={ROUTES.HOME} className={styles.footerLink}>Home</Link>
            <Link to={ROUTES.PRIVACY} className={styles.footerLink}>Privacy Policy</Link>
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

Terms.displayName = 'Terms';

export default Terms;
