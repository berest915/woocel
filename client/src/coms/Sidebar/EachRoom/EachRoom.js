import { Link } from "react-router-dom";
import "./EachRoom.css";
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";

const EachRoom = ({ path, id, name, addNewChat }) => {
 
  return (
    <>
      {addNewChat ? (
        <div className="eachRoom">
          <AddIcon />
          <p>Add new chat</p>
        </div>
      ) : (
        <>
        <Link to={`${path}/:roomId`} >
        <div className="eachRoom" >
          <div className="eachRoom__avatar">
            <Avatar />
          </div>
          <div className="eachRoom__textInfo">
            <div className="upperTextInfo">
              <p className="roomName">REDUX REACT GATSBY COMMUNITY</p>
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
