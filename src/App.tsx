import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import TermsAnalysis from './pages/TermsAnalysis';
import TermsResult from './pages/TermsResult';
import AccountManagement from './pages/AccountManagement';

export default function App() {
  const [user] = useState({
    name: '서현',
    email: 'kang022878@gmail.com',
    profileImage: null
  });

  const [accountCount] = useState(42);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Routes>
          <Route path="/" element={<Dashboard user={user} accountCount={accountCount} />} />
          <Route path="/terms-analysis" element={<TermsAnalysis />} />
          <Route path="/terms-result" element={<TermsResult />} />
          <Route path="/account-management" element={<AccountManagement user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
