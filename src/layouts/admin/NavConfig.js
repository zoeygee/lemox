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
    icon: getIcon('fluent:person-money-20-filled'),
  },
  {
    title: 'withdrawal',
    path: '/dashboard/withdrawal',
    icon: getIcon('fa6-solid:money-check-dollar'),
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: getIcon('fluent:database-person-20-filled'),
  },
];

export default navConfig;
