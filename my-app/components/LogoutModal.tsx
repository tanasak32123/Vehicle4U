import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";

export default function LogoutModal({ show, onHide, authAction }: any) {
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
