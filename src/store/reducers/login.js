import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS
} from "../../_helpers/constant";

const initialValue = {
  registerLoadding: false,
  registerSuccess: null,
  registerErorr: null,
  loginLoadding:false,
  loginSuccess:false,
  loginError:null,
  changePasswordLoadding:false,
  changePasswordSuccess:false,
  changePasswordError:null
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
        case CHANGE_PASSWORD_LOADING:
          return {
            ...state,
            changePasswordLoadding:true,
            changePasswordSuccess:false,
            changePasswordError:null
          }
        case CHANGE_PASSWORD_SUCCESS:
          return{
            ...state,
            changePasswordLoadding:false,
            changePasswordSuccess:true,
            changePasswordError:null
          }
        case CHANGE_PASSWORD_FAILED:
          return {
            ...state,
            changePasswordLoadding:false,
            changePasswordSuccess:false,
            changePasswordError:action.payload
          }
    default:
      return state;
  }
};

export default login;
