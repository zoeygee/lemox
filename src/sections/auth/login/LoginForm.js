import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Toaster } from 'react-hot-toast';

// material
import { Link, Stack, Checkbox, TextField, FormControlLabel, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { signin } from '../../../redux/actions/auth';
import { PATH_AUTH, PATH_ADMIN, PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [errorHandler, setErrorHandler] = useState({ hasError: false, message: '' });
  // eslint-disable-next-line
  const [toastMsg, setToastMsg] = useState('');
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const auth = JSON.parse(localStorage.getItem('profile'));
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { setSubmitting } = formik;
      dispatch(signin(values, setErrorHandler, setSubmitting, setToastMsg, navigate));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack sx={{ paddingBottom: 3 }}>
        {errorHandler.hasError === false ? null : (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity="error">
              {/* eslint-disable-next-line */}
              <span dangerouslySetInnerHTML={{ __html: errorHandler.message }} />
            </Alert>
          </Stack>
        )}
      </Stack>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgotPassword}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
        <Toaster />
      </Form>
    </FormikProvider>
  );
}

export default LoginForm;
