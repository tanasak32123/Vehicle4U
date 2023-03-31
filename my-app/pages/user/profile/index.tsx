import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

//css
import styles from "styles/editProfile.module.css";
import { FaCheckCircle, FaUserAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { Alert } from "react-bootstrap";

import { useAuth } from "@/components/AuthContext";

const InputForm = dynamic(() => import("@/components/profile/profileForm"), {
  loading: () => <p>Loading...</p>,
});

const ModalForm = dynamic(() => import("@/components/profile/profileModal"), {
  loading: () => <p>Loading...</p>,
});

const RoleModal = dynamic(() => import("@/components/profile/roleModal"), {
  loading: () => <p>Loading...</p>,
});

interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  tel: string;
  citizen_id: string;
  payment_channel: string;
  driving_license_id: string;
  role: string;
}

export default function EditProfile() {
  const router = useRouter();

  // useContext from authContext
  const { auth, isLoading, authAction }: any = useAuth();

  // modal
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

  // pop up id
  const [alertID, setAlertID] = useState<NodeJS.Timeout | null>(null);
  const [changeRoleID, setChangeRoleID] = useState<NodeJS.Timeout | null>(null);

  // error message
  const [invalidInput, setInvalidInput] = useState("");

  const [user, setUser] = useState<UserData>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    tel: "",
    citizen_id: "",
    payment_channel: "",
    driving_license_id: "",
    role: "",
  });

  useEffect(() => {
    setUser({
      first_name: auth?.user?.first_name,
      last_name: auth?.user?.last_name,
      username: auth?.user?.username,
      password: "",
      tel: auth?.user?.tel,
      citizen_id: auth?.user?.citizen_id,
      payment_channel: auth?.user?.payment_channel,
      driving_license_id: auth?.user?.driving_license_id,
      role: getCookie("role") as string,
    });
  }, [auth]);

  // update user profile
  const handleUpdateProfile = async (type: string, values: string[]) => {
    const data = {
      username: user?.username,
      password: user?.password,
      first_name: user?.first_name,
      last_name: user?.last_name,
      tel: user?.tel,
      citizen_id: user?.citizen_id,
      payment_channel: user?.payment_channel,
      driving_license_id: user?.driving_license_id,
    };

    const success = await fetch(`/api/auth/updateProfile/${user?.role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, type, values }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          setInvalidInput(res.message);
        } else {
          setInvalidInput("");
          if (type == "add_payment_channel") {
            setUser({ ...res.user, role: "provider" });
            setCookie("role", "provider", {
              secure: process.env.NODE_ENV !== "development",
              sameSite: true,
            });
            popUpChangeRole();
          } else if (type == "add_driving_license_id") {
            setUser({ ...res.user, role: "renter" });
            setCookie("role", "renter", {
              secure: process.env.NODE_ENV !== "development",
              sameSite: true,
            });
            popUpChangeRole();
          } else {
            setUser({ ...res.user, role: user.role });
            setCookie("role", user.role, {
              secure: process.env.NODE_ENV !== "development",
              sameSite: true,
            });
            popUpAlert();
          }
          authAction.mutate();
        }
        return res.success;
      })
      .catch((err) => {
        console.log(err);
        router.push("/500");
      });
    return success;
  };

  // handle change role button
  const handleChangeRole = () => {
    if (user?.role == "renter") {
      if (!user.payment_channel) {
        setAddPaymentShow(true);
      } else {
        setUser({ ...user, role: "provider" });
        setCookie("role", "provider", {
          secure: process.env.NODE_ENV !== "development",
          sameSite: true,
        });
        popUpChangeRole();
      }
    }
    if (user?.role == "provider") {
      if (!user.driving_license_id) {
        setAddDlicenseShow(true);
      } else {
        setUser({ ...user, role: "renter" });
        setCookie("role", "renter", {
          secure: process.env.NODE_ENV !== "development",
          sameSite: true,
        });
        popUpChangeRole();
      }
    }
    authAction.mutate();
  };

  // Change role pop up
  const popUpChangeRole = () => {
    setShowChangeRole(true);
    const crtimeoutID = setTimeout(() => {
      setShowChangeRole(false);
      setChangeRoleID(null);
    }, 3000);
    if (changeRoleID) {
      clearTimeout(changeRoleID);
    }
    setChangeRoleID(crtimeoutID);
  };

  // Alert pop up
  const popUpAlert = () => {
    setShowAlert(true);
    const timeoutID = setTimeout(() => {
      setShowAlert(false);
      setAlertID(null);
    }, 3000);
    if (alertID) {
      clearTimeout(alertID);
    }
    setAlertID(timeoutID);
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
          {/* <button
            onClick={() => router.back()}
            className={`${styles.back_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button> */}
          <h1 className="align-items-center d-flex justify-content-end">
            <FaUserAlt />
            &nbsp; โปรไฟล์ของฉัน
          </h1>
          <hr />
          {showAlert && (
            <Alert
              variant="success"
              show={showAlert}
              onClose={() => {
                setShowAlert(false);
              }}
              dismissible
            >
              <FaCheckCircle className={`green_color`} /> แก้ไขโปรไฟล์สำเร็จ
            </Alert>
          )}
          <br />

          {!isLoading ? (
            <>
              <InputForm
                name="name"
                label="ชื่อ - นามสกุล"
                rawData={`${auth?.user?.first_name} ${auth?.user?.last_name}`}
                inputs={[
                  {
                    name: "first_name",
                    label: "ชื่อ",
                    value: auth?.user?.first_name,
                    setValue: setUser,
                  },
                  {
                    name: "last_name",
                    label: "นามสกุล",
                    value: auth?.user?.last_name,
                    setValue: setUser,
                  },
                ]}
                setShowModalFunc={setNmShow}
                isShow={true}
              />

              <InputForm
                name="username"
                label="ชื่อผู้ใช้"
                rawData={`${auth?.user?.username}`}
                inputs={[
                  {
                    name: "username",
                    label: "ชื่อผู้ใช้",
                    value: auth?.user?.username,
                    setValue: setUser,
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
                    setValue: setUser,
                  },
                ]}
                setShowModalFunc={setPassShow}
                isShow={true}
              />

              <InputForm
                name="tel"
                label="เบอร์โทรศัพท์"
                rawData={`${auth?.user?.tel}`}
                inputs={[
                  {
                    name: "tel",
                    label: "เบอร์โทรศัพท์",
                    value: auth?.user?.tel,
                    setValue: setUser,
                  },
                ]}
                setShowModalFunc={setTelShow}
                isShow={true}
              />

              <InputForm
                name="citizen_id"
                label="หมายเลขบัตรประชาชน"
                rawData={`${auth?.user?.citizen_id}`}
                inputs={[
                  {
                    name: "tel",
                    label: "หมายเลขบัตรประชาชน",
                    value: auth?.user?.citizen_id,
                    setValue: setUser,
                  },
                ]}
                setShowModalFunc={setCiShow}
                isShow={true}
              />

              <InputForm
                name="driving_license_id"
                label="หมายเลขใบขับขี่"
                rawData={`${auth?.user?.driving_license_id}`}
                inputs={[
                  {
                    name: "driving_license_id",
                    label: "หมายเลขใบขับขี่",
                    value: auth?.user?.driving_license_id,
                    setValue: setUser,
                  },
                ]}
                setShowModalFunc={setDlicenseShow}
                isShow={user?.role == "renter"}
              />

              <InputForm
                name="payment_channel"
                label="ช่องทางการรับเงิน"
                input_type="select"
                rawData={`${auth?.user?.payment_channel}`}
                inputs={[
                  {
                    name: "payment_channel",
                    label: "ช่องทางการรับเงิน",
                    value: auth?.user?.payment_channel,
                    setValue: setUser,
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
                isShow={user?.role == "provider"}
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

              {setNmShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`name`}
                  type={`text`}
                  inputs={[
                    {
                      name: "first_name",
                      label: "ชื่อ",
                      value: auth?.user?.first_name,
                      setValue: setUser,
                    },
                    {
                      name: "last_name",
                      label: "นามสกุล",
                      value: auth?.user?.last_name,
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.first_name, user.last_name]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={nmShow}
                  setShowModalFunc={setNmShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setUnShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`username`}
                  type={`text`}
                  inputs={[
                    {
                      name: "username",
                      label: "ชื่อผู้ใช้",
                      value: auth?.user?.username,
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.username]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={unShow}
                  setShowModalFunc={setUnShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setPassShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`password`}
                  type={`password`}
                  inputs={[
                    {
                      name: "password",
                      label: "รหัสผ่านใหม่",
                      value: "",
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.password]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={passShow}
                  setShowModalFunc={setPassShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setTelShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`tel`}
                  type={`text`}
                  inputs={[
                    {
                      name: "tel",
                      label: "เบอร์โทรศัพท์",
                      value: auth?.user?.tel,
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.tel]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={telShow}
                  setShowModalFunc={setTelShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setCiShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`citizen_id`}
                  type={`text`}
                  inputs={[
                    {
                      name: "tel",
                      label: "หมายเลขบัตรประชาชน",
                      value: auth?.user?.citizen_id,
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.citizen_id]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={ciShow}
                  setShowModalFunc={setCiShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setDlicenseShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`driving_license_id`}
                  type={`text`}
                  inputs={[
                    {
                      name: "driving_license_id",
                      label: "หมายเลขใบขับขี่",
                      value: auth?.user?.driving_license_id,
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.driving_license_id]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={DlicenseShow}
                  setShowModalFunc={setDlicenseShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setPaymentShow && (
                <ModalForm
                  title={`แก้ไขโปรไฟล์`}
                  id={`payment_channel`}
                  type={`select`}
                  inputs={[
                    {
                      name: "payment_channel",
                      label: "ช่องทางการรับเงิน",
                      value: auth?.user?.payment_channel,
                      setValue: setUser,
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
                  newData={[user.payment_channel]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={paymentShow}
                  setShowModalFunc={setPaymentShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setAddDlicenseShow && (
                <ModalForm
                  title={`เพิ่มข้อมูลโปรไฟล์`}
                  id={`add_driving_license_id`}
                  type={`text`}
                  inputs={[
                    {
                      name: "driving_license_id",
                      label: "หมายเลขใบขับขี่",
                      value: auth?.user?.driving_license_id,
                      setValue: setUser,
                    },
                  ]}
                  newData={[user.driving_license_id]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={addDlicenseShow}
                  setShowModalFunc={setAddDlicenseShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setAddPaymentShow && (
                <ModalForm
                  title={`เพิ่มข้อมูลโปรไฟล์`}
                  id={`add_payment_channel`}
                  type={`select`}
                  inputs={[
                    {
                      name: "payment_channel",
                      label: "ช่องทางการรับเงิน",
                      value: auth?.user?.payment_channel,
                      setValue: setUser,
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
                  newData={[user.payment_channel]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={addPaymentShow}
                  setShowModalFunc={setAddPaymentShow}
                  handleupdateFunc={handleUpdateProfile}
                  user={user}
                />
              )}

              {setShowChangeRole && (
                <RoleModal
                  show={showChangeRole}
                  onHide={() => {
                    setShowChangeRole(false);
                  }}
                  role={user?.role}
                />
              )}
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
