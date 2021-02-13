import React, { useEffect, useState } from "react";
import styles from "./CreateWeb.module.css";
import { Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { propTypes } from "react-bootstrap/esm/Image";

const CreateWeb = () => {
  const [files, setFiles] = useState([]);
  let filesRef;
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  const handleChange = (e) => {
    setFiles([]);
    if (e?.target?.files) {
      const files = Array.from(e.target.files);
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

  console.log(files, "images");
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
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
                  cname: "",
                  about: "",
                  address: "",
                  email: "",
                  pnumber: "",
                  photos: [],
                }}
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
                          onClick={formprops.handleSubmit}
                        >
                          save changes
                        </Button>
                      </div>
                      {/* {formprops.errors.cname} */}
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
                          className={styles.buttonSm}
                          onClick={formprops.handleSubmit}
                        >
                          save changes
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
                          size="sm"
                          className={styles.buttonSm}
                          onClick={formprops.handleSubmit}
                        >
                          save changes
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
                      </div>
                      <div className="col-lg-3">
                        <Button
                          variant="dark"
                          size="sm"
                          className={styles.buttonSm}
                          onClick={formprops.handleSubmit}
                        >
                          save changes
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
                          className={styles.buttonSm}
                          onClick={formprops.handleSubmit}
                        >
                          save changes
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
                          className={styles.button}
                          onClick={() => {
                            if (filesRef) {
                              filesRef.click();
                            }
                          }}
                        >
                          Browse
                        </Button>
                        {files.length !== 0 ? (
                          <div className="row">
                            {files.map((item, index) => {
                              return (
                                <div className="col-lg-4">
                                  <img
                                    src={item}
                                    alt="uploded"
                                    key={index}
                                    class={`img-thumbnail my-3 ${styles.image}`}
                                  />
                                </div>
                              );
                            })}
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
                        >
                          Create web site
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

export default CreateWeb;
