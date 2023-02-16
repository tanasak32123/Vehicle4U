import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/components/navbar.module.css";
import { useAuthContext } from "./auth";

export default function Header() {
  const { user, isAuthenticate, loading, authAction }: any = useAuthContext();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={styles.nav}>
        <Container>
          <Navbar.Brand className={`px-3 ${styles.brand}`} href="/">
            VEHICLE4U
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/searchcar">ค้นหายานพาหนะ</Nav.Link>
              <Nav.Link href="/about_us">เกี่ยวกับเรา</Nav.Link>
            </Nav>

            <Nav>
              {!isAuthenticate && (
                <>
                  <Nav.Link href="/">เข้าสู่ระบบ</Nav.Link>
                  <Nav.Link href="/signup" className={`${styles.signup}`}>
                    สมัครสมาชิก
                  </Nav.Link>
                </>
              )}
              {isAuthenticate && (
                <>
                  <NavDropdown
                    title={user.username}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href={`/profile`}>
                      โปรไฟล์ของฉัน
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={authAction.logout}>
                      ล็อกเอาท์
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
