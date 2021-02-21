import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Webpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";


//created website header
const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link
            onClick={() => {
              const section = document.querySelector("#webA");
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
              const section = document.querySelector("#contact");
              section &&
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={styles.navItem}
          >
            {" "}
            <FontAwesomeIcon icon={faClipboardList} /> Contact Us
          </Nav.Link>
          <Nav.Link
            className={styles.navItem}
          >
            {" "}
            <FontAwesomeIcon icon={faImage} /> Gallery
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
