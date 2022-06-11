import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { sentenceCase } from 'change-case';
import { Container, Typography, Card, CardContent, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import Page from '../components/Page';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import { getProperty, getUser } from '../redux/actions/data';
import { fCurrency } from '../utils/formatNumber';
import Label from '../components/Label';

export default function Checkout() {
  const { id, charge } = useParams();
  const [chargeData, setChargeData] = useState({});
  const auth = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProperty(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getUser(auth.result._id));
  }, [dispatch, auth.result._id]);
  const { property, user } = useSelector((state) => state.data);
  console.log(property);
  console.log(user);

  // fetch charge with charge code
  useEffect(() => {
    const fetchCharge = async (currentCharge) => {
      axios
        .get(`https://api.commerce.coinbase.com/charges/${currentCharge}`)
        .then((res) => {
          const { data } = res;
          setChargeData(data.data);
        })
        .catch((error) => console.log(error));
    };
    fetchCharge(charge);
  }, [charge]);

  return (
    <>
      {!chargeData ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <CheckoutComponent chargeData={chargeData} property={property} user={user} charge={charge} id={id} />
      )}
    </>
  );
}

CheckoutComponent.propTypes = {
  chargeData: PropTypes.object,
  property: PropTypes.object,
  user: PropTypes.object,
  charge: PropTypes.string,
  id: PropTypes.string,
};
function CheckoutComponent({ chargeData, property, user, charge, id }) {
  const navigate = useNavigate();
  const onClosed = () => {
    navigate(`/marketplace/${id}/checkout/${charge}/cancelled`, { replace: true });
  };
  const onSuccess = () => {
    navigate(`/marketplace/${id}/checkout/${charge}/success`, { replace: true });
  };
  return (
    <>
      <Page title="Checkout">
        <Container maxWidth="md">
          <div className="row">
            <div className="col-md-10 col-sm-12 mx-auto">
              <Card>
                <CardContent>
                  <div className="card-header">
                    {/* Invoice <strong>{fDate(chargeData?.data?.data?.created_at)}</strong> */}
                    <span className="float-right">
                      <strong>Status: </strong>
                      {/* <Label
                        variant="ghost"
                        color={
                          (statusProgress.status === 'NEW' && 'success') ||
                          (statusProgress.status === 'PENDING' && 'error') ||
                          (statusProgress.status === 'COMPLETED' && 'success')
                        }
                      >
                      
                      </Label> */}
                      <Label
                        variant="ghost"
                        color={(chargeData && chargeData?.timeline?.at(-1).status === 'NEW' && 'success') || 'error'}
                      >
                        {chargeData?.timeline?.at(-1).status && chargeData?.timeline?.at(-1).status}
                      </Label>
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="row mb-4">
                      <div className="col-sm-6">
                        <h6 className="mb-3">From:</h6>
                        <div>
                          <strong>Lemox</strong>
                        </div>
                        <Typography variant="body2">Email: info@lemox.co</Typography>
                        <Typography variant="body2">Phone: +48 444 666 3333</Typography>
                      </div>

                      <div className="col-sm-6">
                        <h6 className="mb-3">To:</h6>
                        <div>
                          <Typography variant="subtitle1">
                            {user.firstName && sentenceCase(user?.firstName)}{' '}
                            {user.lastName && sentenceCase(user?.lastName)}
                          </Typography>
                        </div>
                        <Typography variant="body2">Email: {user && user?.email}</Typography>
                        <Typography variant="body2">Phone: {user && user?.tel}</Typography>
                      </div>
                    </div>

                    <div className="table-responsive-sm">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="left">
                              <Typography variant="subtitle2">Property</Typography>
                            </th>

                            <th>
                              <Typography variant="subtitle2">Description</Typography>
                            </th>

                            <th className="right">
                              <Typography variant="subtitle2">Total</Typography>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="left strong">
                              <Typography variant="body2">{property.title}</Typography>
                            </td>
                            <td className="left">
                              <Typography variant="body2">
                                {_.truncate(property.about, { length: 85, omission: '...' })}
                              </Typography>
                            </td>
                            <td className="right">
                              <Typography variant="body2">
                                {chargeData?.pricing?.local?.amount && fCurrency(chargeData?.pricing?.local?.amount)}
                              </Typography>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-sm-5" />

                      <div className="col-lg-4 col-sm-5 ml-auto">
                        <table className="table table-clear">
                          <tbody>
                            {/* <tr>
                            <td className="left">
                              <strong>Subtotal</strong>
                            </td>
                            <td className="right">$8.497,00</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Discount (20%)</strong>
                            </td>
                            <td className="right">$1,699,40</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>VAT (10%)</strong>
                            </td>
                            <td className="right">$679,76</td>
                          </tr> */}
                            <tr>
                              <td className="left">
                                <strong>Total</strong>
                              </td>
                              <td className="center">
                                <strong>{fCurrency(chargeData?.pricing?.local?.amount)}</strong>
                              </td>
                              <td className="right">
                                {(chargeData?.timeline?.at(-1).status === 'CANCELED' && (
                                  <Typography variant="body1" color="text.error">
                                    YOU CANCELLED PAYMENT
                                  </Typography>
                                )) ||
                                  (chargeData?.timeline?.at(-1).status === 'NEW' && (
                                    <CoinbaseCommerceButton
                                      className="btn btn-secondary"
                                      chargeId={charge}
                                      onChargeSuccess={onSuccess}
                                      onModalClosed={onClosed}
                                    >
                                      Pay now
                                    </CoinbaseCommerceButton>
                                  )) ||
                                  (chargeData?.timeline?.at(-1).status === 'PENDING' && 'PAYMENT IS PENDING') ||
                                  (chargeData?.timeline?.at(-1).status === 'COMPLETED' && 'PAID')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Page>
    </>
  );
}
