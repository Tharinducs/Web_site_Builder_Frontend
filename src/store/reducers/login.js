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
  loginLoadding:false,
  loginSuccess:false,
  loginError:null
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
      case LOGIN_LOADING:
        return {
          ...state,
          loginLoadding:true,
          loginSuccess:false,
          loginError:null
        }
      case LOGIN_SUCCESS:
        return{
          ...state,
          loginLoadding:false,
          loginSuccess:true,
          loginError:null
        }
      case LOGIN_FAILED:
        return {
          ...state,
          loginLoadding:false,
          loginSuccess:false,
          loginError:action.payload
        }
    default:
      return state;
  }
};

export default login;
