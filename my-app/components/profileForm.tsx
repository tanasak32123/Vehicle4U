import styles from "@/styles/editProfile.module.css";
import { FiEdit2 } from "react-icons/fi";
import { Row, Col, Container, Modal, Form, Button } from "react-bootstrap";
import { FaUndoAlt } from "react-icons/fa";

function refreshValue(inputs: any, setShowModalFunc: any) {
  inputs.map((e: any) => {
    e.setValue(e.value);
  });
  setShowModalFunc(true);
}

export default function InputForm({
  name,
  label,
  inputs,
  rawData,
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
                      ? refreshValue(inputs, setShowModalFunc)
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
