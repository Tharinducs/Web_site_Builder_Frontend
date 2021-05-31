import React from "react";
import styles from "./Webpage.module.css";
import { Button } from "react-bootstrap";
import { API_DOMAIN } from "../../_helpers/constant";

//component to render banner image
const Intro = ({ image, cname, uCover }) => {
  return (
    <div
      id="intro"
      style={{
        backgroundImage: "url("+uCover+")",
        backgroundPosition:"center",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'#000',
        width: "100%",
        height:300,
        marginTop:-50,
        textAlign:'center',
        color:'#fff'
      }}
    >
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
