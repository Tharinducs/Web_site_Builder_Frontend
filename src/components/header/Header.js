import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faClipboardList,
  faSignInAlt,
  faSignOutAlt,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import {authenticated} from "../../hoc/authenticated";
import { withRouter } from "react-router-dom";
import Scroll from "react-scroll";
const ScrollLink = Scroll.ScrollLink;

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar} fixed="top">
      {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link
            href={`${process.env.PUBLIC_URL}/`}
            className={styles.navItem}
          >
            {" "}
            <FontAwesomeIcon icon={faHome} /> Home
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              const section = document.querySelector("#about");
              section &&
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={styles.navItem}
          >
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              const section = document.querySelector("#services");
              section &&
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={styles.navItem}
          >
            {" "}
            <FontAwesomeIcon icon={faClipboardList} /> Services
          </Nav.Link>
          {!authenticated() && (
            <Nav.Link
              onClick={()=>props.history.push(`${process.env.PUBLIC_URL}/register`)}
              className={styles.navItem}
            >
              {" "}
              <FontAwesomeIcon icon={faSignInAlt} /> Register
            </Nav.Link>
          )}
          {!authenticated() && (
            <Nav.Link
             onClick={()=>props.history.push(`${process.env.PUBLIC_URL}/login`)}
              className={styles.navItem}
            >
              {" "}
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Nav.Link>
          )}
          {authenticated() && (
            <Nav.Link
              className={styles.navItem}
              onClick={()=>props.history.push(`${process.env.PUBLIC_URL}/profile`)}
            >
              {" "}
              <FontAwesomeIcon icon={faUserAlt} /> Profile
            </Nav.Link>
            
          )}
          {authenticated() && (
            <Nav.Link
              className={styles.navItem}
              href={`${process.env.PUBLIC_URL}/`}
              onClick={() => {
                localStorage.removeItem("loginToken");
                props.history.push(`${process.env.PUBLIC_URL}/`)
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Nav.Link>
            
          )}
           
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default (withRouter(Header));
