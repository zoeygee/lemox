import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Stack,
  Grid,
  MenuItem,
  Button,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik, FormikProvider, Form } from 'formik';
import { fCurrency, fPercent } from '../../utils/formatNumber';
import { getUserDetail, getSingleInvestment, getProperties, updateInvestment } from '../../redux/actions/data';

export default function UserInvestment() {
  const { ivid } = useParams();
  const dispatch = useDispatch();
  const [user] = useSearchParams();
  const userId = user.get('id');

  // fetch user investment
  useEffect(() => {
    dispatch(getSingleInvestment(ivid));
  }, []);

  // fetch all properties
  useEffect(() => {
    dispatch(getProperties());
  }, []);

  // fetch user detail
  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, []);
  const { properties, userDetail, investment } = useSelector((state) => state.data);
  console.log(properties, userDetail, investment);
  const [toastMsg, setToastMsg] = useState('');
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: investment?.property?.title || '',
      amount: investment?.amount || '',
      incrementAmount: investment?.incrementAmount || '',
      duration: '',
      topUpInterval: '',
      minimumReturn: '',
      minimumRoi: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      dispatch(updateInvestment(ivid, { ...values }, setSubmitting, setToastMsg));
    },
  });

  const { getFieldProps, handleSubmit, isSubmitting } = formik;
  const topUpInterval = [
    { type: 'Monthly', value: 30 },
    { type: 'Weekly', value: 7 },
    { type: 'Daily', value: 24 },
    { type: 'Hourly', value: 60 },
    { type: 'Every 30 Minutes', value: 30 },
  ];
  const duration = ['1 week', '2 week', '1 month'];
  const availableProperties = properties.filter((p) => p.status === 'available');

  return (
    <Container>
      <Box>
        <Typography variant="h4" mb={5} gutterBottom>
          Update investment plan for {userDetail?.firstName} {userDetail?.lastName}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item md={7} sm={12}>
          <Box>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <TextField fullWidth label="Plan name" {...getFieldProps('title')} helperText="" select>
                    {availableProperties.map((p) => (
                      <MenuItem key={p._id} value={p.title}>
                        {p.title}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Amount invested"
                    {...getFieldProps('amount')}
                    helperText="Total amount this user has invested"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Minimum price"
                    {...getFieldProps('incrementAmount')}
                    helperText="Total amount this user has earned"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Minimum ROI"
                    {...getFieldProps('minimumRoi')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Minimum return"
                    {...getFieldProps('minimumReturn')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <TextField fullWidth label="Top up interval" {...getFieldProps('topUpInterval')} select>
                    {topUpInterval.map((t) => (
                      <MenuItem key={t.value} value={t.type}>
                        {t.type}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Investment Duration"
                    {...getFieldProps('duration')}
                    helperText="This specifies how long the investment plan will run"
                    placeholder="eg 1 day, 2 weeks, 1 months"
                    select
                  >
                    {duration.map((d) => (
                      <MenuItem value={d}>{d}</MenuItem>
                    ))}
                  </TextField>

                  <LoadingButton type="submit" variant="contained" size="large" color="primary" loading={isSubmitting}>
                    Submit
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Grid>
        <Grid item md={5} sm={12}>
          <Card>
            <CardContent>
              {investment && (
                <Stack spacing={2}>
                  <Typography variant="h4">Current investment plan</Typography>
                  <Typography variant="body1">
                    Plan: <strong>{investment?.property?.title}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Amount invested: <strong>{fCurrency(investment?.amount)}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Earning: <strong>{fCurrency(investment?.incrementAmount)}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Return on investment (ROI): <strong>{fPercent(investment?.minimumRoi)}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Minimum return: <strong>{fCurrency(investment?.minimumReturn)}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Top up interval: <strong>{investment?.topUpInterval}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Duration: <strong>{investment?.duration}</strong>
                  </Typography>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
