import React from "react";
import styles from "./Webpage.module.css";

const ImageGallery = () => {
  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className={styles.sectiontitle}>
            <h2 style={{ textAlign: "center" }}>
              IMAGE GALLERY
            </h2>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
      <div className="row mt-4 pb-4">
        <div className="col-lg-4">
          <img
            src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
            alt="gimage"
            className={styles.gImage}
          />
        </div>
        <div className="col-lg-4">
          <img
            src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
            alt="gimage"
            className={styles.gImage}
          />
        </div>
        <div className="col-lg-4">
          <img
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            alt="gimage"
            className={styles.gImage}
          />
        </div>
      </div>
      <div className="row mt-4 pb-3">
        <div className="col-lg-4">
        <img
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            alt="gimage"
            className={styles.gImage}
          />
        </div>
        <div className="col-lg-4">
          <img
            src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
            alt="gimage"
            className={styles.gImage}
          />
        </div>
        <div className="col-lg-4">
          
          <img
            src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
            alt="gimage"
            className={styles.gImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
