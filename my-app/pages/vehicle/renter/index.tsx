import styles from "@/styles/getvehicle.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { FaArrowAltCircleLeft, FaCar } from "react-icons/fa";
import useSWR from "swr";
import formatDate from "@/libs/formatDate";

// import { useAuth } from "@/components/AuthContext";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.statusCode != 200) {
        return res;
      }
      res.vehicles?.map((e: any) => {
        e.created_at = formatDate(new Date(e.created_at));
        e.updated_at = formatDate(new Date(e.updated_at));
      });
      return res;
    });

const ProviderOwnerVehicle = () => {
  const { data, isLoading, error } = useSWR("/api/renter/getvehicle", fetcher);

  const router = useRouter();

  // useEffect(() => {
  //   if (data?.statusCode === 401) {
  //     router.push("/");
  //   }
  // }, [data]);

  if (error) return router.push("/500");

  if (isLoading)
    return (
      <div className={`d-flex justify-content-center align-items-center`}>
        <div className={`lds-facebook`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

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

          {/* ใส่ field ใน data ให้ถูกต้อง request id*/}
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
                          <b>ชื่อเจ้าของรถ</b>: {e?.provider_firstname}{" "}
                          {e?.provider_lastname}
                        </div>
                        <div>
                          <b>เบอร์โทรติดต่อเจ้าของรถ</b>: {e?.tel}
                        </div>
                        <div>
                          <b>จำนวนที่นั่ง</b>: {e?.maximumCapacity}
                        </div>
                        <div>
                          <b>วันเวลาในการรับรถ</b>: {e?.startdate}{" "}
                          {e?.starttime}
                        </div>
                        <div>
                          <b>วันเวลาในการส่งคืนรถ</b>: {e?.enddate} {e?.endtime}
                        </div>
                        <div>
                          <b>สถานะ</b>:{" "}
                          {e?.status === "pending" ? (
                            <>
                              <span className="badge bg-warning">
                                รอการยืนยัน
                              </span>
                              &nbsp;
                            </>
                          ) : e?.status === "accepted" ? (
                            <>
                              <span className="badge bg-success">
                                จองสำเร็จ
                              </span>
                              &nbsp;
                            </>
                          ) : e?.status === "rejected" ? (
                            <>
                              <span className="badge bg-danger">
                                ถูกจองแล้ว
                              </span>
                            </>
                          ) : (
                            <>
                              <span>-</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.chat_div}>
                      <button
                        className={styles.chat_btn}
                        onClick={(event: any) => {
                          router.push("/vehicle");
                        }}
                      >
                        แชท
                      </button>
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
