import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Chat.css";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// import { useBreakpoint } from "../../IndexContextProvider/breakpoint";
import ToggleModal from "../ChatModal/ToggleModal";
import db from "../../config/firebase";
import authContext from "../../context/auth/authContext";
import firebase from "firebase";
import AddRoomAvatarModal from "../AddRoomAvatarModal/AddRoomAvatarModal";

const Chat = () => {
  let history = useHistory();
  const messageRef = useRef();

  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(authContext);

  const [input, setInput] = useState("");
  const inputRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  

  let value = false;

  useEffect(() => {
    if (roomId) {
      // set chat header roomName
      const unsubsribeOne = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => {
          try {
            setRoomName(snapshot.data().name);
          } catch (error) {
            history.push("/notFound");
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
    input &&
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    // input &&
    //   db
    //     .collection("rooms")
    //     .doc(roomId)
    //     .collection("messages")
    //     .onSnapshot(snapshot => {
    //       snapshot.docs.map(doc => {
    //         console.log(doc.data().timestamp);
    //       });
    //     });

    inputRef.current.value = "";
    setInput(""); // reset input value
  }, [input, roomId, user.displayName]);

  return (
    <>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <IconButton autoFocus onClick={onOpenModal}>
            <AddPhotoAlternateIcon />
          </IconButton>
          <AddRoomAvatarModal
            roomId={roomId}
            isOpen={isOpen}
            onCloseModal={onCloseModal}
          />
          <div className="info">
            {!value ? (
              <>
                <p>{roomName} </p>
                <p className="lastSeen">
                  Last Seen :{" "}
                  {
                  new Date(
                    messages[messages.length - 1]?.timestamp?.toDate()
                  ).toString()
                  }
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
                {new Date(message.timestamp?.toDate()).toString()}
              </span>
            </div>
          </div>
        ))}
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
          {input}
        </form>
        <MicIcon />
      </div>
    </>
  );
};

export default Chat;
