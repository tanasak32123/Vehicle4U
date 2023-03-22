import { Button, Modal } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Customize = ({
  status,
  show,
  onHide,
  title = "",
  desc = "",
  btn_text = "",
}: any) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={`modal_wo_border`}>
        {title}
      </Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>
          {status == "success" && <FaCheckCircle className={`green_color`} />}
          {status == "error" && (
            <FaExclamationTriangle className={`red_color`} />
          )}
        </h4>
        <h6 className={`text-center`}>{desc}</h6>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex justify-content-center`}>
        <Button
          className={`orange_btn`}
          onClick={() => {
            onHide();
          }}
        >
          {btn_text}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Customize;
