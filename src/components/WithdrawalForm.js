import * as React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function WithdrawalForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const withdrawalSchema = Yup.object().shape({
    amount: Yup.number().required('amount to withdraw is required'),
  });
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: withdrawalSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, values, setFieldValue, getFieldProps, touched, errors } = formik;

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Withdraw Funds
      </Button>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Withdraw funds</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter amount to withdraw</DialogContentText>
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton onClick={handleSubmit}>Submit</LoadingButton>
            </DialogActions>
          </Dialog>
        </Form>
      </FormikProvider>
    </div>
  );
}
