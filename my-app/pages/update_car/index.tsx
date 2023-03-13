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
import SizeOption from "@/components/car/sizeOption";
import CarForm from "@/components/car/carForm";
import EditCar from "@/types/EditCar";

export default function UpdateCar() {
  // modal
  const [nameShow, setNameShow] = useState(false);
  const [insuranceShow, setInsuranceShow] = useState(false);
  const [colorShow, setColorShow] = useState(false);
  const [gearTypeShow, setGearTypeShow] = useState(false);
  const [regNumShow, setRegNumShow] = useState(false);
  const [passengerShow, setPassengerShow] = useState(false);
  const [wheelShow, setWheelShow] = useState(false);
  const [powerShow, setPowerShow] = useState(false);
  const [sizeShow, setSizeShow] = useState(false);
  const [provinceShow, setProvinceShow] = useState(false);

  const [name, setName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [color, setColor] = useState("");
  const [gearType, setGearType] = useState("");
  const [regNum, setRegNum] = useState("");
  const [passenger, setPassenger] = useState("");
  const [wheel, setWheel] = useState("");
  const [power, setPower] = useState("");
  const [size, setSize] = useState("");
  const [province, setProvince] = useState("");

  const [invalidInput, setInvalidInput] = useState("");

  // image
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

  const handleSubmitImage = async () => {
    try {
      if (!imageSrc) return;
      const formData = new FormData();
      formData.append("myImage", imageSrc);
      const { data }: any = await fetch("/api/editImage", {
        method: "POST",
        body: formData,
      });
    } catch (error: any) {
      console.log(error.response?.data);
    }
    console.log(FormData);
    // Upload the file to your server here
  };

  const data: EditCar = {
    name: name,
    insurance: insurance,
    color: color,
    typeOfGear: gearType,
    regNum: regNum,
    passenger: passenger,
    wheel: wheel,
    power: power,
    size: size,
    province: province,
  };

  const updateCar = async (data: EditCar, type: string, values: string[]) => {
    const response = await fetch(`api/updateCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, type, values }),
    });
    const body = await response.json();
    return body;
  };

  // update car
  async function handleEditCar(type: string, values: string[]) {
    try {
      const response = await updateCar(data, type, values);
      if (!response.success) {
        setInvalidInput(response.message);
      }
      return response.success;
    } catch (error) {
      console.error(error);
    }
  }

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
            <br />
            <Row>
              <Col>
                <Form onSubmit={handleSubmitImage}>
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
                </Form>
                <br />
                {/* ชื่อรถ */}
                <CarForm
                  name="name"
                  label="ชื่อรถ"
                  rawData={`car_name`}
                  inputs={[
                    {
                      name: "name",
                      label: "ชื่อรถ",
                      value: "car_name",
                      currentValue: name,
                      setValue: setName,
                    },
                  ]}
                  setShowModalFunc={setNameShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`name`}
                  type={`text`}
                  inputs={[
                    {
                      name: "name",
                      label: "ชื่อของรถ",
                      value: "car_name",
                      currentValue: name,
                      setValue: setName,
                    },
                  ]}
                  newData={[name]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={nameShow}
                  setShowModalFunc={setNameShow}
                  handleupdateFunc={handleEditCar}
                />
                {/* สีรถ */}
                <CarForm
                  name="color"
                  label="สีของรถ"
                  rawData={`car_color`}
                  inputs={[
                    {
                      name: "color",
                      label: "สีของรถ",
                      value: "car_color",
                      currentValue: color,
                      setValue: setColor,
                    },
                  ]}
                  setShowModalFunc={setColorShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`color`}
                  type={`text`}
                  inputs={[
                    {
                      name: "color",
                      label: "สีของรถ",
                      value: "car_color",
                      currentValue: color,
                      setValue: setColor,
                    },
                  ]}
                  newData={[color]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={colorShow}
                  setShowModalFunc={setColorShow}
                  handleupdateFunc={handleEditCar}
                />
              </Col>
              <Col>
                {/* หมายเลขทะเบียน */}
                <CarForm
                  name="regNum"
                  label="เลขทะเบียนของรถ"
                  rawData={`car_regNum`}
                  inputs={[
                    {
                      name: "regNum",
                      label: "เลขทะเบียนของรถ",
                      value: "car_regNum",
                      currentValue: regNum,
                      setValue: setRegNum,
                    },
                  ]}
                  setShowModalFunc={setRegNumShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`regNum`}
                  type={`text`}
                  inputs={[
                    {
                      name: "regNum",
                      label: "เลขทะเบียนของรถ",
                      value: "car_regNum",
                      currentValue: regNum,
                      setValue: setRegNum,
                    },
                  ]}
                  newData={[regNum]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={regNumShow}
                  setShowModalFunc={setRegNumShow}
                  handleupdateFunc={handleEditCar}
                />
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
                {/* ที่นั่ง */}
                <CarForm
                  name="passenger"
                  label="จำนวนที่นั่ง"
                  rawData={`passenger`}
                  inputs={[
                    {
                      name: "passenger",
                      label: "จำนวนที่นั่ง",
                      value: "passenger",
                      currentValue: passenger,
                      setValue: setPassenger,
                    },
                  ]}
                  setShowModalFunc={setPassengerShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`passenger`}
                  type={`text`}
                  inputs={[
                    {
                      name: "paseenger",
                      label: "จำนวนที่นั่ง",
                      value: "passenger",
                      currentValue: passenger,
                      setValue: setPassenger,
                    },
                  ]}
                  newData={[passenger]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={passengerShow}
                  setShowModalFunc={setPassengerShow}
                  handleupdateFunc={handleEditCar}
                />
                {/* จำนวนล้อ */}
                <CarForm
                  name="wheel"
                  label="จำนวนล้อ"
                  rawData={`car_wheel`}
                  inputs={[
                    {
                      name: "wheel",
                      label: "จำนวนล้อ",
                      value: "car_wheel",
                      currentValue: wheel,
                      setValue: setWheel,
                    },
                  ]}
                  setShowModalFunc={setWheelShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`wheel`}
                  type={`text`}
                  inputs={[
                    {
                      name: "wheel",
                      label: "จำนวนล้อ",
                      value: "car_wheel",
                      currentValue: wheel,
                      setValue: setWheel,
                    },
                  ]}
                  newData={[wheel]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={wheelShow}
                  setShowModalFunc={setWheelShow}
                  handleupdateFunc={handleEditCar}
                />
                {/* แรงม้า */}
                <CarForm
                  name="power"
                  label="แรงม้า"
                  rawData={`car_power`}
                  inputs={[
                    {
                      name: "power",
                      label: "แรงม้า",
                      value: "car_power",
                      currentValue: power,
                      setValue: setPower,
                    },
                  ]}
                  setShowModalFunc={setPowerShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`power`}
                  type={`text`}
                  inputs={[
                    {
                      name: "power",
                      label: "แรงม้า",
                      value: "power",
                      currentValue: power,
                      setValue: setPower,
                    },
                  ]}
                  newData={[power]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={powerShow}
                  setShowModalFunc={setPowerShow}
                  handleupdateFunc={handleEditCar}
                />
                {/* ประกัน */}
                <CarForm
                  name="insurance"
                  label="ประกันภัยของรถ"
                  rawData={`car_insurance`}
                  inputs={[
                    {
                      name: "insurance",
                      label: "ประกันภัยของรถ",
                      value: "car_insurance",
                      currentValue: insurance,
                      setValue: setInsurance,
                    },
                  ]}
                  setShowModalFunc={setInsuranceShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`insurance`}
                  type={`text`}
                  inputs={[
                    {
                      name: "insurance",
                      label: "ประกันภัยของรถ",
                      value: "car_insurance",
                      currentValue: insurance,
                      setValue: setInsurance,
                    },
                  ]}
                  newData={[insurance]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={insuranceShow}
                  setShowModalFunc={setInsuranceShow}
                  handleupdateFunc={handleEditCar}
                />
                {/* ขนาดของรถ */}
                <Container>
                  <Row>
                    <h6>ขนาดของรถ</h6>
                  </Row>
                  <Row>
                    <Col>
                      <p>กลาง</p>
                    </Col>
                    <Col>
                      <SizeOption />
                    </Col>
                  </Row>
                </Container>
                <br />
                {/* จังหวัด */}
                <CarForm
                  name="province"
                  label="จังหวัด"
                  rawData={`car_province`}
                  inputs={[
                    {
                      name: "province",
                      label: "จังหวัด",
                      value: "car_province",
                      currentValue: province,
                      setValue: setProvince,
                    },
                  ]}
                  setShowModalFunc={setProvinceShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`province`}
                  type={`text`}
                  inputs={[
                    {
                      name: "province",
                      label: "จังหวัด",
                      value: "car_province",
                      currentValue: province,
                      setValue: setProvince,
                    },
                  ]}
                  newData={[province]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={provinceShow}
                  setShowModalFunc={setProvinceShow}
                  handleupdateFunc={handleEditCar}
                />
                <br />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
