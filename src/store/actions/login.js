import {
  API_DOMAIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../_helpers/constant";

import axios from "axios";

export const register = (value) => (dispatch) => {
  console.log(value, "value");
  registerLoadding(dispatch);
  axios
    .post(API_DOMAIN + "/api/user/register", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      console.log(data.data.msg,"data.data.msg",data.data)
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
      console.log(error.response.data.msg, "errr");
    });
};

const registerLoadding = (dispatch) => dispatch({ type: REGISTER_LOADING });
const registerSuccess = (dispatch, data) =>
  dispatch({ type: REGISTER_SUCCESS, payload:data });
const registerFailed = (dispatch, error) =>
  dispatch({ type: REGISTER_FAILED, payload:error });
