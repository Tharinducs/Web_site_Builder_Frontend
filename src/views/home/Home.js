import React from "react";
import styles from "./Home.module.css";
import {Button} from 'react-bootstrap'

const Home = () => {
  return (
    <div id="intro" className={styles.module}>
      <div className="module-inside intro-body">
        <div className="container">
          <div className="row mt-5">
            <div className={`col-lg-8 ${styles.introContent}`}>
              <div className="row">
                <h6 className={styles.welcomeText}>WELCOME TO </h6>
              </div>
              <div className="row">
                <h2 className={styles.welcomeTextSecond}>ONLINE</h2>
              </div>
              <div className="row">
                <h2 className={styles.welcomeTextSecond}>WEBSITE BUILDER</h2>
              </div>
              <div className="row">
              <Button variant="primary">Create Yours</Button>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
