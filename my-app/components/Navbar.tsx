import { useState } from "react";

import { useAuth } from "./AuthContext";

//css
import Skeleton from "react-loading-skeleton";
import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import styles from "styles/components/navbar.module.css";

const Header = () => {
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
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`mt-2 mt-lg-0`}
          >
            <Nav className="me-auto">
              {isLoading ? (
                <>
                  <Skeleton width={90} height={25} className={`me-4`} />
                  <Skeleton width={90} height={25} className={`me-4`} />
                  <Skeleton width={90} height={25} />
                </>
              ) : (
                <>
                  <hr />
                  {auth?.role == "renter" && (
                    <Nav.Link href="/vehicle">ค้นหายานพาหนะ</Nav.Link>
                  )}
                  {/* <Nav.Link href="/about_us">เกี่ยวกับเรา</Nav.Link> */}
                  {auth?.role == "provider" && (
                    <>
                      <Nav.Link href={`/vehicle/owner`}>รถเช่าของคุณ</Nav.Link>
                      {/* <Nav.Link href="/vehicle/create">เพิ่มรถเช่า</Nav.Link> */}
                    </>
                  )}
                  <hr />
                </>
              )}
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
                    <NavDropdown.Item href={`/user/profile`}>
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
                  <Nav.Link href="/user/signup" className={`orange_btn px-3`}>
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
};

const LogoutModal = ({ show, onHide, authAction }: any) => {
  const handleLogout = () => {
    authAction.logout();
    onHide();
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
};

export default Header;
