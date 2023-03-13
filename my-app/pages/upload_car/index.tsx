import styles from "@/styles/upload_car.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function UploadCar() {
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [imgFile, setImgFile] = useState<File>();

  const [carName, setCarName] = useState("");
  const [province, setProvince] = useState("");
  const [regId, setRegId] = useState("");
  const [maxSeat, setMaxSeat] = useState("");
  const [filename, setFilename] = useState("");

  const handleSubmit = async () => {
    console.log("send data");
    return router.push("/");
    const response2 = await fetch("/api/uploadCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringify({
        name: carName,
        registrationId: regId,
        imagename: filename,
        province: province,
        maximumCapacity: maxSeat,
      }),
    });
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imgFile) return;
    let formData = new FormData();
    formData.append("file", imgFile);
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFilename(data?.files?.file?.newFilenames);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return (
    <>
      <Head>
        <title>เพิ่มรถเช่า-VEHICLE4U</title>
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
            เพิ่มรถเช่า
          </h1>
          <hr />
          <br />
          <div className="mb-3">
            <label htmlFor="carImgFile" className="form-label">
              <b>อัปโหลดรูปรถ</b>
            </label>
            <div className="input-group">
              <input
                className="form-control"
                type="file"
                id="carImgFile"
                onChange={(event: any) => {
                  if (event.target.files) {
                    handleFileInputChange(event);
                    const file = event.target.files[0];
                    setImgFile(file);
                  }
                }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={(e) => uploadImage(e)}
              >
                อัปโหลดรูป
              </button>
            </div>
            <div className={`${styles.first_col} mt-3`}>
              {imageSrc ? (
                <Image
                  className={`${styles.image}`}
                  src={imageSrc}
                  alt="Vehicle Image"
                  height={400}
                />
              ) : (
                <div className={`${styles.empty_img}`}>
                  <label htmlFor="image">
                    <input
                      type="file"
                      onChange={(event: any) => {
                        if (event.target.files) {
                          handleFileInputChange(event);
                          const file = event.target.files[0];
                          setImgFile(file);
                        }
                      }}
                      hidden
                      className={`${styles.img}`}
                    />
                    ไม่มีรูปภาพ
                  </label>
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
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="carName"
                  placeholder="ชื่อรถเช่าของคุณ"
                  onChange={(e) => setCarName(e.target.value)}
                />
              </div>

              {/* <div className="mb-3">
                <label htmlFor="carColor" className="form-label">
                  <b>สีของรถ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="carColor"
                  placeholder="ประกันภัยของรถ"
                />
              </div> */}

              <div className="mb-3">
                <label htmlFor="regisNum" className="form-label">
                  <b>เลขทะเบียนรถ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regisNum"
                  placeholder="เลขทะเบียนรถ"
                  onChange={(e) => setRegId(e.target.value)}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <label htmlFor="province" className="form-label">
                  <b>จังหวัด</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="province"
                  placeholder="จังหวัด"
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="seat" className="form-label">
                  <b>จำนวนที่นั่ง</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="seat"
                  placeholder="จำนวนที่นั่ง"
                  onChange={(e) => setMaxSeat(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="insurance" className="form-label">
                  <b>ประกันภัยของรถ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="insurance"
                  placeholder="ประกันภัยของรถ"
                />
              </div> */}

              {/* <div className="mb-3">
                <label htmlFor="gearType" className="form-label">
                  <b>ประเภทเกียร์ของรถ</b>
                </label>
                <select
                  className="form-select"
                  aria-label="select your gear type"
                  defaultValue={`default`}
                >
                  <option value="default">โปรดเลือกประเภทเกียร์ของรถคุณ</option>
                  <option value="mannual">เกียร์กระปุก</option>
                  <option value="auto">เกียร์ออโต้</option>
                </select>
              </div> */}
            </Col>
          </Row>

          <div className="mt-4 text-end">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className={`py-2 me-2 orange_btn`}
            >
              <b>ยืนยัน</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
