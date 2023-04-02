import styles from "@/styles/getvehicle.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaCar, FaEdit, FaPrescriptionBottle } from "react-icons/fa";
import useSWR from "swr";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";

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
    "/api/vehicle/getvehicles",
    fetcher
  );
  const router = useRouter();

  const [showDelete, setShowDelete] = useState<boolean>(false);

  useEffect(() => {
    if (data?.statusCode === 401) {
      router.push("/");
    }
  }, [data]);

  const handleDeleteVehicle = () => {
    console.log("Delete");
    setShowDelete(false);
    mutate();
  };

  if (error) return router.push("/500");

  if (isLoading) return <>Loading ...</>;

  if (data)
    console.log(data);
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
          {/* <h1 className="align-items-center d-flex justify-content-end">
            <FaCar />
            &nbsp;รถเช่าของคุณ
          </h1>
          <hr /> */}

          {/* <div className={`text-start`}> */}
          <h1 className={`text-start`}>
            รถเช่าของคุณ <FaCar />{" "}
            <div className={`float-end`}>
              <button
                title="add vehicle"
                className={`btn btn-success`}
                onClick={() => router.push("/vehicle/create")}
              >
                + เพิ่มรถเช่า
              </button>
            </div>
          </h1>

          {/* </div> */}
          <br />

          {data.vehicles?.map((e: any) => {
            console.log(e?.imagename);
            return (
              <div
                id={`car_${e.id}`}
                key={`car_${e.id}`}
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
                          <b>ชื่อรถ</b>: {e?.name}
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
                        {/* <div>
                          <b>สถานะ</b>:{" "}
                          <span className="badge bg-success">ว่าง</span>&nbsp;
                          <span className="badge bg-warning">รอการยืนยัน</span>
                          &nbsp;
                          <span className="badge bg-danger">ถูกจองแล้ว</span>
                        </div> */}
                      </div>
                    </div>
                    <div>
                      <Link
                        className={`float-start`}
                        href={`/vehicle/update/${e?.id}`}
                      >
                        <FaEdit />
                        แก้ไขข้อมูล
                      </Link>

                      <Link
                        className={`float-end`}
                        href={`#car_${e.id}`}
                        onClick={() => setShowDelete(true)}
                      >
                        <FaPrescriptionBottle />
                        ลบข้อมูล
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showDelete && (
          <DeleteModal
            show={showDelete}
            onHide={() => setShowDelete(false)}
            handleDelete={handleDeleteVehicle}
          />
        )}
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
