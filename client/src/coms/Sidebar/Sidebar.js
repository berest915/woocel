// react hooks + css
import { useContext, useEffect, useRef } from "react";
import "./Sidebar.css";
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
  const {
    user,
    rooms,
    setRooms,
    filteredChatroom,
    filterChatroom,
    clearChatroomFilter,
  } = useContext(authContext);

  const searchRef = useRef("");

  useEffect(() => {
    // get a snap on rooms-collection and upd new snapshot if any change occur
    const unsubscribe = db
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

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  // identify which is currently selected chatroom
  const toggleSelected = onClickRoomId => {
    setRooms(
      rooms.map(room => {
        if (onClickRoomId === room.id) {
          room.data.isSelected = true;
          db.collection("rooms").doc(room.id).set(
            {
              isSelected: true,
            },
            { merge: true }
          );
        } else {
          room.data.isSelected = false;
          db.collection("rooms").doc(room.id).set(
            {
              isSelected: false,
            },
            { merge: true }
          );
        }
        return room;
      })
    );
  };

  useEffect(() => {
    if (filteredChatroom === null) {
      searchRef.current.value = "";
    }
  }, [filteredChatroom, searchRef]);

  const onChange = e => {
    if (searchRef.current.value !== "") {
      filterChatroom(e.target.value);
    } else {
      clearChatroomFilter();
    }
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
            <input
              type="text"
              placeholder="Search or start new chat"
              ref={searchRef}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="sidebar__chats">
          <EachRoom addNewChat />

          {rooms &&
            !filteredChatroom &&
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
          {rooms &&
            filteredChatroom &&
            filteredChatroom.map(room => (
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
