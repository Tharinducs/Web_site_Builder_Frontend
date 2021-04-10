import React, { useEffect,useState } from "react";
import styles from "./Category.module.css";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

const Category = (props) => {
  const [type,setType] =useState("")
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  return (
    <>
      <div className={`container ${styles.background}`}>
        <div className={styles.cardBody}>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <h2 className={styles.title} style={{ textAlign: "center" }}>
                Welcome to the website builder
              </h2>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-4"><span className={styles.selectLable} >Select a Category</span></div>
                <div className="col-lg-8">
                  <select name="type" id="type" className={styles.select} onChange={(event)=>{setType(event.nativeEvent.target.value)}}>
                    <option value="">-</option>
                    <option value="Resturant">Resturant</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
              </div>
              <div className="row">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-8">
                  <Button
                      variant="dark"
                      className={styles.button}
                      disabled={type === ""}
                      onClick={()=>{
                          localStorage.setItem("type",type)
                          localStorage.removeItem("formData");
                          setTimeout(() => {
                            props.history.push(`${process.env.PUBLIC_URL}/create`);
                          }, 1000);
                      }}
                    >
                      NEXT
                    </Button>
                  </div>
                  <div className="col-lg-2"></div>
              </div>
              
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Category);
