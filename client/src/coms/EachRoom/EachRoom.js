// react hooks + react-router-dom + css
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EachRoom.css";
// @material-ui
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
// components
import AddRoomModal from "../AddRoomModal/AddRoomModal";
// firebase
import db from "../../config/firebase";

const EachRoom = ({
  path,
  addNewChat,
  id,
  roomName,
  toggleSelected,
  isSelected,
  roomAvatarUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [lastDate, setLastDate] = useState("-/-/-");

  useEffect(() => {
    if (id) {
      // get messages from db specified room 
      const unsubscribe = db
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    if (messages.length > 0) {
      getLastDate();
    }
    function getLastDate() {
      // const javaScriptRelease = Date.parse("04 Jan 1995 00:12:00 GMT");
      // var dateNum = javaScriptRelease * 1;
      // const dateObj = new Date(dateNum)

      const timestamp = new Date(messages[0].timestamp?.toDate());
      const year = timestamp.getFullYear();

      const month =
        timestamp.getMonth() >= 10
          ? timestamp.getMonth()
          : `0${timestamp.getMonth() + 1}`;

      const day =
        timestamp.getDate() >= 10
          ? timestamp.getDate()
          : `0${timestamp.getDate()}`;

      setLastDate(day + "/" + month + "/" + year);
    }
  }, [messages]);
  //todo raise NaN issue

  return (
    <>
      {addNewChat ? (
        <>
          <div className="eachRoom" onClick={() => setIsOpen(true)}>
            <AddIcon />
            <p>Add new chat</p>
          </div>
          <AddRoomModal isOpen={isOpen} onCloseModal={() => setIsOpen(false)} />
        </>
      ) : (
        <>
          <Link to={`${path}/${id}`} style={{ textDecoration: "none" }}>
            <div
              className={`eachRoom ${isSelected && `selectedRoom`}`}
              onClick={() => toggleSelected(id)}
            >
              <div className="eachRoom__avatar">
                <Avatar src={roomAvatarUrl && roomAvatarUrl} />
              </div>
              <div className="eachRoom__textInfo">
                <div className="upperTextInfo">
                  <p className="roomName">{roomName}</p>
                  <p className="date">{lastDate}</p>
                </div>
                <div className="lowerTextInfo">
                  <p className="lastMessage">
                    {!messages.length ? "" : messages[0].message}
                  </p>
                  
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default EachRoom;
