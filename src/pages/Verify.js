import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Link, Stack, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import useResponsive from '../hooks/useResponsive';
import { MHidden } from '../components/@material-extend';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
export default function Verify() {
  const smUp = useResponsive('up', 'sm');

  return (
    <RootStyle title="Verify email">
      <HeaderStyle>
        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don’t have an account? {''}
            <Link variant="subtitle2" component={RouterLink} to="/auth/register">
              Get started
            </Link>
          </Typography>
        )}
      </HeaderStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 3 }}>
            <Stack>
              <Iconify icon="fluent:mail-alert-24-regular" height={80} width={80} />
            </Stack>
            <Typography variant="h3" gutterBottom>
              Check your email
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We have sent an email with a confirmation link to your email address. In order to complete the sign-up
              process, please click the confirmation link.
            </Typography>
          </Stack>
          <Stack sx={{ mb: 3 }}>
            <Typography variant="body1" color="text.secondary">
              If you haven't received our email in 15 minutes, please check your spam folder.
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Stack>
              <LoadingButton fullWidth size="large" component={RouterLink} to="/auth/login" variant="contained">
                Resend email verification
              </LoadingButton>
            </Stack>
          </Stack>

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/auth/register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
