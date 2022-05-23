import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
// material
import { styled } from '@mui/material/styles';
import { Link, Stack, TextField, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// layouts
// components
import Page from '../components/Page';
import useResponsive from '../hooks/useResponsive';
import { MHidden } from '../components/@material-extend';
import { PATH_AUTH } from '../routes/paths';
import Logo from '../components/Logo';

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

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address!').required('Email is required'),
  });
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      const { setSubmitting } = formik;
      const { email } = values;
      // dispatch(forgotPassword(email, navigate, setSubmitting));
      console.log(values);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle title="Forgot password">
      <HeaderStyle>
        <Logo />
        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don’t have an account?
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              Get started
            </Link>
          </Typography>
        )}
      </HeaderStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Forgot password?
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Fear not. We'll email you instructions to reset your password.
            </Typography>
          </Stack>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
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
                </Stack>
                <Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Reset password
                  </LoadingButton>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                  <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.login}>
                    Back to login
                  </Link>
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
