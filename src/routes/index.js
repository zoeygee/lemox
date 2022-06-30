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
  PaymentSuccess,
  PrivatePlacement,
  Verify,
  CheckEmailVerification,
  UserInvestment,
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
        { path: '/private-placement-memorandum-lemoxtoken', element: <PrivatePlacement /> },
        { path: '/referral', element: <ReferPage /> },
        { path: '/marketplace/:id/checkout/:charge', element: <Checkout /> },
        { path: '/marketplace/:id/checkout/:charge/pending-charge', element: <PaymentCancelled /> },
        { path: '/marketplace/:id/checkout/:charge/success', element: <PaymentSuccess /> },
        { path: '404', element: <NotFound /> },
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
        { path: 'investments/:ivid', element: <UserInvestment /> },
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
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: 'reset-instruction', element: <PasswordInstruction /> },
        { path: 'check-email', element: <Verify /> },
        { path: 'verify/:token', element: <CheckEmailVerification /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Bro I noticed there’s not verification email and signup email.
// There’s meant to be an a verification email to verify your email address.
// Then another email for successful signup.

// There’s also meant to be emails for investment.
// Email to validate payment and payment complete.

// Should I list all the emails out for you?

// - Email verification email
// - signup successful email
// - investment complete email

// coinbase commerce api key 6a1cd34a-17bb-4e59-9e98-962513ff81c5

// Address
// 26, Boulevard Royal. Luxembourg 2449
