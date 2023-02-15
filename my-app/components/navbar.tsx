import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/components/navbar.module.css";
import { useRouter } from "next/router";
import { getCookie, removeCookies } from "cookies-next";

export default function Header() {
  const router = useRouter();

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");

  const userLogout = () => {
    removeCookies("token");
    sessionStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    setLogin(sessionStorage.token != undefined);
    if (login) {
      setUsername(sessionStorage.username);
    }
  });

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
              {!login && (
                <>
                  <Nav.Link href="/">เข้าสู่ระบบ</Nav.Link>
                  <Nav.Link href="/signup" className={`${styles.signup}`}>
                    สมัครสมาชิก
                  </Nav.Link>
                </>
              )}
              {login && (
                <>
                  <NavDropdown title={username} id="collasible-nav-dropdown">
                    <NavDropdown.Item href={`/profile`}>
                      โปรไฟล์ของฉัน
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={userLogout}>
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
