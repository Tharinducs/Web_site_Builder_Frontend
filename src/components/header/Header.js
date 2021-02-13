import React from 'react'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faInfoCircle,faClipboardList,faSignInAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar}>
    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="ml-auto">
        <Nav.Link href="#home" className={styles.navItem}> <FontAwesomeIcon icon={faHome}/> Home</Nav.Link>
        <Nav.Link href="#link" className={styles.navItem}> <FontAwesomeIcon icon={faInfoCircle}/> About</Nav.Link>
        <Nav.Link href="#link" className={styles.navItem}> <FontAwesomeIcon icon={faClipboardList}/> Services</Nav.Link>
        <Nav.Link href={`${process.env.PUBLIC_URL}/register`} className={styles.navItem}> <FontAwesomeIcon icon={faSignInAlt}/> Register</Nav.Link>
        <Nav.Link href={`${process.env.PUBLIC_URL}/login`} className={styles.navItem}> <FontAwesomeIcon icon={faSignInAlt}/> Login</Nav.Link>
        <Nav.Link href="#link" className={styles.navItem}> <FontAwesomeIcon icon={faSignOutAlt}/> Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
}

export default Header
