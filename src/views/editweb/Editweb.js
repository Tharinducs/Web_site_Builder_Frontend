import React, { useEffect, useState } from "react";
import styles from "./Editweb.module.css";
import { Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ToastView from "../../components/toast/Toast";
import Loader from "../../components/loader/Loader";
import { API_DOMAIN } from "../../_helpers/constant";
import * as Yup from "yup";
import {
  uploadImages,
  updateWebsite,
  setImageData,
  clearImageData,
  setCoverData,
  clearCoverData,
  uploadCover,
} from "../../store/actions/website";
import { withRouter } from "react-router-dom";
import Map from "../../components/map/CreateMap";
import Dropzone from "react-dropzone";
import PlacesAutoComplete from "../../components/placesautoComplete"

const Editweb = (props) => {
  const [website, setWebSite] = useState(null);
  const [files, setFiles] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [previousUploads, setpreviousUploads] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);

  let filesRef;
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  useEffect(()=>{
    return ()=>{
      props.clearImageData();
      props.clearCoverData();
    }
  },[])

  useEffect(() => {
    if (props.website.updateWebsiteSuccess) {
      setShowToast(true);
      setTimeout(() => {
        props.history.push(`${process.env.PUBLIC_URL}/profile`);
      }, 1000);
    }

    if (props.website.updateWebsiteError) {
      setShowErrorToaster(true);
    }
  }, [
    props.website.updateWebsiteSuccess,
    props.website.updateWebsiteError,
    props.history,
  ]);

  useEffect(() => {
    const state = props.location.state;
    if (
      state &&
      state.websiteData &&
      Object.keys(state.websiteData).length !== 0
    ) {
      const address = JSON.parse(state.websiteData?.address);
      props.clearImageData();
      if (state.websiteData?.uploads) {
        const images = JSON.parse(state.websiteData?.uploads);
        props.setImageData(images);
      }
      if(state.websiteData?.cover){
        props.setCoverData(state.websiteData?.cover)
      }
      setLat(address.lat || null);
      setLng(address.lng || null);
      setWebSite(state.websiteData);
    } else {
      props.history.push(`${process.env.PUBLIC_URL}/profile`);
    }
  }, []);

  const handleChange = (uFiles) => {
    if (uFiles) {
      const nFiles = Array.from(uFiles);
      props.uploadImages(nFiles,props.website.files);
    }
  };

  const handleCover = (uFiles) =>{
    const nFiles = Array.from(uFiles);
    props.uploadCover(nFiles,props.website.cover);
  }

  const handleSubmit = (values) => {
    const prevUploads = (props.website.files || []).map((item, index) => {
      return item.split("/").pop();
    });
    let data = values;
    data.userId = website.userId;
    data.uploads = JSON.stringify(prevUploads);
    data.cover = props.website.cover ? props.website.cover.split("/").pop() : null;
    props.updateWebsite(data);
  };
  return (
    <>
      <ToastView
        icon={faCheck}
        setShow={(showStatus) => setShowToast(showStatus)}
        show={showToast}
        text="Changes saved Successfully! "
        color="#adf4ce"
        backgroundColor="#00823e"
      />
      <ToastView
        icon={faTimes}
        setShow={(showStatus) => setShowErrorToaster(showStatus)}
        show={showErrorToaster}
        text={props.website.updateWebsiteError}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className={`container ${styles.background} mb-5`}>
        {props.website.draftgetLoading && <Loader />}
        <div className={styles.cardBody}>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <h3 style={{ textAlign: "center" }}>Edit Website</h3>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <Formik
                initialValues={{
                  id: (website || {}).id || "",
                  type: (website || {}).type || "",
                  cname: (website || {}).companyName || "",
                  about: (website || {}).about || "",
                  address: (website || {}).address || "",
                  email: (website || {}).email || "",
                  pnumber: (website || {}).mobile || "",
                  photos: [],
                }}
                enableReinitialize={website}
                validationSchema={Yup.object().shape({
                  cname: Yup.string().required(
                    "Company Name is required feild"
                  ),
                  id: Yup.string().required("Id is required feild"),
                  about: Yup.string().required("About is required feild"),
                  address: Yup.string().required("Address is required feild"),
                  email: Yup.string()
                    .email("Should be a valid email address")
                    .required("Email is required Feild"),
                  pnumber: Yup.string().required(
                    "Phone number is required feild"
                  ),
                })}
                onSubmit={(values, formikActions) => {
                  handleSubmit(values);
                  setTimeout(() => {
                    formikActions.setSubmitting(false);
                  }, 500);
                }}
              >
                {(formprops) => (
                  <>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Website Id</p>
                      </div>
                      <div className="col-lg-8">
                        {" "}
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={formprops.values.id}
                          readOnly={true}
                          disabled={true}
                          onChange={formprops.handleChange("id")}
                          onBlur={formprops.handleBlur("id")}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Category</p>
                      </div>
                      <div className="col-lg-8">
                      <select placeholder="Company Name" name="type" id="type" value={formprops.values.type} className={styles.formInput} onChange={formprops.handleChange("type")}>
                        <option value="">-</option>
                        <option value="Resturant">Resturant</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Online Store">Online Store</option>
                        <option value="Travel">Travel</option>
                      </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Name of the company</p>
                      </div>
                      <div className="col-lg-8">
                        {" "}
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={formprops.values.cname}
                          onChange={formprops.handleChange("cname")}
                          onBlur={formprops.handleBlur("cname")}
                          className={styles.formInput}
                        />
                        {formprops.errors.cname && formprops.touched.cname ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.cname}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>About</p>
                      </div>
                      <div className="col-lg-8">
                        {" "}
                        <textarea
                          id="about"
                          placeholder="Enter Discription...."
                          rows="4"
                          cols="50"
                          value={formprops.values.about}
                          onChange={formprops.handleChange("about")}
                          onBlur={formprops.handleBlur("about")}
                          className={styles.formInput}
                        ></textarea>
                        {formprops.errors.about && formprops.touched.about ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.about}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Address</p>
                      </div>
                      <div className="col-lg-8">
                      <PlacesAutoComplete name="address" value={formprops.values.address !== "" ? JSON.parse(formprops.values.address) : undefined} setFieldValue={formprops.setFieldValue} setLat={setLat} setLng={setLng} />
                        {formprops.errors.address &&
                        formprops.touched.address ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.address}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    
                    <Map
                      setValue={formprops.setFieldValue}
                      lat={lat || null}
                      lng={lng || null}
                    />
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Email</p>
                      </div>
                      <div className="col-lg-8">
                        {" "}
                        <input
                          type="email"
                          placeholder="Email"
                          value={formprops.values.email}
                          onChange={formprops.handleChange("email")}
                          onBlur={formprops.handleBlur("email")}
                          className={styles.formInput}
                        />
                        {formprops.errors.email && formprops.touched.email ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Phone Number</p>
                      </div>
                      <div className="col-lg-8">
                        {" "}
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={formprops.values.pnumber}
                          onChange={formprops.handleChange("pnumber")}
                          onBlur={formprops.handleBlur("pnumber")}
                          className={styles.formInput}
                        />
                        {formprops.errors.pnumber &&
                        formprops.touched.pnumber ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.pnumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Photos</p>
                      </div>
                      <div className="col-lg-8">
                      <Dropzone
                          className={styles.dropzone}
                          accept="image/gif,image/jpeg,image/jpg,image/png"
                          onDrop={(acceptedFiles) =>
                            handleChange(acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section className={styles.dropzone}>
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input
                                  {...getInputProps({
                                    className: styles.formInput,
                                  })}
                                />
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                        {props.website.files.length !== 0 &&
                        props.website.files &&
                        !props.website.fileUploadLoading ? (
                          <div className="row">
                            {props.website.files.map((item, index) => {
                              return (
                                <div className="col-lg-4" key={index}>
                                  <img
                                    src={item}
                                    alt="uploded"
                                    key={index}
                                    className={`img-thumbnail my-3 ${styles.image}`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                        {props.website.fileUploadError ? (
                          <div className={styles.errorMessage}>
                            {props.website.fileUploadError}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Cover Picture</p>
                      </div>
                      <div className="col-lg-8">
                        <Dropzone
                          className={styles.dropzone}
                          multiple={false}
                          accept="image/gif,image/jpeg,image/jpg,image/png"
                          onDrop={(acceptedFiles) =>
                            handleCover(acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section className={styles.dropzone}>
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input
                                  {...getInputProps({
                                    className: styles.formInput,
                                  })}
                                />
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>

                        {props.website.cover  ? (
                          <div className="row">
                                <div className="col-lg-12">
                                  <img
                                    src={props.website.cover}
                                    alt="uploded"
                                    className={`img-thumbnail my-3 ${styles.image}`}
                                  />
                                </div>
                          </div>
                        ) : null}
                        {props.website.coverUploadError ? (
                          <div className={styles.errorMessage}>
                            {props.website.coverUploadError}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-2"></div>
                      <div className="col-lg-7">
                        <Button
                          variant="dark"
                          className={styles.button}
                          onClick={formprops.handleSubmit}
                          disabled={
                            Object.keys(formprops.errors).length !== 0 ||
                            props.website.fileUploadLoading ||
                            props.website.updateWebsiteLoading
                          }
                        >
                          {props.website.updateWebsiteLoading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <> Update web site</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Formik>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    website: state.website,
  };
};

export default connect(mapStateToProps, {
  uploadImages,
  updateWebsite,
  setImageData,
  clearImageData,
  setCoverData,
  clearCoverData,
  uploadCover,
})(withRouter(Editweb));
