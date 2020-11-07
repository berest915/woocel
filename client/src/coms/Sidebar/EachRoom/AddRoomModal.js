import ReactDOM from "react-dom";
import "./AddRoomModal.css";

const AddRoomModal = ({ isOpen, onCloseModal }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div
          className="addRoomModal"
          style={{
            transform: isOpen ? "translateY(0vh)" : "translateY(-100vh)",
            opacity: isOpen ? "1" : "0",
          }}
        >
          <p>chat modal</p>
          <button onClick={onCloseModal} >Close</button>
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
