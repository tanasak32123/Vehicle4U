import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import styles from "@/styles/editProfile.module.css";

async function handleSubmit(
  name: string,
  newData: string[],
  handleupdateFunc: any,
  setShowModalFunc: any
) {
  const success: boolean = await handleupdateFunc(name, newData);
  if (success) {
    setShowModalFunc(false);
  }
}

export default function ModalForm({
  title,
  id,
  type,
  inputs,
  newData,
  invalid,
  isShowModal,
  setShowModalFunc,
  handleupdateFunc,
}: any) {
  return (
    <>
      {" "}
      <Modal
        id={`modal_${id}`}
        size="lg"
        show={isShowModal}
        onHide={() => setShowModalFunc(false)}
        centered
        backdrop={`static`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row key={id}>
                {inputs.map((element: any) => {
                  return (
                    <Col key={element.name} lg={id == "name" ? 6 : 12}>
                      <Form.Label className="mb-3" name={element.name}>
                        {element.label}
                      </Form.Label>
                      {type != "select" ? (
                        <Form.Control
                          name={element.name}
                          className={`${styles.input} mb-3`}
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
                          aria-label="payment_channel"
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
            onClick={() => setShowModalFunc(false)}
          >
            ปิด
          </Button>
          <Button
            className={`${styles.save_btn} mx-2`}
            onClick={() => {
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
