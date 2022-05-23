// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'investment',
    path: '/dashboard/investment',
    icon: getIcon('fa6-solid:money-bill-trend-up'),
  },
  {
    title: 'withdrawal',
    path: '/dashboard/withdrawal',
    icon: getIcon('uil:money-withdraw'),
  },
  {
    title: 'Account details',
    path: '/dashboard/account-details',
    icon: getIcon('healthicons:ui-user-profile-outline'),
  },
];

export default navConfig;
