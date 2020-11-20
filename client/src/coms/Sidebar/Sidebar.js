// react hooks + css
import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
// @material-ui
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
// components
import EachRoom from "../EachRoom/EachRoom";
// firebase
import db from "../../config/firebase";
// react context
import authContext from "../../context/auth/authContext";

const Sidebar = ({ path }) => {
  const { user } = useContext(authContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // get a snap on the collection and upd new snapshot if any change occur
    const unsubscribeOne = db
      .collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setRooms(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => unsubscribeOne();
    // eslint-disable-next-line
  }, []);

  const toggleSelected = onClickRoomId => {
    setRooms(
      rooms.map(room => {
        if (onClickRoomId === room.id) {
          room.data.isSelected = true;
        } else {
          room.data.isSelected = false;
        }
        return room;
      })
    );
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__header">
          <Avatar src={user && user.photoURL} />
          <div className="sidebar__headerRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>

        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input type="text" placeholder="Search or start new chat" />
          </div>
        </div>

        <div className="sidebar__chats">
          <EachRoom addNewChat />
          {rooms &&
            rooms.map(room => (
              <EachRoom
                path={path}
                key={room.id}
                id={room.id}
                roomName={room.data.name}
                isSelected={room.data.isSelected}
                toggleSelected={toggleSelected}
                roomAvatarUrl={room.data.roomAvatarUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
