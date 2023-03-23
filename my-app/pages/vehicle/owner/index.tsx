import styles from "@/styles/getvehicle.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { FaArrowAltCircleLeft, FaCar } from "react-icons/fa";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

          {data.vehicles.map((e: any) => {
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
                        style={{ objectFit: "contain", borderRadius: "20px" }}
                      />
                    </div>
                  </div>
                  <div className={`col-6`}>
                    <div>
                      <b>ชื่อรถ</b>: {e?.name}
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
