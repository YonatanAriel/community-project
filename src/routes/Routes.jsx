import Home from '@/pages/Home';
import AdminDashboard from '@/components/layout/AdminDashboard';
import AiMatching from '@/pages/AiMatching';
import Profile from '@/pages/Profile';
import MemberProfile from '@/pages/MemberProfile';
import ConnectionsRequests from '@/pages/ConnectionsRequests';
import { Routes, Route } from 'react-router-dom';
import Excel from '@/components/ui/Excel';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/ai-matching" element={<AiMatching />} />
      <Route path="/connections-requests" element={<ConnectionsRequests />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/member/:id" element={<MemberProfile />} />
      <Route path="/excel" element={<Excel />} />
    </Routes>
  );
}
export default AppRoutes;
