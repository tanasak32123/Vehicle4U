import styles from "@/styles/editProfile.module.css";
import Head from "next/head";
import { FaArrowAltCircleLeft, FaCheckCircle, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserProfile from "@/interfaces/UserProfile";
import InputForm from "@/components/profileForm";
import { useAuth } from "@/components/authContext";
import Skeleton from "react-loading-skeleton";
import ModalForm from "@/components/modalProfile";
import { setCookie } from "cookies-next";
import { Button, Modal, Alert } from "react-bootstrap";

function MyVerticallyCenteredModal({ show, onHide, role }: any) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={`modal_wo_border`}></Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>
          <FaCheckCircle className={`green_color`} />
        </h4>
        <h4 className={`text-center`}>เปลี่ยนบทบาทสำเร็จ</h4>
        <p className={`text-center`}>
          ตอนนี้บทบาทของคุณคือ "
          {role == "provider" ? "ผู้ปล่อยเช่า" : "ผู้เช่า"}"
        </p>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex justify-content-center`}>
        <Button
          onClick={() => {
            onHide();
          }}
          variant="primary"
        >
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function EditProfile() {
  const { user, isAuthenticate, authAction }: any = useAuth();

  const router = useRouter();

  const [nmShow, setNmShow] = useState(false);
  const [unShow, setUnShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [telShow, setTelShow] = useState(false);
  const [ciShow, setCiShow] = useState(false);
  const [DlicenseShow, setDlicenseShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addDlicenseShow, setAddDlicenseShow] = useState(false);
  const [addPaymentShow, setAddPaymentShow] = useState(false);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [cid, setCid] = useState("");
  const [dlicense, setDlicense] = useState("");
  const [payment, setPayment] = useState("");

  const [invalidInput, setInvalidInput] = useState("");

  const data: UserProfile = {
    username: username,
    password: password,
    first_name: fName,
    last_name: lName,
    tel: tel,
    citizen_id: cid,
    payment_channel: payment,
    driving_license_id: dlicense,
    is_renter: dlicense != "",
    is_provider: payment != "",
  };

  useEffect(() => {
    if (isAuthenticate) {
      setFName(user.first_name);
      setLName(user.last_name);
      setUsername(user.username);
      setTel(user.tel);
      setCid(user.citizen_id);
      setDlicense(user.driving_license_id);
      setPayment(user.payment_channel);
    }
  }, [user]);

  async function handleUpdateProfile(type: String, values: String[]) {
    try {
      const response = await authAction.updateUser(data, type, values);
      if (!response.success) {
        setInvalidInput(response.message);
      } else {
        if (type == "add_payment_channel") {
          authAction.setUser({ ...response.user, role: "provider" });
          popUpChangeRole();
        } else if (type == "add_driving_license_id") {
          authAction.setUser({ ...response.user, role: "renter" });
          popUpChangeRole();
        } else {
          authAction.setUser({ ...response.user, role: user.role });
          popUpAlert();
        }
      }
      return response.success;
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeRole() {
    if (user.role == "renter") {
      if (!user.payment_channel) {
        setAddPaymentShow(true);
      } else {
        authAction.setUser({ ...user, role: "provider" });
        setCookie("user", { ...user, role: "provider" });
        popUpChangeRole();
      }
    }
    if (user.role == "provider") {
      if (!user.driving_license_id) {
        setAddDlicenseShow(true);
      } else {
        authAction.setUser({ ...user, role: "renter" });
        setCookie("user", { ...user, role: "renter" });
        popUpChangeRole();
      }
    }
  }

  const popUpChangeRole = () => {
    setShowChangeRole(true);
    setTimeout(() => {
      setShowChangeRole(false);
    }, 3000);
  };

  const popUpAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>การตั้งค่า-VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          <button
            onClick={() => router.back()}
            className={`${styles.back_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <h1 className="align-items-center d-flex justify-content-end">
            <FaUserAlt />
            &nbsp; โปรไฟล์ของฉัน
          </h1>
          <hr />
          <Alert
            variant="success"
            show={showAlert}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <FaCheckCircle className={`green_color`} /> แก้ไขโปรไฟล์สำเร็จ
          </Alert>
          <br />

          {isAuthenticate ? (
            <>
              <InputForm
                name="name"
                label="ชื่อ - นามสกุล"
                rawData={`${user.first_name} ${user.last_name}`}
                inputs={[
                  {
                    name: "first_name",
                    label: "ชื่อ",
                    value: user.first_name,
                    currentValue: fName,
                    setValue: setFName,
                  },
                  {
                    name: "last_name",
                    label: "นามสกุล",
                    value: user.last_name,
                    currentValue: lName,
                    setValue: setLName,
                  },
                ]}
                setShowModalFunc={setNmShow}
                isShow={true}
              />

              <InputForm
                name="username"
                label="ชื่อผู้ใช้"
                rawData={`${user.username}`}
                inputs={[
                  {
                    name: "username",
                    label: "ชื่อผู้ใช้",
                    value: user.username,
                    currentValue: username,
                    setValue: setUsername,
                  },
                ]}
                setShowModalFunc={setUnShow}
                isShow={true}
              />

              <InputForm
                name="password"
                label="รหัสผ่าน"
                rawData={`********`}
                inputs={[
                  {
                    name: "password",
                    label: "รหัสผ่าน",
                    value: "",
                    setValue: setPassword,
                  },
                ]}
                setShowModalFunc={setPassShow}
                isShow={true}
              />

              <InputForm
                name="tel"
                label="เบอร์โทรศัพท์"
                rawData={`${user.tel}`}
                inputs={[
                  {
                    name: "tel",
                    label: "เบอร์โทรศัพท์",
                    value: user.tel,
                    currentValue: tel,
                    setValue: setTel,
                  },
                ]}
                setShowModalFunc={setTelShow}
                isShow={true}
              />

              <InputForm
                name="citizen_id"
                label="หมายเลขบัตรประชาชน"
                rawData={`${user.citizen_id}`}
                inputs={[
                  {
                    name: "tel",
                    label: "หมายเลขบัตรประชาชน",
                    value: user.citizen_id,
                    currentValue: cid,
                    setValue: setCid,
                  },
                ]}
                setShowModalFunc={setCiShow}
                isShow={true}
              />

              <InputForm
                name="driving_license_id"
                label="หมายเลขใบขับขี่"
                rawData={`${user.driving_license_id}`}
                inputs={[
                  {
                    name: "driving_license_id",
                    label: "หมายเลขใบขับขี่",
                    value: user.driving_license_id,
                    currentValue: dlicense,
                    setValue: setDlicense,
                  },
                ]}
                setShowModalFunc={setDlicenseShow}
                isShow={user.role == "renter"}
              />

              <InputForm
                name="payment_channel"
                label="ช่องทางการรับเงิน"
                input_type="select"
                rawData={`${user.payment_channel}`}
                inputs={[
                  {
                    name: "payment_channel",
                    label: "ช่องทางการรับเงิน",
                    value: user.payment_channel,
                    setValue: setPayment,
                    options: [
                      {
                        en: "",
                        th: "กรุณาเลือกช่องทางการรับเงิน",
                      },
                      {
                        en: "promptpay",
                        th: "พร้อมเพย์",
                      },
                      {
                        en: "credit",
                        th: "บัตรเครดิต",
                      },
                      {
                        en: "cash",
                        th: "เงินสด",
                      },
                    ],
                  },
                ]}
                setShowModalFunc={setPaymentShow}
                isShow={user.role == "provider"}
              />

              <InputForm
                name="role"
                label="บทบาท"
                rawData={`${user.role}`}
                inputs={[
                  {
                    name: "role",
                    label: "บทบาท",
                    value: user.role,
                  },
                ]}
                setShowModalFunc={{ setPaymentShow, setDlicenseShow }}
                handleupdateFunc={{ handleUpdateProfile, handleChangeRole }}
                isShow={true}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`name`}
                type={`text`}
                inputs={[
                  {
                    name: "first_name",
                    label: "ชื่อ",
                    value: user.first_name,
                    currentValue: fName,
                    setValue: setFName,
                  },
                  {
                    name: "last_name",
                    label: "นามสกุล",
                    value: user.last_name,
                    currentValue: lName,
                    setValue: setLName,
                  },
                ]}
                newData={[fName, lName]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={nmShow}
                setShowModalFunc={setNmShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`username`}
                type={`text`}
                inputs={[
                  {
                    name: "username",
                    label: "ชื่อผู้ใช้",
                    value: user.username,
                    currentValue: username,
                    setValue: setUsername,
                  },
                ]}
                newData={[username]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={unShow}
                setShowModalFunc={setUnShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`password`}
                type={`password`}
                inputs={[
                  {
                    name: "password",
                    label: "รหัสผ่านใหม่",
                    value: "",
                    setValue: setPassword,
                  },
                ]}
                newData={[password]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={passShow}
                setShowModalFunc={setPassShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`tel`}
                type={`text`}
                inputs={[
                  {
                    name: "tel",
                    label: "เบอร์โทรศัพท์",
                    value: user.tel,
                    currentValue: tel,
                    setValue: setTel,
                  },
                ]}
                newData={[tel]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={telShow}
                setShowModalFunc={setTelShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`citizen_id`}
                type={`text`}
                inputs={[
                  {
                    name: "tel",
                    label: "หมายเลขบัตรประชาชน",
                    value: user.citizen_id,
                    currentValue: cid,
                    setValue: setCid,
                  },
                ]}
                newData={[cid]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={ciShow}
                setShowModalFunc={setCiShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`driving_license_id`}
                type={`text`}
                inputs={[
                  {
                    name: "driving_license_id",
                    label: "หมายเลขใบขับขี่",
                    value: user.driving_license_id,
                    currentValue: dlicense,
                    setValue: setDlicense,
                  },
                ]}
                newData={[dlicense]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={DlicenseShow}
                setShowModalFunc={setDlicenseShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`แก้ไขโปรไฟล์`}
                id={`payment_channel`}
                type={`select`}
                inputs={[
                  {
                    name: "payment_channel",
                    label: "ช่องทางการรับเงิน",
                    value: user.payment_channel,
                    setValue: setPayment,
                    options: [
                      {
                        en: "",
                        th: "กรุณาเลือกช่องทางการรับเงิน",
                      },
                      {
                        en: "promptpay",
                        th: "พร้อมเพย์",
                      },
                      {
                        en: "credit",
                        th: "บัตรเครดิต",
                      },
                      {
                        en: "cash",
                        th: "เงินสด",
                      },
                    ],
                  },
                ]}
                newData={[payment]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={paymentShow}
                setShowModalFunc={setPaymentShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`เพิ่มข้อมูลโปรไฟล์`}
                id={`add_driving_license_id`}
                type={`text`}
                inputs={[
                  {
                    name: "add_driving_license_id",
                    label: "หมายเลขใบขับขี่",
                    value: user.driving_license_id,
                    currentValue: dlicense,
                    setValue: setDlicense,
                  },
                ]}
                newData={[dlicense]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={addDlicenseShow}
                setShowModalFunc={setAddDlicenseShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <ModalForm
                title={`เพิ่มข้อมูลโปรไฟล์`}
                id={`add_payment_channel`}
                type={`select`}
                inputs={[
                  {
                    name: "add_payment_channel",
                    label: "ช่องทางการรับเงิน",
                    value: user.payment_channel,
                    setValue: setPayment,
                    options: [
                      {
                        en: "",
                        th: "กรุณาเลือกช่องทางการรับเงิน",
                      },
                      {
                        en: "promptpay",
                        th: "พร้อมเพย์",
                      },
                      {
                        en: "credit",
                        th: "บัตรเครดิต",
                      },
                      {
                        en: "cash",
                        th: "เงินสด",
                      },
                    ],
                  },
                ]}
                newData={[payment]}
                invalid={invalidInput}
                setInvalid={setInvalidInput}
                isShowModal={addPaymentShow}
                setShowModalFunc={setAddPaymentShow}
                handleupdateFunc={handleUpdateProfile}
              />

              <MyVerticallyCenteredModal
                show={showChangeRole}
                onHide={() => {
                  setShowChangeRole(false);
                }}
                role={user.role}
              />
            </>
          ) : (
            <>
              <h6>ชื่อ - นามสกุล</h6>
              <Skeleton width={`100%`} height={50} />
              <br />
              <br />
              <h6>ชื่อผู้ใช้</h6>
              <Skeleton width={`100%`} height={50} />
              <br />
              <br />
              <h6>รหัสผ่าน</h6>
              <Skeleton width={`100%`} height={50} />
              <br />
              <br />
              <h6>เบอร์โทรศัพท์</h6>
              <Skeleton width={`100%`} height={50} />
              <br />
              <br />
              <h6>หมายเลขบัตรประชาชน</h6>
              <Skeleton width={`100%`} height={50} />
              <br />
              <br />
              <h6>บทบาท</h6>
              <Skeleton width={`100%`} height={50} />
              <br />
            </>
          )}
        </div>
      </div>
    </>
  );
}
