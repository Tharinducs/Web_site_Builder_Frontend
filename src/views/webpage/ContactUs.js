import React from "react";
import styles from "./Webpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin,faEnvelope,faMobile } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div className={styles.aboutBack} id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-5"></div>
          <div className="col-lg-2">
            <div className={styles.sectiontitle}>
              <h2 style={{ textAlign: "center" }}>CONTACT US</h2>
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
                <FontAwesomeIcon
                  icon={faMapPin}
                  size="3x"
                  style={{ textAlign: "center",justifyContent:'center' }}
                />
              <div className="mt-3">
                <h3>Address</h3>
              </div>
            </div>
            <div className={`${styles.textContainer} pb-3`}>182,palanwatta,pannipitiya</div>
          </div>
          <div className="col-lg-4">
          <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="3x"
                  style={{ textAlign: "center" }}
                />
              <div className="mt-3">
                <h3>Email</h3>
              </div>
            </div>
            <div className={`${styles.textContainer} pb-3`}>t@gmail.com</div>
          </div>
          <div className="col-lg-4">
          <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={faMobile}
                  size="3x"
                  style={{ textAlign: "center" }}
                />
              <div className="mt-3">
                <h3>Phone Number</h3>
              </div>
            </div>
            <div className={`${styles.textContainer} pb-3`}>0714720861</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
