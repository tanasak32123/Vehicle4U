import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import styles from "@/styles/updateCar.module.css";

export default function CarModal({
  title,
  id,
  type,
  inputs,
  newData,
  invalid,
  setInvalid,
  isShowModal,
  setShowModalFunc,
  handleupdateFunc,
  car,
}: {
  title: string;
  id: string;
  type: string;
  inputs: Array<object>;
  newData: Array<string>;
  invalid: string;
  setInvalid: any;
  isShowModal: boolean;
  setShowModalFunc: any;
  handleupdateFunc: Function;
  car: object;
}) {
  async function handleSubmit(
    name: string,
    newData: string[],
    handleupdateFunc: any,
    setShowModalFunc: any
  ) {
    console.log(inputs);
    const success: boolean = await handleupdateFunc(name, newData);
    if (success) {
      setShowModalFunc(false);
    }
  }

  return (
    <>
      {" "}
      <Modal
        id={`modal_${id}`}
        size="lg"
        show={isShowModal}
        onHide={() => {
          setInvalid("");
          setShowModalFunc(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row key={id}>
                {inputs?.map((element: any) => {
                  return (
                    <Col key={element.name} lg={12}>
                      <Form.Label className="mb-3" name={element.name}>
                        {element.label}
                      </Form.Label>
                      {type != "select" ? (
                        <Form.Control
                          name={element.name}
                          className={`${styles.input}`}
                          type={type}
                          value={element.currentValue}
                          autoFocus
                          onChange={(event) => {
                            element.setValue(
                              event.target.value.trim().replace("-", "")
                            );
                          }}
                        />
                      ) : (
                        <Form.Select
                          key={id}
                          aria-label={id}
                          onChange={(event) => {
                            element.setValue(event.target.value);
                          }}
                          className={`${styles.input} mb-3`}
                          defaultValue={element.value}
                        >
                          {element.options.map((option: any) => {
                            return (
                              <option key={option.en} value={option.en}>
                                {option.th}
                              </option>
                            );
                          })}
                        </Form.Select>
                      )}
                    </Col>
                  );
                })}
                <Col lg={12}>
                  <small className={styles.feedback}>{invalid}</small>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={`${styles.modal_footer}`}>
          <Button
            className={`${styles.close_btn} mx-2`}
            onClick={(event) => {
              event.preventDefault();
              setInvalid("");
              setShowModalFunc(false);
            }}
          >
            ปิด
          </Button>
          <Button
            className={`${styles.save_btn} mx-2`}
            onClick={(event) => {
              event.preventDefault();
              handleSubmit(id, newData, handleupdateFunc, setShowModalFunc);
            }}
          >
            แก้ไข
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
