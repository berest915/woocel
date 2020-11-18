// react hooks + css
import ReactDOM from "react-dom";
import "./AddRoomModal.css";
// custom hooks
import { useInput } from "./useInput";
// firebase
import db from "../../config/firebase";

const AddRoomModal = ({ isOpen, onCloseModal }) => {
  const { roomname, bind } = useInput("");

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    // write new room name into db
    if (roomname) {
      db.collection("rooms").add({
        name: roomname,
        isSelected: false,
      });
    }

    //? reset() failed to clear inputs
    // reset();
    onCloseModal();
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div className="addRoomModal">
          <form onSubmit={handleSubmit}>
            <label>
              <div className="modalTitle">Room Name</div>
              <input className="modalInput" type="text" {...bind} />
            </label>
          </form>
          <button className="modalCloseButton" onClick={onCloseModal}>
            Cancel
          </button>
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
