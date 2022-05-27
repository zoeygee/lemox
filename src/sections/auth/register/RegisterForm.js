import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, MenuItem, Select, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { signup } from '../../../redux/actions/auth';
import countries from '../../@dashboard/user/countries';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [toastMsg, setToastMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const phoneRegEx =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    dateOfBirth: Yup.string().required('Your date of birth is required'),
    country: Yup.string().required('Please select a country'),
    tel: Yup.string()
      .matches(phoneRegEx, 'Phone number is invalid')
      .required('Phone number is required')
      .min(10, 'Phone number is invalid')
      .max(11, 'Phone number is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      state: '',
      dateOfBirth: '',
      email: '',
      tel: '',
      password: '',
      role: 'investor',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const { setSubmitting } = formik;
      dispatch(signup(values, navigate, setSubmitting, setToastMsg));
      console.log(values);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;
  const selectedCountryCode = countries.find((c) => c.label === values.country);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="date"
              label="Date of birth"
              type="date"
              fullWidth
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              {...getFieldProps('dateOfBirth')}
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
            />
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Country"
              {...getFieldProps('country')}
              error={Boolean(touched.country && errors.country)}
              helperText={touched.country && errors.country}
              fullWidth
              leblId="country"
              id="select"
              select
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.label}>
                  {country.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="State"
              {...getFieldProps('state')}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="tel"
            type="tel"
            label="Phone number"
            {...getFieldProps('tel')}
            error={Boolean(touched.tel && errors.tel)}
            helperText={touched.tel && errors.tel}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {selectedCountryCode === undefined ? null : `+${selectedCountryCode?.phone}`}
                </InputAdornment>
              ),
            }}
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
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
          <Toaster />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
// *Signup*
// First name
// Last name
// Date of birth
// State
// Country
// Phone number
// Email address
// Password

// *Deposit*
// Amount and ETH wallet address to receive token
// Then I’ll Leave a link of how to create an ETH wallet
