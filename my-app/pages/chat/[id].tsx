import Head from "next/head";
import useSWR from "swr";
import io from "socket.io-client";
import styles from "styles/Chat.module.css";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";

export default function Chat() {
  const { auth, isLoading } = useAuth();

  const socket = io(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}` +
      ":" +
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}`
  );

  const router = useRouter();
  const { id } = router.query;

  const fetcher = (obj: any) =>
    fetch(obj.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiverId: obj.receiverId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res =", res);
        return res;
      });

  const {
    data,
    isLoading: chatLoading,
    error,
    mutate,
  } = useSWR({ url: "/api/chat", receiverId: id }, fetcher);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const chatText = (
      document.getElementById("typing_text") as HTMLInputElement
    ).value;
    (document.getElementById("typing_text") as HTMLInputElement).value = "";
    document.getElementById("send_btn")?.classList.add("d-none");
    socket.emit("sendMessage", {
      senderId: auth.user?.id,
      receiverId: id,
      message: chatText,
    });
  };

  socket.on("recMessage", () => {
    mutate();
  });

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == "") {
      document.getElementById("send_btn")?.classList.add("d-none");
    } else {
      document.getElementById("send_btn")?.classList.remove("d-none");
    }
  };

  if (error) return <>fail to load</>;

  return (
    <>
      <Head>
        <title>ติดต่อผู้ปล่อยเช่า-VEHICLE4U</title>
      </Head>

      <div className={`${styles.container} py-5 px-3`}>
        {isLoading ||
          (chatLoading && (
            <div className={`d-flex justify-content-center align-items-center`}>
              <div className={`lds-facebook ${styles.loading}`}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ))}

        {!isLoading && !chatLoading && (
          <Row className={`d-flex justify-content-center`}>
            <Col md={10} lg={8} xl={6}>
              <div className="card" id="chat">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">
                    Chat กับ {data.ReceiverFirstName} {data.ReceiverLastName}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-mdb-ripple-color="dark"
                    onClick={() => router.back()}
                  >
                    ย้อนกลับ
                  </button>
                </div>
                <div
                  className={`${styles.card_body} card-body`}
                  data-mdb-perfect-scrollbar="true"
                >
                  {data?.messages?.map((e: any) => {
                    if (e?.sender.id == id) {
                      return (
                        <div
                          key={e?.id}
                          className="d-flex flex-row justify-content-start"
                        >
                          <div className="d-flex align-items-end">
                            <FaUserCircle size={40} />
                          </div>
                          <div className="ms-2">
                            <div className="mb-1">
                              <small>
                                {data.ReceiverFirstName} {data.ReceiverLastName}
                              </small>
                            </div>
                            <div className="p-2 bg-light text-dark rounded-3">
                              {e?.message}
                            </div>
                          </div>
                        </div>
                      );
                    } else if (e?.sender.id == auth.user?.id) {
                      return (
                        <div
                          key={e?.id}
                          className="d-flex flex-row justify-content-end pt-1"
                        >
                          <div className="text-end me-2">
                            <div className="mb-1">
                              <small>ฉัน</small>
                            </div>
                            <div className="small p-2 text-white rounded-3 bg-primary">
                              {e?.message}
                            </div>
                          </div>
                          <div className="d-flex align-items-end">
                            <FaUserCircle size={40} />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>

                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="typing_text"
                    placeholder="พิมพ์ข้อความ..."
                    onChange={(e) => handleTyping(e)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <Link
                    id="send_btn"
                    className="ms-3 d-none"
                    href="#!"
                    onClick={handleSendMessage}
                  >
                    <FaPaperPlane />
                    <i className="fas fa-paper-plane"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
