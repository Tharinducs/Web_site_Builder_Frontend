import React, { useEffect, useState } from "react";
import Header from "./Header";
import Intro from "./WebIntro";
import About from "./About";
import ContactUs from "./ContactUs";
import ImageGallery from "./ImageGallery";
import styles from "./Webpage.module.css";
import { withRouter } from "react-router-dom";

//created web page rendering
const Webpage = (props) => {
  const [website, setWebSite] = useState(null);

  //add a diferent background colours on diferent pages
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  //access the website data from url state data
  useEffect(() => {
    const state = props.location.state;
    if (
      state &&
      state.websiteData &&
      Object.keys(state.websiteData).length !== 0
    ) {//check wether data exists
      setWebSite(state.websiteData);
    } else {//redirect to profile if not
      props.history.push(`${process.env.PUBLIC_URL}/profile`);
    }
  }, []);

  return (
    <>
      <Header />
      <div className={styles.back}>
        <div>
          {/* render diferent cover photo opon the website type */}
          {website && website.type && website.type === "Resturant" && (
            <Intro image={styles.moduler} cname={website.companyName} />
          )}
          {website && website.type && website.type === "Fashion" && (
            <Intro image={styles.modulef} cname={website.companyName} />
          )}
          {website && website.type && website.type === "Online Store" && (
            <Intro image={styles.moduleg} cname={website.companyName} />
          )}
          {website && website.type && website.type === "Travel" && (
            <Intro image={styles.modulet} cname={website.companyName} />
          )}
        </div>
        {website && (
          <>
            <About website={website} />
            <ContactUs website={website} />
            <ImageGallery website={website} />
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(Webpage);
