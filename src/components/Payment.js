import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  InputAdornment,
} from '@mui/material';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { createInvestment } from '../redux/actions/data';
import { fCurrency } from '../utils/formatNumber';
import { PATH_DASHBOARD } from '../routes/paths';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

Payment.propType = {
  property: PropTypes.object,
  user: PropTypes.object,
};
export default function Payment({ property, user }) {
  // const { firstName, lastName, email, _id } = user;
  const [charge, setCharge] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const paymentSchema = Yup.object().shape({
    amount: Yup.number().min(100, 'must be above 100').required('amount to invest is required'),
    ethToken: Yup.string().required('Input your wallet to receive token'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      ethToken: '',
    },
    validationSchema: paymentSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const propertyId = property._id;
      dispatch(
        createInvestment(
          { ...values, property, title: property?.title },
          setSubmitting,
          setCharge,
          navigate,
          propertyId
        )
      );
      // return window.open(charge.hosted_url, '_blank', 'noopener,noreferrer');
      console.log(values);
      resetForm();
    },
  });
  const { handleSubmit, getFieldProps, setFieldValue, touched, errors, isSubmitting, values } = formik;
  console.log(user);

  return (
    <Box py={4}>
      {user.verified === 'false' || user.verified === 'pending' ? (
        <Stack spacing={2}>
          <Typography variant="body1">
            Before you can invest with us, you'll have to complete our ID verification process.
          </Typography>
          <Typography variant="body1">Would you like to do that now?</Typography>
          <Box maxWidth="290px">
            <Button
              contained
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={PATH_DASHBOARD.idVerification}
              size="large"
            >
              ID Verification
            </Button>
          </Box>
        </Stack>
      ) : (
        <>
          <Button variant="outlined" size="large" onClick={handleClickOpen}>
            Invest now
          </Button>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter amount to invest</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ mb: 2 }}>Enter amount you want to invest with</DialogContentText>
                  <Stack spacing={3}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Amount"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={values.amount}
                      onChange={(e) => setFieldValue('amount', e.target.value)}
                      {...getFieldProps('amount')}
                      error={Boolean(touched.amount && errors.amount)}
                      helperText={touched.amount && errors.amount}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                    <TextField
                      margin="dense"
                      label="Input your ETH wallet"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={values.amount}
                      onChange={(e) => setFieldValue('ethToken', e.target.value)}
                      {...getFieldProps('ethToken')}
                      error={Boolean(touched.ethToken && errors.ethToken)}
                      helperText={touched.ethToken && errors.ethToken}
                    />
                  </Stack>
                  <Typography variant="subtitle1" color="text.secondary">
                    your expected income = {fCurrency((values.amount * property?.financials?.expectedIncome) / 100)}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" onClick={handleSubmit}>
                    Invest
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          </FormikProvider>
        </>
      )}
    </Box>
  );
}
