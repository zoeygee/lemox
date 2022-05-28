import axios from 'axios';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_KEY });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchProperties = () => API.get('/properties');
export const fetchProperty = (id) => API.get(`/properties/${id}`);

export const signin = (values) => API.post('/auth/login', values);
export const register = (values) => API.post('/auth/register', values);
export const updateProfile = (id, values) => API.patch(`/auth/profile/${id}`, values);

export const createInvestment = (values) => API.post('/investment', values);
export const fetchInvestment = () => API.get('/investment');
export const fetchSingleInvestment = (id) => API.get(`/investment/${id}`);
export const fetchUpdatedInvestment = (id) => API.patch(`/investment/update-investment/${id}`);
export const retrievePaymentStatus = (id) => API.post('/investment/status', id);

export const withdrawFunds = (values) => API.post('/withdrawal', values);
export const getWithdrawals = () => API.get('/withdrawal');
export const getSingleWithdrawal = (id) => API.get(`/withdrawal/${id}`);

// API TO GET DETAILS FOR ADMIN DASHBOARD
export const fetchUsers = () => API.get('/users');
export const fetchUser = (id) => API.get(`/users/${id}`);
export const fetchStaticInvestments = () => API.get('/static/investments');

// API TO VERIFY INVESTORS
export const verifyUser = (values) => API.post('/identity', values);
export const fetchIdentity = (id) => API.get(`/identity${id}`);
export const fetchIdentities = () => API.get('/identity');
