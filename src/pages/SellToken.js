import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import Page from '../components/Page';

export default function SellToken() {
  return (
    <Page title="My Tokens">
      <Container>
        <Stack spacing={1.5} mb={5}>
          <Typography variant="h4">Sell Token</Typography>
          <Typography variant="body2">Lemox will buy back your RealTokens!</Typography>
          <Typography variant="body2">
            Token buyback requires Lemox approval, and can take up to 10 business days. We appreciate your patience!
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
