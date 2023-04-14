import Head from "next/head";
import styles from "@/styles/image.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sucess(){

    const router = useRouter();

    return (
        <>
            <Head><title>Sucess-VEHICLE4U</title></Head>
            <div className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}>
                <div className={`p-4 ${styles.reg_container}`}>
                    <div className={`text-center`}>
                    <Image
                        src={`/images/correct.webp`}
                        alt="Picture of the author"
                        width={300}
                        height={300}
                        className={styles.correctimage}
                      />
                    <div className={styles.text}>
                        <h4>สำเร็จ</h4>
                        <p>เมื่อผู้ปล่อยเช่ายืนยันการเช่า ระบบจะส่งแจ้งเตือนให้ท่านอีกครั้งเพื่อทำการชำระเงิน</p>
                    </div>
                    <button className={styles.home_btn} onClick={(event: any) => { router.push("/vehicle") }}>กลับสู่หน้าหลัก</button></div>
                </div>
            </div>
        </>
      
    )
}