import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Stack, Typography, TextField, InputAdornment, MenuItem, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useFormik, FormikProvider, Form } from 'formik';
import Page from '../components/Page';
import countries from '../sections/@dashboard/user/countries';
import { verifyUser } from '../redux/actions/data';

export default function IdVerification() {
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
  });
  const auth = JSON.parse(localStorage.getItem('profile'));
  const { user } = useSelector((state) => state.data);
  const [image, setImage] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      state: user.state,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      tel: user.tel,
      street: '',
      city: '',
      zipCode: '',
      idCountry: '',
      selfie: '',
      passport: '',
      driverLicense: '',
      otherId: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const { setSubmitting } = formik;
      //   dispatch(signup(values, navigate, setSubmitting, setToastMsg));
      const data = new FormData();
      data.append('file', values.passport);
      data.append('file', values.driverLicense);
      data.append('file', values.otherId);
      data.append('upload_preset', 'lemox-verification');
      data.append('cloud_name', 'codack');
      await axios
        .post('https://api.cloudinary.com/v1_1/codack/image/upload', data)
        .then((res) =>
          dispatch(verifyUser({ ...values, passport: res.data.secure_url }, navigate, setSubmitting, setToastMsg))
        )
        .catch((error) => console.log(error));
      console.log(values);
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;
  const selectedCountryCode = countries.find((c) => c.label === values.country);

  return (
    <Page title="Identity verification">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Identity verification
          </Typography>
        </Stack>
        <Stack spacing={1.5} mb={5}>
          <Typography variant="body1">Welcome to Lemox's ID Verification process!</Typography>
          <Typography variant="body1">
            Before you can receive tokens, we need to verify your identity. This is a requirement of U.S.
            "Know-Your-Customer/Anti-Money Laundering" regulations.
          </Typography>
          <Typography variant="body1">
            To ensure that your verification goes as smoothly as possible, please access this form from an IP address in
            your country of residence. Accessing this form from countries other than your country of residence, as with
            a VPN (virtual private network), may result in a need for manual review of your application.
          </Typography>
          <Typography variant="body1">Thank you!</Typography>
        </Stack>
        <Box maxWidth="500px">
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography variant="h5" mb={4}>
                Personal Details
              </Typography>

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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    autoComplete="email"
                    type="email"
                    label="Email address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    autoComplete="tel"
                    type="tel"
                    label="Phone number"
                    {...getFieldProps('tel')}
                    error={Boolean(touched.tel && errors.tel)}
                    helperText={touched.tel && errors.tel}
                  />
                </Stack>
              </Stack>
              <Typography variant="h5" my={4}>
                Billing Address
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label="COUNTRY"
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="STREET"
                    {...getFieldProps('Street')}
                    error={Boolean(touched.street && errors.street)}
                    helperText={touched.street && errors.street}
                  />
                  <TextField
                    fullWidth
                    label="CITY"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="STATE"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  <TextField
                    fullWidth
                    label="ZIP CODE/POSTAL CODE"
                    {...getFieldProps('zipCode')}
                    error={Boolean(touched.zipCode && errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                </Stack>
              </Stack>
              <Typography variant="h5" my={4}>
                Identification
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label="WHAT COUNTRY ISSUED YOUR ID?"
                  {...getFieldProps('idCountry')}
                  error={Boolean(touched.idCountry && errors.idCountry)}
                  helperText={touched.idCountry && errors.idCountry}
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
                <input
                  type="file"
                  name="passport"
                  id="passport"
                  onChange={(event) => {
                    setImage(event.currentTarget.files[0]);
                  }}
                />
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                </Stack> */}
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Submit for review
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </Page>
  );
}
