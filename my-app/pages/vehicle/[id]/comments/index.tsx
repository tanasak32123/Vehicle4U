import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Card, Container, Form } from "react-bootstrap";
import styles from "styles/Reviews.module.css";
import { useAuth } from "components/AuthContext";
import { FaArrowAltCircleLeft, FaReply, FaUserCircle } from "react-icons/fa";
import useSWR from "swr";

const Comments: NextPage = () => {
  const router = useRouter();
  const { auth, isLoading }: any = useAuth();

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res.comment);
          return res.comment;
        }
        throw new Error(`Something went wrong...`);
      })
      .catch((err) => {
        console.log(err);
      });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useSWR("/api/comments", fetcher);

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
    <div className={`${styles.main}`}>
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
              <h3>รีวิวยานพาหนะ</h3>
              <button
                type="button"
                onClick={() => router.back()}
                className={`${styles.back_btn} d-flex align-items-center`}
              >
                <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
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
                              <Button
                                variant="danger"
                                onClick={(e) => handleCancelToReply(e, 1)}
                              >
                                ยกเลิก
                              </Button>
                              <Button variant="success">ตอบกลับ</Button>
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

              {commentsData &&
                commentsData.map((obj: any) => (
                  <Card
                    id={`review_${obj?.comment.id}`}
                    key={`review_${obj?.comment.id}`}
                    className="mb-3"
                  >
                    <Card.Body className="d-flex">
                      <div className="me-2">
                        <FaUserCircle size={40} />
                      </div>

                      <div>
                        <div
                          id={`title_reviews_${obj?.comment.id}`}
                          className="mb-3"
                        >
                          <div id={`author_name_${obj?.comment.id}`}>
                            <small>Tanasak Pusawatwong</small>
                          </div>
                          <div id={`timestamp_reviews_${obj?.comment.id}`}>
                            <small>22/03/65 11:00:59น.</small>
                          </div>
                        </div>
                        <div id={`content_reviews_${obj?.comment.id}`}>
                          <p>{obj?.comment.message}</p>
                        </div>
                        {auth?.role == "provider" && (
                          <>
                            <div id={`reply_btn_${obj?.comment.id}`}>
                              <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={(e) =>
                                  handleClicktoOpenReplyBox(e, obj?.comment.id)
                                }
                              >
                                <FaReply />
                                &nbsp;ตอบกลับ
                              </button>
                            </div>
                            <Card
                              id={`reply_box_${obj?.comment.id}`}
                              className={`${styles.reply_box} d-none`}
                            >
                              <Card.Body>
                                <Form.Label
                                  htmlFor={`text_reply_${obj?.comment.id}`}
                                >
                                  ข้อความตอบกลับ
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  title={`text_reply_${obj?.comment.id}`}
                                  className="mb-3"
                                  placeholder="พิมพ์ข้อความตอบกลับ..."
                                />
                                <div
                                  className={`d-flex justify-content-between`}
                                >
                                  <Button
                                    variant="danger"
                                    onClick={(e) =>
                                      handleCancelToReply(e, obj?.comment.id)
                                    }
                                  >
                                    ยกเลิก
                                  </Button>
                                  <Button variant="success">ตอบกลับ</Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Comments;
