import { Container, Modal, Row, Col } from "react-bootstrap";
import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import styles from "@/styles/components/confirmModal.module.css";

const ConfirmModal = ({ req_id, isShow, onHide, onConfirm, onReject }: any) => {
  async function handleConfirm() {
    const status = "in use";
    const response = await fetch("/api/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        req_id,
      }),
    });
    onConfirm();
    if (!response.ok) return;
  }

  const handleReject = () => {
    onReject();
  };

  return (
    <Modal
      show={isShow}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h1 className={`text-center`}>
          คุณยืนยันที่จะส่งมอบรถให้ผู้เช่าหรือไม่
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.icon_div}>
          <AiFillQuestionCircle className={styles.icon} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <p className="text-danger">
            <b className="text-danger">Note: </b>
            กรุณากดยืนยันเมื่อคุณได้นัดพบและตกลงกับผู้เช่าแล้วเท่านั้น !!
          </p>
          <Row className={styles.row}>
            <Col className={styles.col}>
              <button className={styles.confirm_btn} onClick={handleConfirm}>
                <h3 className={styles.btn_text}>ยืนยัน</h3>
              </button>
            </Col>
            <Col className={styles.col}>
              <button className={styles.cancel_btn} onClick={handleReject}>
                <h3>ปฏิเสธ</h3>
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
