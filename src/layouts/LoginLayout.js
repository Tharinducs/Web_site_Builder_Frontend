import React from "react";
import Header from "../components/headerhome";

//layout to handle other pages
const LoginLayout = (ViewComponent) => {
  return class extends React.Component {
    render() {
      return (
        <>
          <Header />
          <ViewComponent />
        </>
      );
    }
  };
};

export default LoginLayout;
