import * as React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Stack,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from './Iconify';
import { fCurrency } from '../utils/formatNumber';
import { withdrawFunds } from '../redux/actions/data';

export default function WithdrawalForm() {
  const [open, setOpen] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const earning = 1000;
  const withdrawalSchema = Yup.object().shape({
    amount: Yup.number()
      .max(earning, `Your earning is ${fCurrency(earning)}`)
      .required('Please enter amount to withdraw'),
    btcWalletAddress: Yup.string().required('Enter your BTC wallet address'),
  });
  const formik = useFormik({
    initialValues: {
      amount: '',
      btcWalletAddress: '',
    },
    validationSchema: withdrawalSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(withdrawFunds(values, setSubmitting, resetForm, setToastMsg));
    },
  });

  const { handleSubmit, values, setFieldValue, getFieldProps, touched, errors, isSubmitting } = formik;

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Withdraw Funds
      </Button>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Dialog open={open} onClose={handleClose} maxWidth="sm">
            <DialogTitle>Withdraw funds</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter amount to withdraw</DialogContentText>
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
                  label="BTC Wallet Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.btcWalletAddress}
                  onChange={(e) => setFieldValue('btcWalletAddress', e.target.value)}
                  {...getFieldProps('btcWalletAddress')}
                  error={Boolean(touched.btcWalletAddress && errors.btcWalletAddress)}
                  helperText={touched.btcWalletAddress && errors.btcWalletAddress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="icons8:bitcoin" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton onClick={handleSubmit} loading={isSubmitting}>
                Submit
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Form>
      </FormikProvider>
    </div>
  );
}
