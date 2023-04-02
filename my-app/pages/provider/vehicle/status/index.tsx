import styles from "@/styles/status.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaCar, FaEdit, FaPrescriptionBottle } from "react-icons/fa";
import useSWR from "swr";
import Link from "next/link";
import { Row, Col, Spinner, Modal, Button } from "react-bootstrap";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.statusCode != 200) {
        return res;
      }
      let created_date: Date;
      let updated_date: Date;
      let updated_dateFormat: string;
      let created_dateFormat: string;
      res.vehicles?.map((e: any) => {
        created_date = new Date(e.created_at);
        updated_date = new Date(e.updated_at);
        updated_dateFormat =
          updated_date.getDate() +
          "/" +
          (updated_date.getMonth() + 1) +
          "/" +
          updated_date.getFullYear() +
          " " +
          updated_date.getHours() +
          ":" +
          updated_date.getMinutes() +
          ":" +
          updated_date.getSeconds();
        created_dateFormat =
          created_date.getDate() +
          "/" +
          (created_date.getMonth() + 1) +
          "/" +
          created_date.getFullYear() +
          " " +
          created_date.getHours() +
          ":" +
          created_date.getMinutes() +
          ":" +
          created_date.getSeconds();
        e.created_at = created_dateFormat;
        e.updated_at = updated_dateFormat;
      });
      return res;
    });

const ProviderOwnerVehicle = () => {
  const { data, isLoading, error, mutate } = useSWR(
    // "/api/vehicle/getvehicle",
      "/api/provider/getvehicle",
    fetcher
  );
  const router = useRouter();

  const [confirm,setConfirm] = useState(false);
  const [req_id,setReq_id] = useState(1);
  const [car_id,setCar_id] = useState(1);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    // สร้างอีก path สำหรับการกด ยืนยัด หรือ ปฏิเสธ
    const response = await fetch("/api/renter_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        confirm,
        req_id,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      return;
    }
    // ต้อง route ไป path ไหนมั้ย
    router.push("/provider/vehicle/status");
  }

  if (error) return router.push("/500");

  if (isLoading) return <>Loading ...</>;

  if (data)
    return (
      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          <button
            type="button"
            onClick={() => router.back()}
            className={`${styles.back_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <br />

          {/* <div className={`text-start`}> */}
          <h1 className={`text-start`}>
            รายการรถเช่าของคุณ <FaCar />{" "}
          </h1>

          {/* </div> */}
          <br />


          {/* data.response?.map */}
          {data.response?.map((e: any) => {
            return (
              <div
                id={`car_${e.request_id}`}
                key={`car_${e.request_id}`}
                className={`${styles.vehicle_card} p-3 mb-3`}
              >
                <div className={`row`}>
                  <div
                    className={`col-6 d-flex justify-content-center align-items-center`}
                  >
                    <div className={`${styles.vehicle_image}`}>
                      <Image
                        src={`/images/vehicles/${e?.imagename}`}
                        alt="Picture of car renter"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                  <div className={`col-6`}>
                    <div
                      className={`d-flex justify-content-left align-items-center mb-3`}
                    >
                      <div className={`text-start`}>
                        <div>
                          <b>ชื่อรถ</b>: {e?.car_name}
                        </div>
                        <div>
                          <b>เลขทะเบียนรถ</b>: {e?.registrationId}
                        </div>
                        <div>
                          <b>จังหวัด</b>: {e?.province}
                        </div>
                        <div>
                          <b>จำนวนที่นั่ง</b>: {e?.maximumCapacity}
                        </div>
                        <div>
                          <b>ถูกสร้างเมื่อ</b>: {e?.created_at}
                        </div>
                        <div>
                          <b>อัปเดตล่าสุดเมื่อ</b>: {e?.updated_at} 
                        </div>
                        <div>
                          <b>สถานะ</b>:{" "}
                          {e?.status === "pending" ? (<>
                            <span className="badge bg-warning">รอการยืนยัน</span>&nbsp;
                          </>) : e?.status === "rejected" ? (<>
                            <span className="badge bg-success">ว่าง</span>&nbsp;
                          </>) : e?.status === "accepted" ? (<>
                            <span className="badge bg-danger">ถูกจองแล้ว</span>
                          </>) : (<>
                            <span>-</span>
                          </>)}
                        </div>
                      </div>
                    </div>
                    <div>
                      {e?.status === "pending" ? (<>
                        <div>
                          <b>ชื่อผู้เช่ารถ</b>: {e?.renter_firstname} {e?.renter_lastname}
                        </div>
                        <div>
                          <b>วันเวลาในการรับรถ</b>: {e?.startdate} {e?.starttime}
                        </div>
                        <div>
                          <b>วันเวลาในการรับคืนรถ</b>: {e?.enddate} {e?.endtime}
                        </div>
                        <div>
                          <Row>
                            <Col><b>กดยืนยันการจอง</b>:{" "}</Col>
                            <Col><button className={styles.confirm_btn} 
                            onClick={(event) => {
                            setConfirm(true);
                            setReq_id(e?.request_id);
                            setCar_id(e?.car_id);
                            handleSubmit(event);}}>
                              ยีนยัน</button></Col>
                            <Col><button className={styles.cancel_btn} 
                            onClick={(event) => {
                            setConfirm(false);
                            setReq_id(e?.request_id);
                            setCar_id(e?.car_id);
                            handleSubmit(event);}}>
                              ปฏิเสธ</button></Col>
                          </Row>
                        </div> 
                      </>) : e?.status === "accepted" ? (<>
                        <b>ชื่อของผู้เช่า</b>: {e?.renter_firstname} {e?.renter_lastname}
                        <br></br>
                        <b>เบอร์โทรติดต่อผู้เช่า</b>: {e?.tel}
                        <br></br>
                        {e?.rent_place === "" ? (<>
                          <b>สถานที่เช่ารถ</b>: -
                        </>) : (<>
                          <b>สถานที่เช่ารถ</b>: {e?.rent_place}
                        </>)}
                        {/* <b>สถานที่เช่ารถ</b>: {e?.rent_place} */}
                      </>) : (<>
                      </>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* {showDelete && (
          <DeleteModal
            show={showDelete}
            onHide={() => setShowDelete(false)}
            handleDelete={handleDeleteVehicle}
          />
        )} */}
      </div>
    );
};

const DeleteModal = ({ show, onHide, handleDelete }: any) => {
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
        <h4 className={`text-center`}>ลบข้อมูลรถเช่า</h4>
        <div className={`text-center`}>
          <small>คุณยืนยันที่จะลบข้อมูลรถเช่าหรือไม่?</small>
        </div>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex`}>
        <Button className={`me-auto`} onClick={onHide}>
          ยกเลิก
        </Button>
        <Button onClick={handleDelete} variant="danger">
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProviderOwnerVehicle;
