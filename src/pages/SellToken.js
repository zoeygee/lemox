import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import Page from '../components/Page';

export default function SellToken() {
  return (
    <Page title="My Tokens">
      <Container>
        <Stack spacing={1.5} mb={5} maxWidth="sm">
          <Typography variant="h4">Sell Token</Typography>
          <Typography variant="body1">Lemox will buy back your Lemox token!</Typography>
          <Typography variant="body1">
            Token buyback will require LEMOX approval, kindly contact support, follow the prompt and your token will be
            bought back and you’ll be paid in BTC.{' '}
          </Typography>
          <Typography variant="body1">
            Ownership can also be transferred, contact support for the transfer of property ownership, you’ll be guided
            on the steps to follow.
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
