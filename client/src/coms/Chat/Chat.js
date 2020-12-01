// react hooks + react-router-dom + css
import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Chat.css";
// @material-ui
import IconButton from "@material-ui/core/IconButton";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Avatar from "@material-ui/core/Avatar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
// components
import AddRoomAvatarModal from "../AddRoomAvatarModal/AddRoomAvatarModal";
// firebase
import db from "../../config/firebase";
import firebase from "firebase";
// react contexts
import authContext from "../../context/auth/authContext";

const Chat = () => {
  let history = useHistory();
  const { roomId } = useParams();
  const messageRef = useRef();
  const inputRef = useRef();

  const {
    user,
    searchRef,
    filterChatroom,
  } = useContext(authContext);

  const [roomName, setRoomName] = useState("");
  const [roomAvatar, setRoomAvatar] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  useEffect(() => {
    if (roomId) {
      // set chatroom avatar
      const unsubscribeOne = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => {
          let room = snapshot.data();
          room && setRoomAvatar(room.roomAvatarUrl);
        });
      // set roomName
      const unsubsribeTwo = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => {
          try {
            setRoomName(snapshot.data().name);
          } catch (error) {
            history.push("/app");
          }
        });
      // display messages from specified chatroom
      const unsubscribeThree = db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
      return () => {
        unsubscribeOne();
        unsubsribeTwo();
        unsubscribeThree();
      };
    }
    // eslint-disable-next-line
  }, [roomId]);

  // scrollbar-position
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });
    }
  });

  // https://codesandbox.io/s/chat-application-3t380
  const sendMessage = e => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  useEffect(() => {
    if (input) {
      //* @latter-imp-feature
      if (messages.length > 0) {
        let prevTimestamp = messages[messages.length - 1].timestamp?.toDate();
      }
      // add msg
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        formattedTimestamp: null,
        isNewerDate: false,
      });

      inputRef.current.value = "";
      setInput(""); // reset input value
    }
  }, [input, roomId, user.displayName]);

  const fnFormatTimestamp = timestamp => {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();
    const hour =
      timestamp.getHours() >= 10
        ? timestamp.getHours()
        : `0${timestamp.getHours()}`;
    const minute =
      timestamp.getMinutes() >= 10
        ? timestamp.getMinutes()
        : `0${timestamp.getMinutes()}`;
    const second = timestamp.getSeconds();

    let formattedTimestamp;
    // checkIf NaN, raise a warning though
    if (year !== year) {
      formattedTimestamp = "-/-/-";
    } else {
      formattedTimestamp = `${hour}:${minute}:${second} ${day}/${month}/${year}`;
    }
    return formattedTimestamp;
  };

  const onDeleteRoom = () => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    }
  };

  return (
    <>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar src={roomAvatar && roomAvatar} />
          <AddRoomAvatarModal
            roomId={roomId}
            isOpen={isOpen}
            onCloseModal={onCloseModal}
          />
          <div className="info">
            <>
              <p>{roomName} </p>
              <p className="lastSeen">
                Last Seen :{" "}
                {!messages[messages.length - 1]?.timestamp
                  ? " - / - / -"
                  : new Date(
                      messages[messages.length - 1]?.timestamp?.toDate()
                    ).toString()}
              </p>
            </>
          </div>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton autoFocus onClick={onOpenModal}>
            <AddPhotoAlternateIcon />
          </IconButton>
          <IconButton onClick={onDeleteRoom}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      </div>

      {/*//! CHAT BODY  */}
      <div className="chat__body">
        {messages.map((message, i) => {
          let timestamp = new Date(message.timestamp?.toDate());
          const formattedTimestamp = fnFormatTimestamp(timestamp);

          return (
            <div key={i} ref={messageRef}>
              {/* shud use sort of user id instead of name, in case exactly same username */}
              <div
                className={`chat__message ${
                  message.name === user.displayName && `chat__receiver`
                }`}
              >
                <p className="chat__name">{message.name}</p>
                <p className="chat__text">{message.message}</p>

                <span className="chat__timestamp">
                  {/* {new Date(message.timestamp?.toDate()).toString()} */}
                  {formattedTimestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/*//! CHAT FOOTER  */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            ref={inputRef}
            // onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Enter a message"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </>
  );
};

export default Chat;
