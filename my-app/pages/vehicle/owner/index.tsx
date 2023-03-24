import styles from "@/styles/getvehicle.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { FaArrowAltCircleLeft, FaCar, FaEdit } from "react-icons/fa";
import useSWR from "swr";
import Link from "next/link";

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
  const { data, isLoading, error } = useSWR("/api/vehicle/getvehicle", fetcher);
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
            &nbsp;รถเช่าของคุณ
          </h1>
          <hr />

          {data.vehicles?.map((e: any) => {
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
                  <div
                    className={`col-6 d-flex justify-content-left align-items-center`}
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
                      <Link href={`/vehicle/update/${e?.id}`}>
                        <FaEdit />
                        แก้ไขข้อมูล
                      </Link>
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
