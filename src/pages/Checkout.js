import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Stack } from '@mui/material';
import Page from '../components/Page';

export default function Checkout() {
  return (
    <Page title="Checkout">
      <Container>
        <Typography variant="h3">Checkout</Typography>
      </Container>
    </Page>
  );
}
