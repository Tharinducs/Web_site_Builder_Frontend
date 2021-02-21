import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ToastView from "../../components/toast/Toast";
import { register } from "../../store/actions/login";
import { Button, Spinner } from "react-bootstrap";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

const Register = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);
  useEffect(() => {
    //if logged in success. redirect
    if (props.signUpProps.registerSuccess) {
      setShowToast(true);
      setTimeout(() => {
        props.history.push(`${process.env.PUBLIC_URL}/login`);
      }, 1000);
    }
    //if error occured stop loader
    if (props.signUpProps.registerErorr) {
      setShowErrorToaster(true);
    }
  }, [
    props.signUpProps.registerSuccess,
    props.signUpProps.registerErorr,
    props.history,
  ]);

  const handleSubmit = (values) => {
    const registerData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    props.register(registerData);
  };
  return (
    <>
      <ToastView
        icon={faCheck}
        setShow={(showStatus) => setShowToast(showStatus)}
        show={showToast}
        text={props.signUpProps.registerSuccess}
        color="#adf4ce"
        backgroundColor="#00823e"
      />
      <ToastView
        icon={faTimes}
        setShow={(showStatus) => setShowErrorToaster(showStatus)}
        show={showErrorToaster}
        text={props.signUpProps.registerErorr}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className={`container ${styles.background}`}>
        <div className={styles.cardBody}>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <h3 style={{ textAlign: "center" }}>Registration</h3>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmP: "",
                }}
                validationSchema={Yup.object().shape({
                  username: Yup.string().required("Username is required feild"),
                  email: Yup.string()
                    .email("Should be a valid email address")
                    .required("Email is required Feild"),
                  password: Yup.string()
                    .required("Password is required feiled")
                    .matches(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    ),
                  confirmP: Yup.string().when("password", {
                    is: (val) => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                      [Yup.ref("password")],
                      "Both Password need to be same"
                    ),
                  }),
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
                    <div>
                      <input
                        type="text"
                        placeholder="Username"
                        value={formprops.values.username}
                        onChange={formprops.handleChange("username")}
                        onBlur={formprops.handleBlur("username")}
                        className={styles.formInput}
                      />
                      {formprops.touched.username &&
                      formprops.errors.username ? (
                        <div className={styles.errorMessage}>
                          {formprops.errors.username}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={formprops.values.email}
                        onChange={formprops.handleChange("email")}
                        onBlur={formprops.handleBlur("email")}
                        className={styles.formInput}
                      />
                      {formprops.touched.email && formprops.errors.email ? (
                        <div className={styles.errorMessage}>
                          {formprops.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        value={formprops.values.password}
                        onChange={formprops.handleChange("password")}
                        onBlur={formprops.handleBlur("password")}
                        className={styles.formInput}
                      />
                      {formprops.touched.password &&
                      formprops.errors.password ? (
                        <div className={styles.errorMessage}>
                          {formprops.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formprops.values.confirmP}
                        onChange={formprops.handleChange("confirmP")}
                        onBlur={formprops.handleBlur("confirmP")}
                        className={styles.formInput}
                      />
                      {formprops.touched.confirmP &&
                      formprops.errors.confirmP ? (
                        <div className={styles.errorMessage}>
                          {formprops.errors.confirmP}
                        </div>
                      ) : null}
                    </div>

                    <Button
                      variant="dark"
                      className={styles.button}
                      disabled={props.signUpProps.registerLoadding}
                      onClick={formprops.handleSubmit}
                    >
                      {props.signUpProps.registerLoadding ? (
                        <Spinner
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <>LOGIN</>
                      )}
                    </Button>
                  </>
                )}
              </Formik>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <h6 style={{ textAlign: "center" }}>Already a member ? <a href={`${process.env.PUBLIC_URL}/login`}>Login</a></h6>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    signUpProps: state.login,
  };
};

export default connect(mapStateToProps, { register })(withRouter(Register));
