import React, { useEffect, useState } from "react";
import styles from "./CreateWeb.module.css";
import { Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ToastView from "../../components/toast/Toast";
import Loader from "../../components/loader/Loader";
import * as Yup from "yup";
import {
  createDraft,
  getDraft,
  uploadImages,
  createWebsite,
} from "../../store/actions/website";
import { withRouter } from "react-router-dom";

const CreateWeb = (props) => {
  const [files, setFiles] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState(null);
  const [showToast, setShowToast] = useState(false);
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
      props.history.push(`${process.env.PUBLIC_URL}/profile`);
    }
  }, [props.website.createWebsiteSuccess, props.history]);

  useEffect(() => {
    getDraftData();
  }, []);

  const getDraftData = async () => {
    const userId = (JSON.parse(localStorage.getItem("loginToken")) || {}).user
      ?.user_id;
    setUserId(userId);
    const type = localStorage.getItem("type");
    setType(type);
    props.getDraft(userId);
  };

  const handleChange = (e) => {
    setFiles([]);
    if (e?.target?.files) {
      const files = Array.from(e.target.files);
      props.uploadImages(files);
      Promise.all(
        files.map((file) => {
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
          setFiles(images);
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
    data.type = type;
    data.uploads = JSON.stringify(props.website.files || []);
    props.createWebsite(data);
  };
  return (
    <>
    {props.website.draftgetLoading && <Loader />}
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
                  cname: (drft || {}).companyName || "",
                  about: (drft || {}).about || "",
                  address: (drft || {}).address || "",
                  email: (drft || {}).email || "",
                  pnumber: (drft || {}).mobile || "",
                  photos: [],
                }}
                enableReinitialize={drft}
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
                      <div className="col-lg-6">
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
                      <div className="col-lg-3">
                        <Button
                          variant="dark"
                          size="sm"
                          className={styles.buttonSm}
                          disabled={props.website.draftLoading}
                          onClick={() => {
                            var data = formprops.values;
                            data.userId = userId;
                            data.type = type;
                            props.createDraft(data);
                            setClicked("cname");
                          }}
                        >
                          {props.website.draftLoading && clicked === "cname" ? (
                            <Spinner
                              as="span"
                              size="sm"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>save changes</>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>About</p>
                      </div>
                      <div className="col-lg-6">
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
                      <div className="col-lg-3">
                        <Button
                          variant="dark"
                          size="sm"
                          disabled={props.website.draftLoading}
                          className={styles.buttonSm}
                          onClick={() => {
                            var data = formprops.values;
                            data.userId = userId;
                            data.type = type;
                            props.createDraft(data);
                            setClicked("about");
                          }}
                        >
                          {props.website.draftLoading && clicked === "about" ? (
                            <Spinner
                              as="span"
                              size="sm"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>save changes</>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>Address</p>
                      </div>
                      <div className="col-lg-6">
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
                      </div>
                      <div className="col-lg-3">
                        <Button
                          variant="dark"
                          disabled={props.website.draftLoading}
                          size="sm"
                          className={styles.buttonSm}
                          onClick={() => {
                            var data = formprops.values;
                            data.userId = userId;
                            data.type = type;
                            props.createDraft(data);
                            setClicked("address");
                          }}
                        >
                          {props.website.draftLoading &&
                          clicked === "address" ? (
                            <Spinner
                              as="span"
                              size="sm"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>save changes</>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <p className={styles.lable}>Email</p>
                      </div>
                      <div className="col-lg-6">
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
                      <div className="col-lg-3">
                        <Button
                          variant="dark"
                          size="sm"
                          disabled={
                            props.website.draftLoading ||
                            (formprops.errors.email &&
                              formprops.touched.email &&
                              formprops.values.email)
                          }
                          className={styles.buttonSm}
                          onClick={() => {
                            var data = formprops.values;
                            data.userId = userId;
                            data.type = type;
                            props.createDraft(data);
                            setClicked("email");
                          }}
                        >
                          {props.website.draftLoading && clicked === "email" ? (
                            <Spinner
                              as="span"
                              size="sm"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>save changes</>
                          )}
                        </Button>
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
                      </div>
                      <div className="col-lg-3">
                        <Button
                          variant="dark"
                          size="sm"
                          disabled={props.website.draftLoading}
                          className={styles.buttonSm}
                          onClick={() => {
                            var data = formprops.values;
                            data.userId = userId;
                            data.type = type;
                            props.createDraft(data);
                            setClicked("pnumber");
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
                            <>save changes</>
                          )}
                        </Button>
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
                        {files.length !== 0 && props.website.files ? (
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
                            props.website.fileUploadLoading ||
                            props.website.draftLoading || props.website.createWebsiteLoading
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
})(withRouter(CreateWeb));
