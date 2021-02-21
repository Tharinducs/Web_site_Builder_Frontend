import React from "react";
import styles from "./Webpage.module.css";
import { Button } from "react-bootstrap";

//component to render banner image
const Intro = ({image,cname}) => {
  return (
    <div id="intro" className={image}>
      <div className="module-inside intro-body">
        <div className="container">
          <div className="row mt-5">
            <div className={`col-lg-8 ${styles.introContent}`}>
              <div className="row">
                <h6 className={styles.welcomeText}>WELCOME TO </h6>
              </div>
              <div className="row">
                <h2 className={styles.welcomeTextSecond}>{cname}</h2>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
