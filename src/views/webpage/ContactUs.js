import React from "react";
import styles from "./Webpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin,faEnvelope,faMobile } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div className={styles.aboutBack}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5"></div>
          <div className="col-lg-2">
            <div className={styles.sectiontitle}>
              <h2>CONTACT US</h2>
            </div>
          </div>
          <div className="col-lg-5"></div>
        </div>
        <p style={{ textAlign: "center" }} className="pb-3">
          We are like to here from you. Contact Us anytime from any of folowing
          method
        </p>
        <div className="row pt-3">
          <div className="col-lg-4">
            <div className={styles.iconContainer}>
              <div className="row">
                <FontAwesomeIcon
                  icon={faMapPin}
                  size="4x"
                  style={{ textAlign: "center" }}
                />
              </div>
              <div>
                <h2>Address</h2>
              </div>
            </div>
            <div className={styles.textContainer}></div>
          </div>
          <div className="col-lg-4">
          <div className={styles.iconContainer}>
              <div className="row">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="4x"
                  style={{ textAlign: "center" }}
                />
              </div>
              <div>
                <h2>Email</h2>
              </div>
            </div>
            <div className={styles.textContainer}></div>
          </div>
          <div className="col-lg-4">
          <div className={styles.iconContainer}>
              <div className="row">
                <FontAwesomeIcon
                  icon={faMobile}
                  size="4x"
                  style={{ textAlign: "center" }}
                />
              </div>
              <div>
                <h2>Phone Number</h2>
              </div>
            </div>
            <div className={styles.textContainer}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
