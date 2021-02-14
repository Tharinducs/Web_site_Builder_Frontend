import React from "react";
import styles from "./Webpage.module.css";
import about from "../../assets/img/about.jpg";

const About = () => {
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
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
