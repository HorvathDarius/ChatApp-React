import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Attach from "../img/attach.png";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const convertToTime = (d) => {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let time = hours + ":" + minutes;
    return time;
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt="" />
        <span>{convertToTime(message.date.toDate())}</span>
      </div>
      <div className="messageContent">
        <p>
          
          {message.text}
          {message.img && <img src={message.img} alt="" />}
          {message.file && 
            <a href={message.file} download target="blank"><img className="downFile" src={Attach} alt=""/></a>
          }
        </p>
      </div>
    </div>
  );
};

export default Message;