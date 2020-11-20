import React from "react";
import "./ChatInfo.css";

import { Avatar } from "@material-ui/core";
import chatIntroAvatar from "../../img/chat-intro.jpg";

const ChatInfo = () => {
  return (
    <>
      <div className="chatInfo">
        <Avatar className="avatar" src={chatIntroAvatar} />
        <p className="title">Keep your chat together</p>
        <p className="text">
          Woocel connects to your chat to sync messages. To reduce data usage,
          connect your phone to Wi-Fi.
        </p>

        <div className="downloads">
          <i className="fas fa-laptop"></i>
          <span className="downloads-span">
            Woocel is available for Windows.
            <a
              href="https://www.whatsapp.com/download"
              target='_blank'
              rel='noreferrer'
              className="downloads-link"
            >
              Get it here.
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatInfo;