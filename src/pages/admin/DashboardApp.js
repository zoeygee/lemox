import { useEffect } from 'react';
// @mui
import { Grid, Container, Typography, Link, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { AppRecent, AppMiniCard, AppMiniCardUsers } from '../../sections/@dashboard/app';
import { getStaticInvestments, getUsers } from '../../redux/actions/data';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function AdminDashboardApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStaticInvestments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const { users, staticInvestments, isLoading } = useSelector((state) => state.data);
  console.log(users);

  // const sumAllInvestment = () => investments.reduce((invest) => invest?.charge?.pricing?.local?.amount + 0, 0);
  console.log(staticInvestments);

  const totalInvestment = staticInvestments.reduce((e, i) => e + i?.amount, 0);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4">Hi Admin, Welcome back</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
          Admin dashboard.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppMiniCard title="Total investment" total={totalInvestment} icon={'bxl:bitcoin'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppMiniCardUsers title="Total users" total={users.length} icon={'bxl:bitcoin'} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppMiniCard title="Available balance" total={0} icon={'bxl:bitcoin'} />
          </Grid> */}
          <Grid item xs={12} md={6} lg={8}>
            {isLoading && <CircularProgress />}
            {!staticInvestments.length ? (
              <h4>There are no investment</h4>
            ) : (
              <AppRecent
                title="Recent investments"
                list={staticInvestments?.slice(0, 4).map((i, index) => ({
                  id: i?.charge?.id,
                  title: i?.charge?.pricing?.local?.amount,
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
