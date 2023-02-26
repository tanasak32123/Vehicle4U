import { Button, Modal } from "react-bootstrap";
import styles from "@/styles/signup.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function SelectRoleModal({ show, onHide }: any) {
  const router = useRouter();

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={`static`}
      centered
    >
      <Modal.Header className={`modal_wo_border`}>
        <Link
          href=""
          onClick={() => router.back()}
          className={`text-start ${styles.back_link}`}
        >
          <small>
            <FaArrowAltCircleLeft /> ย้อนกลับ
          </small>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>กรุณาเลือกบทบาทที่คุณต้องการสมัคร</h4>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex justify-content-center`}>
        <Button
          className={`orange_btn ${styles.role} mx-3`}
          onClick={() => {
            onHide("renter");
          }}
        >
          <h6 className="mb-0 text-center">ผู้เช่า</h6>
        </Button>
        <Button
          className={`orange_btn ${styles.role} mx-3`}
          onClick={() => {
            onHide("provider");
          }}
        >
          <h6 className="mb-0 text-center">ผู้ปล่อยเช่า</h6>
        </Button>
      </Modal.Footer>
      <br />
    </Modal>
  );
}
