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
            {messages?.map((e: any) => {
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