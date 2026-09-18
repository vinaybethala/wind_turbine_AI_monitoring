import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SystemProvider } from './context/SystemContext';
import { Layout } from './components/Layout';

import { Dashboard } from './pages/Dashboard';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { AiPrediction } from './pages/AiPrediction';
import { Analytics } from './pages/Analytics';
import { FaultHistory } from './pages/FaultHistory';
import { Maintenance } from './pages/Maintenance';
import { SystemStatus } from './pages/SystemStatus';
import { Settings } from './pages/Settings';

function App() {
  return (
    <SystemProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="monitoring" element={<LiveMonitoring />} />
            <Route path="ai" element={<AiPrediction />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="history" element={<FaultHistory />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="status" element={<SystemStatus />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </SystemProvider>
  );
}

export default App;
