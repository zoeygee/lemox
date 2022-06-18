import { useEffect } from 'react';
import _ from 'lodash';
import jwt from 'jwt-decode';
// @mui
import { Grid, Container, Typography, Link, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, endOfDay } from 'date-fns';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import { AppRecent, AppMiniCard } from '../sections/@dashboard/app';
import { getInvestments, getUpdatedInvestment, getSingleInvestment } from '../redux/actions/data';
import { PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const investmentId = '62acfa48aa84b578d96f7ce0';

  useEffect(() => {
    dispatch(getInvestments());
  }, [dispatch]);

  const { investments, isLoading, investment } = useSelector((state) => state.data);

  const investmentIds = investments.map((id) => id?._id).toString();
  console.log(investmentIds);
  // Populate investmentIds with all the current investment ID

  // Total investment
  const amountInvested = investments.reduce((e, i) => e + i?.amount, 0);

  const incrementDate = new Date(investment?.incrementedAt);
  const roi = (10 / 100) * amountInvested;
  const sevenDaysAfter = addDays(incrementDate, 7);
  const daysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const updatedAmount = roi + investment?.incrementAmount;
  const currentDate = endOfDay(new Date());
  console.log(currentDate);

  // increment config
  const dateToString = new Date().toISOString();
  const config = {
    incrementAmount: updatedAmount,
  };
  useEffect(() => {
    if (!isLoading) dispatch(getUpdatedInvestment(investmentIds, config));
  }, [isLoading]);

  setInterval(() => {
    if (sevenDaysAfter - incrementDate === daysInMilliseconds) {
      dispatch(getUpdatedInvestment(investmentId, config));
    }
  }, daysInMilliseconds);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4">Hi, Welcome back</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
          From your account dashboard you can view your{' '}
          <Link component={RouterLink} to={PATH_DASHBOARD.investment}>
            recent investments
          </Link>{' '}
          and edit your{' '}
          <Link component={RouterLink} to={PATH_DASHBOARD.accountDetails}>
            password and account details
          </Link>
          .
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppMiniCard title="Total investment" total={amountInvested} icon={'bxs:badge-dollar'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppMiniCard title="Earnings" total={investment?.incrementAmount} icon={'bxs:badge-dollar'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppMiniCard
              title="Available balance"
              total={amountInvested + investment?.incrementAmount}
              icon={'bxs:badge-dollar'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            {!investments.length || isLoading ? (
              <Stack sx={{ mt: 5 }}>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  You currently do not have an investment on this platform
                </Typography>
                <Button component={RouterLink} to={PATH_PAGE.marketplace}>
                  visit the marketplace
                </Button>
              </Stack>
            ) : (
              <AppRecent
                title="Recent investments"
                list={investments?.slice(0, 4).map((i, index) => ({
                  id: i?.charge?.id,
                  title: i?.amount,
                  description: i?.charge?.description,
                  image: i?.property?.images[0],
                  postedAt: i?.charge?.timeline?.at(-1)?.time,
                  key: index,
                }))}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
