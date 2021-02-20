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
import { uploadImages } from "../../store/actions/website";
import { withRouter } from "react-router-dom";

const Editweb = (props) => {
  const [website, setWebSite] = useState(null);
  const [files, setFiles] = useState([]);
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

  useEffect(() => {
    if (props.website.updateWebsiteSuccess) {
        setShowToast(true);
        setTimeout(()=>{
            props.history.push(`${process.env.PUBLIC_URL}/profile`);
        },1000)
      
    }

    if(props.website.updateWebsiteError){
        setShowErrorToaster(true);
    }
  }, [props.website.updateWebsiteSuccess,props.website.updateWebsiteError, props.history]);

  useEffect(() => {
    const state = props.location.state;
    if (state && state.websiteData && Object.keys(state.websiteData).length !== 0) {
      setWebSite(state.websiteData);
    } else {
      props.history.push(`${process.env.PUBLIC_URL}/profile`);
    }
  }, []);

  useEffect(() => {
    if (website?.uploads) {
      const images = JSON.parse(website.uploads);
      let imageData = images.map((item, index) => {
        return `${API_DOMAIN}/api/uploads/${item}`;
      });

      setFiles(imageData);
    }
  }, [website]);

  const handleChange = (e) => {
    setFiles([]);
    if (e?.target?.files) {
      const ufiles = Array.from(e.target.files);
      props.uploadImages(ufiles);
      Promise.all(
        ufiles.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (ev) => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        (images) => {
          /* Once all promises are resolved, update state with image URI array */
          //   const newFileSet = files.concat(images)
          setFiles([...files, ...images]);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleSubmit = (values) => {
    let data = values;
    data.userId = userId;
    data.type = website.type;
    data.uploads = JSON.stringify(props.website.files || []);
    props.createWebsite(data);
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
            <div className="col-lg-4"><h3 style={{ textAlign: "center" }}>Edit Website</h3></div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <Formik
                initialValues={{
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
                      <div className="col-lg-3">
                        <p className={styles.lable}>Name of the company</p>
                      </div>
                      <div className="col-lg-9">
                        {" "}
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={formprops.values.cname}
                          onChange={formprops.handleChange("cname")}
                          onBlur={formprops.handleBlur("cname")}
                          className={styles.formInput}
                        />
                        {formprops.errors.cname &&
                        formprops.touched.cname  ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.cname}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>About</p>
                      </div>
                      <div className="col-lg-9">
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
                        {formprops.errors.about &&
                        formprops.touched.about ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.about}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>Address</p>
                      </div>
                      <div className="col-lg-9">
                        {" "}
                        <textarea
                          id="address"
                          placeholder="Enter Address...."
                          rows="4"
                          cols="50"
                          value={formprops.values.address}
                          onChange={formprops.handleChange("address")}
                          onBlur={formprops.handleBlur("address")}
                          className={styles.formInput}
                        ></textarea>
                        {formprops.errors.address &&
                        formprops.touched.address ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.address}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>Email</p>
                      </div>
                      <div className="col-lg-9">
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
                        formprops.touched.email ? (
                          <div className={styles.errorMessage}>
                            {formprops.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>Phone Number</p>
                      </div>
                      <div className="col-lg-6">
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
                      <div className="col-lg-3">
                        <p className={styles.lable}>Photos</p>
                      </div>
                      <div className="col-lg-6">
                        <input
                          ref={(e) => (filesRef = e)}
                          id="files"
                          type="file"
                          name=""
                          accept="image/gif,image/jpeg,image/jpg,image/png"
                          title="Browse"
                          onChange={(e) => handleChange(e)}
                          multiple
                          className={styles.formInputF}
                        />
                        <Button
                          variant="outline-secondary"
                          disabled={props.website.draftLoading}
                          className={styles.button}
                          onClick={() => {
                            if (filesRef) {
                              filesRef.click();
                            }
                          }}
                        >
                          {props.website.fileUploadLoading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>Browse</>
                          )}
                        </Button>
                        {files.length !== 0 &&
                        !props.website.fileUploadLoading ? (
                          <div className="row">
                            {files.map((item, index) => {
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
                      <div className="col-lg-3"></div>
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
                            props.website.fileUploadLoading
                          }
                        >
                          Update web site
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

export default connect(mapStateToProps, { uploadImages })(withRouter(Editweb));
