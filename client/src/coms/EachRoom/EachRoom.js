// react hooks + css
import "./EachRoom.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// @material-ui
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
// components
import AddRoomModal from "../AddRoomModal/AddRoomModal";

const EachRoom = ({ path, addNewChat, id, roomName }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to={`${path}/:roomId`} style={{ textDecoration: "none" }}>
            <div className="eachRoom">
              <div className="eachRoom__avatar">
                <Avatar />
              </div>
              <div className="eachRoom__textInfo">
                <div className="upperTextInfo">
                  <p className="roomName">{roomName}</p>
                  <p className="date">21/10/2019</p>
                </div>
                <div className="lowerTextInfo">
                  <p className="lastMessage">chatroom last msg</p>
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
