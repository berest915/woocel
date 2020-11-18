// react hooks + css
import "./EachRoom.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// @material-ui
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
// components
import AddRoomModal from "../AddRoomModal/AddRoomModal";
import db from "../../config/firebase";

const EachRoom = ({ path, addNewChat, id, roomName, toggleSelected, isSelected}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if (id) {
      const unsubscribe = db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
      return () => unsubscribe()
    }
  }, [id]);



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
          <Link to={`${path}/${id}`} style={{ textDecoration: "none" }} >
            <div className={`eachRoom ${isSelected && `selectedRoom`}`} onClick={() => toggleSelected(id)} >
              <div className="eachRoom__avatar">
                <Avatar />
              </div>
              <div className="eachRoom__textInfo">
                <div className="upperTextInfo">
                  <p className="roomName">{roomName}</p>
                  {/* pending >> real time with following format*/}
                  <p className="date">21/10/2019</p>
                </div>
                <div className="lowerTextInfo">
                  <p className="lastMessage">
                    {!messages.length ? "": messages[0].message}
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
