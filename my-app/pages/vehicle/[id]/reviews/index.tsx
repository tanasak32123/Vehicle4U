import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Card, Container, Form } from "react-bootstrap";
import styles from "styles/Reviews.module.css";
import { useAuth } from "components/AuthContext";
import { FaReply, FaUserCircle } from "react-icons/fa";

const Reviews: NextPage = () => {
  const router = useRouter();
  const { auth, isLoading, authAction }: any = useAuth();

  const handleClicktoOpenReplyBox = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    const reply_btn = document.getElementById(`reply_btn_${id}`);
    const reply_box = document.getElementById(`reply_box_${id}`);

    reply_btn?.classList.remove("d-block");
    reply_btn?.classList.add("d-none");

    reply_box?.classList.remove("d-none");
    reply_box?.classList.add("d-block");
  };

  const handleCancelToReply = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    const reply_btn = document.getElementById(`reply_btn_${id}`);
    const reply_box = document.getElementById(`reply_box_${id}`);

    reply_btn?.classList.remove("d-none");
    reply_btn?.classList.add("d-block");

    reply_box?.classList.remove("d-block");
    reply_box?.classList.add("d-none");
  };

  return (
    <div className={`main ${styles.main}`}>
      <Container className="p-4">
        {isLoading && (
          <div className={`d-flex justify-content-center align-items-center`}>
            <div className={`lds-facebook`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        {!isLoading && (
          <div className={`${styles.reviews} p-3`}>
            <div className={`d-flex justify-content-between mb-4`}>
              <h3>รีวิวของยานพาหนะ</h3>
              <button
                type="button"
                id="back_btn"
                className="btn btn-link p-0"
                onClick={(e) => router.back()}
              >
                ย้อนกลับ
              </button>
            </div>
            <div id="comments">
              <Card id="review_1" className="mb-3">
                <Card.Body className="d-flex">
                  <div className="me-2">
                    <FaUserCircle size={40} />
                  </div>

                  <div>
                    <div id="title_reviews_1" className="mb-3">
                      <div id="author_name_1">
                        <small>Tanasak Pusawatwong</small>
                      </div>
                      <div id="timestamp_reviews_1">
                        <small>22/03/65 11:00:59น.</small>
                      </div>
                    </div>
                    <div id="content_reviews_1">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Distinctio voluptates optio nemo unde a, animi impedit
                        exercitationem culpa maxime voluptatum maiores dolores
                        deserunt, autem sunt recusandae odio est hic saepe
                        nesciunt blanditiis dolor aliquam nostrum ipsam sequi!
                        Provident magni officia accusamus saepe, dicta atque rem
                        aperiam corrupti animi, fuga sed.
                      </p>
                    </div>
                    {auth?.role == "provider" && (
                      <>
                        <div id={`reply_btn_1`}>
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={(e) => handleClicktoOpenReplyBox(e, 1)}
                          >
                            <FaReply />
                            &nbsp;ตอบกลับ
                          </button>
                        </div>
                        <Card
                          id={`reply_box_1`}
                          className={`${styles.reply_box} d-none`}
                        >
                          <Card.Body>
                            <Form.Label htmlFor="text_reply_1">
                              ข้อความตอบกลับ
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              title="text_reply_1"
                              className="mb-3"
                              placeholder="พิมพ์ข้อความตอบกลับ..."
                            />
                            <div className={`d-flex justify-content-between`}>
                              <Button variant="success">ตอบกลับ</Button>
                              <Button
                                variant="danger"
                                onClick={(e) => handleCancelToReply(e, 1)}
                              >
                                ยกเลิก
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-3" id="review_2">
                <Card.Body className="d-flex">
                  <div className="me-2">
                    <FaUserCircle size={40} />
                  </div>

                  <div>
                    <div id="title_reviews_2" className="mb-3">
                      <div id="author_name_2">
                        <small>John Doe</small>
                      </div>
                      <div id="timestamp_reviews_2">
                        <small>22/03/65 11:00:59น.</small>
                      </div>
                    </div>
                    <div id="content_reviews_2">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Distinctio voluptates optio nemo unde a, animi impedit
                        exercitationem culpa maxime voluptatum maiores dolores
                        deserunt, autem sunt recusandae odio est hic saepe
                        nesciunt blanditiis dolor aliquam nostrum ipsam sequi!
                        Provident magni officia accusamus saepe, dicta atque rem
                        aperiam corrupti animi, fuga sed.
                      </p>
                    </div>
                    <Card id={`reply_box_2`} className={`${styles.reply_box}`}>
                      <Card.Body>
                        <h6>การตอบกลับจากผู้ปล่อยเช่า</h6>
                        <div>
                          <small>
                            &emsp;&emsp;Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Distinctio voluptates optio nemo
                            unde a, animi impedit exercitationem culpa maxime
                            voluptatum maiores dolores deserunt, autem sunt
                            recusandae odio est hic saepe nesciunt blanditiis
                            dolor aliquam nostrum ipsam sequi! Provident magni
                            officia accusamus saepe, dicta atque rem aperiam
                            corrupti animi, fuga sed.
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Reviews;
