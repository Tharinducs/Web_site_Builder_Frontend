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
  UPLOAD_COVER_LOADING,
  UPLOAD_COVER_SUCCESS,
  UPLOAD_COVER_FAILED,
  GET_WEBSITES_LOADING,
  GET_WEBSITE_FAILED,
  GET_WEBSITES_FAILED,
  GET_WEBSITES_SUCCESS,
  GET_WEBSITE_SUCCESS,
  GET_WEBSITE_LOADING,
  UPDATE_WEBSITE_FAILED,
  UPDATE_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_LOADING,
  CLEAR_UPDATE_DATA,
  SET_IMAGE_FILES,
  CLEAR_IMAGE_FILES,
  SET_COVER,
  CACHE_IMPORT_FAILED,
  CACHE_IMPORT_LOADING,
  CACHE_IMPORT_SUCCESS,
  CACHE_SITE_CREATE_FAILED,
  CACHE_SITE_CREATE_LOADING,
  CACHE_SITE_CREATE_SUCCESS,
  CLEAR_COVER,
} from "../../_helpers/constant";

const initialValue = {
  draftLoading: false,
  draftSuccess: false,
  draftError: null,
  draftgetLoading: false,
  drft: null,
  drftGetError: null,
  files: [],
  cover: null,
  fileUploadLoading: false,
  fileUploadError: null,
  coverUploadLoading: false,
  coverUploadError: null,
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
  cachesSiteData: null,
  cacheImportLoading: false,
  cacheImportError: null,
  cacheSiteCreationError: null,
  cacheSiteCreationLoading: false,
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
        files: [],
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
        files: [],
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
        files: [...action.old],
        fileUploadLoading: false,
        fileUploadError: action.payload,
      };
    case UPLOAD_COVER_LOADING:
      return {
        ...state,
        cover: null,
        coverUploadLoading: true,
        coverUploadError: null,
      };
    case UPLOAD_COVER_SUCCESS:
      return {
        ...state,
        cover: action.payload,
        coverUploadLoading: false,
        coverUploadError: null,
      };
    case UPLOAD_COVER_FAILED:
      return {
        ...state,
        cover: action.old,
        coverUploadLoading: false,
        coverUploadError: action.payload,
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
    case CLEAR_UPDATE_DATA:
      return {
        updateWebsiteLoading: false,
        updateWebsiteError: null,
        updateWebsiteSuccess: false,
        files: [],
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
    case SET_IMAGE_FILES:

      const prevU = state.files;
      const newU = action.payload
      const newFileS = [...prevU, ...newU]
      return {
        ...state,
        files: newFileS
      }
    case CACHE_IMPORT_LOADING:
      return {
        ...state,
        cachesSiteData: null,
        cacheImportLoading: true,
        cacheImportError: null,
      }
    case CACHE_IMPORT_SUCCESS:
      return {
        ...state,
        cachesSiteData: action.payload,
        cacheImportLoading: false,
        cacheImportError: null,
      }
    case CACHE_IMPORT_FAILED:
      return {
        ...state,
        cachesSiteData: null,
        cacheImportLoading: false,
        cacheImportError: action.payload,
      }
    case CACHE_SITE_CREATE_LOADING:
      return {
        ...state,
        cacheSiteCreationError: null,
        cacheSiteCreationLoading: true,
      }
    case CACHE_SITE_CREATE_SUCCESS:
      let allWebsites = state.websites
      allWebsites.push(action.payload)
      return {
        ...state,
        websites:allWebsites,
        cacheSiteCreationError: null,
        cacheSiteCreationLoading: false,
      }
    case CACHE_SITE_CREATE_FAILED:
      return {
        ...state,
        cacheSiteCreationError: action.payload,
        cacheSiteCreationLoading: false,
      }
    case SET_COVER:
      return {
        ...state,
        cover: action.payload,
      }
    case CLEAR_COVER:
      return {
        ...state,
        cover: null
      }
    case CLEAR_IMAGE_FILES:
      return {
        ...state,
        files: []
      }
    default:
      return state;
  }
};

export default website;
