import styles from "@/styles/editProfile.module.css";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";

export default function ProfileModal({
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
  user,
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
  user: object;
}) {
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
                {inputs.map((element: any) => {
                  return (
                    <Col key={element.name} lg={id == "name" ? 6 : 12}>
                      <Form.Label
                        className="mb-3"
                        name={element.name}
                        htmlFor={id}
                      >
                        {element.label}
                      </Form.Label>
                      {type != "select" ? (
                        <Form.Control
                          key={element.name}
                          name={element.name}
                          className={`${styles.input} mb-3`}
                          type={type}
                          defaultValue={element.value}
                          autoFocus
                          onChange={(event: any) => {
                            element.setValue({
                              ...user,
                              [element.name]: event.target.value
                                .trim()
                                .replace("-", ""),
                            });
                          }}
                        />
                      ) : (
                        <Form.Select
                          id={id}
                          name={id}
                          aria-label={id}
                          onChange={(event) => {
                            element.setValue({
                              ...user,
                              [element.name]: event.target.value,
                            });
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
