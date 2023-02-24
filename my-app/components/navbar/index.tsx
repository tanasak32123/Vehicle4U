import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../../styles/components/navbar.module.css";
import { useAuth } from "../authContext";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import LogoutModal from "./logoutModal";

export default function Header() {
  const { user, isAuthenticate, loading, authAction }: any = useAuth();

  const [showSignout, setShowSignout] = useState(false);

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
              {loading ? (
                <>
                  <Skeleton width={150} height={`100%`} />
                </>
              ) : isAuthenticate ? (
                <NavDropdown title={user.username} id="collasible-nav-dropdown">
                  <NavDropdown.Item href={`/profile`}>
                    โปรไฟล์ของฉัน
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => setShowSignout(true)}>
                    ออกจากระบบ
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link href="/">เข้าสู่ระบบ</Nav.Link>
                  <Nav.Link href="/signup" className={`${styles.signup}`}>
                    สมัครสมาชิก
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LogoutModal
        show={showSignout}
        onHide={() => setShowSignout(false)}
        authAction={authAction}
      />
    </>
  );
}