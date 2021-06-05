/* global google */
import React, { useEffect, useState } from "react";
import styles from "./CreateWeb.module.css";
import { Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ToastView from "../../components/toast/Toast";
import Loader from "../../components/loader/Loader";
import { authenticated } from "../../hoc/authenticated";
import * as Yup from "yup";
import {
  createDraft,
  getDraft,
  uploadImages,
  createWebsite,
  setImageData,
  clearImageData,
  uploadCover,
  setCoverData,
  clearCoverData,
} from "../../store/actions/website";
import { withRouter } from "react-router-dom";
import Map from "../../components/map/CreateMap";
import Dropzone from "react-dropzone";
import PlacesAutoComplete from "../../components/placesautoComplete"
import { API_DOMAIN } from "../../_helpers/constant";
import googleMapReact from "google-map-react";

const CreateWeb = (props) => {
  const [files, setFiles] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [lodder, setLodder] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [temporyDraft, setTemporyDraft] = useState(null);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const mapPositions = [64.6328442, 17.0913073];
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const {
    website: { drft },
  } = props;

  let filesRef;

  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);



  useEffect(() => {
    if (drft?.uploads) {
      const images = JSON.parse(drft.uploads);
      props.setImageData(images);
    }
    if (drft?.cover) {
      props.setCoverData(drft?.cover)
    }
    if (drft?.address) {
      const address = JSON.parse(drft?.address);
      setLat(address.lat || null);
      setLng(address.lng || null);
    }
  }, [drft]);

  useEffect(() => {
    //if logged in success. redirect
    if (props.website.draftSuccess) {
      setShowToast(true);
    }
    //if error occured stop loader
    if (props.website.draftError) {
      setShowErrorToaster(true);
    }
  }, [props.website.draftError, props.website.draftSuccess]);

  useEffect(() => {
    if (props.website.createWebsiteSuccess) {
      if (props.location?.state?.from === "createAfterLogin") {
        localStorage.removeItem("formData");
      }
      props.history.push(`${process.env.PUBLIC_URL}/profile`);
    }
  }, [props.website.createWebsiteSuccess, props.history, props.location]);

  useEffect(() => {
    getDraftData();
  }, []);

  useEffect(() => {
    return () => {
      props.clearImageData();
      props.clearCoverData();
    }
  }, [])






  const getDraftData = async () => {
    if (props.location?.state?.from === "createAfterLogin") {
      const userId = (JSON.parse(localStorage.getItem("loginToken")) || {}).user
        ?.user_id;
      setUserId(userId);
      setLodder(true);
      setNotLoggedIn(true);
      const type = localStorage.getItem("type");
      setType(type);
      const userData = JSON.parse(localStorage.getItem("formData"));
      if (userData && Object.keys(userData).length !== 0) {
        if (userData?.uploads) {
          props.clearImageData();
          const images = JSON.parse(userData.uploads);
          props.setImageData(images);
        }
        if (userData?.cover) {
          props.setCoverData(userData?.cover)
        }
        if (userData?.address) {
          const address = JSON.parse(userData?.address);
          setLat(address.lat || null);
          setLng(address.lng || null);
        }
        setTemporyDraft(userData);
      }
      setLodder(false);
    } else {
      const userId = (JSON.parse(localStorage.getItem("loginToken")) || {}).user
        ?.user_id;
      if (userId) {
        setUserId(userId);
        const type = localStorage.getItem("type");
        setType(type);
        props.getDraft(userId);
      } else {
        setLodder(true);
        setNotLoggedIn(true);
        const type = localStorage.getItem("type");
        setType(type);
        const userData = JSON.parse(localStorage.getItem("formData"));
        if (userData && Object.keys(userData).length !== 0) {
          if (userData?.uploads) {
            const images = JSON.parse(userData.uploads);
            props.setImageData(images);
          }
          if (userData?.address) {
            const address = JSON.parse(userData?.address);
            setLat(address.lat || null);
            setLng(address.lng || null);
          }
          if (userData?.cover) {
            props.setCoverData(userData?.cover)
          }
          setTemporyDraft(userData);
        }
        setLodder(false);
      }
    }
  };

  const handleChange = (uFiles) => {
    if (uFiles) {
      const nFiles = Array.from(uFiles);
      props.uploadImages(nFiles, props.website.files);
    }
  };

  const handleCover = (uFiles) => {
    const nFiles = Array.from(uFiles);
    props.uploadCover(nFiles, props.website.cover);
  }

  const handleSubmit = (values) => {
    const prevUploads = (props.website.files || [])
    let data = values;
    data.userId = userId;
    data.type = type;
    data.uploads = JSON.stringify(prevUploads);
    data.cover = props.website.cover ? props.website.cover : null;
    props.createWebsite(data);
  };

  return (
    <>
      {(props.website.draftgetLoading || lodder) && <Loader />}
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
        text={props.website.draftError}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className={`container ${styles.background}`}>
        <div className={styles.cardBody}>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4"></div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <Formik
                initialValues={{
                  cname: !notLoggedIn
                    ? (drft || {}).companyName || ""
                    : (temporyDraft || {}).cname || "",
                  about: !notLoggedIn
                    ? (drft || {}).about || ""
                    : (temporyDraft || {}).about || "",
                  address: !notLoggedIn
                    ? (drft || {}).address || ""
                    : (temporyDraft || {}).address || "",
                  email: !notLoggedIn
                    ? (drft || {}).email || ""
                    : (temporyDraft || {}).email || "",
                  pnumber: !notLoggedIn
                    ? (drft || {}).mobile || ""
                    : (temporyDraft || {}).pnumber || "",
                }}
                enableReinitialize={drft || temporyDraft}
                validationSchema={Yup.object().shape({
                  cname: Yup.string().required(
                    "Company Name is required feild"
                  ),
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
                      </div>
                    </div>
                    {formprops.errors.cname && submitted && (
                      <div className={styles.errorMessage}>
                        {formprops.errors.cname}
                      </div>
                    )}
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
                      </div>
                    </div>
                    {formprops.errors.about && submitted && (
                      <div className={styles.errorMessage}>
                        {formprops.errors.about}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-lg-4">
                        <p className={styles.lable}>Address</p>
                      </div>
                      <div className="col-lg-8">
                        <PlacesAutoComplete name="address" value={formprops.values.address !== "" ? JSON.parse(formprops.values.address) : undefined} setFieldValue={formprops.setFieldValue} setLat={setLat} setLng={setLng} />
                      </div>
                    </div>
                    <Map
                      setValue={formprops.setFieldValue}
                      lat={lat || null}
                      lng={lng || null}
                    />
                    {formprops.errors.address && submitted && (
                      <div className={styles.errorMessage}>
                        {formprops.errors.address}
                      </div>
                    )}
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
                        {formprops.errors.email &&
                          formprops.touched.email &&
                          formprops.values.email ? (
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
                      </div>
                    </div>
                    {formprops.errors.pnumber && submitted && (
                      <div className={styles.errorMessage}>
                        {formprops.errors.pnumber}
                      </div>
                    )}
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
                          props.website.files ? (
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

                        {props.website.cover ? (
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
                      <div className="col-lg-6">
                        {authenticated() && (
                          <Button
                            variant="dark"
                            disabled={props.website.draftLoading}
                            className={styles.button}
                            onClick={() => {
                              if (
                                props.location?.state?.from ===
                                "createAfterLogin"
                              ) {
                                const prevUploads = (
                                  props.website.files || []
                                )
                                let data = formprops.values;
                                data.userId = userId;
                                data.uploads = JSON.stringify(prevUploads);
                                data.cover = props.website.cover ? props.website.cover : null;
                                setClicked("pnumber");
                                localStorage.setItem(
                                  "formData",
                                  JSON.stringify(data)
                                );
                              } else {
                                const prevUploads = (
                                  props.website.files || []
                                )
                                let data = formprops.values;
                                data.userId = userId;
                                data.type = type;
                                data.uploads = JSON.stringify(prevUploads);
                                data.cover = props.website.cover ? props.website.cover : null;
                                props.createDraft(data);
                                setClicked("pnumber");
                              }
                            }}
                          >
                            {props.website.draftLoading &&
                              clicked === "pnumber" ? (
                              <Spinner
                                as="span"
                                size="sm"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <>save Draft</>
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="col-lg-6">
                        {!authenticated() ? (
                          <Button
                            variant="dark"
                            className={styles.button}
                            onClick={() => {
                              const prevUploads = (
                                props.website.files || []
                              )
                              var data = formprops.values;
                              data.userId = userId;
                              data.type = type;
                              data.uploads = JSON.stringify(prevUploads);
                              data.cover = props.website.cover ? props.website.cover : null;
                              setClicked("pnumber");
                              localStorage.setItem(
                                "formData",
                                JSON.stringify(data)
                              );
                              props.history.push("webpage", {
                                from: "create",
                                valid: formprops.isValid,
                              });
                            }}
                            disabled={
                              props.website.fileUploadLoading ||
                              props.website.draftLoading ||
                              props.website.createWebsiteLoading
                            }
                          >
                            {props.website.createWebsiteLoading ? (
                              <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <> Save draft and preview</>
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="dark"
                            className={styles.button}
                            onClick={() => {
                              formprops.handleSubmit();
                              setSubmitted(true);
                              if (
                                props.location?.state?.from ===
                                "createAfterLogin"
                              ) {
                                localStorage.removeItem("formData");
                              }
                            }}
                            disabled={
                              Object.keys(formprops.errors).length !== 0 ||
                              props.website.fileUploadLoading ||
                              !formprops.isValid ||
                              props.website.draftLoading ||
                              props.website.createWebsiteLoading
                            }
                          >
                            {props.website.createWebsiteLoading ? (
                              <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <> Create web site</>
                            )}
                          </Button>
                        )}
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
  createDraft,
  getDraft,
  uploadImages,
  createWebsite,
  setImageData,
  clearImageData,
  uploadCover,
  setCoverData,
  clearCoverData,
})(withRouter(CreateWeb));
