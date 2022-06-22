import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';
// material
import { styled } from '@mui/material/styles';
//
// import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import { getUser } from '../../redux/actions/data';
import { PATH_AUTH } from '../../routes/paths';
import DashboardNavbar from '../dashboard/DashboardNavbar';
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

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(getUser(auth.result._id));
  }, [dispatch]);
  const { user } = useSelector((state) => state.data);

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
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} auth={auth} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
