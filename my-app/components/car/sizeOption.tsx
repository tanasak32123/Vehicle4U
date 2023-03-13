import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "@/styles/updateCar.module.css";
import { FiEdit2 } from "react-icons/fi";

export default function SizeOption() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <button onClick={handleShow} className={`${styles.edit_button}`}>
        <FiEdit2 /> &nbsp; แก้ไข
      </button>

      <Modal
        show={showModal}
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
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>เลือกขนาดของรถยนต์</Form.Label>
              <Form.Control
                className={`${styles.input}`}
                as="select"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">กรุณาเลือกขนาดของรถยนต์</option>
                <option value="option1">เล็ก</option>
                <option value="option2">กลาง</option>
                <option value="option3">ใหญ่</option>
              </Form.Control>
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
