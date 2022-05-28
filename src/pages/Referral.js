import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
// material
import { Box, Grid, Stack, Button, Container, Typography, InputAdornment, OutlinedInput } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/Page';
import { getUsers } from '../redux/actions/data';
import { fCurrency } from '../utils/formatNumber';
import Iconify from '../components/Iconify';
import { AppReferral } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function Referral() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users, user } = useSelector((state) => state.data);

  const refLink = `lemox.co/referral?ref=${user.referralCode}`;
  const referredUsers = users.filter((u) => u.referredBy === user.referralCode);
  return (
    <Page title="Referral">
      <Container>
        <Stack mb={1.5}>
          <Typography variant="h4" gutterBottom>
            Grow your income stream
          </Typography>
        </Stack>
        <Stack mb={5}>
          <Typography variant="body1">
            When you invest in a Lemox property token, you’re building a tokenized real estate portfolio, the easiest
            way to invest in ownership of property in the world. But you also gain access to the Lemox Referral
            Program!
          </Typography>  
        </Stack>
        <Box mb={5}>
          <Stack spacing={2} maxWidth="sm">
            <Typography variant="subtitle1">Your unique referral link</Typography>
            <OutlinedInput
              fullWidth
              value={refLink}
              endAdornment={
                <InputAdornment position="end">
                  <CopyToClipboard
                    options={{ message: '' }}
                    text={refLink}
                    onCopy={() =>
                      toast((t) => (
                        <Typography variant="body2">
                          Copied to clipboard!
                          <Button onClick={() => toast.dismiss(t.id)}>Dismiss</Button>
                        </Typography>
                      ))
                    }
                  >
                    <Button>Copy</Button>
                  </CopyToClipboard>
                </InputAdornment>
              }
            />
          </Stack>
        </Box>
        <Grid container direction="row" spacing={3}>
          <Grid md={4} item>
            <AppReferral title="Signups" icon="gridicons:multiple-users" content={referredUsers.length} />
          </Grid>
          <Grid md={4} item>
            <AppReferral
              title="Amount earned"
              icon="bxs:dollar-circle"
              content={fCurrency(referredUsers.length * 50)}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
