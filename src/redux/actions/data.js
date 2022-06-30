import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '../../routes/paths';
import * as api from '../api';
import * as actions from './actionTypes';

export const getProperties = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchProperties();
    dispatch({ type: actions.PROPERTIES, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const getProperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchProperty(id);
    dispatch({ type: actions.PROPERTY, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const createInvestment =
  (values, setSubmitting, setCharge, navigate, propertyId, resetForm) => async (dispatch) => {
    try {
      setSubmitting(true);
      const { data } = await api.createInvestment(values);
      dispatch({ type: actions.CREATE_INVESTMENT, payload: data });
      console.log(data);
      navigate(`/marketplace/${propertyId}/checkout/${data.code}`);
      setCharge(data);
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

export const getInvestments = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchInvestment();
    dispatch({ type: actions.GET_INVESTMENT, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const getSingleInvestment = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchSingleInvestment(id);
    dispatch({ type: actions.GET_SINGLE_INVESTMENT, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const updateInvestment = (id, values, setSubmitting, setToastMsg) => async (dispatch) => {
  try {
    setSubmitting(true);
    const { data } = await api.fetchUpdatedInvestment(id, values);
    dispatch({ type: actions.INCREMENT_INVESTMENT, payload: data });
    console.log(data);
    setSubmitting(false);
    setToastMsg(toast.success('Investment updated successfully', { duration: 5000 }));
  } catch (error) {
    console.log(error);
    setSubmitting(false);
    setToastMsg(toast.error('Network error, try again', { duration: 5000 }));
  }
};

export const getPaymentStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.retrievePaymentStatus(id);
    dispatch({ type: actions.RETRIEVE_PAYMENT, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const withdrawFunds = (values, setSubmitting, resetForm, setToastMsg) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.withdrawFunds(values);
    dispatch({ type: actions.WITHDRAW_FUNDS, payload: data });
    dispatch({ type: actions.END_LOADING });
    setSubmitting(false);
    resetForm();
    setToastMsg(toast.success('Withdrawal is pending', { duration: 7000 }));
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
    setSubmitting(false);
  }
};

export const getAllWithdrwals = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.getWithdrawals();
    dispatch({ type: actions.GET_WITHDRAWALS, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleWithdrawal = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.getSingleWithdrawal(id);
    dispatch({ type: actions.GET_WITHDRAWAL, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchUsers();
    dispatch({ type: actions.GET_USERS, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const editUser = (id, values) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, values);
    dispatch({ type: actions.UPDATE_USER, payload: data });

    toast.success('Success', { duration: 5000 });
  } catch (error) {
    console.log(error);

    toast.success('Error', { duration: 5000 });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchUser(id);
    dispatch({ type: actions.GET_USER, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};
export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchUser(id);
    dispatch({ type: actions.USER_DETAIL, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const getStaticInvestments = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchStaticInvestments();
    dispatch({ type: actions.STATIC_INVESTMENTS, payload: data });
    console.log(data);
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const getStaticWithdrawal = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchStaticWithdrawals();
    dispatch({ type: actions.STATIC_WITHDRAWALS, payload: data });
    console.log(data);
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};

export const verifyUser = (values, setSubmitting, navigate, setToastMsg) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.verifyUser(values);
    dispatch({ type: actions.VERIFY_USER, payload: data });
    console.log(data);
    dispatch({ type: actions.END_LOADING });
    setSubmitting(false);
    navigate(PATH_DASHBOARD.pendingVerification);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
    setToastMsg(toast.error(error?.response?.data?.msg));
    setSubmitting(false);
  }
};
export const getIdentity = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchIdentity(id);
    dispatch({ type: actions.GET_IDENTITY, payload: data });
    console.log(data);
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};
export const getIdentities = () => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchIdentities();
    dispatch({ type: actions.GET_IDENTITIES, payload: data });
    console.log(data);
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};
export const updateIdentities = (id, values, setCustomer) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.updateIdentities(id, values);
    dispatch({ type: actions.GET_IDENTITIES, payload: data });
    console.log(data);
    setCustomer('true');
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.END_LOADING });
  }
};
