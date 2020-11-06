import { Avatar } from "@material-ui/core";
import "./EachRoom.css";

const EachRoom = () => {
  return (
    <>
      <div className="eachRoom">
        <div className="eachRoom__avatar">
          <Avatar />
        </div>
        <div className="eachRoom__textInfo">
          <div className="upperTextInfo">
            <p className="roomName">Redux React </p>
            <p className="date">21/10/2019</p>
          </div>
          <div className="lowerTextInfo">
            <p className="lastMessage">chatroom last msg</p>
          </div>
        </div>
      </div>
      <div className="eachRoom">
        <div className="eachRoom__avatar">
          <Avatar />
        </div>
        <div className="eachRoom__textInfo">
          <div className="upperTextInfo">
            <p className="roomName">chatroom name</p>
            <p className="date">21/1/2019</p>
          </div>
          <div className="lowerTextInfo">
            <p className="lastMessage">chatroom last msg</p>
          </div>
        </div>
      </div>
      <div className="eachRoom">
        <div className="eachRoom__avatar">
          <Avatar />
        </div>
        <div className="eachRoom__textInfo">
          <div className="upperTextInfo">
            <p className="roomName">chatroom name</p>
            <p className="date">21/1/2019</p>
          </div>
          <div className="lowerTextInfo">
            <p className="lastMessage">chatroom last msg</p>
          </div>
        </div>
      </div>
      <div className="eachRoom">
        <div className="eachRoom__avatar">
          <Avatar />
        </div>
        <div className="eachRoom__textInfo">
          <div className="upperTextInfo">
            <p className="roomName">chatroom name</p>
            <p className="date">21/1/2019</p>
          </div>
          <div className="lowerTextInfo">
            <p className="lastMessage">chatroom last msg</p>
          </div>
        </div>
      </div>
      <div className="eachRoom">
        <div className="eachRoom__avatar">
          <Avatar />
        </div>
        <div className="eachRoom__textInfo">
          <div className="upperTextInfo">
            <p className="roomName">chatroom name</p>
            <p className="date">21/1/2019</p>
          </div>
          <div className="lowerTextInfo">
            <p className="lastMessage">chatroom last msg</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachRoom;
