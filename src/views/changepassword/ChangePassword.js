import React, { useEffect, useState } from "react";
import styles from "./ChangePassword.module.css";
import { Formik, ErrorMessage } from "formik";
import { Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { connect } from "react-redux";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import ToastView from "../../components/toast/Toast";
import { changePassword } from "../../store/actions/login";

const ChangePassword = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    //if logged in success. redirect
    if (props.signUpProps.changePasswordSuccess) {
      setShowToast(true);
      localStorage.removeItem("loginToken");
      setTimeout(() => {
        props.history.push(`${process.env.PUBLIC_URL}/`);
      }, 1000);
    }
    //if error occured stop loader
    if (props.signUpProps.changePasswordError) {
      setShowErrorToaster(true);
    }
  }, [
    props.signUpProps.changePasswordSuccess,
    props.signUpProps.changePasswordError,
    props.history,
  ]);

  const getUserData = async () => {
    const user = JSON.parse(await localStorage.getItem("loginToken")).user;

    setUser(user);
  };

  const handleSubmit = (values) => {
    let data = values;
    data.user = user.username;
    props.changePassword(data);
  };
  return (
    <>
      <ToastView
        icon={faCheck}
        setShow={(showStatus) => setShowToast(showStatus)}
        show={showToast}
        text="Successfully Changed!"
        color="#adf4ce"
        backgroundColor="#00823e"
      />
      <ToastView
        icon={faTimes}
        setShow={(showStatus) => setShowErrorToaster(showStatus)}
        show={showErrorToaster}
        text={props.signUpProps.changePasswordError}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className={`container ${styles.background}`}>
        <div className={styles.cardBody}>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <h3 style={{ textAlign: "center" }}>Change Password</h3>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <Formik
                initialValues={{
                  prvPassword: "",
                  password: "",
                  confirmP: "",
                }}
                validationSchema={Yup.object().shape({
                  prvPassword: Yup.string().required(
                    "Previous Password is required feiled"
                  ),
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
                        type="password"
                        placeholder="Previous Password"
                        value={formprops.values.prvPassword}
                        onChange={formprops.handleChange("prvPassword")}
                        onBlur={formprops.handleBlur("prvPassword")}
                        className={styles.formInput}
                      />
                      {formprops.touched.prvPassword &&
                      formprops.errors.prvPassword ? (
                        <div className={styles.errorMessage}>
                          {formprops.errors.prvPassword}
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
                      onClick={formprops.handleSubmit}
                      disabled={props.signUpProps.changePasswordLoadding}
                    >
                      {props.signUpProps.changePasswordLoadding ? (
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

export default connect(mapStateToProps, { changePassword })(
  withRouter(ChangePassword)
);
