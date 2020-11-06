import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useBreakpoint } from "../../IndexContextProvider/breakpoint";
import ToggleModal from "../ChatModal/ToggleModal";

const Chat = () => {
  // ############################################# //
  const breakpoints = useBreakpoint();
  const matchingList = Object.keys(breakpoints).map(media => {
    <li key={media}>
      {media} - - - {breakpoints[media] ? "True" : "False"}
    </li>;
  });
  let value = false;
  const testo = Object.keys(breakpoints).map(media => {
    if (media === "sm" && breakpoints[media] === true) {
      value = true;
    }
  });
  // ############################################# //

  const Testo = () => <h4>Novice Developer Room</h4>;

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar />
          {!value ? <Testo /> : <ToggleModal />}
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        
      </div>

      {/* <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input />
            <button type="submit">Send a message</button>
          </form>
          <MicIcon />
        </div> */}
    </div>
  );
};

export default Chat;



