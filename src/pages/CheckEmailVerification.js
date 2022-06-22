import { Link as RouterLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// material
import { styled } from '@mui/material/styles';
import { Link, Stack, Container, Typography, CircularProgress, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../components/Iconify';
import useResponsive from '../hooks/useResponsive';
import { MHidden } from '../components/@material-extend';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
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
export default function CheckEmailVerification() {
  const smUp = useResponsive('up', 'sm');
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      await axios
        .patch(`${process.env.REACT_APP_API_KEY}/auth/verify-email/${token}`)
        .then((res) => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };
    checkToken();
  }, []);

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          {success && (
            <>
              <Stack sx={{ mb: 3, alignItems: 'center', textAlign: 'center', color: 'text.primary' }}>
                <Stack>
                  <Iconify icon="clarity:success-standard-line" height={80} width={80} sx={{ color: 'success.main' }} />
                </Stack>
                <Typography variant="h3" gutterBottom>
                  Email verified successfully
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We have successfully verified your email address.
                  <br /> You can now login to your Lemox dashboard.
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Stack>
                  <LoadingButton fullWidth size="large" component={RouterLink} to="/auth/login" variant="contained">
                    Login
                  </LoadingButton>
                </Stack>
              </Stack>
            </>
          )}
          {isLoading && (
            <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Stack>
              <Typography variant="h3" gutterBottom color="warning.main">
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1">An error has occurred, we could not complete your action.</Typography>
              <Typography variant="body1">Refresh this page and contact us if the problem persists</Typography>
            </Stack>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
