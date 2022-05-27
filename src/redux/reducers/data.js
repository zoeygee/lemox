import * as actions from '../actions/actionTypes';

export default (
  state = {
    isLoading: true,
    properties: [],
    property: {},
    investments: [],
    investment: {},
    paymentStatus: {},
    withdrawal: {},
    withdrawals: [],
    users: [],
    user: {},
    staticInvestments: [],
    identities: [],
    identity: {},
  },
  action
) => {
  switch (action.type) {
    case actions.START_LOADING:
      return { ...state, isLoading: true };
    case actions.END_LOADING:
      return { ...state, isLoading: false };
    case actions.PROPERTIES:
      return { ...state, properties: action.payload };
    case actions.PROPERTY:
      return { ...state, property: action.payload };
    case actions.CREATE_INVESTMENT:
      return { ...state, investments: [...state.investments, action.payload] };
    case actions.GET_INVESTMENT:
      return { ...state, investments: action.payload };
    case actions.INCREMENT_INVESTMENT:
      return {
        ...state,
        investments: state.investments.map((investment) =>
          investment._id === action.payload._id ? action.payload : investment
        ),
      };
    case actions.GET_SINGLE_INVESTMENT:
      return { ...state, investment: action.payload };
    case actions.RETRIEVE_PAYMENT:
      return { ...state, paymentStatus: [...state.paymentStatus, action.payload] };
    case actions.GET_WITHDRAWAL:
      return { ...state, withdrawal: action.payload };
    case actions.GET_WITHDRAWALS:
      return { ...state, withdrawals: action.payload };
    case actions.WITHDRAW_FUNDS:
      return { ...state, withdrawals: [...state.withdrawals, action.payload] };
    case actions.GET_USERS:
      return { ...state, users: action.payload };
    case actions.GET_USER:
      return { ...state, user: action.payload };
    case actions.UPDATE_USER:
      return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };
    case actions.STATIC_INVESTMENTS:
      return { ...state, staticInvestments: action.payload };
    case actions.GET_IDENTITIES:
      return { ...state, identities: action.payload };
    case actions.GET_IDENTITY:
      return { ...state, identity: action.payload };
    case actions.VERIFY_USER:
      return { ...state, identities: [...state.identities, action.payload] };
    default:
      return state;
  }
};
