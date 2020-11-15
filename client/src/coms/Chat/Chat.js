import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

// import { useBreakpoint } from "../../IndexContextProvider/breakpoint";
import ToggleModal from "../ChatModal/ToggleModal";
import db from "../../config/firebase";
import authContext from "../../context/auth/authContext";
import firebase from "firebase";

const Chat = () => {
  let history = useHistory()
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(authContext);

  // ############################################# //
  // const breakpoints = useBreakpoint();
  // const matchingList = Object.keys(breakpoints).map(media => {
  //   <li key={media}>
  //     {media} - - - {breakpoints[media] ? "True" : "False"}
  //   </li>;
  // });
  let value = false;
  // const testo = Object.keys(breakpoints).map(media => {
  //   if (media === "sm" && breakpoints[media] === true) {
  //     value = true;
  //   }
  // });
  // ############################################# //
  useEffect(() => {
    // set chat header photoURL
    if (roomId) {
      const unsubsribeOne = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => {
          try {
            setRoomName(snapshot.data().name);
            
          } catch (error) {
            history.push('/notFound')
          }
        });
      // display msg
      const unsubscribeTwo = db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
      return () => {
        unsubsribeOne();
        unsubscribeTwo();
      };
    }
  }, [roomId]);

  const sendMessage = e => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar />
          <div className="info">
            {!value ? (
              <>
                <p>{roomName} </p>
                <p className="lastSeen">
                  Last Seen :{" "}
                  {new Date(
                    messages[messages.length - 1]?.timestamp?.toDate()
                  ).toString()}
                </p>
              </>
            ) : (
              <ToggleModal />
            )}
          </div>
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
        {messages.map((message, i) => (
          <div key={i}>
            {/* shud use sort of user id instead of name, in case exactly same username */}
            <div
              className={`chat__message ${
                message.name === user.displayName && `chat__receiver`
              }`}
            >
              <p className="chat__name">{message.name}</p>
              <p className="chat__text">{message.message}</p>

              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/*//! CHAT FOOTER  */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form spellCheck="false">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Enter a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
