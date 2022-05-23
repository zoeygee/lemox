import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// Layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import AdminLayout from '../layouts/admin';
// Pages
import Investment from '../pages/Investment';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';
import DashboardApp from '../pages/DashboardApp';
import LandingPage from '../pages/LandingPage';
import ExternalLayout from '../layouts/external';
import Marketplace from '../pages/Marketplace';
import Faqs from '../pages/Faqs';
import About from '../pages/About';
import PropertyDetail from '../pages/PropertyDetail';
import Deposit from '../pages/Deposit';
import Withdrawal from '../pages/Withdrawals';
import AccountDetails from '../pages/AccountDetails';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import PasswordInstruction from '../pages/PasswordInstruction';
import { AdminDashboardApp, Users } from '../pages/admin';
// Guards
import RoleBasedGuard from '../guards/RoleBasedGuard';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import { TermsOfService } from '../pages';
// ----------------------------------------------------------------------

export default function Router() {
  const adminRoles = ['admin'];
  const userRoles = ['investor'];
  return useRoutes([
    {
      path: '/',
      element: <ExternalLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/marketplace', element: <Marketplace /> },
        { path: '/marketplace/:id', element: <PropertyDetail /> },
        { path: '/about', element: <About /> },
        { path: '/faqs', element: <Faqs /> },
        { path: '/terms-of-service', element: <TermsOfService /> },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={userRoles}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/user" replace /> },
        { path: 'user', element: <DashboardApp /> },
        { path: 'investment', element: <Investment /> },
        { path: 'withdrawal', element: <Withdrawal /> },
        { path: 'account-details', element: <AccountDetails /> },
      ],
    },
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={adminRoles}>
            <AdminLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/admin/dashboard" replace /> },
        { path: 'dashboard', element: <AdminDashboardApp /> },
        { path: 'users', element: <Users /> },
      ],
    },
    {
      path: '/auth',
      element: (
        <GuestGuard>
          <Outlet />
        </GuestGuard>
      ),
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'reset-instruction', element: <PasswordInstruction /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
