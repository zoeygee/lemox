import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../redux/actions/auth';

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    password: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.data);
  const [toastMsg, setToastMsg] = useState('');
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      password: '',
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(editProfile(user?._id, { password: values.password }, setSubmitting, setToastMsg));
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3, maxWidth: '500px' }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />

            <TextField
              {...getFieldProps('password')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Change password
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
