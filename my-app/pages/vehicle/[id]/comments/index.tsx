import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Card, Container, Form } from "react-bootstrap";
import styles from "styles/Reviews.module.css";
import { useAuth } from "components/AuthContext";
import { FaArrowAltCircleLeft, FaReply, FaUserCircle } from "react-icons/fa";
import useSWR from "swr";
import formatDate from "@/libs/formatDate";
import ReactStars from "react-stars";

const Comments: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth, isLoading }: any = useAuth();

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // console.log(res);
          res.comment.map((e: any) => {
            e.comment.createdAt = formatDate(new Date(e.comment.createdAt));
          });
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
    mutate: commentsMutate,
  } = useSWR(id ? `/api/comments?id=${id}` : null, fetcher);

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

    (document.getElementById(`reply_error_${id}`) as HTMLElement).innerText =
      "";
  };

  const handleReplyMessageChange = (e: any, id: number) => {
    if (!e.currentTarget.value) {
      (document.getElementById(`reply_error_${id}`) as HTMLElement).innerText =
        "โปรดเขียนข้อความตอบกลับ";
    } else {
      (document.getElementById(`reply_error_${id}`) as HTMLElement).innerText =
        "";
    }
  };

  const handleSendReplyMessage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    const textarea = document.getElementById(
      `text_reply_${id}`
    ) as HTMLTextAreaElement;
    if (!textarea?.value) {
      (document.getElementById(`reply_error_${id}`) as HTMLElement).innerText =
        "โปรดเขียนข้อความตอบกลับ";
      return;
    }
    await fetch("/api/comments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: textarea?.value,
        id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          commentsMutate();
          const reply_box = document.getElementById(`reply_box_${id}`);
          reply_box?.classList.remove("d-block");
          reply_box?.classList.add("d-none");
        }
      })
      .catch((err) => {
        console.log(err);
        (
          document.getElementById(`reply_error_${id}`) as HTMLElement
        ).innerText = "ระบบเกิดข้อผิดพลาด";
      });
  };

  return (
    <div className={`${styles.main}`}>
      <Container
        className={`${styles.main} p-4 d-flex align-items-center justify-content-center`}
      >
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
              <h1>รีวิวยานพาหนะ</h1>
              <button
                type="button"
                onClick={() => router.back()}
                className={`${styles.back_btn} d-flex align-items-center`}
              >
                <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
              </button>
            </div>
            <div id="comments">
              {commentsError && (
                <>
                  <div
                    className={`d-flex justify-content-center align-items-center ${styles.comments}`}
                  >
                    ระบบเกิดข้อผิดพลาด โปรดลองอีกครั้ง
                  </div>
                </>
              )}

              {commentsLoading && (
                <div
                  className={`d-flex justify-content-center align-items-center`}
                >
                  <div className={`lds-facebook`}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {!commentsLoading && (
                <>
                  {!commentsData ||
                    (commentsData.length <= 0 && (
                      <div
                        className={`d-flex justify-content-center align-items-center ${styles.comments}`}
                      >
                        ยังไม่มีรีวิว ณ ตอนนี้
                      </div>
                    ))}

                  {commentsData &&
                    commentsData?.length > 0 &&
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

                          <div className="w-100">
                            <div
                              id={`title_reviews_${obj?.comment.id}`}
                              className="mb-3"
                            >
                              <div id={`author_name_${obj?.comment.id}`}>
                                <small>{obj?.user.username}</small>
                              </div>
                              <div id={`timestamp_reviews_${obj?.comment.id}`}>
                                <small>{obj?.comment.createdAt} น.</small>
                              </div>
                            </div>
                            <div id={`content_reviews_${obj?.comment.id}`}>
                              <p className="mb-2">
                                {obj?.comment.message
                                  ? obj?.comment.message
                                  : "-"}
                              </p>
                            </div>
                            <ReactStars
                              count={5}
                              value={obj?.comment.score}
                              size={24}
                              color2={"#ffd700"}
                              edit={false}
                              className="mb-2"
                            />

                            {obj?.comment.reply && (
                              <Card
                                id={`reply_box_2`}
                                className={`${styles.reply_box}`}
                              >
                                <Card.Body>
                                  <h6>การตอบกลับจากผู้ปล่อยเช่า</h6>
                                  <div>
                                    <small>
                                      &emsp;&emsp;{obj?.comment.reply}
                                    </small>
                                  </div>
                                </Card.Body>
                              </Card>
                            )}

                            {auth?.role == "provider" &&
                              !obj?.comment.reply && (
                                <>
                                  <div id={`reply_btn_${obj?.comment.id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-link p-0"
                                      onClick={(e) =>
                                        handleClicktoOpenReplyBox(
                                          e,
                                          obj?.comment.id
                                        )
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
                                        ข้อความตอบกลับ{" "}
                                        <span className="text-danger">
                                          *&nbsp;
                                        </span>
                                      </Form.Label>
                                      <small
                                        id={`reply_error_${obj?.comment.id}`}
                                        className="text-danger"
                                      ></small>
                                      <Form.Control
                                        as="textarea"
                                        id={`text_reply_${obj?.comment.id}`}
                                        title={`text_reply_${obj?.comment.id}`}
                                        className="mb-3"
                                        onChange={(e) =>
                                          handleReplyMessageChange(
                                            e,
                                            obj?.comment.id
                                          )
                                        }
                                        onKeyDown={(e) => {
                                          if (e.key == "Enter") {
                                            e.preventDefault();
                                          }
                                        }}
                                        placeholder="พิมพ์ข้อความตอบกลับ..."
                                      />
                                      <div
                                        className={`d-flex justify-content-between`}
                                      >
                                        <Button
                                          variant="danger"
                                          onClick={(e) =>
                                            handleCancelToReply(
                                              e,
                                              obj?.comment.id
                                            )
                                          }
                                        >
                                          ยกเลิก
                                        </Button>
                                        <Button
                                          variant="success"
                                          onClick={(e) =>
                                            handleSendReplyMessage(
                                              e,
                                              obj?.comment.id
                                            )
                                          }
                                        >
                                          ตอบกลับ
                                        </Button>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </>
                              )}
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Comments;
