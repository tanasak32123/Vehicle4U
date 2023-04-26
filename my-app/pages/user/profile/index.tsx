import Head from "next/head";
import { useRef, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

//css
import styles from "styles/editProfile.module.css";
import { FaUserAlt } from "react-icons/fa";

import { useAuth } from "@/components/AuthContext";
import { toast } from "react-toastify";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export default function EditProfile() {
  // useContext from authContext
  const { auth, isLoading, authAction }: any = useAuth();

  // modal
  const [addDlicenseShow, setAddDlicenseShow] = useState(false);
  const [addPaymentShow, setAddPaymentShow] = useState(false);

  const [editFname, setEditFname] = useState(false);
  const [editLname, setEditLname] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editPwd, setEditPwd] = useState(false);
  const [editTel, setEditTel] = useState(false);
  const [editCid, setEditCid] = useState(false);
  const [editDlicense, setEditDlicense] = useState(false);
  const [editPayment, setEditPayment] = useState(false);

  const fnameRef = useRef<HTMLInputElement | null>(null);
  const lnameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const cidRef = useRef<HTMLInputElement | null>(null);
  const dlicenseRef = useRef<HTMLInputElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);

  const [role, setRole] = useState(getCookie("currentRole") as string);

  const edits: { [index: string]: any } = {
    first_name: setEditFname,
    last_name: setEditLname,
    username: setEditUsername,
    password: setEditPwd,
    tel: setEditTel,
    citizen_id: setEditCid,
    driving_license_id: setEditDlicense,
    payment_channel: setEditPayment,
  };

  // update user profile
  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const element = e.currentTarget;
    const validation_element = document.getElementById(
      `validation-${element.name}`
    ) as HTMLInputElement;
    const input_element = document.querySelector(
      `#${element.name}`
    ) as HTMLInputElement;
    await fetch(`/api/auth/updateProfile/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: e.currentTarget.name,
        [e.currentTarget.name]: (
          document.querySelector(`#${element.name}`) as HTMLInputElement
        ).value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          input_element.classList.add("is-invalid");
          if (
            element.name != "add_driving_license_id" &&
            element.name != "add_payment_channel"
          ) {
            (
              document.querySelector(
                `#input-group-${element.name}`
              ) as HTMLInputElement
            ).classList.add("is-invalid");
          }
          validation_element.innerText = res.message;
          return;
        }
        if (element.name == "add_payment_channel") {
          setAddPaymentShow(false);
          setRole("provider");
          setCookie("currentRole", "provider", {
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
          });
          popUpChangeRole();
        } else if (element.name == "add_driving_license_id") {
          setAddDlicenseShow(false);
          setRole("renter");
          setCookie("currentRole", "renter", {
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
          });
          popUpChangeRole();
        } else {
          edits[`${element.name}`](false);
          input_element.readOnly = true;
          input_element.disabled = true;
          popUpAlert();
        }
        authAction.mutate();
        return;
      })
      .catch((err) => {
        toast.error("ระบบเกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // handle change role button
  const handleChangeRole = () => {
    if (role == "renter") {
      if (!auth.user.payment_channel) {
        setAddPaymentShow(true);
      } else {
        setRole("provider");
        setCookie("currentRole", "provider", {
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
        });
        popUpChangeRole();
      }
    }
    if (role == "provider") {
      if (!auth.user.driving_license_id) {
        setAddDlicenseShow(true);
      } else {
        setRole("renter");
        setCookie("currentRole", "renter", {
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
        });
        popUpChangeRole();
      }
    }
    authAction.mutate();
  };

  // Change role pop up
  const popUpChangeRole = () => {
    toast.success("เปลี่ยนบทบาทสำเร็จ", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Alert pop up
  const popUpAlert = () => {
    toast.success("แก้ไขโปรไฟล์สำเร็จ", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSwitchEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    for (const key in edits) {
      const element = document.getElementById(`${key}`) as HTMLInputElement;
      const validation_element = document.getElementById(
        `validation-${key}`
      ) as HTMLInputElement;
      if (key == e.currentTarget.name) {
        edits[`${key}`](true);
        if (element) {
          element.readOnly = false;
          element.disabled = false;
        }
      } else {
        edits[`${key}`](false);
        if (element) {
          element.classList.remove("is-invalid");
          validation_element.innerText = "";
          if (key != "password") {
            element.value = auth.user[`${key}`];
          } else {
            element.value = "";
          }
          element.readOnly = true;
          element.disabled = true;
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>โปรไฟล์ของฉัน-VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          <h1 className="align-items-center d-flex justify-content-start my-4">
            <FaUserAlt />
            &nbsp; โปรไฟล์ของฉัน
          </h1>
          <hr />
          <br />

          {isLoading && (
            <div className={`d-flex justify-content-center align-items-center`}>
              <div className={`lds-facebook`}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}

          {!isLoading && (
            <>
              <Row>
                <Col lg={6}>
                  <div className={`px-2 mb-4`}>
                    <label htmlFor="first_name" className={`mb-2`}>
                      <b>ชื่อจริง</b>
                    </label>

                    <div className="input-group" id="input-group-first_name">
                      <input
                        ref={fnameRef}
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="ชื่อจริง"
                        defaultValue={auth?.user?.first_name}
                        disabled
                        readOnly
                      />
                      {!editFname && (
                        <button
                          title="edot first name"
                          name="first_name"
                          type="button"
                          className={`btn-primary btn`}
                          onClick={(e) => handleSwitchEdit(e)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {editFname && (
                        <button
                          title="submit first name"
                          name="first_name"
                          type="button"
                          className={`btn-success btn`}
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          ยืนยัน
                        </button>
                      )}
                    </div>
                    <div
                      id="validation-first_name"
                      className={`invalid-feedback`}
                    ></div>
                  </div>

                  <div className={`px-2 mb-4`}>
                    <label htmlFor="username" className={`mb-2`}>
                      <b>ชื่อผู้ใช้</b>
                    </label>

                    <div className="input-group" id="input-group-username">
                      <input
                        ref={usernameRef}
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="ชื่อผู้ใช้"
                        defaultValue={auth?.user?.username}
                        disabled
                        readOnly
                      />
                      {!editUsername && (
                        <button
                          title="edit username"
                          name="username"
                          type="button"
                          className={`btn-primary btn`}
                          onClick={(e) => handleSwitchEdit(e)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {editUsername && (
                        <button
                          title="submit username"
                          name="username"
                          type="button"
                          className={`btn-success btn`}
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          ยืนยัน
                        </button>
                      )}
                    </div>
                    <div
                      id="validation-username"
                      className={`invalid-feedback`}
                    ></div>
                  </div>

                  <div className={`px-2 mb-4`}>
                    <label htmlFor="tel" className={`mb-2`}>
                      <b>เบอร์โทรศัพท์</b>
                    </label>

                    <div className="input-group" id="input-group-tel">
                      <input
                        ref={telRef}
                        type="text"
                        className="form-control"
                        id="tel"
                        placeholder="เบอร์โทรศัพท์"
                        defaultValue={auth?.user?.tel}
                        disabled
                        readOnly
                      />
                      {!editTel && (
                        <button
                          title="edit tel"
                          name="tel"
                          type="button"
                          className={`btn-primary btn`}
                          onClick={(e) => handleSwitchEdit(e)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {editTel && (
                        <button
                          title="submit tel"
                          name="tel"
                          type="button"
                          className={`btn-success btn`}
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          ยืนยัน
                        </button>
                      )}
                    </div>
                    <div
                      id="validation-tel"
                      className={`invalid-feedback`}
                    ></div>
                  </div>

                  {role == "renter" && (
                    <div className={`px-2 mb-4`}>
                      <label htmlFor="driving_liciense_id" className={`mb-2`}>
                        <b>หมายเลขใบขับขี่</b>
                      </label>

                      <div
                        className="input-group"
                        id="input-group-driving_liciense_id"
                      >
                        <input
                          ref={dlicenseRef}
                          type="text"
                          className="form-control"
                          id="driving_license_id"
                          placeholder="หมายเลขใบขับขี่"
                          defaultValue={auth?.user?.driving_license_id}
                          disabled
                          readOnly
                        />
                        {!editDlicense && (
                          <button
                            title="edit driving license id"
                            name="driving_license_id"
                            type="button"
                            className={`btn-primary btn`}
                            onClick={(e) => handleSwitchEdit(e)}
                          >
                            แก้ไข
                          </button>
                        )}
                        {editDlicense && (
                          <button
                            title="submit driving license id"
                            name="driving_license_id"
                            type="button"
                            className={`btn-success btn`}
                            onClick={(e) => handleUpdateProfile(e)}
                          >
                            ยืนยัน
                          </button>
                        )}
                      </div>
                      <div
                        id="validation-driving_license_id"
                        className={`invalid-feedback`}
                      ></div>
                    </div>
                  )}

                  {role == "provider" && (
                    <div className={`px-2 mb-4`}>
                      <label htmlFor="payment_channel" className={`mb-2`}>
                        <b>ช่องทางการรับเงิน</b>
                      </label>

                      <div
                        className="input-group"
                        id="input-group-payment_channel"
                      >
                        <select
                          ref={paymentRef}
                          className="form-select"
                          id="payment_channel"
                          placeholder="หมายเลขใบขับขี่"
                          defaultValue={auth?.user?.payment_channel}
                          disabled
                        >
                          <option value="cash">เงินสด</option>
                          <option value="promptpay">พร้อมเพย์</option>
                          <option value="credit">บัตรเครดิต</option>
                        </select>
                        {!editPayment && (
                          <button
                            title="edit payment channel"
                            name="payment_channel"
                            type="button"
                            className={`btn-primary btn`}
                            onClick={(e) => handleSwitchEdit(e)}
                          >
                            แก้ไข
                          </button>
                        )}
                        {editPayment && (
                          <button
                            title="submit payment channel"
                            name="payment_channel"
                            type="button"
                            className={`btn-success btn`}
                            onClick={(e) => handleUpdateProfile(e)}
                          >
                            ยืนยัน
                          </button>
                        )}
                      </div>
                      <div
                        id="validation-payment_channel"
                        className={`invalid-feedback`}
                      ></div>
                    </div>
                  )}
                </Col>

                <Col lg={6}>
                  <div className={`px-2 mb-4`}>
                    <label htmlFor="last_name" className={`mb-2`}>
                      <b>นามสกุล</b>
                    </label>

                    <div className="input-group" id="input-group-last_name">
                      <input
                        ref={lnameRef}
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="นามสกุล"
                        defaultValue={auth?.user?.last_name}
                        disabled
                        readOnly
                      />
                      {!editLname && (
                        <button
                          title="edit last name"
                          name="last_name"
                          type="button"
                          className={`btn-primary btn`}
                          onClick={(e) => handleSwitchEdit(e)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {editLname && (
                        <button
                          title="submit last name"
                          name="last_name"
                          type="button"
                          className={`btn-success btn`}
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          ยืนยัน
                        </button>
                      )}
                    </div>
                    <div
                      id="validation-last_name"
                      className={`invalid-feedback`}
                    ></div>
                  </div>

                  <div className={`px-2 mb-4`}>
                    <label htmlFor="password" className={`mb-2`}>
                      <b>รหัสผ่าน</b>
                    </label>

                    <div className="input-group" id="input-group-password">
                      <input
                        ref={pwdRef}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="********"
                        disabled
                        readOnly
                      />
                      {!editPwd && (
                        <button
                          title="edit password"
                          name="password"
                          type="button"
                          className={`btn-primary btn`}
                          onClick={(e) => handleSwitchEdit(e)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {editPwd && (
                        <button
                          title="submit password"
                          name="password"
                          type="button"
                          className={`btn-success btn`}
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          ยืนยัน
                        </button>
                      )}
                    </div>
                    <div
                      id="validation-password"
                      className={`invalid-feedback`}
                    ></div>
                  </div>

                  <div className={`px-2 mb-4`}>
                    <label htmlFor="citizen_id" className={`mb-2`}>
                      <b>หมายเลขบัตรประชาชน</b>
                    </label>

                    <div className="input-group" id="input-group-citizen_id">
                      <input
                        ref={cidRef}
                        type="text"
                        className="form-control"
                        id="citizen_id"
                        placeholder="หมายเลขบัตรประชาชน"
                        defaultValue={auth?.user?.citizen_id}
                        disabled
                        readOnly
                      />
                      {!editCid && (
                        <button
                          title="edit citizen id"
                          name="citizen_id"
                          type="button"
                          className={`btn-primary btn`}
                          onClick={(e) => handleSwitchEdit(e)}
                        >
                          แก้ไข
                        </button>
                      )}
                      {editCid && (
                        <button
                          title="submit citizen id"
                          name="citizen_id"
                          type="button"
                          className={`btn-success btn`}
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          ยืนยัน
                        </button>
                      )}
                    </div>
                    <div
                      id="validation-citizen_id"
                      className={`invalid-feedback`}
                    ></div>
                  </div>

                  <div className={`px-2 mb-4`}>
                    <label htmlFor="role" className={`mb-2`}>
                      <b>บทบาท</b>
                    </label>

                    <div className="input-group" id="input-group-role">
                      <input
                        type="text"
                        className="form-control"
                        id="role"
                        placeholder="บทบาท"
                        value={role == "renter" ? "ผู้เช่า" : "ผู้ปล่อยเช่า"}
                        disabled
                      />

                      <button
                        title="change role"
                        name="role"
                        type="button"
                        className={`btn-primary btn`}
                        onClick={() => handleChangeRole()}
                      >
                        เปลี่ยน
                      </button>
                    </div>
                    <div
                      id="validation-role"
                      className={`invalid-feedback`}
                    ></div>
                  </div>
                </Col>
              </Row>

              <Modal
                show={addDlicenseShow}
                onHide={() => setAddDlicenseShow(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>เพิ่มข้อมูลโปรไฟล์</Modal.Title>
                </Modal.Header>
                <hr className="mt-0 mb-3" />
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="add_driving_license_id"
                    >
                      <Form.Label>หมายเลขใบขับขี่</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="หมายเลขใบขับขี่"
                        autoFocus
                      />
                      <div
                        id="validation-add_driving_license_id"
                        className={`invalid-feedback`}
                      ></div>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    className="me-auto"
                    onClick={() => setAddDlicenseShow(false)}
                  >
                    ปิด
                  </Button>
                  <Button
                    variant="success"
                    name={`add_driving_license_id`}
                    onClick={(e) => handleUpdateProfile(e)}
                  >
                    ยืนยัน
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={addPaymentShow}
                onHide={() => setAddPaymentShow(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>เพิ่มข้อมูลโปรไฟล์</Modal.Title>
                </Modal.Header>
                <hr className="mt-0 mb-3" />
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="add_payment_channel"
                    >
                      <Form.Label>ช่องทางการรับเงิน</Form.Label>
                      <Form.Select placeholder="ช่องทางการรับเงิน" autoFocus>
                        <option value="">เลือกช่องทางการชำระเงิน ...</option>
                        <option value="cash">เงินสด</option>
                        <option value="promptpay">พร้อมเพย์</option>
                        <option value="credit">บัตรเครดิต</option>
                      </Form.Select>
                      <div
                        id="validation-add_payment_channel"
                        className={`invalid-feedback`}
                      ></div>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    className="me-auto"
                    onClick={() => setAddPaymentShow(false)}
                  >
                    ปิด
                  </Button>
                  <Button
                    variant="success"
                    name={`add_payment_channel`}
                    onClick={(e) => handleUpdateProfile(e)}
                  >
                    ยืนยัน
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
      </div>
    </>
  );
}
