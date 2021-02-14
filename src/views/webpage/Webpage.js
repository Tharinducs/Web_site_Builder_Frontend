import React, { useEffect, useState } from "react";
import Header from "./Header";
import Intro from "./WebIntro";
import About from "./About";
import ContactUs from "./ContactUs"
import styles from "./Webpage.module.css";

const Webpage = () => {
  const [type, setType] = useState(null);
  let aboutRef
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  useEffect(() => {
    const type = localStorage.getItem("type");
    setType(type);
  }, []);
  return (
    <>
      <Header/>
      <div className={styles.back}>
        <div>
          {type && type === "Resturant" && (
            <Intro image={styles.moduler} cname="My Resturant" />
          )}
          {type && type === "Fashion" && (
            <Intro image={styles.modulef} cname="My Fashion" />
          )}
          {type && type === "Online Store" && (
            <Intro image={styles.moduleg} cname="My Grocery" />
          )}
          {type && type === "Travel" && (
            <Intro image={styles.modulet} cname="My Traval agency" />
          )}
        </div>
        <About/>
        <ContactUs />
      </div>
    </>
  );
};

export default Webpage;
