import {
  API_URL,
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
  GET_WEBSITES_LOADING,
  GET_WEBSITE_FAILED,
  GET_WEBSITE_SUCCESS,
  GET_WEBSITE_LOADING,
  GET_WEBSITES_SUCCESS,
  GET_WEBSITES_FAILED,
  UPDATE_WEBSITE_FAILED,
  UPDATE_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_LOADING,
  CLEAR_UPDATE_DATA
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
    dispatch({ type: CREATE_DRAFT_SUCCESS, payload:data });
  const createDraftFailed = (dispatch, error) =>
    dispatch({ type: CREATE_DRAFT_FAILED, payload:error });

    export const getDraft = (id) => (dispatch) => {
      
      getDraftLoadding(dispatch);
      axios
        .get(API_URL+ "/website/getdrftsbyuserid?userId="+id)
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
      dispatch({ type: GET_DRFT_SUCCESS, payload:data });
    const getDraftFailed = (dispatch, error) =>
      dispatch({ type: GET_DRFT_FAILED, payload:error });

export const uploadImages = (files) =>{
  var formData = new FormData();
  files.map((item,index) =>{
    formData.append('uploadedImages',item);
  })

  return dispatch =>{
    uploadImageLoadding(dispatch);
    axios
      .post(API_URL+ "/website/images",formData,{headers: {
        "Content-Type": "multipart/form-data",
      }})
      .then((data) => {
        uploadImageSuccess(dispatch, data.data.files);
      })
      .catch((error) => {
        if (error.request && error.request.response) {
          uploadImageError(
            dispatch,
            error.response.data.msg || "In File upload Something went wrong!"
          );
        } else {
          uploadImageError(dispatch, "In File upload Something went wrong!");
        }
      });
  }
}


const uploadImageLoadding = (dispatch) =>dispatch({type: UPLOAD_FILE_LOADING});
const uploadImageSuccess = (dispatch,data) =>dispatch({type: UPLOAD_FILE_SUCCESS, payload:data});
const uploadImageError = (dispatch,error) => dispatch({type: UPLOAD_FILE_FAILED,payload:error})


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
  dispatch({ type: CREATE_WEBSITE_SUCCESS, payload:data });
const createWebsiteFailed = (dispatch, error) =>
  dispatch({ type: CREATE_WEBSITE_FAILED, payload:error });

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
    dispatch({ type: UPDATE_WEBSITE_SUCCESS, payload:data });
  const updateWebsiteFailed = (dispatch, error) =>
    dispatch({ type: UPDATE_WEBSITE_FAILED, payload:error });


  export const getWebsites = (id) => (dispatch) => {
      
    getWebsiteLoadding(dispatch);
    axios
      .get(API_URL+ "/website/getwebsitesbyuserid?userId="+id)
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
    dispatch({ type: GET_WEBSITES_SUCCESS, payload:data });
  const getWebsiteFailed = (dispatch, error) =>
    dispatch({ type: GET_WEBSITES_FAILED, payload:error });

    export const getWebsite = (id) => (dispatch) => {
      
      getWebsiteIdLoadding(dispatch);
      axios
        .get(API_URL+ "/website/getwebsitebyid?id="+id)
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
      dispatch({ type: GET_WEBSITE_SUCCESS, payload:data });
    const getWebsiteIdFailed = (dispatch, error) =>
      dispatch({ type: GET_WEBSITE_FAILED, payload:error });


  export const clearUpdateData = () =>dispatch =>{
    clearUpdatewebsiteData(dispatch)
  }

  const clearUpdatewebsiteData = (dispatch) => dispatch({type: CLEAR_UPDATE_DATA});
    
  
