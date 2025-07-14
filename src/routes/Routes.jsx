import Home from '@/pages/Home';
import AdminDashboard from '@/components/layout/AdminDashboard';
import AiMatching from '@/pages/AiMatching';
import Profile from '@/pages/Profile';
import { Routes, Route } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/ai-matching" element={<AiMatching />} />
      <Route
        path="/connections-requests"
        element={<div>Connections Requests</div>}
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
export default AppRoutes;
