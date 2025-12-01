// src/App.tsx

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '@/components/common';

// Lazy load pages for code splitting
const Landing = lazy(() => import('@/pages/Landing'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
