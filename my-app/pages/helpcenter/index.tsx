import Head from "next/head";
import styles from "@/styles/helpcenter.module.css";

export default function helpcenter() {
  return (
    <>
      <Head>
        <title>ศูนย์การช่วยเหลือ-VEHICLE4U</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className={`container ${styles.main} mt-4`}>
        <div>
          <h1>ศูนย์การช่วยเหลือ</h1>
        </div>
      </div>
    </>
  );
}
