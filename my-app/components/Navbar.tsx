import { useState } from "react";
import dynamic from "next/dynamic";

import { useAuth } from "./AuthContext";

//css
import Skeleton from "react-loading-skeleton";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "styles/components/navbar.module.css";

const LogoutModal = dynamic(() => import("./LogoutModal"), {
  loading: () => <p>Loading...</p>,
});

export default function Header() {
  const { auth, isLoading, authAction } = useAuth();
  const [showSignout, setShowSignout] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={`${styles.nav}`}>
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
              {isLoading ? (
                <>
                  <Skeleton width={100} height={`80%`} />
                </>
              ) : auth?.status == "SIGNED_IN" ? (
                <>
                  <NavDropdown
                    title={`${auth?.user?.username} `}
                    id="collasible-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item href={`/profile`}>
                      โปรไฟล์ของฉัน
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => setShowSignout(true)}>
                      ออกจากระบบ
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/">เข้าสู่ระบบ</Nav.Link>
                  <Nav.Link href="/signup" className={`orange_btn px-3`}>
                    สมัครสมาชิก
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSignout && (
        <LogoutModal
          show={showSignout}
          onHide={() => setShowSignout(false)}
          authAction={authAction}
        />
      )}
    </>
  );
}
