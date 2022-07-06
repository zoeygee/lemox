import { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import FileBase64 from 'react-file-base64';
import styled from 'styled-components';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Avatar,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { fData } from '../utils/formatNumber';
import { countries } from '../sections/@dashboard/user';
import { getUser } from '../redux/actions/data';
import { editProfile } from '../redux/actions/auth';
//

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('required'),
    lastName: Yup.string().required('required'),
    email: Yup.string().required('required'),
    country: Yup.string().required('required'),
    state: Yup.string().required('required'),
    dateOfBirth: Yup.string().required('required'),
  });
  const { _id } = JSON.parse(localStorage.getItem('profile')).result;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(_id));
  }, [dispatch]);
  const { user } = useSelector((state) => state.data);
  const [toastMsg, setToastMsg] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      country: user.country || '',
      state: user.state || '',
      email: user.email || '',
      profilePic: user.profilePic,
      tel: user.tel || '',
      dateOfBirth: user.dateOfBirth || '',
    },

    validationSchema: UpdateUserSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      dispatch(editProfile(user?._id, values, setSubmitting, setToastMsg));
    },
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;
  

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Box role="button" tabIndex="0" className="profilePic">
                <Avatar className="avatar" alt="thumb" size={50} src={user.profilePic}>
                  <Box
                    component={FileBase64}
                    multiple={false}
                    onDone={({ base64 }) => setFieldValue('profilePic', base64)}
                    type=""
                    accept="image/*"
                    className="upload"
                  />
                </Avatar>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
              {/* <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                
                }
              /> */}
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>{' '}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="First name" {...getFieldProps('firstName')} />
                  <TextField fullWidth label="Last name" {...getFieldProps('lastName')} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Phone Number" {...getFieldProps('tel')} />
                  <TextField fullWidth label="Email Address" {...getFieldProps('email')} disabled />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.label} />
                    ))}
                  </TextField>
                  <TextField fullWidth label="State/Region" {...getFieldProps('state')} />
                </Stack>
                <TextField {...getFieldProps('dateOfBirth')} fullWidth label="Date of birth" />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

const Wrapper = styled.div`
  .profilePic {
    width: 144px;
    height: 144px;
    margin: auto;
    border-radius: 50%;
    padding: 8px;
    border: 1px dashed rgb(7 90 255 / 32%);
    .avatar {
      width: 100%;
      height: 100%;
      .upload {
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 99999;
      }
    }
  }
`;
