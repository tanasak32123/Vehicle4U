import styles from "@/styles/status.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowAltCircleLeft, FaCar } from "react-icons/fa";
import useSWR from "swr";
import { Row, Col } from "react-bootstrap";
import formatDate from "@/libs/formatDate";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.statusCode != 200) {
        return res;
      }
      console.log(res);
      res.response?.map((e: any) => {
        e.created_at = formatDate(new Date(e.created_at));
        e.updated_at = formatDate(new Date(e.updated_at));
      });
      return res;
    });

const ProviderOwnerVehicle = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/provider/getvehicle",
    fetcher
  );
  const router = useRouter();

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    confirm: boolean
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
        confirm,
        req_id,
      }),
    });
    if (!response.ok) {
      // const data = await response.json();
      return;
    }
    mutate();
    // ต้อง route ไป path ไหนมั้ย
    router.push("/provider/vehicle/status");
    console.log('data =',data.response);
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

          <h1 className={`text-start`}>
            รายการรถเช่าของคุณ <FaCar />{" "}
          </h1>

          <br />
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
                          {e?.status === "pending" ? (
                            <>
                              <span className="badge bg-warning">
                                รอการยืนยัน
                              </span>
                              &nbsp;
                            </>
                          ) : e?.status === "rejected" ? (
                            <>
                              <span className="badge bg-danger">ปฏิเสธ</span>
                              &nbsp;
                            </>
                          ) : e?.status === "accepted" ? (
                            <>
                              <span className="badge bg-success">
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
                                    handleSubmit(event, true);
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
                                    handleSubmit(event, false);
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
                          <b></b>
                        </>
                      ) : (
                        <></>
                      )}
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

export default ProviderOwnerVehicle;
