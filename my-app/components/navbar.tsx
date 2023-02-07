import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import Link from "next/link";
import styles from "../styles/navbar.module.css";


export default function Header() {

  const [login,setLogin] = useState(false)

  useEffect(() => {
    localStorage.setItem('login', '1');
    setLogin(localStorage.getItem('login')== '1')
  }, [login]);

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.nav}>
      <Container>
        <Navbar.Brand className={`px-3 ${styles.brand}`} href="/">
          VEHICLE4U
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

        <Nav className="me-auto">
          <Nav.Link href="#search">ค้นหายานพาหนะ</Nav.Link>
          <Nav.Link href="#contact">เกี่ยวกับเรา</Nav.Link>
        </Nav>

        <Nav>
          {!login && (<>
            <Nav.Link href="#register">เข้าสู่ระบบ</Nav.Link>
            <Nav.Link href="#register" className={`${styles.signup}`}>สมัครสมาชิก</Nav.Link>
          </>)}
          {login && (<>
            <NavDropdown title="โปรไฟล์" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">ตั้งค่า</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                แก้ไขโปรไฟล์
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">เปลี่ยนรหัสผ่าน</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                ลงชื่อออก
              </NavDropdown.Item>
            </NavDropdown>
          </>)}
        </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
