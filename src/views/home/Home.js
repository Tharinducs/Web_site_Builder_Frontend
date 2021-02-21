import React from "react";
import Intro from "./Intro";
import About from "./About";
import Services from "./Services";
import { withRouter } from "react-router-dom";

const Home = (props) => {
  return (
    <>
      <Intro history={props.history}/>
      <About />
      <Services />
    </>
  );
};

export default withRouter(Home);
