import Head from "next/head";
import Layout from "../components/layout";
import styles from "@/styles/role_selection.module.css";
import bg from "../public/bgRegistered.png";
import correct from "../public/correct.png"
import Link from "next/link";
import Image from "next/image";

export default function Registered() {
    return (
        <Layout>
            <div style={{
                backgroundImage: `url(${bg.src})`,
                height: '100vh',
                width: '100vw',
                objectFit: "cover",
                }}  className="d-flex justify-content-center align-items-center"
            >
                <div className={`${styles.container}`}>
                    <img src={"/correct.png"} width={200} height={200} />
                    <br/><br/>
                    <h1 style={{fontWeight: "1000"}}>สมัครบัญชีผู้ใช้สำเร็จ</h1>
                    <br/>
                    {/* change to main page */}
                    <Link href="/" className={styles.btn}> 
                        <h3 style={{fontWeight: "1000"}}>กลับสู่หน้าหลัก</h3>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}