import Head from "next/head";
import styles from "@/styles/updateCar.module.css";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft, FaCar } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Image,
  Row,
} from "react-bootstrap";
import CarModal from "@/components/car/carModal";
import GearOption from "@/components/car/gearOption";
import SizeOption from "@/components/car/sizeOption";
import CarForm from "@/components/car/carForm";
import axios from "axios";

interface CarData {
  id: number;
  name: string;
  registrationId: string;
  imagename: string;
  province: string;
  maximumCapacity: number;
}

export default function UpdateCar() {
  // modal
  const [nameShow, setNameShow] = useState(false);
  const [registrationIdShow, setRegistrationIdShow] = useState(false);
  const [maximumCapacityShow, setMaximumCapacityShow] = useState(false);
  const [provinceShow, setProvinceShow] = useState(false);

  const [name, setName] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [imagename, setImagename] = useState("");
  const [maximumCapacity, setMaximumCapacity] = useState("");
  const [province, setProvince] = useState("");

  const [invalidInput, setInvalidInput] = useState("");

  const [car, setCar] = useState<CarData>({
    id: 0,
    name: "",
    imagename: "",
    registrationId: "",
    province: "",
    maximumCapacity: 0,
  });

  // useEffect(() => {
  //   setCar({
  //     imageName: car?.imageName,
  //     name: car?.name,
  //     registrationId: car?.registrationId,
  //     maximumCapacity: car?.maximumCapacity,
  //     province: car?.province,
  //   });
  // });

  // update car
  async function handleEditCar(type: string, values: string[]) {
    try {
      const data = {
        id: car?.id,
        name: car?.name,
        registrationId: car?.registrationId,
        imagename: car?.imagename,
        province: car?.province,
        maximumCapacity: car?.maximumCapacity,
      };
      console.log(data);
      console.log(type);
      console.log(values);
      const response = await fetch(`/api/updateCar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, type, values }),
      });
      const body = await response.json();
      if (!body.success) {
        setInvalidInput(body.message);
      } else {
        setInvalidInput("");
      }
      return body.success;
    } catch (error) {
      console.error(error);
      router.push("/500");
    }
  }

  // image
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImage = async () => {
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data }: any = await axios.post("/api/editImage", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

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
              <Form onSubmit={handleSubmitImage}>
                {/* Image */}
                <FormGroup>
                  <FormControl type="file" onChange={handleFileInputChange} />
                  <Button className={`${styles.upload_btn}`} type="submit">
                    Upload
                  </Button>
                  <div className={`${styles.first_col}`}>
                    <br />
                    {imageSrc ? (
                      <Image
                        className={`${styles.image}`}
                        src={imageSrc}
                        alt="Vehicle Image"
                        height={"400px"}
                      />
                    ) : (
                      <div className={`${styles.empty_img}`}>ไม่มีรูปภาพ</div>
                    )}
                  </div>
                </FormGroup>
              </Form>

              <br />
            </Row>
            {/* ชื่อรถ */}
            <Row>
              <Col>
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
                  car={car}
                />
              </Col>
              {/* หมายเลขทะเบียน */}
              <Col>
                <CarForm
                  name="registrationId"
                  label="เลขทะเบียนของรถ"
                  rawData={`car_regNum`}
                  inputs={[
                    {
                      name: "registrationId",
                      label: "เลขทะเบียนของรถ",
                      value: "car_regNum",
                      currentValue: registrationId,
                      setValue: setRegistrationId,
                    },
                  ]}
                  setShowModalFunc={setRegistrationIdShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`registrationId`}
                  type={`text`}
                  inputs={[
                    {
                      name: "registrationId",
                      label: "เลขทะเบียนของรถ",
                      value: "car_regNum",
                      currentValue: registrationId,
                      setValue: setRegistrationId,
                    },
                  ]}
                  newData={[registrationId]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={registrationIdShow}
                  setShowModalFunc={setRegistrationIdShow}
                  handleupdateFunc={handleEditCar}
                  car={car}
                />
              </Col>
            </Row>
            {/* ที่นั่ง */}
            <Row>
              <Col>
                <CarForm
                  name="maximumCapacity"
                  label="จำนวนที่นั่ง"
                  rawData={`maximumCapacity`}
                  inputs={[
                    {
                      name: "maximumCapacity",
                      label: "จำนวนที่นั่ง",
                      value: "maximumCapacity",
                      currentValue: maximumCapacity,
                      setValue: setMaximumCapacity,
                    },
                  ]}
                  setShowModalFunc={setMaximumCapacityShow}
                  isShow={true}
                />
                <CarModal
                  title={`แก้ไขข้อมูลรถยนต์`}
                  id={`maximumCapacity`}
                  type={`text`}
                  inputs={[
                    {
                      name: "paseenger",
                      label: "จำนวนที่นั่ง",
                      value: "maximumCapacity",
                      currentValue: maximumCapacity,
                      setValue: setMaximumCapacity,
                    },
                  ]}
                  newData={[maximumCapacity]}
                  invalid={invalidInput}
                  setInvalid={setInvalidInput}
                  isShowModal={maximumCapacityShow}
                  setShowModalFunc={setMaximumCapacityShow}
                  handleupdateFunc={handleEditCar}
                  car={car}
                />
              </Col>
              {/* จังหวัด */}
              <Col>
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
                  car={car}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
