import {
  API_URL,
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
  UPLOAD_FILE_LOADING,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
  UPLOAD_COVER_LOADING,
  UPLOAD_COVER_SUCCESS,
  UPLOAD_COVER_FAILED,
  GET_WEBSITES_LOADING,
  GET_WEBSITE_FAILED,
  GET_WEBSITE_SUCCESS,
  GET_WEBSITE_LOADING,
  GET_WEBSITES_SUCCESS,
  GET_WEBSITES_FAILED,
  UPDATE_WEBSITE_FAILED,
  UPDATE_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_LOADING,
  CLEAR_UPDATE_DATA,
  SET_IMAGE_FILES,
  CLEAR_IMAGE_FILES,
  CACHE_IMPORT_FAILED,
  CACHE_IMPORT_LOADING,
  CACHE_IMPORT_SUCCESS,
  CACHE_SITE_CREATE_FAILED,
  CACHE_SITE_CREATE_LOADING,
  CACHE_SITE_CREATE_SUCCESS,
  SET_COVER,
  CLEAR_COVER,
} from "../../_helpers/constant";

import axios from "axios";

export const createDraft = (value) => (dispatch) => {
  createDraftLoadding(dispatch);
  axios
    .post(API_URL + "/website/createdraft", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      createDraftSuccess(dispatch, data.data.msg);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        createDraftFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        createDraftFailed(dispatch, "Something went wrong");
      }
    });
};

const createDraftLoadding = (dispatch) => dispatch({ type: CREATE_DRAFT_LOADING });
const createDraftSuccess = (dispatch, data) =>
  dispatch({ type: CREATE_DRAFT_SUCCESS, payload: data });
const createDraftFailed = (dispatch, error) =>
  dispatch({ type: CREATE_DRAFT_FAILED, payload: error });

export const getDraft = (id) => (dispatch) => {

  getDraftLoadding(dispatch);
  axios
    .get(API_URL + "/website/getdrftsbyuserid?userId=" + id)
    .then((data) => {
      getDraftSuccess(dispatch, data.data.draftSel[0]);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        getDraftFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        getDraftFailed(dispatch, "Something went wrong");
      }
    });
};

const getDraftLoadding = (dispatch) => dispatch({ type: GET_DRFT_LOADING });
const getDraftSuccess = (dispatch, data) =>
  dispatch({ type: GET_DRFT_SUCCESS, payload: data });
const getDraftFailed = (dispatch, error) =>
  dispatch({ type: GET_DRFT_FAILED, payload: error });

export const uploadImages = (files, old) => {
  var formData = new FormData();
  files.map((item, index) => {
    formData.append('uploadedImages', item);
  })

  return dispatch => {
    uploadImageLoadding(dispatch);
    axios
      .post(API_URL + "/website/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((data) => {
        const imageData = data.data.files.map((item, index) => {
          return `${API_DOMAIN}/api/uploads/${item}`;
        });
        const allImages = [...imageData, ...old];
        uploadImageSuccess(dispatch, allImages);
      })
      .catch((error) => {
        if (error.request && error.request.response) {
          uploadImageError(
            dispatch,
            error.response.data.msg || "In File upload Something went wrong!", old
          );
        } else {
          uploadImageError(dispatch, "In File upload Something went wrong!", old);
        }
      });
  }
}


export const uploadCover = (files, old) => {
  var formData = new FormData();
  // formData.append("uploadedImages",file)
  files.map((item, index) => {
    formData.append('uploadedImages', item);
  })

  return dispatch => {
    uploadCoverLoadding(dispatch);
    axios
      .post(API_URL + "/website/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((data) => {
        const imageData = data.data.files.map((item, index) => {
          return `${API_DOMAIN}/api/uploads/${item}`;
        });

        uploadCoverSuccess(dispatch, imageData[0]);
      })
      .catch((error) => {
        if (error.request && error.request.response) {
          uploadCoverError(
            dispatch,
            error.response.data.msg || "In File upload Something went wrong!", old
          );
        } else {
          uploadCoverError(dispatch, "In File upload Something went wrong!", old);
        }
      });
  }
}


const uploadImageLoadding = (dispatch) => dispatch({ type: UPLOAD_FILE_LOADING });
const uploadImageSuccess = (dispatch, data) => dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data });
const uploadImageError = (dispatch, error, old) => dispatch({ type: UPLOAD_FILE_FAILED, payload: error, old: old })

const uploadCoverLoadding = (dispatch) => dispatch({ type: UPLOAD_COVER_LOADING });
const uploadCoverSuccess = (dispatch, data) => dispatch({ type: UPLOAD_COVER_SUCCESS, payload: data });
const uploadCoverError = (dispatch, error, old) => dispatch({ type: UPLOAD_COVER_FAILED, payload: error, old: old })


export const createWebsite = (value) => (dispatch) => {
  createWebsiteLoadding(dispatch);
  axios
    .post(API_URL + "/website/createwebsite", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      createWebsiteSuccess(dispatch, data.data.msg);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        createWebsiteFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        createWebsiteFailed(dispatch, "Something went wrong");
      }
    });
};

const createWebsiteLoadding = (dispatch) => dispatch({ type: CREATE_WEBSITE_LOADING });
const createWebsiteSuccess = (dispatch, data) =>
  dispatch({ type: CREATE_WEBSITE_SUCCESS, payload: data });
const createWebsiteFailed = (dispatch, error) =>
  dispatch({ type: CREATE_WEBSITE_FAILED, payload: error });

export const updateWebsite = (value) => (dispatch) => {
  updateWebsiteLoadding(dispatch);
  axios
    .put(API_URL + "/website/updateWebsite", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      updateWebsiteSuccess(dispatch, data.data.msg);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        updateWebsiteFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        updateWebsiteFailed(dispatch, "Something went wrong");
      }
    });
};

const updateWebsiteLoadding = (dispatch) => dispatch({ type: UPDATE_WEBSITE_LOADING });
const updateWebsiteSuccess = (dispatch, data) =>
  dispatch({ type: UPDATE_WEBSITE_SUCCESS, payload: data });
const updateWebsiteFailed = (dispatch, error) =>
  dispatch({ type: UPDATE_WEBSITE_FAILED, payload: error });


export const getWebsites = (id) => (dispatch) => {

  getWebsiteLoadding(dispatch);
  axios
    .get(API_URL + "/website/getwebsitesbyuserid?userId=" + id)
    .then((data) => {
      getWebsiteSuccess(dispatch, data.data.websitesSel);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        getWebsiteFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        getWebsiteFailed(dispatch, "Something went wrong");
      }
    });
};

const getWebsiteLoadding = (dispatch) => dispatch({ type: GET_WEBSITES_LOADING });
const getWebsiteSuccess = (dispatch, data) =>
  dispatch({ type: GET_WEBSITES_SUCCESS, payload: data });
const getWebsiteFailed = (dispatch, error) =>
  dispatch({ type: GET_WEBSITES_FAILED, payload: error });

export const getWebsite = (id) => (dispatch) => {

  getWebsiteIdLoadding(dispatch);
  axios
    .get(API_URL + "/website/getwebsitebyid?id=" + id)
    .then((data) => {
      getWebsiteIDSuccess(dispatch, data.data.websitesSel);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        getWebsiteIdFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        getWebsiteIdFailed(dispatch, "Something went wrong");
      }
    });
};

const getWebsiteIdLoadding = (dispatch) => dispatch({ type: GET_WEBSITE_LOADING });
const getWebsiteIDSuccess = (dispatch, data) =>
  dispatch({ type: GET_WEBSITE_SUCCESS, payload: data });
const getWebsiteIdFailed = (dispatch, error) =>
  dispatch({ type: GET_WEBSITE_FAILED, payload: error });

export const getCache = (mobileNo) => (dispatch) => {

  getCacheLoadding(dispatch);
  axios
    .get(API_URL + "/cache/getbymobile?key=" + mobileNo)
    .then((data) => {
      getCacheSuccess(dispatch, data.data.data);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        getCacheFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        getCacheFailed(dispatch, "Something went wrong");
      }
    });
};

const getCacheLoadding = (dispatch) => dispatch({ type: CACHE_IMPORT_LOADING });
const getCacheSuccess = (dispatch, data) =>
  dispatch({ type: CACHE_IMPORT_SUCCESS, payload: data });
const getCacheFailed = (dispatch, error) =>
  dispatch({ type: CACHE_IMPORT_FAILED, payload: error });


export const createCache = (value) => (dispatch) => {
  createCacheLoadding(dispatch);
  axios
    .post(API_URL + "/website/createwebsite", value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      createCacheSuccess(dispatch, data.data.website);
    })
    .catch((error) => {
      if (error.request && error.request.response) {
        createWebsiteFailed(
          dispatch,
          error.response.data.msg || "Something went wrong"
        );
      } else {
        createCacheFailed(dispatch, "Something went wrong");
      }
    });
};

const createCacheLoadding = (dispatch) => dispatch({ type: CACHE_SITE_CREATE_LOADING });
const createCacheSuccess = (dispatch, data) =>
  dispatch({ type: CACHE_SITE_CREATE_SUCCESS, payload: data });
const createCacheFailed = (dispatch, error) =>
  dispatch({ type: CACHE_SITE_CREATE_FAILED, payload: error });


export const clearUpdateData = () => dispatch => {
  clearUpdatewebsiteData(dispatch)
}

const clearUpdatewebsiteData = (dispatch) => dispatch({ type: CLEAR_UPDATE_DATA });

export const setImageData = (images) => dispatch => {
  const imageData = images.map((item, index) => {
    return `${item}`;
  });
  setImageFiles(dispatch, imageData);
}

export const clearImageData = () => dispatch => {
  clearImageFiles(dispatch);
}


const setImageFiles = (dispatch, images) => dispatch({ type: SET_IMAGE_FILES, payload: images });
const clearImageFiles = (dispatch) => dispatch({ type: CLEAR_IMAGE_FILES });



export const setCoverData = (image) => dispatch => {
  const imageData = `${image}`
  setCoverFiles(dispatch, imageData);
}

export const clearCoverData = () => dispatch => {
  clearCoverFiles(dispatch);
}


const setCoverFiles = (dispatch, images) => dispatch({ type: SET_COVER, payload: images });
const clearCoverFiles = (dispatch) => dispatch({ type: CLEAR_COVER });
