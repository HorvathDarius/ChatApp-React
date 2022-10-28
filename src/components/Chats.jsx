import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // const convertToTime = (d) => {
  //   const currentDate = new Date();
  //   if (d.getDate() < currentDate.getDate()) {
  //     let day = d.getDate();
  //     let month = d.getMonth();
  //     let date = day + "." + month;
  //     return date;
  //   } else {
  //     let hours = d.getHours();
  //     let minutes = d.getMinutes();
  //     let time = hours + ":" + minutes;
  //     return time;
  //   }
  // }

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <div>
              <p>{chat[1].lastMessage?.text}</p>
              {/* <span className="sendingTime">{convertToTime(chat[1].date.toDate())}</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;