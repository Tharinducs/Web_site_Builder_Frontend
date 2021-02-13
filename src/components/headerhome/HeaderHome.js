import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome
} from "@fortawesome/free-solid-svg-icons";
import styles from './HeaderHome.module.css'

const Header = () => {
  return (
    <Navbar expand="lg" className="justify-content-end">
      <Nav >
        <Nav.Link href={`${process.env.PUBLIC_URL}/`} className={styles.navItem}>
          <FontAwesomeIcon icon={faHome} size="2x" className={styles.homeIcon}/>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
