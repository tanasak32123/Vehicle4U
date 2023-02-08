import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/components/navbar.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const [login, setLogin] = useState("register");

  const userLogout = () => {
    sessionStorage.removeItem("status_login");
  };

  const userLogin = () => {
    sessionStorage.setItem("status_login", "login");
    router.push("/about_us");
  };

  useEffect(() => {
    var status = sessionStorage.getItem("status_login");
    if (status == null || status == "register") {
      status = "register";
    } else {
      status = "login";
    }
    sessionStorage.setItem("status_login", status);
    setLogin(status);
  }, []);

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
              <Nav.Link href="#search">ค้นหายานพาหนะ</Nav.Link>
              <Nav.Link href="/about_us">เกี่ยวกับเรา</Nav.Link>
            </Nav>

            <Nav>
              {login == "register" && (
                <>
                  <Nav.Link onClick={userLogin}>เข้าสู่ระบบ</Nav.Link>
                  <Nav.Link href="/signup" className={`${styles.signup}`}>
                    สมัครสมาชิก
                  </Nav.Link>
                </>
              )}
              {login == "login" && (
                <>
                  <NavDropdown title="โปรไฟล์" id="collasible-nav-dropdown">
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
