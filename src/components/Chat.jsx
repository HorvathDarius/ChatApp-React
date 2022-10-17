import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import Features from "./Features";

const Chat = () => {
  return (
    <div className="chat">
      <Features />
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;