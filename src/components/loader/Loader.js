import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5"></div>
          <div className="col-lg-2">
            <div className={styles.loaderContent}>
              {/* <div className="loader-image-main" > */}
              <Spinner animation="border" />
              {/* <img src={require("../../assets/img/loader.png")} className="loader-image" /> */}
              {/* </div> */}
            </div>
          </div>
          <div className="col-lg-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
