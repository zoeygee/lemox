import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { PATH_DASHBOARD } from '../routes/paths';
import { getUser } from '../redux/actions/data';

export default function PendingVerification() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUser(auth.result._id));
  }, [dispatch]);
  const { user } = useSelector((state) => state.data);

  // if (user.verified === 'true') return navigate(PATH_DASHBOARD.root);
  return (
    <Page title="Pending verification">
      <Container sx={{ py: 16 }} maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Iconify icon="ic:baseline-pending-actions" sx={{ height: 80, width: 80, mb: 1.7 }} />
          <Typography variant="h4">Your identity is currently pending verification!</Typography>
          <Typography variant="body1">
            You'll receive an email when your identity document has been processed.
          </Typography>

          <Typography variant="body1">Thank you!</Typography>
        </Box>
      </Container>
    </Page>
  );
}
