import Layout from "@/components/layout";
import styles from "@/styles/editProfile.module.css";
import Head from "next/head";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { Row, Col, Container, Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import useSWR from "swr";

export default function EditProfile() {
  const fetcher = (url: any) => fetch(url).then((r) => r.json());

  const router = useRouter();

  const [nmShow, setNmShow] = useState(false);
  const [unShow, setUnShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [telShow, setTelShow] = useState(false);
  const [ciShow, setCiShow] = useState(false);

  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>การตั้งค่า-VEHICLE4U</title>
      </Head>

      <Layout>
        <div
          className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
        >
          <div className={`p-4 ${styles.reg_container}`}>
            <button
              onClick={() => router.back()}
              className={`${styles.back_btn} d-flex align-items-center`}
            >
              <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
            </button>
            <h1 className="text-end">การตั้งค่า</h1>
            <hr />
            <br />

            {/* name and last name */}
            <Container>
              <div className="mb-2">
                <Row>
                  <label htmlFor="fName">
                    <h6 className={styles.text}>ชื่อ-นามสกุล</h6>
                  </label>
                </Row>
                <Row>
                  <Col>
                    {/* name and last name */}
                    <p>
                      {data.user.fname} {data.user.lname}
                    </p>
                  </Col>
                  <Col>
                    <button
                      className={`${styles.edit_button}`}
                      onClick={() => setNmShow(true)}
                    >
                      <FiEdit2 /> &nbsp; แก้ไข
                    </button>
                    <Modal
                      size="lg"
                      show={nmShow}
                      onHide={() => setNmShow(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>ชื่อ-นามสกุล</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label className="mb-3">ชื่อ</Form.Label>
                                <Form.Control
                                  className={`${styles.input} mb-3`}
                                  type="text"
                                  placeholder={data.user.fname}
                                  autoFocus
                                />
                              </Col>
                              <Col>
                                <Form.Label className="mb-3">
                                  นามสกุล
                                </Form.Label>
                                <Form.Control
                                  className={`${styles.input} mb-3`}
                                  type="text"
                                  placeholder={data.user.lname}
                                  autoFocus
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={`${styles.close_btn} mx-2`}
                          onClick={() => setNmShow(false)}
                        >
                          ปิด
                        </Button>
                        <Button
                          className={`${styles.save_btn} mx-2`}
                          onClick={() => setNmShow(false)}
                        >
                          แก้ไข
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <br />
                </Row>
              </div>
            </Container>
            <br />

            {/* username */}
            <Container>
              <div className="mb-2">
                <Row>
                  <label htmlFor="username">
                    <h6 className={styles.text}>ชื่อผู้ใช้</h6>
                  </label>
                  <br />
                </Row>
                <Row>
                  <Col>
                    {/* username */}
                    <p>{data.user.username}</p>
                  </Col>
                  <Col>
                    <button
                      className={styles.edit_button}
                      onClick={() => setUnShow(true)}
                    >
                      <FiEdit2 /> &nbsp; แก้ไข
                    </button>
                    <Modal
                      size="lg"
                      show={unShow}
                      onHide={() => setUnShow(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>ชื่อผู้ใช้</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mb-3">ชื่อผู้ใช้</Form.Label>
                            <Form.Control
                              className={`${styles.input} mb-3`}
                              type="text"
                              placeholder={data.user.username}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={`${styles.close_btn} mx-2`}
                          onClick={() => setUnShow(false)}
                        >
                          ปิด
                        </Button>
                        <Button
                          className={`${styles.save_btn} mx-2`}
                          onClick={() => setUnShow(false)}
                        >
                          แก้ไข
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <br />
                </Row>
              </div>
            </Container>
            <br />

            {/* username */}
            <Container>
              <div className="mb-2">
                <Row>
                  <label htmlFor="password">
                    <h6 className={styles.text}>รหัสผ่าน</h6>
                  </label>
                  <br />
                </Row>
                <Row>
                  <Col>
                    {/* username */}
                    <input
                      type="password"
                      value="*******"
                      className={`${styles.infor}`}
                      disabled
                    />
                  </Col>
                  <Col>
                    <button
                      className={styles.edit_button}
                      onClick={() => setPassShow(true)}
                    >
                      <FiEdit2 /> &nbsp; แก้ไข
                    </button>
                    <Modal
                      size="lg"
                      show={passShow}
                      onHide={() => setPassShow(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>รหัสผ่าน</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mb-3">รหัสผ่าน</Form.Label>
                            <Form.Control
                              className={`${styles.input} mb-3`}
                              type="text"
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={`${styles.close_btn} mx-2`}
                          onClick={() => setPassShow(false)}
                        >
                          ปิด
                        </Button>
                        <Button
                          className={`${styles.save_btn} mx-2`}
                          onClick={() => setPassShow(false)}
                        >
                          แก้ไข
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <br />
                </Row>
              </div>
            </Container>
            <br />

            {/* Tel. */}
            <Container>
              <div className="mb-2">
                <Row>
                  <label htmlFor="tel">
                    <h6 className={styles.text}>เบอร์โทรศัพท์</h6>
                  </label>
                  <br />
                </Row>
                <Row>
                  <Col>
                    {/* telephone */}
                    <p>{data.user.tel}</p>
                  </Col>
                  <Col>
                    <button
                      className={styles.edit_button}
                      onClick={() => setTelShow(true)}
                    >
                      <FiEdit2 /> &nbsp; แก้ไข
                    </button>
                    <Modal
                      size="lg"
                      show={telShow}
                      onHide={() => setTelShow(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>เบอร์โทรศัพท์</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mb-3">
                              เบอร์โทรศัพท์
                            </Form.Label>
                            <Form.Control
                              className={`${styles.input} mb-3`}
                              type="text"
                              placeholder={data.user.tel}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={`${styles.close_btn} mx-2`}
                          onClick={() => setTelShow(false)}
                        >
                          ปิด
                        </Button>
                        <Button
                          className={`${styles.save_btn} mx-2`}
                          onClick={() => setTelShow(false)}
                        >
                          แก้ไข
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <br />
                </Row>
              </div>
            </Container>
            <br />

            {/* Citizen ID */}
            <Container>
              <div className="mb-2">
                <Row>
                  <label htmlFor="citizenID">
                    <h6 className={styles.text}>หมายเลขบัตรประชาชน</h6>
                  </label>
                  <br />
                </Row>
                <Row>
                  <Col>
                    {/* citizen id */}
                    <p>{data.user.cid}</p>
                  </Col>
                  <Col>
                    <button
                      className={styles.edit_button}
                      onClick={() => setCiShow(true)}
                    >
                      <FiEdit2 /> &nbsp; แก้ไข
                    </button>
                    <Modal
                      size="lg"
                      show={ciShow}
                      onHide={() => setCiShow(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>หมายเลขบัตรประชาชน</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mb-3">
                              หมายเลขบัตรประชาชน
                            </Form.Label>
                            <Form.Control
                              className={`${styles.input} mb-3`}
                              type="text"
                              placeholder={data.user.cid}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={`${styles.close_btn} mx-2`}
                          onClick={() => setCiShow(false)}
                        >
                          ปิด
                        </Button>
                        <Button
                          className={`${styles.save_btn} mx-2`}
                          onClick={() => setCiShow(false)}
                        >
                          แก้ไข
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <br />
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
}
