import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { getProperties } from '../redux/actions/data';
import { fCurrency, fPercent } from '../utils/formatNumber';
import Page from '../components/Page';

export default function Marketplace() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const { properties, isLoading } = useSelector((state) => state.data);
  console.log(properties);
  return (
    <Page title="Marketplace">
      <section className="pt-6 pt-md-11 bg-dark">
        <div className="container-lg">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 text-center text-white">
              <h6 className="text-uppercase text-warning mb-5">Become the landlord of the future</h6>
              <h1 className="display-3 mb-4">Our Listings</h1>
              <p className="fs-lg">
                For the first time, investors around the globe can buy into the US real estate market through
                fully-compliant, fractional, tokenized ownership. Powered by blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-9 pt-md-11">
        <div className="container-lg">
          <div className="row" />
          <Grid container spacing={6} mb={7}>
            {isLoading && !properties.length
              ? new Array(4).fill(undefined).map((index) => (
                  <Box sx={{ display: 'flex' }} key={index}>
                    <Skeleton variant="rectangular" width={390} height={270} animation="pulse" />
                    <Box sx={{ marginLeft: 3 }}>
                      <Skeleton variant="text" animation="pulse" width={300} height={120} />
                      <Skeleton variant="text" animation="pulse" width={300} />
                      <Skeleton variant="text" animation="pulse" width={300} />
                      <Skeleton variant="text" animation="pulse" width={300} />
                      <Skeleton variant="text" animation="pulse" width={300} />
                    </Box>
                  </Box>
                ))
              : properties.map((property) => (
                  <Grid item md={12} key={property._id}>
                    <div className="card card-lg rounded-top-start rounded-bottom-end lift lift-lg">
                      <div className="row gx-0">
                        {property.status === 'sold' && (
                          <div className="sold-out-wrapper bg-cover rounded-top-start ">
                            <img
                              className="sold-out-img"
                              src="https://res.cloudinary.com/codack/image/upload/v1651967319/lemox/Sold-Out_hhcssc.png"
                              alt="..."
                            />
                          </div>
                        )}

                        <div
                          className="col-md-6 bg-cover rounded-top-start my-n2"
                          style={{
                            backgroundImage: `url(${property.images[0]})`,
                            backgroundPosition: 'center right',
                            opacity: property.status === 'sold' && 0.5,
                            // height: property.status === 'sold' && '100%',
                          }}
                        >
                          <img className="img-fluid invisible" src={property.images[0]} alt="..." />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h6 className="font-sans-serif text-muted mb-2">{property?.title}</h6>
                            <div className="d-flex mb-4 justify-content-between">
                              <h2>Total investment</h2>
                              <h2>
                                {property.status === 'available'
                                  ? fCurrency(property?.financials?.totalInvestment)
                                  : 'Not available'}
                              </h2>
                            </div>
                            <div className="d-flex mb-4 justify-content-between">
                              <h2>Token price</h2>
                              {property.status === 'available' ? (
                                <h2>{fCurrency(property.tokenPrice)}/token</h2>
                              ) : (
                                <h3>Not available</h3>
                              )}
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h4 className="text-primary">Expected Income</h4>
                                <p className="text-muted small">Not including capital appreciation</p>
                              </div>
                              <div className="ms-4 text-start">
                                <h4 className="text-primary">
                                  {property.status === 'available'
                                    ? fPercent(property?.financials?.expectedIncome)
                                    : 'Not available'}
                                </h4>
                              </div>
                            </div>
                            {property.status === 'available' && (
                              <Link className="stretched-link" to={`/marketplace/${property._id}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
          </Grid>
        </div>
      </section>
    </Page>
  );
}
