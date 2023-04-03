import Head from "next/head";
import useSWR from "swr";
import io from "socket.io-client";
import styles from "styles/Chat.module.css";
import { useEffect, useState } from "react";
import { FaChevronCircleRight, FaCommentAlt } from "react-icons/fa";

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      renterFirstName: "a",
      renterLastName: "b",
      providerFirstName: "c",
      providerLastName: "d",
      sender: "5555",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    });

export default function chat() {
  const socket = io("http://localhost:3000");

  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:3000/chat/api",
    fetcher
  );

  // console.log(data);
  const [messages, setMessages] = useState([
    {
      senderFirstName: "a",
      senderLastName: "b",
      receiverFirstName: "c",
      receiverLastName: "d",
      message: "waaaaaa",
    },
    {
      senderFirstName: "c",
      senderLastName: "d",
      receiverFirstName: "a",
      receiverLastName: "b",
      message: "baaaaaaa",
    },
  ]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    const chatText = (document.getElementById("chat-text") as HTMLInputElement)
      .value;
    const msg = {
      senderFirstName: "a",
      senderLastName: "b",
      receiverFirstName: "c",
      receiverLastName: "d",
      message: chatText,
    };
    socket.emit("sendMessage", msg);
  };

  useEffect(() => {
    socket.on("recMessage", (message) => {
      console.log(messages);
      setMessages([...messages, message]);
    });
  });

  return (
    <>
      <Head>
        <title>ติดต่อผู้ปล่อยเช่า-VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.chat_box}`}>
          <h1>
            <FaCommentAlt /> ช่องแชท
          </h1>

          <div className={`mb-3 ${styles.chat_container} p-2`}>
            {messages.map((e: any) => {
              return <div> {e?.message}</div>;
            })}
          </div>

          <div className="input-group">
            <input
              className="form-control"
              id="chat-text"
              placeholder="พิมพ์ข้อความ ..."
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              {""}
              <FaChevronCircleRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
