import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "@/styles/updateCar.module.css";
import { FaUndoAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

export default function CarModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={`${styles.edit_button}`} onClick={handleShow}>
        <FiEdit2 /> &nbsp; แก้ไข
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลรถยนต์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>lorem ipsum</Form.Label>
              <Form.Control
                className={`${styles.input}`}
                type="email"
                placeholder="lorem ipsum"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={`${styles.modal_footer}`}>
          <Button className={`${styles.close_btn} mx-2`} onClick={handleClose}>
            ปิด
          </Button>
          <Button className={`${styles.save_btn} mx-2`} onClick={handleClose}>
            แก้ไข
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
