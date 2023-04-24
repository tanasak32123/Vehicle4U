import Head from "next/head";
import styles from "@/styles/searchcar.module.css";
import { Row, Col, Button } from "react-bootstrap";
import React, { useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import validation from "@/libs/validation";
import ReactStars from "react-stars";
import { useRouter } from "next/navigation";

export default function SearchCar() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [seat, setSeat] = useState("0");
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const page_num = useMemo(() => {
    return pageCount;
  }, [pageCount]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const provinceRef = useRef<HTMLSelectElement | null>(null);
  const seatRef = useRef<HTMLInputElement | null>(null);

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPageCount(res.page_count);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

  const {
    data: paginationData,
    isLoading: paginationLoading,
    error: paginationError,
  } = useSWR(
    process.env.NEXT_PUBLIC_BACKEND_URL +
      `/vehicle/search?name=${name}&maxPassenger=${seat}&province=${province}&page=${nextPage}`,
    fetcher
  );

  const fetcherProvince = (url: string) =>
    fetch(url)
      .then((res) => {
        mutate(url, res);
        return res.json();
      })
      .then((res) => {
        res.sort((a: any, b: any) => {
          if (a.name_th < b.name_th) {
            return -1;
          }
          if (a.name_th > b.name_th) {
            return 1;
          }
          return 0;
        });
        return res;
      });

  const {
    data: provinceData,
    isLoading: provinceLoading,
    error: provinceError,
  } = useSWR(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    fetcherProvince
  );

  const handlePagination = ({ selected }: any) => {
    setNextPage(selected + 1);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (
      seatRef.current?.value! &&
      (!validation.numberOnly(seatRef.current?.value!) ||
        Number(seatRef.current?.value!) <= 0)
    ) {
      seatRef.current?.classList.add("is-invalid");
    } else {
      if (seatRef.current?.classList.contains("is-invalid")) {
        seatRef.current?.classList.remove("is-invalid");
      }
      setName(nameRef.current?.value!);
      setProvince(provinceRef.current?.value!);
      setSeat(seatRef.current?.value! == "" ? "0" : seatRef.current?.value!);
      setNextPage(1);
    }
  };

  if (provinceError) return <div>Failed to load.</div>;
  if (provinceLoading)
    return (
      <div
        className={`d-flex justify-content-center align-items-center ${styles.main}`}
      >
        <div className={`lds-facebook ${styles.loading}`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  if (provinceData)
    return (
      <>
        <Head>
          <title>ค้นหายานพาหนะ-VEHICLE4U</title>
          <meta name="description" content="search vehicle" />
        </Head>

        <div
          className={`${styles.main} d-flex justify-content-center align-items-center`}
        >
          <div className="container mt-4">
            <div className={`${styles.form_container} p-4 mb-3`}>
              <h1 className={`${styles.title} mb-3`}>ค้นหายานพาหนะ</h1>
              <Row>
                <Col lg={3} sm={12}>
                  <div className="form-floating">
                    <input
                      ref={nameRef}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="ชื่อยานพาหนะ"
                    />
                    <label htmlFor="name">ชื่อยานพาหนะ</label>
                  </div>
                </Col>
                <Col lg={3} sm={12}>
                  <div className="form-floating">
                    <select
                      ref={provinceRef}
                      title={`query province`}
                      className="form-select"
                      id="province"
                      placeholder="จังหวัด"
                      defaultValue={``}
                    >
                      <option value={""}>กรุณาเลือกจังหวัด</option>
                      {provinceData?.map((e: any) => {
                        return (
                          <option key={e.id} id={e.id} value={e.name_th}>
                            {e.name_th}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="brand">จังหวัด</label>
                  </div>
                </Col>
                <Col lg={4} sm={12}>
                  <div className="form-floating">
                    <input
                      ref={seatRef}
                      type="text"
                      className="form-control"
                      id="seat"
                      placeholder="จำนวนที่นั่ง"
                    />
                    <div
                      id="validationSeat"
                      className={`invalid-feedback ${styles.invalid_feedback}`}
                    >
                      ** โปรดใส่จำนวนที่นั่งให้ถูกต้อง
                    </div>
                    <label htmlFor="brand">จำนวนที่นั่ง</label>
                  </div>
                </Col>
                <Col
                  lg={2}
                  sm={12}
                  className={`d-flex justify-content-center align-items-center`}
                >
                  <div>
                    <Button
                      type="button"
                      id="search_btn"
                      className={`btn-success`}
                      onClick={handleSearch}
                    >
                      <FaSearch /> ค้นหา
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>

            <div className={`${styles.vehicle_container} mb-3 p-4`}>
              {paginationLoading && (
                <div
                  className={`${styles.load_container} d-flex justify-content-center align-items-center`}
                >
                  <div className={`lds-facebook`}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {paginationError && (
                <div
                  className={`d-flex justify-content-center align-items-center ${styles.no_info}`}
                >
                  เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง
                </div>
              )}

              {paginationData?.vehicles && (
                <>
                  {paginationData?.vehicles?.length == 0 && (
                    <div
                      className={`d-flex justify-content-center align-items-center ${styles.no_info}`}
                    >
                      ไม่พบยานพาหนะ
                    </div>
                  )}

                  {paginationData?.vehicles?.length != 0 && (
                    <>
                      {paginationData?.vehicles.map((e: any) => {
                        return (
                          <div
                            key={`vehicle_card_${e?.id}`}
                            className={`${styles.card} mb-4 p-4`}
                          >
                            <Row>
                              <Col lg={6}>
                                <div
                                  className={`${styles.vehicle_image} h-100`}
                                >
                                  <Image
                                    src={`/images/vehicles/${e?.imagename}`}
                                    alt="Picture of car renter"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </Col>
                              <Col className="p-3" lg={6}>
                                <div className={`text-start`}>
                                  <div className={styles.car_name}>
                                    {e?.name.toUpperCase()}
                                  </div>
                                  <div className={styles.details}>
                                    <ul>
                                      <li>
                                        <b>เลขทะเบียนรถ</b>: {e?.registrationId}
                                      </li>
                                      <li>
                                        <b>จังหวัด</b>: {e?.province}
                                      </li>
                                      <li>
                                        <b>จำนวนที่นั่ง</b>:{" "}
                                        {e?.maximumCapacity}
                                      </li>

                                      <li>
                                        <b>ชื่อ-นามสกุล (เจ้าของรถ)</b>:{" "}
                                        {e?.user.first_name} &nbsp;
                                        {e?.user.last_name}
                                      </li>
                                      <li>
                                        <b>เบอร์โทรติดต่อ (เจ้าของรถ)</b>:{" "}
                                        {e?.user.tel.slice(0, 3) +
                                          "-" +
                                          e?.user.tel.slice(3, 6) +
                                          "-" +
                                          e?.user.tel.slice(6)}
                                      </li>
                                    </ul>
                                    <div className="d-flex align-items-center mb-2">
                                      <div className="me-2">คะแนนรีวิว:</div>
                                      {e?.reviewScore != 0 && (
                                        <ReactStars
                                          count={5}
                                          value={e?.reviewScore}
                                          size={24}
                                          color2={"#ffd700"}
                                          edit={false}
                                        />
                                      )}
                                      {e?.reviewScore <= 0 && (
                                        <small>ยังไม่มีคะแนนรีวิว</small>
                                      )}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <button
                                        className={`float-end btn btn-primary`}
                                        onClick={() => {
                                          router.push(`/vehicle/rent/${e?.id}`);
                                        }}
                                      >
                                        เช่ารถ
                                      </button>
                                      <button
                                        className={`float-end btn btn-primary`}
                                        onClick={() => {
                                          router.push(
                                            `/vehicle/${e?.id}/comments`
                                          );
                                        }}
                                      >
                                        ดูรีวิวยานพาหนะ
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        );
                      })}
                      <ReactPaginate
                        forcePage={nextPage - 1}
                        breakLabel="..."
                        nextLabel="ถัดไป >"
                        onPageChange={handlePagination}
                        containerClassName={`${styles.pagination}`}
                        previousLinkClassName={`${styles.pagination__link}`}
                        nextLinkClassName={`${styles.pagination__link}`}
                        disabledClassName={`${styles.pagination__link__disabled}`}
                        activeClassName={`${styles.pagination__link__active}`}
                        pageRangeDisplayed={3}
                        pageCount={page_num}
                        previousLabel="< ก่อนหน้า"
                        renderOnZeroPageCount={null || undefined}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
}
