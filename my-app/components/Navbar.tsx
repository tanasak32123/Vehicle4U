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
          <Navbar.Brand
            className={`px-3 ${styles.brand}`}
            href={`${auth?.role == "renter" ? "/" : "/provider/vehicle"}`}
          >
            <div className={`${styles.borderFont}`}>
              <h5>
                <span className={`${styles.title_VEHICLE}`}>VEHICLE</span>
                <span className={`${styles.title_4U}`}>4U</span>
              </h5>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`mt-2 mt-lg-0`}
          >
            <Nav className="me-auto">
              {!isLoading && (
                <>
                  <hr />
                  {auth?.status == "SIGNED_IN" && auth?.role == "renter" && (
                    <>
                      {/* <Nav.Link href="/vehicle">ค้นหายานพาหนะ</Nav.Link> */}
                      <Nav.Link href="/vehicle/renter">
                        ประวัติการเช่ารถ
                      </Nav.Link>
                    </>
                  )}
                  {/* <Nav.Link href="/about_us">เกี่ยวกับเรา</Nav.Link> */}
                  {auth?.status == "SIGNED_IN" && auth?.role == "provider" && (
                    <>
                      {/* <Nav.Link href={`/provider/vehicle`}>
                        รถเช่าของคุณ
                      </Nav.Link> */}
                      <Nav.Link href={`/provider/vehicle/status`}>
                        สถานะการจองรถ
                      </Nav.Link>
                    </>
                  )}
                  <hr />
                </>
              )}
            </Nav>

            <Nav>
              {!isLoading && auth?.status == "SIGNED_IN" && (
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
              )}
              {!isLoading && auth?.status == "SIGNED_OUT" && (
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
          setShowSignout={setShowSignout}
        />
      )}
    </>
  );
};

const LogoutModal = ({ show, onHide, authAction, setShowSignout }: any) => {
  const handleLogout = async () => {
    authAction.setIsLogout(true);
    await authAction.logout().then(() => {
      authAction.setIsLogout(false);
      setShowSignout(false);
    });
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
