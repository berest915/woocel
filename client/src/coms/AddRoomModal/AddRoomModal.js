// react hooks + css
import ReactDOM from "react-dom";
import "./AddRoomModal.css";
// custom hooks
import { useInput } from "./useInput";
// styled-components
import { ReButton } from '../../StyledComponents/StyledComponents'
// firebase
import db from "../../config/firebase";
import firebase from "firebase";


const AddRoomModal = ({ isOpen, onCloseModal }) => {
  const { roomname, bind, reset } = useInput("");

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    // write new room name into db
    if (roomname) {
      db.collection("rooms")
        .add({
          name: roomname,
          isSelected: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          roomAvatarUrl: null,
          fileStoragePath: null,
        })
    }

    reset();
    onCloseModal();
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div className="addRoomModal">
          <form onSubmit={handleSubmit}>
            <label>
              <div className="modalTitle">Room Name</div>
              <input  autoFocus className="modalInput" type="text" {...bind} />
            </label>
          </form>
          <ReButton className='modalEnterButton' onClick={handleSubmit} >
            Add This Room
          </ReButton>
          <ReButton className="modalCloseButton" onClick={onCloseModal}>
            Cancel
          </ReButton>
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
