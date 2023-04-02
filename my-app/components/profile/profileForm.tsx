import styles from "@/styles/editProfile.module.css";
import { Row, Col, Container } from "react-bootstrap";

export default function InputForm({
  name,
  label,
  rawData,
  inputs,
  handleupdateFunc,
  isShow = true,
  edit = false,
  setEdit,
}: any) {
  if (isShow)
    return (
      <>
        <Container>
          <div className="mb-2">
            <Row>
              <label htmlFor={name}>
                <h6 className={styles.text}>{label}</h6>
              </label>
            </Row>
            <Row>
              {!edit && (
                <>
                  <Col className={`my-auto`}>
                    <div>
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
                    </div>
                  </Col>
                  <Col key={2}>
                    <button
                      className={`btn btn-link float-end`}
                      onClick={() => {
                        if (name != "role") setEdit(true);
                        else handleupdateFunc.handleChangeRole();
                      }}
                    >
                      {name != "role" && <>แก้ไข</>}
                      {name == "role" && <>เปลี่ยน</>}
                    </button>
                  </Col>
                  <br />
                </>
              )}

              {edit && (
                <>
                  <div className="input-group" id={`input-group-${name}`}>
                    {inputs.map((e: any) => {
                      return (
                        <>
                          {name != "payment_channel" && (
                            <input
                              ref={e.ref}
                              id={`${e.name}`}
                              type="text"
                              placeholder={`${e.label}`}
                              className="form-control"
                              defaultValue={`${e.value}`}
                            />
                          )}
                          {name == "payment_channel" && (
                            <select
                              ref={e.ref}
                              id={`${e.name}`}
                              title="select payment channel"
                              className="form-select"
                              defaultValue={rawData}
                            >
                              {e.options.map((e: any) => {
                                return (
                                  <>
                                    <option key={e.en} id={e.en} value={e.en}>
                                      {e.th}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                          )}
                        </>
                      );
                    })}

                    <button
                      title="submit_editname"
                      name="name"
                      type="button"
                      className={`btn-success btn`}
                      onClick={(e) => handleupdateFunc(name, ...inputs.name)}
                    >
                      ยืนยัน
                    </button>
                    <button
                      title="cancel_editname"
                      name="cancel_editname"
                      type="button"
                      className={`btn btn-danger`}
                      onClick={() => setEdit(false)}
                    >
                      ยกเลิก
                    </button>
                  </div>
                  <div id={`validation-${name}`} className={`invalid-feedback`}>
                    {/* {invalid_feedback} */}**
                  </div>
                </>
              )}
            </Row>
          </div>
          <br />
        </Container>
      </>
    );
  else return <></>;
}
