import {
  GET_COMPANIES_LIST,
  GET_PERSONAL_INFO,
  GET_TOKEN,
  GET_COMPANIES_LIST_ERROR,
  GET_PERSONAL_INFO_ERROR,
  GET_TOKEN_ERROR,
  GET_DASHBOARD_INFO,
  GET_DASHBOARD_INFO_ERROR,
} from '../actions/types';

const initialState = {
  token: '',
  tokenError: false,
  personaInfo: null,
  personaInfoError: false,
  companies: null,
  companiesError: false,
  dashboard: null,
  dashboardError: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state, token: action.payload, tokenError: false };
    case GET_TOKEN_ERROR:
      return { ...state, tokenError: true };
    case GET_PERSONAL_INFO:
      return {
        ...state,
        personaInfoError: false,
        personaInfo: { ...action.payload },
      };
    case GET_PERSONAL_INFO_ERROR:
      return {
        ...state,
        personaInfoError: true,
        personaInfo: { ...action.payload },
      };
    case GET_COMPANIES_LIST:
      return {
        ...state,
        companies: [...action.payload],
        companiesError: false,
      };
    case GET_COMPANIES_LIST_ERROR:
      return { ...state, companiesError: action.payload, companies: [] };
    case GET_DASHBOARD_INFO:
      return {
        ...state,
        dashboard: { ...action.payload },
        dashboardError: false,
      };
    case GET_DASHBOARD_INFO_ERROR:
      return { ...state, dashboard: null, dashboardError: true };
    default:
      return state;
  }
};

export default rootReducer;
