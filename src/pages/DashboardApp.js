import { useEffect } from 'react';
import _ from 'lodash';
import jwt from 'jwt-decode';
// @mui
import { Grid, Container, Typography, Link, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addDays } from 'date-fns';
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
  const investmentId = '628d19ff2d27cee3aea0a4aa';

  useEffect(() => {
    dispatch(getSingleInvestment(investmentId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvestments());
  }, [dispatch]);

  const { investments, isLoading, investment } = useSelector((state) => state.data);
  const totalInvestment = 20;
  const amountInvested = 20;
  const incrementDate = new Date(investment?.incrementedAt);
  const roi = (10 / 100) * amountInvested;
  const sevenDaysAfter = addDays(incrementDate, 7);
  const daysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const updatedAmount = amountInvested + roi;

  // increment config
  const dateToString = new Date().toString();
  const config = {
    incrementAmount: updatedAmount,
    incrementedAt: dateToString,
  };
  // useEffect(() => {
  //   dispatch(getUpdatedInvestment(investmentId, config));
  // }, [dispatch]);

  setInterval(() => {
    if (sevenDaysAfter - incrementDate === daysInMilliseconds) {
      dispatch(getUpdatedInvestment(investmentId, config));
    }
  }, daysInMilliseconds);

  // actual investment is below
  // const totalInvestment = investments.reduce((e, i) => e + i?.amount, 0);

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
            <AppMiniCard title="Total investment" total={totalInvestment} icon={'bxs:badge-dollar'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppMiniCard title="Earnings" total={0.0} icon={'bxs:badge-dollar'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppMiniCard title="Available balance" total={0.0} icon={'bxs:badge-dollar'} />
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
                  title: i?.charge?.pricing?.local?.amount,
                  description: i?.charge?.description,
                  image: i?.property?.images[0],
                  postedAt: i?.charge?.timeline[0]?.time,
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
