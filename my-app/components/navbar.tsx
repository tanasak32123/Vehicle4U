import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import logo from "../public/react-icon.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Image
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          React Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {!isLogin && (
            <Nav>
              <Nav.Link href="#LogIn" className="px-3">
                Log In
              </Nav.Link>
              <Nav.Link
                href="#SignIn"
                className={`my-btn px-3 text-center ${styles.signInBtn}`}
              >
                Sign In
              </Nav.Link>
            </Nav>
          )}
          {isLogin && (
            <Nav>
              <DropdownButton id="dropdown-item-button" title="Dropdown button">
                {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                <Dropdown.Item as="button">Action</Dropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Item as="button">Another action</Dropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Item as="button">Something else</Dropdown.Item>
              </DropdownButton>
              {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
