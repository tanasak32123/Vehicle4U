import router from "next/router";
import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import styles from "@/styles/components/reviewmodel.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import ReactStars from 'react-stars'

export default function ReviewModal({ show, onHide, value, onClose }: any) {

    const [error,setError] = useState("");
    const [review,setReview] = useState("");
    const [score,setScore] = useState(0);
    const req_id = value.request_id;


    const handleClose = () => {
        onClose();
    };

    async function handleSubmit(event: Event) {
        event.preventDefault();
        await fetch("/api/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            req_id,
            review,
            score,
          }),
        })
        .then((res) => res.json())          
        .then((res) => {
            console.log(res);
            if (res?.error) {
                return setError(res.error);
            }
            if (res?.success) {
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
                router.replace("/vehicle/renter");
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
          <div className={styles.review_div}>
            <label className={styles.review_text}>รีวิวยานพานหนะ</label>
          </div>
          <br></br>
          <label>ความคิดเห็น หรือ ข้อเสนอแนะ</label>
          <div>
            <textarea
                    className={styles.textarea}
                    id="exampleFormControlTextarea2"
                    placeholder="โปรดใส่รีวิวของคุณ"
                    onChange={(event) => {setReview(event.target.value.trim()); 
                        // console.log(event.target.value.trim());
                    }}
                    rows={4}
                ></textarea>
          </div>
          <div className={`${styles.feedback}`}>{error}</div>
          <div>
            <Row>
                <Col><label>คะแนนความพึงพอใจ:</label><small className={"red_color"}>(*จำเป็น)</small></Col>
                <Col>
                    <ReactStars
                    count={5}
                    size={24}
                    color2={'#ffd700'} 
                    half = {false}
                    onChange={setScore}
                    />
                </Col>
            </Row>
          </div>
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
        {/* <button onClick={handleClose}>exit</button> */}
        </Modal.Footer>
      </Modal>
    );
  }



// function UseState(): [any, any] {
//     throw new Error("Function not implemented.");
// }
  