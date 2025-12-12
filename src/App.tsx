// src/App.tsx

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '@/components/common';

// Lazy load pages for code splitting
const Landing = lazy(() => import('@/pages/Landing'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Role-specific dashboards
const ShipperDashboard = lazy(() => import('@/pages/ShipperDashboard'));
const TransporterDashboard = lazy(() => import('@/pages/TransporterDashboard'));
const LenderDashboard = lazy(() => import('@/pages/LenderDashboard'));
const SuperAdminDashboard = lazy(() => import('@/pages/SuperAdminDashboard'));

// Transporter pages
const CreateTrip = lazy(() => import('@/pages/CreateTrip'));

/**
 * Main App Component
 * Root component that handles routing and global providers
 */
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner fullPage label="Loading..." />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Shipper routes */}
          <Route path="/shipper" element={<ShipperDashboard />} />
          <Route path="/shipper/*" element={<ShipperDashboard />} />

          {/* Transporter routes */}
          <Route path="/transporter" element={<TransporterDashboard />} />
          <Route path="/transporter/trips/create" element={<CreateTrip />} />
          <Route path="/transporter/*" element={<TransporterDashboard />} />

          {/* Lender routes */}
          <Route path="/lender" element={<LenderDashboard />} />
          <Route path="/lender/*" element={<LenderDashboard />} />

          {/* Super Admin routes */}
          <Route path="/admin" element={<SuperAdminDashboard />} />
          <Route path="/admin/*" element={<SuperAdminDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
