import styles from "@/styles/getvehicle.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaCar,
  FaEdit,
  FaPrescriptionBottle,
} from "react-icons/fa";
import useSWR from "swr";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "@/components/AuthContext";

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
        "/api/renter/getvehicle",
    fetcher
  );

  const router = useRouter();


  useEffect(() => {
    if (data?.statusCode === 401) {
      router.push("/");
    }
  }, [data]);


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
          <h1 className="align-items-center d-flex justify-content-end">
            <FaCar />
            &nbsp;รายการเช่าของคุณ
          </h1>
          <hr />

        {/* ใส่ field ใน data ให้ถูกต้อง */}
          {data.response?.map((e: any) => {
            return (
              <div
                id={`car_${e.car_id}`}
                key={`car_${e.car_id}`}
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
                      className={`d-flex justify-content-left align-items-center`}
                    >
                      <div className={`text-start`}>
                        <div>
                          <b>ชื่อรถ</b>: {e?.car_name}
                        </div>
                        <div>
                          <b>เลขทะเบียนรถ</b>: {e?.registrationId}
                        </div>
                        <div>
                          <b>ชื่อเจ้าของรถ</b>: {e?.provider_firstname} {e?.provider_lastname}
                        </div>
                        <div>
                          <b>เบอร์โทรติดต่อเจ้าของรถ</b>: {e?.tel}
                        </div>
                        <div>
                          <b>จำนวนที่นั่ง</b>: {e?.maximumCapacity}
                        </div>
                        <div>
                          <b>วันเวลาในการรับรถ</b>: {e?.startdate} {e?.starttime}
                        </div>
                        <div>
                          <b>วันเวลาในการส่งคืนรถ</b>: {e?.enddate} {e?.endtime}
                        </div>
                        <div>
                          <b>สถานะ</b>:{" "}
                          {e?.status === "pending" ? (<>
                            <span className="badge bg-warning">รอการยืนยัน</span>&nbsp;
                          </>) : e?.status === "confirm" ? (<>
                            <span className="badge bg-success">ว่าง</span>&nbsp;
                          </>) : e?.status === "reserve" ? (<>
                            <span className="badge bg-danger">ถูกจองแล้ว</span>
                          </>) : (<>
                            <span>-</span>
                          </>)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.chat_div}>
                        <button className={styles.chat_btn} 
                        onClick={(event: any) => { router.push("/vehicle") }}>แชท</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

  

// const DeleteModal = ({ show, onHide, handleDelete }: any) => {
//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="sm"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton className={`modal_wo_border`}></Modal.Header>
//       <Modal.Body>
//         <h4 className={`text-center`}>ลบข้อมูลรถเช่า</h4>
//         <div className={`text-center`}>
//           <small>คุณยืนยันที่จะลบข้อมูลรถเช่าหรือไม่?</small>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className={`modal_wo_border d-flex`}>
//         <Button className={`me-auto`} onClick={onHide}>
//           ยกเลิก
//         </Button>
//         <Button onClick={handleDelete} variant="danger">
//           ยืนยัน
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

export default ProviderOwnerVehicle;
