import styles from "@/styles/getvehicle.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import formatDate from "@/libs/formatDate";
import Head from "next/head";
import { useState } from "react";
import ReviewModal from "@/components/Modal/Review";
import LogoutModal from "@/components/Modal/Logout";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.statusCode != 200) {
        return res;
      }
      // console.log(res);
      res.vehicles?.map((e: any) => {
        e.created_at = formatDate(new Date(e.created_at));
        e.updated_at = formatDate(new Date(e.updated_at));
      });
      return res;
    });

const ProviderOwnerVehicle = () => {
  const { data, isLoading, error } = useSWR("/api/renter/getvehicle", fetcher);

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [value,setValue] = useState();

  const handleClose = () => {
    setShowModal(false);
  };

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
      <>
        <Head>
          <title>ประวัติการเช่าของคุณ-VEHICLE4U</title>
        </Head>

        <div
          className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
        >
          <div className={`p-4 ${styles.reg_container}`}>
            <h1 className="text-start ps-3">ประวัติการเช่าของคุณ</h1>

            <hr />
            <br />
            {data.response?.length == 0 && (
              <div className={`my-4 text-center`}>
                <p>ไม่มีประวัติการเช่า</p>
              </div>
            )}

            {data.response?.map((e: any) => {
              return (
                <div
                  id={`${e.request_id}`}
                  key={`${e.request_id}`}
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
                      <div>
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
                          ) : e?.status === "in use" ? (
                            <>
                              <span className="badge bg-secondary">
                                รถยนต์กำลังถูกใช้งาน
                              </span>
                            </>
                          ) : (
                            <>
                              <span>-</span>
                            </>
                          )}
                        </div>
                        <div className={styles.chat_div}>
                          <button
                            type="button"
                            className={styles.chat_btn}
                            onClick={() => router.push(`/chat/${e?.provider_id}`)}
                          >
                            แชท
                          </button>
                        </div>
                        {e?.status === "in use" ? (
                          <>
                            <div className={styles.review_div}>
                              {/* ต้องใส่ comment id มาด้วยสำหรับการ comment e?.cid */}
                              {e?.cid !== null ? (
                                <>
                                </>
                              ) : (<>
                                <button
                                  type="button"
                                  className={styles.review_btn}
                                  onClick={() => {setShowModal(true); setValue(e);}}
                                  >
                                    รีวิวยานพานหนะ
                                </button>
                              </>)}
                            </div>
                          </>) : (
                            <div></div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showModal && (
        <ReviewModal
          show={showModal}
          onHide={() => setShowModal(false)}
          value = {value}
          onClose = {handleClose}
          // authAction={authAction}
          // setShowSignout={setShowSignout}
        />
      )}

      </>
    );
};

export default ProviderOwnerVehicle;
