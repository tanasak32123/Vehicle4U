import Head from "next/head";
import styles from "@/styles/helpcenter.module.css";
import io from 'socket.io-client';
import { useEffect, useState } from "react";


export default function chat() {
    const socket = io('http://localhost:3000');
    const [message, setMessage] = useState({
        senderFirstName: "",
        senderLastName: "",
        receiverFirstName: "",
        receiverLastName: "",
        message: ""
    });

    const [messages, setMessages] = useState([{
        senderFirstName: "a",
        senderLastName: "b",
        receiverFirstName: "c",
        receiverLastName: "d",
        message: "waaaaaa"
    },{
        senderFirstName: "c",
        senderLastName: "d",
        receiverFirstName: "a",
        receiverLastName: "b",
        message: "baaaaaaa"
    }])

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setMessage({
        senderFirstName : 'a' ,
        senderLastName : 'b',
        receiverFirstName : 'c',
        receiverLastName : 'd',
        message : 'eeeeeeeeee'
    })
    console.log(message)
    socket.emit('sendMessage', message);
    setMessage({
        senderFirstName : 'a' ,
        senderLastName : 'b',
        receiverFirstName : 'c',
        receiverLastName : 'd',
        message : ''
    })
  };
  useEffect(() => {
    socket.on('recMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
  })})
  
  
  
  
  return (
    <>
     {messages.map((e: any) => {
            // setStatus(e?.status);
            return (
                <div> {e?.message}</div>
            );

     })}
    <div className="mb-3 mt-4">
     <input  className="form-control" id="exampleFormControlTextarea1"  placeholder="Say something..." />
   </div>
   
     <button onClick={handleSendMessage}/>
   
    </>
  );
}
