// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  resetInstruction: path(ROOTS_AUTH, '/reset-instruction'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  about: '/about',
  marketplace: '/marketplace',
  termsOfService: '/terms-of-service',
  privatePlacementMemorandum: '/private-placement-memorandum-lemoxtoken',
  contact: '/contact',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  user: path(ROOTS_DASHBOARD, '/user'),
  investment: path(ROOTS_DASHBOARD, '/investment'),
  withdrawal: path(ROOTS_DASHBOARD, '/withdrawal'),
  accountDetails: path(ROOTS_DASHBOARD, '/account-details'),
  myTokens: path(ROOTS_DASHBOARD, '/my-tokens'),
  idVerification: path(ROOTS_DASHBOARD, '/id-verification'),
  pendingVerification: path(ROOTS_DASHBOARD, '/id-verification/pending'),
  successVerification: path(ROOTS_DASHBOARD, '/id-verification/success'),
};

export const PATH_ADMIN = {
  dashboard: path(ROOTS_ADMIN, '/dashboard'),
  users: path(ROOTS_ADMIN, '/users'),
  investments: path(ROOTS_ADMIN, '/investments'),
};
