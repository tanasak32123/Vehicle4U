import Head from "next/head";
import useSWR from "swr";
import io from "socket.io-client";
import styles from "styles/Chat.module.css";
import { useEffect, useState } from "react";
import { FaChevronCircleRight, FaCommentAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { send } from "process";

const fetcher = (obj : any) =>
  {console.log(obj) ;return fetch(obj.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiverId : obj.receiverId
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('res =',res);
      return res;
    });}

export default function chat() {
  const socket = io("http://localhost:3000");

  const router = useRouter()
  const {id} = router.query
  
  const { data, isLoading, error, mutate } = useSWR( 
    {url : "/api/chat",
    receiverId : id},
    fetcher
  );
  const [messages , setMessages] = useState([''])
  let senderId = '0'
  if (data){
    setMessages(data.messages)
    senderId = data.senderId
  }
  console.log('data =', messages)

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    const chatText = (document.getElementById("chat-text") as HTMLInputElement)
      .value;

    const msg = {
      senderId : senderId,
      receiverId : id,
      message: chatText,
    };
    console.log('messages =', msg)
    socket.emit("sendMessage", msg);
  };
  useEffect(() => {
    socket.on("recMessage", (message) => {
      setMessages([...messages , message])
    });
  });

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == "") {
      document.getElementById("send_btn")?.classList.add("d-none");
    } else {
      document.getElementById("send_btn")?.classList.remove("d-none");
    }
  };

  return (
    <>
      <Head>
        <title>ติดต่อผู้ปล่อยเช่า-VEHICLE4U</title>
      </Head>

      <div className={`${styles.container} py-5 px-3`}>
        <Row className={`d-flex justify-content-center`}>
          <Col md={10} lg={8} xl={6}>
            <div className="card" id="chat">
              <div className="card-header d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0">Chat กับผู้ปล่อยเช่า</h5>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-mdb-ripple-color="dark"
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
                <div className="d-flex flex-row justify-content-start">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Hi
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      How are you ...???
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      What are you doing tomorrow? Can we come up a bar?
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      23:58
                    </p>
                  </div>
                </div>

                <div className="divider d-flex align-items-center mb-4">
                  <p
                    className="text-center mx-3 mb-0"
                    style={{ color: "#a2aab7" }}
                  >
                    Today
                  </p>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Hiii, I'm good.
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      How are you doing?
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Long time no see! Tomorrow office. will be free on sunday.
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:06
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Okay
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      We will go on Sunday?
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      00:07
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      That's awesome!
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      I will meet you Sandon Square sharp at 10 AM
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Is that okay?
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:09
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    width={45}
                    height={45}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Okay i will meet you on Sandon Square
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      00:11
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Do you have pictures of Matley Marriage?
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:11
                    </p>
                  </div>
                  <Image
                    width={45}
                    height={45}
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <Image
                    width={45}
                    height={45}
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Sorry I don't have. i changed my phone.
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      00:13
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Okay then see you on sunday!!
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:15
                    </p>
                  </div>
                  <Image
                    width={45}
                    height={45}
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                  />
                </div>
              </div>

              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <Image
                  width={45}
                  height={45}
                  src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp`}
                  alt="avatar 3"
                  style={{ width: "45px", height: "100%" }}
                />
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
                <Link id="send_btn" className="ms-3 d-none" href="#!">
                  <FaPaperPlane />
                  <i className="fas fa-paper-plane"></i>
                </Link>
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
      </div>
    </>
  );
}
