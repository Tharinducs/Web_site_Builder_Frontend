import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Formik, ErrorMessage } from "formik";
import { Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { connect } from "react-redux";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import ToastView from "../../components/toast/Toast";
import { login } from "../../store/actions/login";

const Login = (props) => {
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
    if (props.signUpProps.loginSuccess) {
      setShowToast(true);
      setTimeout(() => {
        if((props.location.state || {}).from === 'create'){
          props.history.push(`${process.env.PUBLIC_URL}/create`,{from:'createAfterLogin'});
        }else{
          props.history.push(`${process.env.PUBLIC_URL}/`);
        }
      }, 1000);
    }
    //if error occured stop loader
    if (props.signUpProps.loginError) {
      setShowErrorToaster(true);
    }
  }, [
    props.signUpProps.loginSuccess,
    props.signUpProps.loginError,
    props.history,
    props.location.state
  ]);

  const handleSubmit = (values) => {
    props.login(values);
  };
  return (
    <>
      <ToastView
        icon={faCheck}
        setShow={(showStatus) => setShowToast(showStatus)}
        show={showToast}
        text="Successfully Logged In"
        color="#adf4ce"
        backgroundColor="#00823e"
      />
      <ToastView
        icon={faTimes}
        setShow={(showStatus) => setShowErrorToaster(showStatus)}
        show={showErrorToaster}
        text={props.signUpProps.loginError}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className={`container ${styles.background}`}>
        <div className={styles.cardBody}>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <h3 style={{ textAlign: "center" }}>Login</h3>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  username: Yup.string().required("Username is required feild"),
                  password: Yup.string().required(
                    "Password is required feiled"
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

                    <Button
                      variant="dark"
                      className={styles.button}
                      onClick={formprops.handleSubmit}
                    >
                      {props.signUpProps.loginLoadding ? (
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
              <h6 style={{ textAlign: "center" }}>
                Not a member yet ?{" "}
                <div style={{textDecorationLine: 'underline',color:'#4a47a3'}}
                  onClick={() => {
                    props.history.push("register", {
                      from: (props.location.state || {}).from || null,
                    });
                  }}
                >
                  Register
                </div>
              </h6>
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

export default connect(mapStateToProps, { login })(withRouter(Login));
