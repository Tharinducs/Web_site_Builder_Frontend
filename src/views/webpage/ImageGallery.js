import React from "react";
import styles from "./Webpage.module.css";
import { API_DOMAIN } from "../../_helpers/constant";

//components to handle image gallery of the created website
const ImageGallery = ({ website }) => {
  const images = JSON.parse(website.uploads);//parsing json strings
  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className={styles.sectiontitle}>
            <h2 style={{ textAlign: "center" }}>IMAGE GALLERY</h2>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
      <div className="row mt-4 pb-5">
        {images.map((item,index)=>{
          return (<div className="col-lg-4 mb-3" key={index}>
          <img
            src={`${API_DOMAIN}/api/uploads/${item}`}
            alt="gimage"
            className={styles.gImage}
          />
        </div>)
        })}
       
      </div>
    </div>
  );
};

export default ImageGallery;
