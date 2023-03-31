import Head from "next/head";
import styles from "@/styles/searchcar.module.css";
import { Row, Col, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Image from "next/image";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    });

const fetcherProvince = (url: string) =>
  fetch(url)
    .then((res) => res.json())
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

export default function SearchCar() {
  const [name, setName] = useState("");
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [seat, setSeat] = useState("0");
  const [nextPage, setNextPage] = useState(1);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const provinceRef = useRef<HTMLSelectElement | null>(null);
  const seatRef = useRef<HTMLInputElement | null>(null);

  const {
    data: paginationData,
    isLoading: paginationLoading,
    error: paginationError,
  } = useSWR(
    `http://localhost:3000/vehicle/search?name=${name}&maxPassenger=${seat}&province=${province}&page=${nextPage}`,
    fetcher
  );

  const {
    data: provinceData,
    isLoading: provinceLoading,
    error: provinceError,
  } = useSWR(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    fetcherProvince
  );

  const handlePagination = (e: any) => {
    setNextPage(e.selected + 1);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setName(nameRef.current?.value!);
    setProvince(provinceRef.current?.value!);
    setSeat(seatRef.current?.value! == "" ? "0" : seatRef.current?.value!);
    setNextPage(1);
  };

  if (provinceError) return <div>Failed to load.</div>;
  if (provinceLoading) return <div>Loading...</div>;

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
                      defaultValue={`กรุงเทพมหานคร`}
                    >
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
                    <div id="validationSeat" className="invalid-feedback">
                      Please provide a valid city.
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
                  className={`d-flex justify-content-center align-items-center ${styles.no_info}`}
                >
                  <div className={`lds-facebook ${styles.loading}`}>
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
                          <div key={e.id} className={`${styles.card} mb-4 p-4`}>
                            <Row>
                              <Col lg={6}>
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
                              </Col>
                              <Col lg={6}>
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
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        );
                      })}
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="ถัดไป >"
                        onPageChange={handlePagination}
                        containerClassName={`${styles.pagination}`}
                        previousLinkClassName={`${styles.pagination__link}`}
                        nextLinkClassName={`${styles.pagination__link}`}
                        disabledClassName={`${styles.pagination__link__disabled}`}
                        activeClassName={`${styles.pagination__link__active}`}
                        pageRangeDisplayed={3}
                        pageCount={paginationData?.page_count}
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
