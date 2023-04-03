import Head from "next/head";
import useSWR from "swr";
import io from "socket.io-client";
import styles from "styles/Chat.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";

export default function chat() {
  const { auth, isLoading } = useAuth();

  const socket = io("http://localhost:3000");

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
    socket.emit("sendMessage", {
      senderId: auth.user?.id,
      receiverId: id,
      message: chatText,
    });
  };

  socket.on("recMessage", (message) => {
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
                  <h5 className="mb-0">Chat กับ {data.ReceiverFirstName} {data.ReceiverLastName}</h5>
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
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{
                    position: "relative",
                    height: "400px",
                    overflow: "scroll",
                  }}
                >

                  {data?.messages?.map((e: any) => {
                      // my message 
                      //e?.sender.id == id
                      if (e?.sender.id == id){
                        return (
                          <div className="d-flex flex-row justify-content-start">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                            <div>
                              <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{ backgroundColor: "#f5f6f7" }}
                              >
                                {e?.message} 
                              </p>
                            </div>
                          </div>
                        );
                      }else if (e?.sender.id == auth.user?.id){
                        return (
                          <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                        <div>
                          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                          {e?.message}
                          </p>
                        </div>
                        <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                              alt="avatar 1"
                              style={{ width: "45px", height: "100%" }}
                            />
                        
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
                  />
                  {/* <a className="ms-1 text-muted" href="#!">
                  <FaPaperclip />
                  <i className="fas fa-paperclip"></i>
                </a>
                <a className="ms-3 text-muted" href="#!">
                  <FaSmile />
                  <i className="fas fa-smile"></i>
                </a> */}
                  <Link
                    id="send_btn"
                    className="ms-3 d-none"
                    href="#!"
                    onClick={handleSendMessage}
                  >
                    <FaPaperPlane />
                    <i className="fas fa-paper-plane"></i>
                  </Link>
                  <Image
                    width={45}
                    height={45}
                    src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp`}
                    alt="avatar 3"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>
                {/* <div className={`p-4 ${styles.chat_box}`}>
                <h1 className="mb-3">
                  ติดต่อผู้ปล่อยเช่า{" "}
                  <span className={`${styles.comment}`}>
                    <FaCommentAlt />
                  </span>{" "}
                </h1>

                <div className={`mb-3 ${styles.chat_container} p-2`}>
                  {messages.map((e: any) => {
                    return (
                      <Row className="d-flex">
                        <div className={`${styles.msg_text} p-4 my-2`}>
                          <h6>You</h6>
                          <p className="mb-0">{e?.message}</p>
                        </div>
                      </Row>
                    );
                  })}
                </div>

                <div className="input-group">
                  <input
                    className={`form-control ${styles.chat_text}`}
                    id="chat-text"
                    placeholder="พิมพ์ข้อความ ..."
                    onChange={(e) => handleTyping(e)}
                  />
                  <button
                    type="button"
                    id="send_btn"
                    className="btn btn-primary d-none"
                    onClick={handleSendMessage}
                  >
                    {""}
                    <FaChevronCircleRight />
                  </button>
                </div>
              </div> */}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}