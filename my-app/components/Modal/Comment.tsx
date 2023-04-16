import router from "next/router";
import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import styles from "@/styles/components/reviewmodel.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import ReactStars from "react-stars";

export default function ReviewModal({ show, onHide, value, onClose }: any) {
  const [error, setError] = useState("");
  const scoreRef = useRef<any>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const req_id = value.request_id;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        req_id,
        review: reviewRef.current?.value,
        score: scoreRef.current.state.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) {
          return setError(res.error);
        }
        if (res?.success) {
          document
            .getElementById(`comment_btn_${value.request_id}`)
            ?.classList.add(`d-none`);
          toast.success("ทำการรีวิวสำเร็จ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          onClose();
        }
      });
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={`modal_wo_border`}></Modal.Header>
      <Modal.Body>
        <h3 className={`${styles.review_text} mb-2 text-center`}>
          รีวิวยานพานหนะ
        </h3>
        <label htmlFor="comment" className="mb-1">
          ความคิดเห็น หรือ ข้อเสนอแนะ
        </label>
        <textarea
          ref={reviewRef}
          className={`${styles.textarea} mb-3`}
          id="comment"
          placeholder="โปรดใส่รีวิวของคุณ"
          rows={4}
        />
        <div className="d-flex align-items-center">
          <div>
            <label>คะแนนความพึงพอใจ</label>
            <small className={"red_color"}>&nbsp;*</small>
          </div>
          <div className={`${styles.feedback}`}>{error}</div>
        </div>
        <ReactStars
          ref={scoreRef}
          count={5}
          size={24}
          color2={"#ffd700"}
          half={false}
        />
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex`}>
        <button
          className={styles.submit_btn}
          onClick={(event: any) => {
            handleSubmit(event);
          }}
        >
          ยืนยัน
        </button>
      </Modal.Footer>
    </Modal>
  );
}
