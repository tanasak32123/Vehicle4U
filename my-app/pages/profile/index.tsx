import styles from "@/styles/editProfile.module.css";
import Head from "next/head";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import UserData from "@/interfaces/UserData";
import UserProfile from "@/interfaces/UserProfile";
import { setCookies } from "cookies-next";
import InputForm from "@/components/profileForm";
import { useAuth } from "@/components/auth";
import Skeleton from "react-loading-skeleton";

export default function EditProfile() {
  const { user, isAuthenticate }: any = useAuth();

  const router = useRouter();

  const [nmShow, setNmShow] = useState(false);
  const [unShow, setUnShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [telShow, setTelShow] = useState(false);
  const [ciShow, setCiShow] = useState(false);
  const [DlicenseShow, setDlicenseShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);

  const [role, setRole] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [cid, setCid] = useState("");
  const [dlicense, setDlicense] = useState("");
  const [payment, setPayment] = useState("");
  const [isRenter, setIsRenter] = useState(false);
  const [isProvider, setIsProvider] = useState(false);

  const [data, setData] = useState({} as UserData);

  const [invalidInput, setInvalidInput] = useState("");

  const profile: UserProfile = {
    username: username,
    password: password,
    first_name: fName,
    last_name: lName,
    tel: tel,
    citizen_id: cid,
    payment_channel: payment,
    driving_license_id: dlicense,
    is_renter: isRenter,
    is_provider: isProvider,
  };

  async function handleUpdateProfile(type: String, values: String[]) {
    const body = {
      values,
      type,
      profile,
    };

    const response = await fetch("/api/validateUpdateProfile", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await response.json();
    const updatedUser = json.result;

    if (response.status != 200) {
      setInvalidInput(json.message);
      return false;
    } else {
      setInvalidInput("");
      setCookies("user", updatedUser);
      return true;
    }
  }

  function handleChangeRole() {
    if (role == "renter") {
      setRole("provider");
      if (!data.payment_channel) {
        setPaymentShow(true);
      }
    }
    if (role == "provider") {
      setRole("renter");
      if (!data.driving_license_id) {
        setDlicenseShow(true);
      }
    }
  }

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
          <h1 className="text-end">การตั้งค่า</h1>
          <hr />
          <br />

          {isAuthenticate ? (
            <>
              <InputForm
                name="name"
                label="ชื่อ - นามสกุล"
                rawData={`${user.first_name} ${user.last_name}`}
                newData={[fName, lName]}
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
                invalid={invalidInput}
                isShowModal={nmShow}
                setShowModalFunc={setNmShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={true}
              />

              <InputForm
                name="username"
                label="ชื่อผู้ใช้"
                rawData={`${user.username}`}
                newData={[username]}
                inputs={[
                  {
                    name: "username",
                    label: "ชื่อผู้ใช้",
                    value: user.username,
                    currentValue: username,
                    setValue: setUsername,
                  },
                ]}
                invalid={invalidInput}
                isShowModal={unShow}
                setShowModalFunc={setUnShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={true}
              />

              <InputForm
                name="password"
                label="รหัสผ่าน"
                rawData={`********`}
                newData={[password]}
                inputs={[
                  {
                    name: "password",
                    label: "รหัสผ่าน",
                    value: "",
                    setValue: setPassword,
                  },
                ]}
                invalid={invalidInput}
                isShowModal={passShow}
                setShowModalFunc={setPassShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={true}
              />

              <InputForm
                name="tel"
                label="เบอร์โทรศัพท์"
                rawData={`${user.tel}`}
                newData={[tel]}
                inputs={[
                  {
                    name: "tel",
                    label: "เบอร์โทรศัพท์",
                    value: user.tel,
                    currentValue: tel,
                    setValue: setTel,
                  },
                ]}
                invalid={invalidInput}
                isShowModal={telShow}
                setShowModalFunc={setTelShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={true}
              />

              <InputForm
                name="citizen_id"
                label="หมายเลขบัตรประชาชน"
                rawData={`${user.citizen_id}`}
                newData={[cid]}
                inputs={[
                  {
                    name: "tel",
                    label: "หมายเลขบัตรประชาชน",
                    value: user.citizen_id,
                    currentValue: cid,
                    setValue: setCid,
                  },
                ]}
                invalid={invalidInput}
                isShowModal={ciShow}
                setShowModalFunc={setCiShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={true}
              />

              <InputForm
                name="driving_license_id"
                label="หมายเลขใบขับขี่"
                rawData={`${user.driving_license_id}`}
                newData={[dlicense]}
                inputs={[
                  {
                    name: "driving_license_id",
                    label: "หมายเลขใบขับขี่",
                    value: user.driving_license_id,
                    currentValue: dlicense,
                    setValue: setDlicense,
                  },
                ]}
                invalid={invalidInput}
                isShowModal={DlicenseShow}
                setShowModalFunc={setDlicenseShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={role == "renter"}
              />

              <InputForm
                name="payment_channel"
                label="ช่องทางการรับเงิน"
                input_type="select"
                rawData={`${user.payment_channel}`}
                newData={[payment]}
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
                invalid={invalidInput}
                isShowModal={paymentShow}
                setShowModalFunc={setPaymentShow}
                handleupdateFunc={handleUpdateProfile}
                isShow={role == "provider"}
              />

              <InputForm
                name="role"
                label="บทบาท"
                rawData={`${user.role}`}
                newData={[role]}
                inputs={[
                  {
                    name: "role",
                    label: "บทบาท",
                    value: user.role,
                    setValue: setRole,
                  },
                ]}
                invalid={invalidInput}
                setShowModalFunc={{ setPaymentShow, setDlicenseShow }}
                handleupdateFunc={{ handleUpdateProfile, handleChangeRole }}
                isShow={true}
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
