import Home from '@/pages/Home';
import AdminDashboard from '@/components/layout/AdminDashboard';
import AiMatching from '@/pages/AiMatching';
import MemberProfile from '@/pages/MemberProfile';
import ConnectionsRequests from '@/pages/ConnectionsRequests';
import UserProfile from '@/pages/UserProfile';
import Login from '@/pages/Login';
import { Routes, Route } from 'react-router-dom';
import Excel from '@/components/ui/Excel';

import LinkedinLogin from '@/pages/LinkedinLogin';
import ProtectedRoute from '@/components/ui/ProtectedRoute';

import Events from '@/pages/Events';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/linkedin-login" element={<LinkedinLogin />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-matching"
        element={
          <ProtectedRoute>
            <AiMatching />
          </ProtectedRoute>
        }
      />
      <Route
        path="/connections"
        element={
          <ProtectedRoute>
            <ConnectionsRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userprofile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/:id"
        element={
          <ProtectedRoute>
            <MemberProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/excel"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Excel />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/events" element={<Events />} /> */}
    </Routes>
  );
}

export default AppRoutes;
