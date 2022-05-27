import toast from 'react-hot-toast';
import { AUTH, EDIT_PROFILE, FORGOT_PASSWORD } from './actionTypes';
import * as api from '../api';
import { PATH_DASHBOARD, PATH_ADMIN, PATH_PAGE } from '../../routes/paths';

const auth = JSON.parse(localStorage.getItem('profile'));
export const signin = (values, setErrorHandler, setSubmitting, setToastMsg) => async (dispatch) => {
  try {
    // sign the user in
    setSubmitting(true);
    const { data } = await api.signin(values);
    dispatch({ type: AUTH, data });
    setSubmitting(false);
  } catch (error) {
    console.log(error.response);
    setErrorHandler({ hasError: true, message: error?.response?.data?.msg });
    setSubmitting(false);
    setToastMsg(toast.error('Oops! something went wrong'));
  }
};
export const signup = (values, navigate, setSubmitting, setToastMsg) => async (dispatch) => {
  try {
    setSubmitting(true);
    const { data } = await api.register(values);
    dispatch({ type: AUTH, data });
    setSubmitting(false);
    navigate(PATH_PAGE.pendingVerification);
  } catch (error) {
    console.log(error);
    setSubmitting(false);
    setToastMsg(toast.error(error?.response?.data?.msg));
  }
};

// export const editProfile = (userId, profile, setSubmitting, setToastMsg) => async (dispatch) => {
//   try {
//     setSubmitting(true);
//     const { data } = await api.editProfile(userId, profile);
//     dispatch({ type: EDIT_PROFILE, data });
//     console.log(data);

//     setSubmitting(false);
//     setToastMsg(toast.success('Profile updated successfully'));
//   } catch (error) {
//     setSubmitting(false);
//     setToastMsg(toast.error(error?.response?.data?.msg));
//     console.log(error);
//   }
// };

// export const forgotPassword = (email, navigate, setSubmitting) => async (dispatch) => {
//   try {
//     const { data } = await api.forgotPassword(email);
//     dispatch({ type: FORGOT_PASSWORD, data });
//     navigate('/auth/login/forgot-password-reset');
//     setSubmitting(false);
//   } catch (error) {
//     console.log(error.response.data);
//     setSubmitting(false);
//   }
// };
