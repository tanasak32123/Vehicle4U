import { Button, Modal } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export default function SucessModal({ show, onHide }: any) {
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
        <h4 className={`text-center`}>สมัครสมาชิกสำเร็จ</h4>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex justify-content-center`}>
        <Button
          className={`orange_btn`}
          onClick={() => {
            onHide();
          }}
        >
          เข้าสู่ระบบ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
