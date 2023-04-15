import router from "next/router";
import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import styles from "@/styles/components/reviewmodel.module.css";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ReviewModal({ show, onHide, value }: any) {

    const [error,setError] = useState("adsfaeasdf");
    const [review,setReview] = useState("");
    const req_id = value.request_id;


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
          }),
        })
        .then((res) => res.json())          
        .then((res) => {
            if (res?.errors) {
                return setError(res.errors);
            }
            if (!res.success) {
                if (res?.message == "Vehicle is already rented") {
                  toast.error("รถคันนี้ถูกแล้วจองในช่วงเวลานี้", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
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
            <small className={"red_color"}>(*จำเป็น)</small>
          </div>
          <br></br>
          <div className={`${styles.feedback}`}>
            {error}
          </div>
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
        </Modal.Body>
        <Modal.Footer className={`modal_wo_border d-flex`}>
        <button
                className={styles.submit_btn}
                onClick={(event: any) => {
                  handleSubmit(event);
                }}
              >
                ยืนยันการเช่า
              </button>
        </Modal.Footer>
      </Modal>
    );
  }



// function UseState(): [any, any] {
//     throw new Error("Function not implemented.");
// }
  