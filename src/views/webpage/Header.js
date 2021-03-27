import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import styles from "./Webpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { authenticated } from "../../hoc/authenticated";
import { propTypes } from "react-bootstrap/esm/Image";

//created website header
const Header = ({ history,location }) => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar}>
      {!authenticated() && (
        <Button
          variant="dark"
          className={styles.button}
          onClick={() => {
            history.push("login", { from: "create" });
          }}
        >
          Login to Create
        </Button>
      )}
      {location && location === "create" && <Button
          variant="dark"
          className={`${styles.button} ml-2`}
          onClick={() => {
            history.push("create");
          }}
        >
          Edit
        </Button>}
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
          <Nav.Link className={styles.navItem}>
            {" "}
            <FontAwesomeIcon icon={faImage} /> Gallery
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
