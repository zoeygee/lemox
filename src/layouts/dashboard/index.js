import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const auth = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const { token } = auth;
    // JWT check if token expired
    if (token) {
      const decodedToken = jwt(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.clear();
        navigate(PATH_AUTH.login);
      }
    }
  }, [navigate]);
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} auth={auth} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} auth={auth} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
