import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import styles from "../styles/components/navbar.module.css";
import { useAuth } from "./authContext";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useRouter } from "next/router";

function MyVerticallyCenteredModal({ show, onHide, authAction }: any) {
  const router = useRouter();

  const handleLogout = () => {
    authAction.logout();
    onHide();
    router.push("/");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={`modal_wo_border`}></Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>ออกจากระบบ</h4>
        <p className={`text-center`}>คุณยืนยันที่จะออกจากระบบหรือไม่</p>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex`}>
        <Button className={`me-auto`} onClick={onHide}>
          ยกเลิก
        </Button>
        <Button onClick={handleLogout} variant="danger">
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

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

      <MyVerticallyCenteredModal
        show={showSignout}
        onHide={() => setShowSignout(false)}
        authAction={authAction}
      />
    </>
  );
}
