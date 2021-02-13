import React from "react";
import Header from "../components/headerhome";

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
