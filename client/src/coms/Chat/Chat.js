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
  const [input, setInput] = useState('')

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

  const sendMessage = e => {
    e.preventDefault()
  
    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar />
          {!value ? (
            <p className="roomName">
              Novice Developer Novice DeveloperNovice Developer Room Novice
              Developer Room
            </p>
          ) : (
            <ToggleModal />
          )}
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

      {/*//! CHAT BODY  */}
      <div className="chat__body">
        <div className="chat__message">
          <p className="chat__name">Tuna Bacon</p>
          <p className="chat__text">Hey There !</p>

          <span className="chat__timestamp">12:30am</span>
        </div>
        <div className="chat__message chat__receiver">
          <p className="chat__name">You</p>
          <p className="chat__text">Yeah?</p>

          <span className="chat__timestamp">12:31am</span>
        </div>

        <div className="chat__message chat__receiver">
          <p className="chat__name">You</p>
          <p className="chat__text">Who's this?</p>

          <span className="chat__timestamp">12:31am</span>
        </div>
      </div>

      {/*//! CHAT FOOTER  */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form spellCheck="false">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            type='text'
            placeholder='Enter a message'
          />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
