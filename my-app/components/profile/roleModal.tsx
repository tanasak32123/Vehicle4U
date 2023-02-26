import { Button, Modal } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export default function RoleModal({ show, onHide, role }: any) {
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
        <h4 className={`text-center`}>
          <FaCheckCircle className={`green_color`} />
        </h4>
        <h4 className={`text-center`}>เปลี่ยนบทบาทสำเร็จ</h4>
        <p className={`text-center`}>
          ตอนนี้บทบาทของคุณคือ "
          {role == "provider" ? "ผู้ปล่อยเช่า" : "ผู้เช่า"}"
        </p>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex justify-content-center`}>
        <Button
          onClick={() => {
            onHide();
          }}
          variant="primary"
        >
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
