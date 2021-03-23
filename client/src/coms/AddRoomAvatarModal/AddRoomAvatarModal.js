import React from "react";
import ReactDOM from "react-dom";
import Corsona from "../Corsona/Corsona";
import "./AddRoomAvatarModal.css";

const AddRoomAvatarModal = ({ roomId, isOpen, onCloseModal }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div className="addRoomModal">
          <Corsona roomId={roomId} onCloseModal={onCloseModal} />
        </div>
      </div>
    </>,
    document.getElementById("AddRoomAvatarPortal")
  );
};

export default AddRoomAvatarModal;

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
