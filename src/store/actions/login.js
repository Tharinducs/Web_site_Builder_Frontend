import {
  API_URL,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../_helpers/constant";

import axios from "axios";

export const getToken = async (refreshToken, email) => {
  const response = await axios.post(`${API_URL}/user/refreshtoken`, {
    refreshToken: refreshToken,
    email: email,
  });
  return response.data;
};

export const register = (value) => (dispatch) => {
  registerLoadding(dispatch);
  axios
    .post(API_URL + "/user/register", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      registerSuccess(dispatch, data.data.msg);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        registerFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        registerFailed(dispatch, "Something went wrong");
      }
    });
};

const registerLoadding = (dispatch) => dispatch({ type: REGISTER_LOADING });
const registerSuccess = (dispatch, data) =>
  dispatch({ type: REGISTER_SUCCESS, payload: data });
const registerFailed = (dispatch, error) =>
  dispatch({ type: REGISTER_FAILED, payload: error });

export const login = (value) => (dispatch) => {
  loginLoadding(dispatch);
  axios
    .post(API_URL + "/user/login", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      localStorage.setItem("loginToken", JSON.stringify(data.data));
      axios.defaults.headers.common.Authorization =
        "Bearer " + data.data.accesstoken;
      loginSuccess(dispatch, data.data);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        loginFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        loginFailed(dispatch, "Something went wrong");
      }
    });
};

const loginLoadding = (dispatch) => dispatch({ type: LOGIN_LOADING });
const loginSuccess = (dispatch, data) =>
  dispatch({ type: LOGIN_SUCCESS, payload: data });
const loginFailed = (dispatch, error) =>
  dispatch({ type: LOGIN_FAILED, payload: error });
