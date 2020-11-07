import "./Sidebar.css";
import { useContext, useEffect, useState } from 'react'

import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import EachRoom from "./EachRoom/EachRoom";

import db from '../../config/firebase'
import authContext from '../../context/auth/authContext'

const Sidebar = () => {
  const { user,  rewriteUserInfo, } = useContext(authContext)
  const [rooms, setRooms] = useState([])
  console.log(rooms)
  useEffect(() => {

    db.collection('rooms').onSnapshot(snapshot => {
      setRooms(

        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
        )
    })

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
          <Avatar src={user && user.photoURL}/>
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
       
        <div className="sidebar__chats" >
          <EachRoom addNewChat/>
          {rooms && rooms.map(room => (
            <EachRoom key={room.id} id={room.id} name={room.data.name} />
          ))}
         <EachRoom />
        </div>
    
      </div>
    </>
  );
};

export default Sidebar;
