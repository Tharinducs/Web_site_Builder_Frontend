import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../../_helpers/constant";

const initialValue = {
  registerLoadding: false,
  registerSuccess: null,
  registerErorr: null,
};

const login = (state = initialValue, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        registerLoadding: true,
        registerSuccess: null,
        registerErorr: null,
      };
    case REGISTER_SUCCESS:
        console.log(action,"payload")
      return {
        ...state,
        registerLoadding: false,
        registerSuccess: action.payload,
        registerErorr: null,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerLoadding: false,
        registerSuccess: null,
        registerErorr: action.payload,
      };
    default:
      return state;
  }
};

export default login;
