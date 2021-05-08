import React, { useEffect, useState } from "react";
import Header from "./Header";
import Intro from "./WebIntro";
import About from "./About";
import ContactUs from "./ContactUs";
import ImageGallery from "./ImageGallery";
import styles from "./Webpage.module.css";
import { withRouter } from "react-router-dom";
import { authenticated } from "../../hoc/authenticated";

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
    if(state && !props.location.state.from){
      props.history.push(`${process.env.PUBLIC_URL}/`);
    }
    if(props.location?.state?.from === 'create'){
       getLocalStorageData()
    }else{
      if(!authenticated()){
        props.history.push(`${process.env.PUBLIC_URL}/`);
      }else{
        if (
          state &&
          state.websiteData &&
          Object.keys(state.websiteData).length !== 0
        ) {//check wether data exists
          setWebSite(state.websiteData);
        } else {//redirect to profile if not
          props.history.push(`${process.env.PUBLIC_URL}/profile`);
        }
      }
      
    }
  }, []);

  const getLocalStorageData = async () =>{
    const data = JSON.parse(localStorage.getItem('formData'))
     setWebSite(data)
  }
  

  return (
    <>
      <Header history={props.history} location={props.location?.state?.from}/>
      <div className={styles.back}>
        <div>
            {website && <Intro image={styles.moduler} cname={props.location?.state?.from === 'create' ? website.cname : website.companyName} uCover={website?.cover}/>}
        </div>
        {website && (
          <>
            <About website={website} from={props.location?.state?.from}/>
            <ContactUs website={website} from={props.location?.state?.from}/>
            <ImageGallery website={website} from={props.location?.state?.from}/>
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(Webpage);
