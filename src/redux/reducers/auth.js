import { AUTH, LOGOUT, EDIT_PROFILE, FORGOT_PASSWORD, AUTH_ERROR } from '../actions/actionTypes';

export default (state = { error: null, authData: [], propertiesById: [] }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, error: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case EDIT_PROFILE:
      // localStorage.setItem('profile', JSON.stringify({ result: { ...action?.data } }));
      return {
        ...state,
        authData: state.authData.map((auth) => (auth._id === action?.payload?.data?._id ? action?.data : auth)),
        error: null,   
      };
    // return { ...state,  };
    case AUTH_ERROR:
      return { ...state, error: action.payload };

    case FORGOT_PASSWORD:
      return { ...state, email: action.data };
    default:
      return state;
  }
};
