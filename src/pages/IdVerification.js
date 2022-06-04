import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Box,
  InputLabel,
  Select,
  IconButton,
} from '@mui/material';
import FileBase64 from 'react-file-base64';
import { LoadingButton } from '@mui/lab';
import { useFormik, FormikProvider, Form } from 'formik';
import Page from '../components/Page';
import countries from '../sections/@dashboard/user/countries';
import { verifyUser, getIdentities, editUser } from '../redux/actions/data';
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

export default function IdVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [toastMsg, setToastMsg] = useState('');
  React.useEffect(() => {
    dispatch(getIdentities());
  }, [dispatch]);

  const { identities, user } = useSelector((state) => state.data);

  const phoneRegEx =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    dateOfBirth: Yup.string().required('Your date of birth is required'),
    country: Yup.string().required('Please select a country'),
    tel: Yup.string()
      .matches(phoneRegEx, 'Phone number is invalid')
      .required('Phone number is required')
      .min(10, 'Phone number is invalid')
      .max(11, 'Phone number is invalid'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      country: user?.country,
      state: user?.state,
      dateOfBirth: user?.dateOfBirth,
      identityEmail: user?.email,
      tel: user?.tel,
      street: '',
      city: '',
      zipCode: '',
      idCountry: '',
      idType: '',
      selfie: '',
      idImage: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const { setSubmitting } = formik;
      dispatch(verifyUser(values, setSubmitting, navigate, setToastMsg));
    },
  });
  const thisUserIdentity = identities.find((i) => i.user === user._id);
  console.log(thisUserIdentity);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;
  const selectedCountryCode = countries.find((c) => c.label === values.country);

  // navigate to a pending route if user has already submitted identity details and it has not been set to true
  useEffect(() => {
    if (thisUserIdentity?.verified === 'false') {
      navigate(PATH_DASHBOARD.pendingVerification, { replace: true });
    } else if (thisUserIdentity?.verified === 'true') {
      navigate(PATH_DASHBOARD.successVerification, { replace: true });
    }
  }, []);
  return (
    <Container>
      <Page title="Identity verification">
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
        <Box maxWidth="sm">
          <Typography variant="h5" mb={4}>
            Personal Details
          </Typography>
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
                    autoComplete="mail"
                    type="email"
                    label="Email address"
                    {...getFieldProps('identityEmail')}
                    error={Boolean(touched.identityEmail && errors.identityEmail)}
                    helperText={touched.identityEmail && errors.identityEmail}
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
                      {...getFieldProps('street')}
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
                </Stack>
                <Typography variant="body1">Selfie</Typography>
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setFieldValue('selfie', base64)}
                  accept="image/png, image/gif, image/jpeg, image/webp, image/tiff"
                />
                <Stack spacing={1.5}>
                  <TextField
                    fullWidth
                    label="Select a form of ID"
                    {...getFieldProps('idType')}
                    error={Boolean(touched.idType && errors.idType)}
                    helperText={touched.idType && errors.idType}
                    select
                  >
                    <MenuItem value="Passport">Passport</MenuItem>
                    <MenuItem value="Driver's License">Driver's License</MenuItem>
                    <MenuItem value="Other ID">Other ID</MenuItem>
                  </TextField>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setFieldValue('idImage', base64)}
                    accept="image/png, image/gif, image/jpeg, image/webp, image/tiff"
                  />
                </Stack>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Submit for review
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Page>
    </Container>
  );
}
