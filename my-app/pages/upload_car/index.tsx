import styles from "@/styles/upload_car.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function UploadCar() {
  const router = useRouter();

  const [imgFile, setImgFile] = useState<File>();

  const handleSubmit = async () => {
    console.log("send data");
  };

  const uploadImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imgFile) return;
    let formData = new FormData();
    formData.append("file", imgFile);
    formData.append("message", "hello");
    try {
      const { data }: any = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
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
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
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
                />
              </div>

              <div className="mb-3">
                <label htmlFor="carColor" className="form-label">
                  <b>สีของรถ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="carColor"
                  placeholder="ประกันภัยของรถ"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="regisNum" className="form-label">
                  <b>เลขทะเบียนรถ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regisNum"
                  placeholder="เลขทะเบียนรถ"
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <label htmlFor="insurance" className="form-label">
                  <b>ประกันภัยของรถ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="insurance"
                  placeholder="ประกันภัยของรถ"
                />
              </div>

              <div className="mb-3">
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
              </div>
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
