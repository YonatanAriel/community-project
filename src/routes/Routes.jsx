import Home from '@/pages/Home';
import AdminDashboard from '@/components/layout/AdminDashboard';
import AiMatching from '@/pages/AiMatching';
import MemberProfile from '@/pages/MemberProfile';
import ConnectionsRequests from '@/pages/ConnectionsRequests';
import UserProfile from '@/pages/UserProfile'; // Add this import
import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Excel from '@/components/ui/Excel';
import Events from '@/pages/Events';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/ai-matching" element={<AiMatching />} />
      <Route path="/connections-requests" element={<ConnectionsRequests />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/member/:id" element={<MemberProfile />} />
      <Route path="/excel" element={<Excel />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}
export default AppRoutes;
