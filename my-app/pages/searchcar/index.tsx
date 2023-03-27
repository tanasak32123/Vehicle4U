import Head from 'next/head';
import styles from '@/styles/searchcar.module.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt } from 'react-icons/bi';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }: any, ref) => (
  <a
    href=""
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it

const CustomMenu = React.forwardRef(
  ({ children, style, className }: any, ref) => {
    const [value, setValue] = useState('');

    return (
      <div style={style} className={className}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => {
            setValue(e.target.value);
            console.log(e.target.value);
          }}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child: any) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default function SearchCar() {
  const [name, setName] = useState('Toyota Altis');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [maximumCapacity, setmaximumCapacity] = useState('1');
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate1, setStartDate1] = useState(today);
  const [startDate2, setStartDate2] = useState(tomorrow);

  let [loading, setLoading] = useState(false);

  const key = ['vehicles', name || '', maximumCapacity || '', province || ''];

  const fetchVehicles = async (
    key,
    name,
    maximumCapacity,
    province,
    nextPage = 1
  ) => {
    const response = await fetch(
      `http://localhost:3000/vehicles?name=${name}&maximumCapacity=${maximumCapacity}&province=${province}&page=${nextPage}`
    );
    const data = await response.json();
    // console.log(data); // add this line to check the data
    return {
      vehicles: data.vehicles,
      totalPages: data.total_pages,
      nextPage: data.next_page,
    };
  };

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) =>
      fetchVehicles('vehicles', name, maximumCapacity, province, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
      enabled: false,
    }
  );

  const handleSearch = () => {
    // Reset the infinite scroll component to page 1
    fetchNextPage(1);
  };

  const searchResults = data?.pages.flatMap((page) => page.vehicles) ?? [];

  const handleDateChange1 = (date: Date) => {
    if (date > today) {
      console.log('1');
      setStartDate1(date);

      if (date >= startDate2) {
        console.log('2');

        let newStartDate2 = new Date(date.getTime());
        newStartDate2.setDate(newStartDate2.getDate() + 1);
        setStartDate2(newStartDate2);
      }
      if (startDate2 == tomorrow) {
        console.log('3');
        setStartDate2(new Date(tomorrow.getTime() + 86400000));
      }
    } else {
      setStartDate1(today);
      if (today >= startDate2) {
        setStartDate2(tomorrow);
      }
      if (startDate2 == tomorrow) {
        setStartDate2(new Date(tomorrow.getTime() + 86400000));
      }
    }
  };
  const handleDateChange2 = (date: Date) => {
    if (date > tomorrow) {
      setStartDate2(date);
      if (date <= startDate1) {
        let newStartDate1 = new Date(date.getTime());
        newStartDate1.setDate(newStartDate1.getDate() - 1);
        setStartDate1(newStartDate1);
      }
    } else {
      setStartDate2(tomorrow);
      setStartDate1(today);
    }
  };

  return (
    <>
      <Head>
        <title>หน้าหลัก-VEHICLE4U</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.main}`}>
        <Row style={{ height: '100vh', width: '100%' }}>
          <Col
            sm={12}
            lg={20}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className={`${styles.form_container} justify-content-center d-flex align-items-center`}
            >
              <form style={{ width: '90%' }}>
                <h5 className={`p-2 ${styles.head} mb-1 text-center`}>
                  บริการเช่ารถ
                </h5>

                <br />
                <br />

                <Row>
                  <Col sm={12} lg={6}>
                    <Row className={`p-3 ${styles.role} mb-1 text-center`}>
                      <Col
                        sm={12}
                        lg={4}
                        style={{ borderRight: '1px solid black' }}
                      >
                        <h6>ชื่อรุ่นรถ</h6>
                        <Dropdown>
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          >
                            {name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setName(e.target.getAttribute('name'))
                              }
                              name="Toyota Altis"
                            >
                              Toyota Altis
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setName(e.target.getAttribute('name'))
                              }
                              name="Ford Ranger"
                            >
                              Ford Ranger
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setName(e.target.getAttribute('name'))
                              }
                              name="Toyota Yaris"
                            >
                              Toyota Yaris
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                      <Col
                        sm={12}
                        lg={4}
                        style={{ borderRight: '1px solid black' }}
                      >
                        <h6>จังหวัด</h6>
                        <Dropdown>
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          >
                            {province}
                          </Dropdown.Toggle>

                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setProvince(e.target.getAttribute('province'))
                              }
                              province="กรุงเทพมหานคร"
                            >
                              กรุงเทพมหานคร
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setProvince(e.target.getAttribute('province'))
                              }
                              province="นนทบุรี"
                            >
                              นนทบุรี
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setProvince(e.target.getAttribute('province'))
                              }
                              province="ปทุมธานี"
                            >
                              ปทุมธานี
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>

                      <Col sm={12} lg={4}>
                        <h6>จำนวนผู้โดยสาร</h6>
                        <Dropdown>
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          >
                            {maximumCapacity}
                          </Dropdown.Toggle>

                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setmaximumCapacity(
                                  e.target.getAttribute('maximumCapacity')
                                )
                              }
                              maximumCapacity="1"
                            >
                              1
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setProvince(
                                  e.target.getAttribute('maximumCapacity')
                                )
                              }
                              maximumCapacity="2"
                            >
                              2
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e: any) =>
                                setProvince(
                                  e.target.getAttribute('maximumCapacity')
                                )
                              }
                              maximumCapacity="3"
                            >
                              3
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={12} lg={4}>
                    <div className={`p-2 ${styles.role} mb-3 text-center`}>
                      <Row className={`${styles.p1}`}>
                        <Col>วัน-เวลารับรถ</Col>
                        <Col>
                          <DatePicker
                            className={`${styles.picker}`}
                            selected={startDate1}
                            onChange={handleDateChange1}
                            minDate={today}
                            dateFormat="dd/MM/yyyy"
                          />
                        </Col>
                      </Row>
                      <Row className={`${styles.p2}`}>
                        <Col>วัน-เวลาส่งรถ</Col>
                        <Col>
                          <DatePicker
                            className={`${styles.picker}`}
                            selected={startDate2}
                            onChange={handleDateChange2}
                            minDate={tomorrow}
                            dateFormat="dd/MM/yyyy"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Col sm={12} lg={2}>
                    <button
                      type="button"
                      className={`${styles.searchbtn}`}
                      onClick={handleSearch}
                    >
                      <BiSearchAlt size={60} />
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        {searchResults.map((vehicle) => (
          <div key={vehicle.id}>
            <h2>{vehicle.name}</h2>
            <p>Max Passenger: {vehicle.maximumCapacity}</p>
          </div>
        ))}
        {hasNextPage && (
          <InfiniteScroll
            dataLength={searchResults.length}
            next={() => fetchNextPage()}
            hasMore={!isFetchingNextPage}
            loader={<h4>Loading...</h4>}
          ></InfiniteScroll>
        )}
      </div>
    </>
  );
}
