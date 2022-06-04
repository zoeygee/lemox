import React from 'react';
import { Typography, Container, Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { PATH_DASHBOARD } from '../routes/paths';

export default function SuccessVerification() {
  return (
    <Page title="Pending verification">
      <Container sx={{ py: 16 }} maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Iconify icon="con-park:message-success" sx={{ height: 80, width: 80, mb: 1.7 }} />
          <Typography variant="h4">We have successfully verified your identity!</Typography>

          <Link component={RouterLink} to={PATH_DASHBOARD.user}>
            Return to dashboard
          </Link>
        </Box>
      </Container>
    </Page>
  );
}
