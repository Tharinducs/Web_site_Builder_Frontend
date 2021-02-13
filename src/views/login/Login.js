import React, { useEffect } from "react";
import styles from "./Login.module.css";
import { Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

const Login = () => {
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
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
                        onBlur={formprops.handleBlur('username')}
                        className={styles.formInput}
                      />
                      {formprops.touched.username &&
                      formprops.errors.username ? (
                        <div className={styles.errorMessage}>{formprops.errors.username}</div>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        value={formprops.values.password}
                        onChange={formprops.handleChange("password")}
                        onBlur={formprops.handleBlur('password')}
                        className={styles.formInput}
                      />
                      {formprops.touched.password &&
                      formprops.errors.password ? (
                        <div className={styles.errorMessage}>{formprops.errors.password}</div>
                      ) : null}
                    </div>

                    <Button variant="dark" className={styles.button} onClick={formprops.handleSubmit}>LOGIN</Button>
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

export default Login;
