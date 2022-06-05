import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// Layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import AdminLayout from '../layouts/admin';
import NotFound from '../pages/Page404';
import ExternalLayout from '../layouts/external';
import { Users } from '../pages/admin';
// Guards
import RoleBasedGuard from '../guards/RoleBasedGuard';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// Pages
import {
  TermsOfService,
  Contact,
  About,
  AccountDetails,
  AdminDashboardApp,
  DashboardApp,
  Faqs,
  ForgotPassword,
  Investment,
  LandingPage,
  Login,
  Marketplace,
  PasswordInstruction,
  PropertyDetail,
  Register,
  ResetPassword,
  Withdrawals,
  PendingVerification,
  SuccessVerification,
  UserDetail,
  AllWithdrawals,
  WithdrawalDetail,
  AllInvestments,
  IdVerification,
  SellToken,
  Referral,
  ReferPage,
  Checkout,
  PaymentCancelled,
} from '../pages';
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
        { path: '/contact', element: <Contact /> },
        { path: '/faqs', element: <Faqs /> },
        { path: '/terms-of-service', element: <TermsOfService /> },
        { path: '/referral', element: <ReferPage /> },
        { path: '/marketplace/:id/checkout/:charge', element: <Checkout /> },
        { path: '/marketplace/:id/checkout/:charge/cancelled', element: <PaymentCancelled /> },
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
        { path: 'withdrawal', element: <Withdrawals /> },
        { path: 'account-details', element: <AccountDetails /> },
        { path: 'id-verification', element: <IdVerification /> },
        { path: 'sell-token', element: <SellToken /> },
        { path: 'referral', element: <Referral /> },
        { path: 'id-verification/pending', element: <PendingVerification /> },
        { path: 'id-verification/success', element: <SuccessVerification /> },
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
        { path: 'users/:id', element: <UserDetail /> },
        { path: 'users/:id/identity/:identityId', element: <UserDetail /> },
        { path: 'withdrawals', element: <AllWithdrawals /> },
        { path: 'withdrawals/:id', element: <WithdrawalDetail /> },
        { path: 'investments/', element: <AllInvestments /> },
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
