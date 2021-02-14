import React from "react";
import styles from "./Home.module.css";
import creativity from "../../assets/img/creativity.jpg"
import easy from "../../assets/img/easy.jpg"
import best from "../../assets/img/best.jpg"

const Services = () => {
  return (
    <>
      <section className={`${styles.services} mt-4 pb-5`} id="services">
        <div className="container">
          <div className="row">
            <div className="col-12">{/* <img src="assets/img/18.jpg"> */}</div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 col-lg">
              <div className={styles.singlebenifit}>
                <img src={best} alt="best"/>
                <h5 className="mt-2">Best Services</h5>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-lg">
              <div className={styles.singlebenifit}>
                <img src={creativity} alt="creativity"/>
                <h5 className="mt-2">Creative webpage</h5>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-lg">
              <div className={styles.singlebenifit}>
                <img src={easy} alt="easy"/>
                <h5 className="mt-2">Easy development</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
