import io from "socket.io-client";
import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });

export default function chat() {
  const socket = io("http://localhost:3000");
  const { data, isLoading, error, mutate } = useSWR("/api/chat", fetcher);

  console.log(data);
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
      {messages.map((e: any) => {
        // setStatus(e?.status);
        return <div> {e?.message}</div>;
      })}
      <div className="mb-3 mt-4">
        <input
          className="form-control"
          id="chat-text"
          placeholder="Say something..."
        />
      </div>

      <button onClick={handleSendMessage}>Click</button>
    </>
  );
}
