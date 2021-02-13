import React, { useEffect } from "react";
import styles from "./Register.module.css";
import { Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

const Register = () => {
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
                      {formprops.touched.email &&
                      formprops.errors.email ? (
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
                      onClick={formprops.handleSubmit}
                    >
                      LOGIN
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

export default Register;
