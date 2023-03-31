import Head from "next/head";
import useSWR from "swr";
import styles from "@/styles/updateCar.module.css";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft, FaEdit, FaFileImage } from "react-icons/fa";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

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

export default function UpdateCar() {
  const router = useRouter();
  const { id } = router.query;

  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [imgFeedback, setImgFeedback] = useState("");
  const [confChange, setConfChange] = useState<boolean>(false);

  const carNameRef = useRef<HTMLInputElement | null>(null);
  const regidRef = useRef<HTMLInputElement | null>(null);
  const provinceRef = useRef<HTMLSelectElement | null>(null);
  const seatRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [editname, setEditname] = useState<boolean>(false);
  const [editregid, setEditregid] = useState<boolean>(false);
  const [editprovince, setEditprovince] = useState<boolean>(false);
  const [editmaxseat, setEditmaxseat] = useState<boolean>(false);

  const [invalidName, setInvalidName] = useState("");
  const [invalidRegId, setInvalidRegId] = useState("");
  const [invalidProvince, setInvalidProvince] = useState("");
  const [invalidCap, setInvalidCap] = useState("");

  const setInvalids: { [index: string]: Dispatch<SetStateAction<string>> } = {
    name: setInvalidName,
    registrationId: setInvalidRegId,
    invalidProvince: setInvalidProvince,
    maximumCapacity: setInvalidCap,
  };

  const edits: { [index: string]: Dispatch<SetStateAction<boolean>> } = {
    name: setEditname,
    registrationId: setEditregid,
    invalidProvince: setEditmaxseat,
    maximumCapacity: setEditprovince,
  };

  const fetcherVehicle = (url: string) =>
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.statusCode == 200) {
          setImageSrc(`/images/vehicles/${res.vehicle.imagename}`);
          setFilename(res.vehicle.imagename);
          return res.vehicle;
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/500");
      });

  const {
    data: provinceData,
    isLoading: provinceLoading,
    error: provinceError,
  } = useSWR(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    fetcherProvince
  );

  const {
    data: vehicleData,
    isLoading: vehicleLoading,
    error: vehicleError,
    mutate: vehicleMutate,
  } = useSWR(
    id ? `/api/vehicle/getvehicle/${id}` : null,
    id ? fetcherVehicle : null
  );

  // update car
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await fetch("/api/vehicle/updatevehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        field: `${e.currentTarget.name}`,
        value: `${
          (
            document.querySelector(
              `#${e.currentTarget.name}`
            ) as HTMLInputElement
          )?.value
        }`,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.success) {
          document
            .querySelector(`#input-group-${res.field}`)
            ?.classList.add("is-invalid");
          setInvalids[`${res.field}`](res.message);
        } else {
          vehicleMutate();
          edits[`${res.field}`](false);
          document
            .querySelector(`#input-group-${res.field}`)
            ?.classList.remove("is-invalid");
          toast.success("อัปเดตรูปรถสำเร็จ", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  const handleChooseFile = () => {
    return new Promise<boolean>((resolve) => {
      const file: File | null | undefined = imageRef?.current?.files?.item(0);
      if (!file) return resolve(false);
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      const size = Number((file.size / 1024 / 1024).toFixed(2));
      const validType = validImageTypes.includes(file?.type);
      const exceedSize = size > 10;
      if (validType && !exceedSize) {
        setFilename(file.name);
        setImgFeedback("");
        return resolve(true);
      } else {
        if (!validType) {
          setImgFeedback("** ไฟล์ต้องเป็น PNG หรือ JPEG เท่านั้น");
        } else if (!exceedSize) {
          setImgFeedback("** ไฟล์ของคุณมีขนาดใหญ่เกิน 10 mb");
        }
        return resolve(false);
      }
    });
  };

  const updateImage = async () => {
    const formData = new FormData();
    formData.append("image", imageRef.current?.files?.item(0)!);
    formData.append("id", id as string);
    formData.append("oldFilename", vehicleData.imagename as string);
    await fetch("/api/vehicle/updateimg", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status == 401) {
          router.push("/");
        }
        if (res.status == 500) {
          throw new Error("Something went wrong ...");
        }
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          vehicleMutate();
          setImageSrc(`/images/vehicles/${res.vehicle.imagename}`);
          setFilename(res.vehicle.imagename);
          toast.success("อัปเดตรูปรถสำเร็จ", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setImgFeedback("** โปรดเลือกไฟล์รูปภาพของคุณ");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAlert(true);
      });
  };

  const choosefile = () => {
    setConfChange(false);
    document.getElementById("carImgFile")?.click();
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    for (let key in edits) {
      if (key == e.currentTarget.id) {
        edits[key](true);
      } else edits[key](false);
    }
  };

  if (provinceError || vehicleError) return <div>failed to load</div>;

  return (
    <>
      <Head>
        <title>แก้ไขข้อมูลรถยนต์-VEHICLE4U</title>
      </Head>

      <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.svg}`}>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          {provinceLoading || vehicleLoading ? (
            <div>loading...</div>
          ) : (
            <>
              <button
                onClick={() => router.back()}
                className={`${styles.back_btn} d-flex align-items-center`}
              >
                <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
              </button>
              <h1 className="align-items-center d-flex justify-content-end">
                <FaEdit /> แก้ไขข้อมูลรถเช่า
              </h1>
              <hr />
              {isAlert && (
                <div
                  className={`alert alert-danger d-flex align-items-center`}
                  role="alert"
                >
                  <svg
                    className="bi flex-shrink-0 me-2"
                    width="24"
                    height="24"
                    role="img"
                    aria-label="Danger:"
                  >
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    <small>ระบบเกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง</small>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="carImgFile" className="form-label">
                  <b>รูปรถเช่า</b>
                </label>
                <small className={`ms-2 red_color ${styles.feedback}`}>
                  {imgFeedback}
                </small>
                <div className="input-group">
                  <button
                    id="file"
                    type="button"
                    onClick={() => setConfChange(true)}
                    className={`btn d-flex align-items-center btn-primary`}
                  >
                    <FaFileImage />
                    &nbsp;เปลี่ยนรูป
                  </button>
                  <input
                    ref={imageRef}
                    className="form-control"
                    type="file"
                    id="carImgFile"
                    onChange={async () => {
                      await handleChooseFile().then((res: boolean) => {
                        if (res) updateImage();
                      });
                    }}
                    hidden
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="โปรดเลือกไฟล์รูปภาพของรถ"
                    value={filename ? filename : ""}
                    disabled
                  />
                </div>
                <div
                  className={`${styles.first_col} mt-3 d-flex justify-content-center align-items-center`}
                >
                  {imageSrc ? (
                    <div>
                      <Image
                        className={`${styles.image}`}
                        src={imageSrc}
                        alt="Vehicle Image"
                      />
                    </div>
                  ) : (
                    <div
                      className={`d-flex justify-content-center align-items-center w-100 h-100`}
                    >
                      ไม่มีรูปภาพ
                    </div>
                  )}
                </div>
              </div>

              <Row>
                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="carName" className="form-label">
                      <b>ชื่อของรถ</b>
                    </label>{" "}
                    <div className={`text-start`}>
                      {!editname ? (
                        <>
                          <span>{vehicleData?.name}</span>
                          <button
                            id="edit_name"
                            type="button"
                            title={`edit_name`}
                            className={`${styles.edit_button} float-end`}
                            onClick={() => setEditname(true)}
                          >
                            <span>
                              <FiEdit2 />
                              &nbsp;แก้ไข
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="input-group" id={`input-group-name`}>
                            <input
                              ref={carNameRef}
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="ชื่อรถเช่าของคุณ"
                              defaultValue={vehicleData?.name}
                            />
                            <button
                              title="submit_editname"
                              name="name"
                              type="button"
                              className={`btn-success btn`}
                              onClick={(e) => handleSubmit(e)}
                            >
                              ยืนยัน
                            </button>
                            <button
                              title="cancel_editname"
                              name="cancel_editname"
                              type="button"
                              className={`btn btn-danger`}
                              onClick={() => setEditname(false)}
                            >
                              ยกเลิก
                            </button>
                          </div>
                          <div
                            id="validationName"
                            className={`invalid-feedback`}
                          >
                            {invalidName}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="regisNum" className="form-label">
                      <b>เลขทะเบียนรถ</b>
                    </label>
                    <div className={`text-start`}>
                      {!editregid ? (
                        <>
                          <span>{vehicleData?.registrationId}</span>
                          <button
                            id="edit_regisId"
                            type="button"
                            title={`edit_regisId`}
                            className={`${styles.edit_button} float-end`}
                            onClick={() => setEditregid(true)}
                          >
                            <span>
                              <FiEdit2 />
                              &nbsp;แก้ไข
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div
                            className="input-group"
                            id={`input-group-registrationId`}
                          >
                            <input
                              ref={regidRef}
                              type="text"
                              className="form-control"
                              id="registrationId"
                              placeholder="เลขทะเบียนรถของคุณ"
                              defaultValue={vehicleData?.registrationId}
                            />
                            <button
                              title="submit_editregid"
                              name="registrationId"
                              type="button"
                              className={`btn btn-success`}
                              onClick={(e) => handleSubmit(e)}
                            >
                              ยืนยัน
                            </button>
                            <button
                              title="cancel_editregid"
                              name="cancel_editregid"
                              type="button"
                              className={`btn btn-danger`}
                              onClick={() => setEditregid(false)}
                            >
                              ยกเลิก
                            </button>
                          </div>
                          <div
                            id="validationRegId"
                            className={`invalid-feedback`}
                          >
                            {invalidRegId}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="province" className="form-label">
                      <b>จังหวัด</b>
                    </label>
                    <div className={`text-start`}>
                      {!editprovince ? (
                        <>
                          <span>{vehicleData?.province}</span>
                          <button
                            id="edit_province"
                            type="button"
                            title={`edit_province`}
                            className={`${styles.edit_button} float-end`}
                            onClick={() => setEditprovince(true)}
                          >
                            <span>
                              <FiEdit2 />
                              &nbsp;แก้ไข
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div
                            className="input-group"
                            id={`input-group-province`}
                          >
                            <select
                              title="editprovince"
                              ref={provinceRef}
                              className="form-select"
                              id="province"
                              defaultValue={vehicleData?.province}
                            >
                              <option value="">กรุณาเลือกจังหวัด ...</option>
                              {provinceData.map((e: any) => {
                                return (
                                  <option
                                    key={e.id}
                                    id={e.id}
                                    value={e.name_th}
                                  >
                                    {e.name_th}
                                  </option>
                                );
                              })}
                            </select>
                            <button
                              title="submit to update province"
                              name="province"
                              type="button"
                              className={`btn btn-success`}
                              onClick={(e) => handleSubmit(e)}
                            >
                              ยืนยัน
                            </button>
                            <button
                              title="cancel_editregid"
                              name="cancel_editregid"
                              type="button"
                              className={`btn btn-danger`}
                              onClick={() => setEditprovince(false)}
                            >
                              ยกเลิก
                            </button>
                          </div>
                          <div
                            id="validationProvince"
                            className={`invalid-feedback`}
                          >
                            {invalidProvince}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="seat" className="form-label">
                      <b>จำนวนที่นั่ง</b>
                    </label>
                    <div className={`text-start`}>
                      {!editmaxseat ? (
                        <>
                          <span>{vehicleData?.maximumCapacity}</span>
                          <button
                            id="edit_maxCap"
                            type="button"
                            title={`edit_maxCap`}
                            className={`${styles.edit_button} float-end`}
                            onClick={() => setEditmaxseat(true)}
                          >
                            <span>
                              <FiEdit2 />
                              &nbsp;แก้ไข
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div
                            className="input-group"
                            id={`input-group-maximumCapacity`}
                          >
                            <input
                              ref={seatRef}
                              type="text"
                              className="form-control"
                              id="maximumCapacity"
                              placeholder="จำนวนที่นั่งของคุณ"
                              defaultValue={vehicleData?.maximumCapacity}
                            />
                            <button
                              title="submit to edit seat"
                              name="maximumCapacity"
                              type="button"
                              className={`btn btn-success`}
                              onClick={(e) => handleSubmit(e)}
                            >
                              ยืนยัน
                            </button>
                            <button
                              title="cancel_editseat"
                              name="cancel_editseat"
                              type="button"
                              className={`btn btn-danger`}
                              onClick={() => setEditmaxseat(false)}
                            >
                              ยกเลิก
                            </button>
                          </div>
                          <div
                            id="validationSeat"
                            className={`invalid-feedback`}
                          >
                            {invalidCap}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* <div className="mb-3">
                      <button
                        title="delete a vehicle"
                        type="button"
                        className={`btn btn-danger`}
                      >
                        ลบรถเช่า
                      </button>
                    </div> */}
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>

      {confChange && (
        <ChangeImgModal
          show={confChange}
          onHide={() => setConfChange(false)}
          choosefile={choosefile}
        />
      )}
    </>
  );
}

const ChangeImgModal = ({ show, onHide, choosefile }: any) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={`modal_wo_border`}></Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>เปลี่ยนรูปรถเช่า</h4>
        <div className={`text-center`}>
          <small>คุณยืนยันที่จะเปลี่ยนรูปรถเช่าหรือไม่?</small>
        </div>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex`}>
        <Button className={`me-auto`} onClick={onHide}>
          ยกเลิก
        </Button>
        <Button onClick={choosefile} variant="danger">
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// const cancelFile = () => {
//   setFilename("");
//   setImageSrc("");
//   (imageRef?.current as HTMLInputElement).value = "";
// };
