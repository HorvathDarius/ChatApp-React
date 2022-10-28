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

  const getDay = (day) => {
    switch(day){
      case 0: return "Sunday";
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
    }
  }

  const convertToTime = (d) => {
    const currentDate = new Date();
    if(d.getDate() < currentDate.getDate()){
      let weekday = getDay(d.getDay());
      let day = d.getDate();
      let month = d.getMonth();
      let date = weekday + " " + day+"."+month;
      return date;
    }else{
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let time = hours + ":" + minutes;
      return time;
    }
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