import {
  GET_COMPANIES_LIST,
  GET_PERSONAL_INFO,
  GET_TOKEN,
  GET_COMPANIES_LIST_ERROR,
  GET_PERSONAL_INFO_ERROR,
  GET_TOKEN_ERROR,
} from './types';

import axios from 'axios';
import qs from 'qs';

const auth_url = 'http://apptest.prospecterp.com/app_dev.php/api/auth/';
const companies_list_url =
  'http://apptest.prospecterp.com/app_dev.php/companies/list';
const personal_info_url =
  'http://apptest.prospecterp.com/app_dev.php/c/my-company/company/person/info/';
const dashboar_url =
  'http://apptest.prospecterp.com/app_dev.php/c/az/my-company/dashboard/dashboard/load';

// thunk actions
export const get_token = (email, password) => async dispatch => {
  try {
    const { data } = await axios.post(
      auth_url,
      qs.stringify({
        _email: email,
        _password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    data.status === 'success'
      ? dispatch(getToken(data.token))
      : dispatch(getTokenError(error));
  } catch (error) {
    dispatch(getTokenError(error.response.data));
  }
};

export const get_personal_info = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { data } = await axios.get(personal_info_url, {
      headers: {
        'X-AUTH-PROTOKEN': state.token,
      },
    });

    dispatch(getPersonalInfo(data));
  } catch (error) {
    dispatch(getPersonalInfoError(error.response.data));
  }
};

// actions
export const getToken = token => ({
  type: GET_TOKEN,
  payload: token,
});

const getTokenError = error => ({
  type: GET_TOKEN_ERROR,
  payload: false,
});

const getCompaniesList = data => ({
  type: GET_COMPANIES_LIST,
  payload: data,
});

const getCompaniesListError = error => ({
  type: GET_COMPANIES_LIST_ERROR,
  payload: error,
});

export const getPersonalInfo = data => ({
  type: GET_PERSONAL_INFO,
  payload: data,
});

const getPersonalInfoError = error => ({
  type: GET_PERSONAL_INFO_ERROR,
  payload: error,
});
