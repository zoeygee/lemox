import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, FormikProvider, Form } from 'formik';
import { Typography, Stack, Container, Link, TextField, InputAdornment, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Page from '../components/Page';
import useResponsive from '../hooks/useResponsive';
import { MHidden } from '../components/@material-extend';
import Logo from '../components/Logo';
import { PATH_AUTH } from '../routes/paths';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const params = useParams();
  const passwordSchema = Yup.string().required('password is required');
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validateSchema: passwordSchema,
    onSubmit: async (values) => {
      const { password } = values;
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const { data } = await axios.put(`http://localhost:4000/reset-password/${params.token}`, password, config);
        setSuccess(data);
      } catch (error) {
        setError(error.response.data);
      }
    },
  });
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const { handleSubmit, isSubmitting, errors, getFieldProps, touched } = formik;
  return (
    <RootStyle title="Password reset">
      <div>{error ? 'error' : ''}</div>
      <div>{success ? 'success' : ''}</div>
      <HeaderStyle>
        <Logo />
        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don’t have an account? {''}
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              Get started
            </Link>
          </Typography>
        )}
      </HeaderStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 2 }}>MailIcon</Stack>

          <Stack sx={{ mb: 3 }}>
            <Typography variant="h3" gutterBottom>
              Reset Your Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Almost done. Enter your new password, and you're good to go.
            </Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="New password"
                  {...getFieldProps('password')}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton onClick={handleShowPassword} edge="end">
                  //         <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Stack>
                  <LoadingButton fullWidth size="large" loading={isSubmitting} type="submit" variant="contained">
                    Reset Password
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
