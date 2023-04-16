import styles from "@/styles/status.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { Row, Col } from "react-bootstrap";
import formatDate from "@/libs/formatDate";
import Head from "next/head";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmModal from "@/components/Modal/ConfirmSending";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.statusCode != 200) {
        return res;
      }
      res.response?.map((e: any) => {
        e.created_at = formatDate(new Date(e.created_at));
        e.updated_at = formatDate(new Date(e.updated_at));
      });
      return res;
    });

const ProviderOwnerVehicle = () => {
  const [showModal, setShowModal] = useState(false);
  const [request, setRequest] = useState(false);

  const handleClose = () => setShowModal(false);

  // const handleShow = () => {
  //   setShowModal(true);
  // };

  const handleConfirm = () => {
    mutate();
    setShowModal(false);
    // Do something when rejected
  };

  const handleReject = () => {
    setShowModal(false);
    // Do something when rejected
  };

  const { data, isLoading, error, mutate } = useSWR(
    "/api/provider/getvehicle",
    fetcher
  );
  const router = useRouter();

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    status: string
  ) {
    const req_id = event.currentTarget.id;
    event.preventDefault();
    // สร้างอีก path สำหรับการกด ยืนยัด หรือ ปฏิเสธ
    const response = await fetch("/api/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        req_id,
      }),
    });
    if (!response.ok) return;
    mutate();
    if (status == "accepted") {
      toast.success("ยืนยันการจองรถสำเร็จ", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (status == "rejected") {
      toast.success("ยกเลิกการจองรถสำเร็จ", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

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
          <title>สถานะการจองรถ-VEHICLE4U</title>
        </Head>
        <div
          className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
        >
          <div className={`p-4 ${styles.reg_container}`}>
            <h1 className={`text-start ps-3`}>สถานะการจองรถ</h1>
            <hr />
            <br />

            {data.response?.length == 0 && (
              <div className={`my-4 text-center`}>
                <p>ไม่มีข้อมูล</p>
              </div>
            )}

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
                          <div className="mb-1">
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
                              {e?.status === "pending" ? (
                                <>
                                  <span className="badge bg-warning">
                                    รอการยืนยัน
                                  </span>
                                  &nbsp;
                                </>
                              ) : e?.status === "rejected" ? (
                                <>
                                  <span className="badge bg-danger">
                                    ปฏิเสธ
                                  </span>
                                  &nbsp;
                                </>
                              ) : e?.status === "accepted" ? (
                                <>
                                  <span className="badge bg-success">
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
                          </div>
                        </div>
                      </div>
                      <div>
                        {e?.status === "pending" ? (
                          <>
                            <div>
                              <b>ชื่อผู้เช่ารถ</b>: {e?.renter_firstname}{" "}
                              {e?.renter_lastname}
                            </div>
                            <div>
                              <b>วันเวลาในการรับรถ</b>: {e?.startdate}{" "}
                              {e?.starttime}
                            </div>
                            <div>
                              <b>วันเวลาในการรับคืนรถ</b>: {e?.enddate}{" "}
                              {e?.endtime}
                            </div>
                            <div>
                              <Row>
                                <Col>
                                  <b>กดยืนยันการจอง</b>:{" "}
                                </Col>
                                <Col>
                                  <button
                                    id={e?.request_id}
                                    className={styles.confirm_btn}
                                    onClick={(event) => {
                                      handleSubmit(event, "accepted");
                                    }}
                                  >
                                    ยีนยัน
                                  </button>
                                </Col>
                                <Col>
                                  <button
                                    id={e?.request_id}
                                    className={styles.cancel_btn}
                                    onClick={(event) => {
                                      handleSubmit(event, "rejected");
                                    }}
                                  >
                                    ปฏิเสธ
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          </>
                        ) : e?.status === "accepted" ? (
                          <>
                            <div>
                              <b>ชื่อของผู้เช่า</b>: {e?.renter_firstname}{" "}
                              {e?.renter_lastname}
                            </div>
                            <div>
                              <b>เบอร์โทรติดต่อผู้เช่า</b>: {e?.tel}
                            </div>
                            <div>
                              <b>วันเวลาในการรับรถ</b>: {e?.startdate}{" "}
                              {e?.starttime}
                            </div>
                            <div>
                              <b>วันเวลาในการรับคืนรถ</b>: {e?.enddate}{" "}
                              {e?.endtime}
                            </div>
                            <div>
                              <Row>
                                <Col>
                                  <b>กดเพื่อส่งรถยนต์ให้ผู้เช่า:</b>
                                </Col>
                                <Col>
                                  <button
                                    id={e?.request_id}
                                    className={styles.send_car}
                                    onClick={() => {
                                      setShowModal(true);
                                      setRequest(e?.request_id);
                                    }}
                                  >
                                    ส่งรถให้ผู้เช่า
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          </>
                        ) : e?.status === "in use" ? (
                          <>
                            <div>
                              <b>ชื่อของผู้เช่า</b>: {e?.renter_firstname}{" "}
                              {e?.renter_lastname}
                            </div>
                            <div>
                              <b>เบอร์โทรติดต่อผู้เช่า</b>: {e?.tel}
                            </div>
                            <div>
                              <b>วันเวลาในการรับรถ</b>: {e?.startdate}{" "}
                              {e?.starttime}
                            </div>
                            <div>
                              <b>วันเวลาในการรับคืนรถ</b>: {e?.enddate}{" "}
                              {e?.endtime}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="float-end">
                        <button
                          id={e?.request_id}
                          className={styles.confirm_btn}
                          onClick={() => {
                            router.push(`/chat/${e.renter_id}`);
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
        {showModal && (
          <ConfirmModal
            req_id={request}
            isShow={showModal}
            onHide={handleClose}
            onConfirm={handleConfirm}
            onReject={handleReject}
          />
        )}
      </>
    );
};

export default ProviderOwnerVehicle;
