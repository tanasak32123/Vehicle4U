import { Modal } from "react-bootstrap";
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <h3 className={`text-center`}>
          คุณยืนยันที่จะส่งมอบรถให้ผู้เช่าหรือไม่
        </h3> */}
      </Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>ส่งมอบรถ</h4>
        <p className={`text-center mb-0`}>
          คุณยืนยันที่จะส่งมอบรถให้ผู้เช่าหรือไม่
        </p>
        {/* <h3 className={`text-center`}>
          คุณยืนยันที่จะส่งมอบรถให้ผู้เช่าหรือไม่
        </h3> */}
        <div className={styles.icon_div}>
          <AiFillQuestionCircle size={100} className={styles.icon} />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center pt-0">
        <div>
          <div className="mb-2">
            <small className="text-danger">
              <b>Note:</b>
              &nbsp;กรุณากดยืนยันเมื่อคุณได้นัดพบและตกลงกับผู้เช่าแล้วเท่านั้น
              !!
            </small>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className={`${styles.confirm_btn} p-3`}
              onClick={handleConfirm}
            >
              ยืนยัน
            </button>
            <button
              className={`${styles.cancel_btn} p-3`}
              onClick={handleReject}
            >
              ปฏิเสธ
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
