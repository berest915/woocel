// react hooks + css
import { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import "./AddRoomModal.css";
// custom hooks
import { useInput } from "./useInput";
// firebase
import db from "../../config/firebase";
// react context
import authContext from "../../context/auth/authContext";

const AddRoomModal = ({ isOpen, onCloseModal }) => {
  const { setNewRoom } = useContext(authContext);
  const { roomname, bind, reset } = useInput("");
  const [isRoomNameExist, setIsRoomNameExist] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    // write new room name into db
    db.collection("rooms").add({
      name: roomname,
    })

    //? reset() failed to clear inputs
    // reset();
    onCloseModal();
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div
          className="addRoomModal"
          // which model to refer at ?
        >
          <form onSubmit={handleSubmit}>
            <label>
              Room Name:
              <input type="text" {...bind} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {/* <form>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              type="text"
              placeholder="enter new room name"
            />
            <button type='submit'>
							Add
						</button>
          </form> */}
          <button onClick={onCloseModal}>Cancel</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AddRoomModal;

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
