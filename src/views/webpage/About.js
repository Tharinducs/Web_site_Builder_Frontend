import React from "react";
import styles from "./Webpage.module.css";
import about from "../../assets/img/about.jpg";


const About = ({website}) => {
  return (
    <div className={styles.aboutBack} id="webA">
      <div className="container pt-3 pb-5">
      <div className="row align-items-center">
          <div className="col-12 col-lg-7 col-md-12">
            <div className="about-us-content mb-100">
              <div className={styles.sectiontitle}>
                <h2>
                  <span>ABOUT US</span>
                </h2>
              </div>
              <p className={`${styles.aboutusbodytext} mt-5`}>
               {website.about}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-md-12">
            <img className={styles.aboutusimage} src={about} alt="about" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
