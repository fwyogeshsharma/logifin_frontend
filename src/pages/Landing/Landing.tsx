// src/pages/Landing/Landing.tsx

import { memo, useCallback } from 'react';
import { Button, Card, CardContent } from '@/components/common';
import { Footer } from '@/components/layout';
import type { StatItem, StepItem, BenefitItem, PartnerItem } from './Landing.types';
import styles from './Landing.module.css';

// SVG Icons
const TruckIcon = (): JSX.Element => (
  <svg className={styles.stepIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const CurrencyIcon = (): JSX.Element => (
  <svg className={styles.stepIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const UsersIcon = (): JSX.Element => (
  <svg className={styles.stepIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldIcon = (): JSX.Element => (
  <svg className={styles.stepIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Data
const STATS: StatItem[] = [
  { value: '₹25Cr+', label: 'Financed' },
  { value: '10,000+', label: 'Trips Completed' },
  { value: '8-12%', label: 'Returns for Lenders' },
  { value: '24-48 hr', label: 'Funding Speed' },
];

const STEPS: StepItem[] = [
  {
    step: '1',
    title: 'Create Trip',
    description: 'Load provider posts trip details and requests financing',
    iconType: 'truck',
  },
  {
    step: '2',
    title: 'Lenders Bid',
    description: 'Multiple lenders compete with interest rates',
    iconType: 'currency',
  },
  {
    step: '3',
    title: 'Get Funded',
    description: 'Best offer selected, funds disbursed instantly',
    iconType: 'users',
  },
  {
    step: '4',
    title: 'Complete & Repay',
    description: 'Vehicle provider delivers, automatic repayment with returns',
    iconType: 'shield',
  },
];

const BENEFITS: BenefitItem[] = [
  {
    role: 'Load Providers',
    colorType: 'primary',
    benefits: [
      'Get invoice financing instantly',
      'Improve cash flow for operations',
      'Competitive interest rates',
      'Digital documentation',
    ],
  },
  {
    role: 'Vehicle Providers',
    colorType: 'secondary',
    benefits: [
      'Receive payments faster',
      'Reduce payment delays',
      'Focus on logistics',
      'Build credit history',
    ],
  },
  {
    role: 'Lenders',
    colorType: 'accent',
    benefits: [
      '8-12% annual return',
      'Short-term lending (30-90 days)',
      'Risk assessment tools',
      'Diversified portfolio',
    ],
  },
];

const PARTNERS: PartnerItem[] = [
  { name: 'Alisha Torrent', logo: '/clients/AlishaTorrent.svg', url: 'https://www.alishatorrent.com/' },
  { name: 'Balaji', logo: '/clients/balaji.png', url: 'https://www.balajiwafers.com/' },
  { name: 'Berger', logo: '/clients/berger.png', url: 'https://www.bergerpaints.com/' },
  { name: 'Bhandari Plastic', logo: '/clients/bhandari-plastic.png', url: 'https://www.bhandariplastic.com/' },
  { name: 'Dynamic Cables', logo: '/clients/dynamic-cables.png', url: 'https://www.dynamiccables.com/' },
  { name: 'Emami', logo: '/clients/emami.png', url: 'https://www.emamiltd.in/' },
  { name: 'Greenply', logo: '/clients/greenply.png', url: 'https://www.greenply.com/' },
  { name: 'INA Energy', logo: '/clients/ina-energy.png', url: 'https://www.inaenergy.in/' },
  { name: 'Mangal Electricals', logo: '/clients/mangal-electricals.png', url: 'https://www.mangalelectricals.com/' },
  { name: 'Manishankar Oils', logo: '/clients/Manishankar-Oils.png', url: 'https://www.manishankaroils.com/' },
  { name: 'Man Structures', logo: '/clients/man-structures.png', url: 'https://www.manstructures.com/' },
  { name: 'Mohit Polytech', logo: '/clients/Mohit-Polytech-Pvt-Ltd.png', url: 'https://www.mohitpolytech.com/' },
  { name: 'Oswal Cables', logo: '/clients/oswal-cables.png', url: 'https://www.oswalcables.com/' },
  { name: 'Raydean', logo: '/clients/raydean.png', url: 'https://www.raydean.in/' },
  { name: 'RCC', logo: '/clients/rcc.png', url: 'https://www.rccgroup.in/' },
  { name: 'Rex Pipes', logo: '/clients/rex-pipes.png', url: 'https://www.rexpipes.com/' },
  { name: 'RL Industries', logo: '/clients/rl-industries.png', url: 'https://www.rlindustries.in/' },
  { name: 'Sagar', logo: '/clients/sagar.png', url: 'https://www.sagarcement.in/' },
  { name: 'Source One', logo: '/clients/source-one.png', url: 'https://www.sourceone.in/' },
  { name: 'Star Rising', logo: '/clients/star-rising.png', url: 'https://www.starrising.in/' },
  { name: 'True Power', logo: '/clients/true-power.png', url: 'https://www.truepower.in/' },
  { name: 'Varun Beverages', logo: '/clients/Varun-Beverages.png', url: 'https://www.varunbeverages.com/' },
];

// Helper to render step icon
const renderStepIcon = (iconType: StepItem['iconType']): JSX.Element => {
  switch (iconType) {
    case 'truck':
      return <TruckIcon />;
    case 'currency':
      return <CurrencyIcon />;
    case 'users':
      return <UsersIcon />;
    case 'shield':
      return <ShieldIcon />;
    default:
      return <TruckIcon />;
  }
};

/**
 * Landing Page Component
 * Main marketing page for LogiFin platform
 */
const Landing = memo(function Landing(): JSX.Element {
  const handleGetStarted = useCallback((): void => {
    window.location.href = '/auth';
  }, []);

  const handleLearnMore = useCallback((): void => {
    const howItWorksSection = document.getElementById('how-it-works');
    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <img src="/logiFin.png" alt="LogiFin" className={styles.logo} />
          <Button variant="outline" onClick={handleGetStarted}>
            Sign In
            <ArrowRightIcon className={styles.iconSm} />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <video autoPlay loop muted playsInline className={styles.heroVideo}>
          <source src="/logifinlandingpage.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Fast Financing for India's{' '}
            <span className={styles.heroTitleHighlight}>Trucking Industry</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Connect load providers, vehicle providers, and lenders on one platform.
            Get invoice financing in hours, not days.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.heroButtonPrimary} onClick={handleGetStarted}>
              Get Started
              <ArrowRightIcon className={styles.icon} />
            </button>
            <Button variant="outline" size="lg" onClick={handleLearnMore}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How LogiFin Works</h2>
            <p className={styles.sectionSubtitle}>
              A seamless platform connecting all stakeholders in logistics financing
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map((item) => (
              <Card key={item.step} hoverable className={styles.stepCard}>
                <CardContent>
                  <div className={styles.stepCardAccent} />
                  <div className={styles.stepIconWrapper}>
                    {renderStepIcon(item.iconType)}
                  </div>
                  <p className={styles.stepNumber}>{item.step}</p>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDescription}>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits by Role */}
      <section className={styles.benefits}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Benefits for Everyone</h2>
          </div>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((item) => (
              <Card key={item.role} hoverable className={styles.benefitCard}>
                <CardContent>
                  <h3 className={`${styles.benefitTitle} ${styles[`benefitTitle--${item.colorType}`]}`}>
                    {item.role}
                  </h3>
                  <ul className={styles.benefitList}>
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className={styles.benefitItem}>
                        <CheckCircleIcon
                          className={`${styles.benefitIcon} ${styles[`benefitIcon--${item.colorType}`]}`}
                        />
                        <p className={styles.benefitText}>{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className={styles.clients}>
        <div className={styles.clientsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trusted by Industry Leaders</h2>
            <p className={styles.sectionSubtitle}>
              Join businesses already transforming their logistics financing
            </p>
          </div>

          {/* Featured Client */}
          <div className={styles.featuredClient}>
            <a
              href="https://rollingradius.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.featuredClientLink}
            >
              <img
                src="/client/rr_full_transp.jpg"
                alt="Rolling Radius"
                className={styles.featuredClientLogo}
              />
            </a>
          </div>

          {/* Partners */}
          <div className={styles.partnersHeader}>
            <h3 className={styles.partnersTitle}>Our Partners</h3>
            <p className={styles.partnersSubtitle}>
              Partnering with leading businesses across industries
            </p>
          </div>
          <div className={styles.partnersGrid}>
            {PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerLink}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={styles.partnerLogo}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Transform Your Logistics Financing?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of businesses already using LogiFin
          </p>
          <button className={styles.ctaButton} onClick={handleGetStarted}>
            Start Now
            <ArrowRightIcon className={styles.icon} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
});

Landing.displayName = 'Landing';

export default Landing;
