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
  const { user, rewriteUserInfo } = useContext(authContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // get a snap on the collection and upd new snapshot if any change occur
    db.collection("rooms").onSnapshot(snapshot => {
      setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    db.collection("users").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        // compare and get the info from the right user
        const LST = localStorage.getItem("token");
        LST === doc.data().accessToken && rewriteUserInfo(doc.data());
        return doc;
      });
    });
    // eslint-disable-next-line
  }, []);

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
                name={room.data.name}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
