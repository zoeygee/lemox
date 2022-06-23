import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
  CircularProgress,
  FormHelperText,
  Link,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { createInvestment, getIdentities } from '../redux/actions/data';
import { fCurrency } from '../utils/formatNumber';
import { PATH_DASHBOARD } from '../routes/paths';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

Payment.propType = {
  property: PropTypes.object,
  user: PropTypes.object,
};
export default function Payment({ property, user }) {
  // const { firstName, lastName, email, _id } = user;
  useEffect(() => {
    dispatch(getIdentities());
  }, []);
  const [charge, setCharge] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { identities } = useSelector((state) => state.data);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const paymentSchema = Yup.object().shape({
    amount: Yup.number().min(1000, 'Minimum investment is $1,000').required('This field is required!'),
    ethToken: Yup.string().required('Please enter your BSC wallet address'),
  });
  const thisUserIdentity = identities.find((i) => i.user === user._id);

  const formik = useFormik({
    initialValues: {
      amount: '',
      ethToken: '',
    },
    validationSchema: paymentSchema,
    onSubmit: (values, { resetForm }) => {
      const propertyId = property._id;
      dispatch(
        createInvestment(
          { ...values, property, title: property?.title },
          setSubmitting,
          setCharge,
          navigate,
          propertyId,
          resetForm
        )
      );
    },
  });

  const { handleSubmit, getFieldProps, setFieldValue, touched, errors, isSubmitting, values } = formik;

  return (
    <Box py={4}>
      {thisUserIdentity?.verified === 'false' || thisUserIdentity?.verified === undefined ? (
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
              state={{ from: location }}
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
                  <Stack spacing={1.7}>
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
                    <FormHelperText>Min 10Tokens/investor - max 200 Token/investor</FormHelperText>
                    <TextField
                      margin="dense"
                      label="Input your BSC wallet address"
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
                    Number of token = {Math.round(values.amount / 100, -1)}
                  </Typography>

                  <DialogContentText sx={{ mt: 2 }}>
                    Don’t have an BSC wallet? Use *
                    <Link
                      component="a"
                      href="https://medium.com/@lemox/metamask-is-one-of-the-most-popular-crypto-wallet-where-you-can-manage-your-eth-and-erc-20-type-5a841986ef37"
                      target="_blank"
                    >
                      Metamask
                    </Link>
                    * or *
                    <Link
                      component="a"
                      href="https://medium.com/@lemox/how-to-create-and-receive-lemox-token-to-trust-wallet-2ca574b77e78"
                      target="_blank"
                    >
                      Trustwallet
                    </Link>
                    *
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <LoadingButton loading={submitting} type="submit" onClick={handleSubmit}>
                    Invest
                  </LoadingButton>
                </DialogActions>
              </Dialog>
            </Form>
          </FormikProvider>
        </>
      )}
    </Box>
  );
}
