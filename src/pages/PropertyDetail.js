import React, { useEffect, memo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Skeleton,
  Grid,
  Typography,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getProperty, getUser } from '../redux/actions/data';
import { fCurrency, fPercent, fNumber } from '../utils/formatNumber';
import Payment from '../components/Payment';
import Page from '../components/Page';
import { PATH_AUTH } from '../routes/paths';
import PropertyCarousel from '../components/Carousel';

function PropertyDetail() {
  const auth = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProperty(id));
  }, [dispatch]);
  useEffect(() => {
    if (auth) {
      dispatch(getUser(auth.result._id));
    }
  }, [dispatch]);

  const { property, isLoading, user } = useSelector((state) => state.data);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const SkeletonLoad = (
    <Container sx={{ py: 7 }} maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={7}>
          <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" height={240} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      {!property.images ? (
        SkeletonLoad
      ) : (
        <Page title={property?.title}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ py: 2 }}>
              {property?.title}
            </Typography>
            <HeroWrapper>
              <Grid
                container
                spacing={4}
                sx={{ alignContent: 'baseline', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Grid item sm="12" md="7">
                  <PropertyCarousel images={property?.images} />
                </Grid>
                <Grid item sm="12" md="5">
                  <Typography variant="h3">
                    Total Investment: {fCurrency(property?.financials?.totalInvestment)}
                  </Typography>
                  {!auth ? (
                    <Box sx={{ p: 4 }}>
                      <Button variant="outlined" component={RouterLink} to={PATH_AUTH.login}>
                        REGISTER/SIGNIN
                      </Button>
                      <Typography variant="subtitle2" py={2}>
                        REGISTER AND SIGN IN TO START BUILDING YOUR PORTFOLIO!
                      </Typography>
                    </Box>
                  ) : (
                    <Payment property={property} user={user} />
                  )}
                </Grid>
              </Grid>
            </HeroWrapper>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="property">
                  <Tab label="Highlights" value="1" />
                  <Tab label="Financials" value="2" />
                  <Tab label="Details" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container direction="row" spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Expected Income</TableCell>
                            <TableCell>{fPercent(property?.financials?.expectedIncome)}</TableCell>
                            {/* <Typography variant="caption" color="text.secondary">
                            Not including capital appreciation
                          </Typography> */}
                          </TableRow>
                          <TableRow>
                            <TableCell>Rent Start Date</TableCell>
                            <TableCell>{property?.rentStartDate}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Token Price</TableCell>
                            <TableCell>{fCurrency(property?.tokenPrice)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Total Tokens</TableCell>
                            <TableCell>{fNumber(property?.totalTokens)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Property Type</TableCell>
                            <TableCell>{property?.propertyType}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Neighborhood</TableCell>
                            <TableCell>{property?.neighborhood}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Construction Year</TableCell>
                            <TableCell>{property?.constructionYear}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Total Units</TableCell>
                            <TableCell>{property?.totalUnits}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Bedroom</TableCell>
                            <TableCell>{property?.bedroom}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Rental Type</TableCell>
                            <TableCell>{property?.rentalType}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Rented</TableCell>
                            <TableCell>{property?.rented}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Gross Rent / year</TableCell>
                        <TableCell>{fCurrency(property?.financials?.yearlyGrossRent)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gross Rent / month</TableCell>
                        <TableCell>{fCurrency(property?.financials?.monthlyGrossRent)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Yearly Rent / month</TableCell>
                        <TableCell>{fCurrency(property?.financials?.yearlyNetRent)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Net Rent / month</TableCell>
                        <TableCell>{fCurrency(property?.financials?.monthlyNetRent)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <h3 style={{ fontFamily: 'DM Sans' }}>Net Rent / year</h3>
                        </TableCell>
                        <TableCell>
                          <h3 style={{ fontFamily: 'DM Sans' }}>{fCurrency(property?.financials?.yearlyNetRent)}</h3>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <h3 style={{ fontFamily: 'DM Sans' }}>Total investment</h3>
                        </TableCell>
                        <TableCell>
                          <h3 style={{ fontFamily: 'DM Sans' }}>{fCurrency(property?.financials?.totalInvestment)}</h3>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <h3 style={{ fontFamily: 'DM Sans' }}>Expected income</h3>
                        </TableCell>
                        <TableCell>
                          <h3 style={{ fontFamily: 'DM Sans' }}>{fPercent(property?.financials?.expectedIncome)}</h3>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value="3">
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Lot size (sqft)</TableCell>
                        <TableCell>{fNumber(property?.details?.lotSize)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Construction Type</TableCell>
                        <TableCell>{property?.details?.constructionType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Foundation</TableCell>
                        <TableCell>{property?.details?.foundation}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Roof Type</TableCell>
                        <TableCell>{property?.details?.roofType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Parking</TableCell>
                        <TableCell>{property?.details?.parking}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabContext>
            <Box py={4}>
              <Typography variant="h5" py={2}>
                About the Property
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {property?.about}
              </Typography>
            </Box>
          </Container>
        </Page>
      )}
    </>
  );
}

export default memo(PropertyDetail);

const HeroWrapper = styled.div`
  @media (max-width: 500) {
    padding-bottom: 80px;
  }
  @media (min-width: 900px) {
    padding-bottom: 130px;
  }
`;
