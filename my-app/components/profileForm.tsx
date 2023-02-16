import styles from "@/styles/editProfile.module.css";
import { FiEdit2 } from "react-icons/fi";
import { Row, Col, Container, Modal, Form, Button } from "react-bootstrap";
import { FaUndoAlt } from "react-icons/fa";

export default function InputForm({
  name,
  label,
  input_type,
  inputs,
  rawData,
  newData,
  invalid,
  isShowModal,
  setShowModalFunc,
  handleupdateFunc,
  isShow,
}: any) {
  return (
    <>
      {isShow ? (
        <Container>
          <div className="mb-2">
            <Row>
              <label htmlFor={name}>
                <h6 className={styles.text}>{label}</h6>
              </label>
            </Row>
            <Row>
              <Col>
                <p>
                  {!rawData && "ไม่มีข้อมูล"}
                  {rawData && (
                    <>
                      {name == "payment_channel" ? (
                        <>
                          {rawData == "cash" && "เงินสด"}
                          {rawData == "promptpay" && "พร้อมเพย์"}
                          {rawData == "credit" && "บัตรเครดิต"}
                        </>
                      ) : (
                        <>
                          {name == "role" ? (
                            <>
                              {rawData == "renter" && `ผู้เช่า`}
                              {rawData == "provider" && `ผู้ปล่อยเช่า`}
                            </>
                          ) : (
                            <>{rawData && `${rawData}`}</>
                          )}
                        </>
                      )}
                    </>
                  )}
                </p>
              </Col>
              <Col key={2}>
                <button
                  className={`${styles.edit_button}`}
                  onClick={() => {
                    name != "role"
                      ? setShowModalFunc(true)
                      : handleupdateFunc.handleChangeRole();
                  }}
                >
                  {name != "role" && (
                    <>
                      <FiEdit2 /> &nbsp; แก้ไข
                    </>
                  )}
                  {name == "role" && (
                    <>
                      <FaUndoAlt /> &nbsp; เปลี่ยน
                    </>
                  )}
                </button>
                <Modal
                  id={`modal_${name}`}
                  size="lg"
                  show={isShowModal}
                  onHide={() => setShowModalFunc(false)}
                  centered
                  backdrop={`static`}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>แก้ไขโปรไฟล์</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                        <Row key={name}>
                          {inputs.map((element: any) => {
                            return (
                              <Col
                                key={element.name}
                                lg={name == "name" ? 6 : 12}
                              >
                                <Form.Label
                                  className="mb-3"
                                  name={element.name}
                                >
                                  {element.label}
                                </Form.Label>
                                {input_type != "select" ? (
                                  <Form.Control
                                    name={element.name}
                                    className={`${styles.input} mb-3`}
                                    type="text"
                                    defaultValue={element.value}
                                    autoFocus
                                    onChange={(event) =>
                                      element.setValue(event.target.value)
                                    }
                                  />
                                ) : (
                                  <Form.Select
                                    key={name}
                                    aria-label="payment_channel"
                                    onChange={(event) => {
                                      element.setValue(event.target.value);
                                    }}
                                    className={`${styles.input} mb-3`}
                                    defaultValue={element.value}
                                  >
                                    {element.options.map((option: any) => {
                                      return (
                                        <option
                                          key={option.en}
                                          value={option.en}
                                        >
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
                  <Modal.Footer>
                    <Button
                      className={`${styles.close_btn} mx-2`}
                      onClick={() => setShowModalFunc(false)}
                    >
                      ปิด
                    </Button>
                    <Button
                      className={`${styles.save_btn} mx-2`}
                      onClick={() => {
                        handleupdateFunc(name, newData);
                      }}
                    >
                      แก้ไข
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <br />
            </Row>
          </div>
          <br />
        </Container>
      ) : null}
    </>
  );
}
