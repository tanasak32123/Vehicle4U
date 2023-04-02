import styles from "@/styles/upload_car.module.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import dynamic from "next/dynamic";
import {
  FaArrowAltCircleLeft,
  FaFileImage,
  FaTimesCircle,
  FaUpload,
} from "react-icons/fa";
import useSWR from "swr";

const CustomizeModal = dynamic(import("@/components/Modal/Customize"), {
  loading: () => (
    <div className={`d-flex justify-content-center align-items-center`}>
      <div className={`lds-facebook`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ),
});

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      res.sort((a: any, b: any) => {
        if (a.name_th < b.name_th) {
          return -1;
        }
        if (a.name_th > b.name_th) {
          return 1;
        }
        return 0;
      });
      return res;
    });

export default function UploadCar() {
  const { data, isLoading, error } = useSWR(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    fetcher
  );

  const router = useRouter();

  const carNameRef = useRef<HTMLInputElement | null>(null);
  const provinceRef = useRef<HTMLSelectElement | null>(null);
  const regIdRef = useRef<HTMLInputElement | null>(null);
  const maxSeatRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [feedback, setFeedback] = useState({
    name: "",
    maxSeat: "",
    province: "",
    regId: "",
  });
  const [imgFeedback, setImgFeedback] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageRef.current?.files?.item(0)!);
    formData.append("name", carNameRef.current?.value!);
    formData.append("registrationId", regIdRef.current?.value!);
    formData.append("province", provinceRef.current?.value!);
    formData.append("maximumCapacity", maxSeatRef.current?.value!);
    await fetch("/api/vehicle/createVehicle", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status == 401) {
          router.push("/");
        }
        if (res.status == 500) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        if (res.feedback) {
          setFeedback({ ...res.feedback });
        }
        if (!res.imgFound) {
          setImgFeedback("** โปรดเลือกไฟล์รูปภาพของคุณ");
        }
        if (res.success) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            router.push("/vehicle/owner");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 3000);
      });
  };

  const handleChooseFile = () => {
    const file: File | null | undefined = imageRef?.current?.files?.item(0);
    if (!file) return;
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const size = Number((file.size / 1024 / 1024).toFixed(2));
    const validType = validImageTypes.includes(file?.type);
    const exceedSize = size > 10;
    if (validType && !exceedSize) {
      setFilename(file.name);
      setImgFeedback("");
    } else {
      if (!validType) {
        setImgFeedback("** ไฟล์ต้องเป็น PNG หรือ JPEG เท่านั้น");
      } else if (!exceedSize) {
        setImgFeedback("** ไฟล์ของคุณมีขนาดใหญ่เกิน 10 mb");
      }
      cancelFile();
    }
  };

  const uploadImage = () => {
    const file = imageRef?.current?.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImgFeedback("** โปรดเลือกไฟล์รูปภาพของคุณ");
    }
  };

  const choosefile = () => {
    document.getElementById("carImgFile")?.click();
  };

  const cancelFile = () => {
    setFilename("");
    setImageSrc(null);
    (imageRef?.current as HTMLInputElement).value = "";
  };

  if (error) return <div>failed to load</div>;

  return (
    <>
      <Head>
        <title>เพิ่มรถเช่า-VEHICLE4U</title>
      </Head>

      <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.svg}`}>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          {isLoading ? (
            <div className={`d-flex justify-content-center align-items-center`}>
              <div className={`lds-facebook`}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => router.back()}
                className={`${styles.back_btn} d-flex align-items-center`}
              >
                <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
              </button>
              <h1 className="align-items-center d-flex justify-content-end">
                เพิ่มรถเช่า
              </h1>
              <hr />
              {isAlert && (
                <div
                  className={`alert alert-danger d-flex align-items-center`}
                  role="alert"
                >
                  <svg
                    className="bi flex-shrink-0 me-2"
                    width="24"
                    height="24"
                    role="img"
                    aria-label="Danger:"
                  >
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    <small>ระบบเกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง</small>
                  </div>
                </div>
              )}

              <form id="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="carImgFile" className="form-label">
                    <b>อัปโหลดรูปรถ</b>
                  </label>
                  <small className={`ms-2 red_color ${styles.feedback}`}>
                    {imgFeedback}
                  </small>
                  <div className="input-group">
                    <button
                      id="file"
                      type="button"
                      onClick={choosefile}
                      className={`btn d-flex align-items-center ${
                        imageSrc ? `disabled btn-secondary` : `btn-primary`
                      }`}
                    >
                      <FaFileImage />
                      &nbsp;เลือกไฟล์
                    </button>
                    <input
                      ref={imageRef}
                      className="form-control"
                      type="file"
                      id="carImgFile"
                      onChange={handleChooseFile}
                      hidden
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="โปรดเลือกไฟล์รูปภาพของรถ"
                      value={filename ? filename : ""}
                      disabled
                    />
                    <button
                      type="button"
                      className={`btn ${
                        imageSrc ? `btn-danger` : `btn-success`
                      } ${styles.upload_btn}`}
                      onClick={imageSrc ? cancelFile : uploadImage}
                    >
                      <div
                        className={`d-flex align-items-center justify-content-center`}
                      >
                        {imageSrc ? (
                          <>
                            <FaTimesCircle />
                            &nbsp;ยกเลิก
                          </>
                        ) : (
                          <>
                            <FaUpload />
                            &nbsp;อัปโหลด
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                  <div
                    className={`${styles.first_col} mt-3 d-flex justify-content-center align-items-center`}
                  >
                    {imageSrc ? (
                      <div>
                        <Image
                          className={`${styles.image}`}
                          src={imageSrc}
                          alt="Vehicle Image"
                        />
                      </div>
                    ) : (
                      <div
                        className={`d-flex justify-content-center align-items-center w-100 h-100`}
                      >
                        ไม่มีรูปภาพ
                      </div>
                    )}
                  </div>
                </div>

                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="carName" className="form-label">
                        <b>ชื่อของรถ</b>
                      </label>{" "}
                      <small className={`ms-1 red_color ${styles.feedback}`}>
                        {feedback.name}
                      </small>
                      <input
                        ref={carNameRef}
                        type="text"
                        className="form-control"
                        id="carName"
                        placeholder="ชื่อรถเช่าของคุณ"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="regisNum" className="form-label">
                        <b>เลขทะเบียนรถ</b>
                      </label>
                      <small className={`ms-1 red_color ${styles.feedback}`}>
                        {feedback.regId}
                      </small>
                      <input
                        ref={regIdRef}
                        type="text"
                        className="form-control"
                        id="regisNum"
                        placeholder="เลขทะเบียนรถ"
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="province" className="form-label">
                        <b>จังหวัด</b>
                      </label>
                      <small className={`ms-1 red_color ${styles.feedback}`}>
                        {feedback.province}
                      </small>
                      <select
                        ref={provinceRef}
                        className={`form-select`}
                        id="province"
                        defaultValue={``}
                      >
                        <option value="">กรุณาเลือกจังหวัด ...</option>
                        {data.map((e: any) => {
                          return (
                            <option key={e.id} id={e.id} value={e.name_th}>
                              {e.name_th}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="seat" className="form-label">
                        <b>จำนวนที่นั่ง</b>
                      </label>
                      <small className={`ms-1 red_color ${styles.feedback}`}>
                        {feedback.maxSeat}
                      </small>
                      <input
                        ref={maxSeatRef}
                        type="text"
                        className="form-control"
                        id="seat"
                        placeholder="จำนวนที่นั่ง"
                      />
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 text-end">
                  <button type="submit" className={`py-2 me-2 orange_btn`}>
                    <b>ยืนยัน</b>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {isSuccess && (
        <CustomizeModal
          status={`success`}
          show={isSuccess}
          onHide={() => {
            router.push("/vehicle/owner");
          }}
          desc={`ระบบทำการเพิ่มรถเช่าสำเร็จ`}
          btn_text={`รถเช่าของคุณ`}
        />
      )}
    </>
  );
}
