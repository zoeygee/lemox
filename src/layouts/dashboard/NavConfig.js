// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/user',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'investment',
    path: '/dashboard/investment',
    icon: getIcon('fluent:person-money-20-filled'),
  },
  {
    title: 'Sell token',
    path: '/dashboard/sell-token',
    icon: getIcon('ic:round-token'),
  },

  {
    title: 'withdrawal',
    path: '/dashboard/withdrawal',
    icon: getIcon('fa6-solid:money-check-dollar'),
  },
  { title: 'referral', path: '/dashboard/referral', icon: getIcon('nimbus:marketing') },
  {
    title: 'Account details',
    path: '/dashboard/account-details',
    icon: getIcon('fluent:person-16-filled'),
  },
  {
    title: 'ID Verification',
    path: '/dashboard/id-verification',
    icon: getIcon('bxs:id-card'),
  },
];

export default navConfig;
