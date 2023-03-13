import Head from "next/head";
import styles from "@/styles/updateCar.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/components/AuthContext";
import { FaArrowAltCircleLeft, FaCar } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Image,
  Row,
} from "react-bootstrap";
import CarModal from "@/components/car/carModal";
import GearOption from "@/components/car/gearOption";

export default function UpdateCar() {
  const [nameShow, setNameShow] = useState(false);
  const [seatShow, setSeatShow] = useState(false);

  const [name, setName] = useState("");
  const [seat, setSeat] = useState("");

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Upload the file to your server here
  };

  const { user, isAuthenticate, authAction }: any = useAuth();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>ข้อมูลรถยนต์-VEHICLE4U</title>
      </Head>

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
          <h1 className="align-items-center d-flex justify-content-end">
            <FaCar />
            &nbsp; ข้อมูลรถยนต์
          </h1>
          <hr />
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  {/* Image */}
                  <FormGroup>
                    <FormControl type="file" onChange={handleFileInputChange} />
                    <Button className={`${styles.upload_btn}`} type="submit">
                      Upload
                    </Button>
                    <div className={`${styles.first_col}`}>
                      <br />
                      {imageSrc && (
                        <Image
                          className={`${styles.image}`}
                          src={imageSrc}
                          alt="Vehicle Image"
                          height={"400px"}
                        />
                      )}
                    </div>
                  </FormGroup>

                  {/* ชื่อรุ่น */}
                  <Container>
                    <Row>
                      <h6>ชื่อรุ่น</h6>
                    </Row>
                    <Row>
                      <Col>
                        <p>Toyota Altis</p>
                      </Col>
                      <Col>
                        <CarModal />
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col>
                  {/* ที่นั่ง */}
                  <Container>
                    <Row>
                      <h6>จำนวนที่นั่ง</h6>
                    </Row>
                    <Row>
                      <Col>
                        <p>5 ที่นั่ง</p>
                      </Col>
                      <Col>
                        <CarModal />
                      </Col>
                    </Row>
                  </Container>
                  <br />
                  {/* ชนิดเกียร์ */}
                  <Container>
                    <Row>
                      <h6>ประเภทเกียร์</h6>
                    </Row>
                    <Row>
                      <Col>
                        <p>เกียร์ออโต้ (auto)</p>
                      </Col>
                      <Col>
                        <GearOption />
                      </Col>
                    </Row>
                  </Container>
                  <br />
                  {/* เครื่องยนต์ */}
                  <Container>
                    <Row>
                      <h6>ประเภทเครื่องยนต์</h6>
                    </Row>
                    <Row>
                      <Col>
                        <p>เครื่องยนต์เบนซิน</p>
                      </Col>
                      <Col>
                        <CarModal />
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}
