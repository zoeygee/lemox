import { useEffect } from 'react';
import _ from 'lodash';
import jwt from 'jwt-decode';
// @mui
import { Grid, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import { AppRecent, AppMiniCard } from '../sections/@dashboard/app';
import { getInvestments, getUpdatedInvestment, getSingleInvestment } from '../redux/actions/data';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const investmentId = '6296548a7871019c092d0825';
  useEffect(() => {
    dispatch(getUpdatedInvestment(investmentId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleInvestment(investmentId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvestments());
  }, [dispatch]);

  const { investments, isLoading, investment } = useSelector((state) => state.data);
  const totalInvestment = investments.reduce((e, i) => e + i?.amount, 0);

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
              <h4>Loading...</h4>
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
