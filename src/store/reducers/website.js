import {
  API_DOMAIN,
  CREATE_WEBSITE_FAILED,
  CREATE_WEBSITE_SUCCESS,
  CREATE_WEBSITE_LOADING,
  CREATE_DRAFT_LOADING,
  CREATE_DRAFT_SUCCESS,
  CREATE_DRAFT_FAILED,
  GET_DRFT_LOADING,
  GET_DRFT_FAILED,
  GET_DRFT_SUCCESS,
  UPLOAD_FILE_FAILED,
  UPLOAD_FILE_LOADING,
  UPLOAD_FILE_SUCCESS,
  GET_WEBSITES_LOADING,
  GET_WEBSITE_FAILED,
  GET_WEBSITES_FAILED,
  GET_WEBSITES_SUCCESS,
  GET_WEBSITE_SUCCESS,
  GET_WEBSITE_LOADING,
  UPDATE_WEBSITE_FAILED,
  UPDATE_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_LOADING
} from "../../_helpers/constant";

const initialValue = {
  draftLoading: false,
  draftSuccess: false,
  draftError: null,
  draftgetLoading: false,
  drft: null,
  drftGetError: null,
  files: null,
  fileUploadLoading: false,
  fileUploadError: null,
  createWebsiteLoading: false,
  createWebsiteError: null,
  createWebsiteSuccess: false,
  updateWebsiteLoading: false,
  updateWebsiteError: null,
  updateWebsiteSuccess: false,
  websiteLoading: false,
  websiteLoadingError: null,
  websites: [],
  website: null,
};

const website = (state = initialValue, action) => {
  switch (action.type) {
    case CREATE_DRAFT_LOADING:
      return {
        ...state,
        draftLoading: true,
        draftSuccess: false,
        draftError: null,
      };
    case CREATE_DRAFT_SUCCESS:
      return {
        ...state,
        draftLoading: false,
        draftSuccess: true,
        draftError: null,
      };
    case CREATE_DRAFT_FAILED:
      return {
        ...state,
        draftLoading: false,
        draftSuccess: false,
        draftError: action.payload,
      };
    case GET_DRFT_LOADING:
      return {
        ...state,
        draftgetLoading: true,
        drft: null,
        drftGetError: null,
      };
    case GET_DRFT_SUCCESS:
      return {
        ...state,
        draftgetLoading: false,
        drft: action.payload,
        drftGetError: null,
      };
    case GET_DRFT_FAILED:
      return {
        ...state,
        draftgetLoading: false,
        drft: null,
        drftGetError: action.payload,
      };
    case UPLOAD_FILE_LOADING:
      return {
        ...state,
        files: null,
        fileUploadLoading: true,
        fileUploadError: null,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        files: action.payload,
        fileUploadLoading: false,
        fileUploadError: null,
      };
    case UPLOAD_FILE_FAILED:
      return {
        ...state,
        files: null,
        fileUploadLoading: false,
        fileUploadError: action.payload,
      };
    case CREATE_WEBSITE_LOADING:
      return {
        ...state,
        createWebsiteLoading: true,
        createWebsiteError: null,
        createWebsiteSuccess: false,
      };
    case CREATE_WEBSITE_SUCCESS:
      return {
        ...state,
        createWebsiteLoading: false,
        createWebsiteError: null,
        createWebsiteSuccess: true,
      };
    case CREATE_WEBSITE_FAILED:
      return {
        ...state,
        createWebsiteLoading: false,
        createWebsiteError: action.payload,
        createWebsiteSuccess: false,
      };
      case UPDATE_WEBSITE_LOADING:
        return {
          ...state,
          updateWebsiteLoading: true,
          updateWebsiteError: null,
          updateWebsiteSuccess: false,
        };
      case UPDATE_WEBSITE_SUCCESS:
        return {
          ...state,
          updateWebsiteLoading: false,
          updateWebsiteError: null,
          updateWebsiteSuccess: true,
        };
      case UPDATE_WEBSITE_FAILED:
        return {
          ...state,
          updateWebsiteLoading: false,
          updateWebsiteError: action.payload,
          updateWebsiteSuccess: false,
        };
    case GET_WEBSITES_LOADING:
      return {
        ...state,
        websiteLoading: true,
        websiteLoadingError: null,
        websites: [],
      };
    case GET_WEBSITES_SUCCESS:
      return {
        ...state,
        websiteLoading: false,
        websiteLoadingError: null,
        websites: action.payload,
      };
    case GET_WEBSITES_FAILED:
      return {
        ...state,
        websiteLoading: false,
        websiteLoadingError: action.payload,
        websites: [],
      };
      case GET_WEBSITE_LOADING:
        return {
          ...state,
          websiteLoading: true,
          websiteLoadingError: null,
          website: null,
        };
      case GET_WEBSITE_SUCCESS:
        return {
          ...state,
          websiteLoading: false,
          websiteLoadingError: null,
          website: action.payload,
        };
      case GET_WEBSITE_FAILED:
        return {
          ...state,
          websiteLoading: false,
          websiteLoadingError: action.payload,
          website: null,
        };
    default:
      return state;
  }
};

export default website;
