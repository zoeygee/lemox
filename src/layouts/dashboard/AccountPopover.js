import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
// components
import MenuPopover from '../../components/MenuPopover';
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    icon: 'eva:person-fill',
    linkTo: PATH_DASHBOARD.user,
  },
  {
    label: 'My investment',
    icon: 'eva:person-fill',
    linkTo: PATH_DASHBOARD.investment,
  },
  {
    label: 'Account details',
    icon: 'eva:settings-2-fill',
    linkTo: PATH_DASHBOARD.accountDetails,
  },
  {
    label: 'Marketplace',
    icon: 'eva:settings-2-fill',
    linkTo: PATH_PAGE.marketplace,
  },
];

// ----------------------------------------------------------------------
AccountPopover.propTypes = {
  auth: PropTypes.object,
};
export default function AccountPopover({ auth }) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate(PATH_AUTH.login);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={auth.profilePic} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {auth.firstName} {auth.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {auth.role === 'admin' ? (
          ''
        ) : (
          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
