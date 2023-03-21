import styles from "@/styles/upload_car.module.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import {
  FaArrowAltCircleLeft,
  FaFileImage,
  FaTimesCircle,
  FaUpload,
} from "react-icons/fa";
import useSWR from "swr";

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
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.feedback) {
          setFeedback({ ...res.feedback });
        }
        if (!res.imgFound) {
          setImgFeedback("** โปรดเลือกไฟล์รูปภาพของคุณ");
        }
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

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          {isLoading ? (
            <div>loading...</div>
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
              <br />
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
                  <Col lg={12}></Col>
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
    </>
  );
}
