import { Container, Navbar } from "react-bootstrap";
// import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className={styles.nav}>
      <Container>
        <Navbar.Brand className={`px-3 ${styles.brand}`} href="#home">
          VEHICLE4U
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto">
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
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
