import React from "react";
import styles from "./Home.module.css";
import site from "../../assets/img/site.jpg";

const About = () => {
  return (
    <div className={`${styles.aboutus} mt-4`} id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8 col-md-12">
            <div className="about-us-content mb-100">
              <div className={styles.sectiontitle}>
                <p>about us</p>
                <h2>
                  <span>Let Us</span> Tell Our Story
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
              <p className={`${styles.aboutusbodytext} mt-2`}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy
              </p>
              <p className={`${styles.aboutusbodytext} mt-2`}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-md-12">
            <img className={styles.aboutusimage} src={site} alt="site" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
