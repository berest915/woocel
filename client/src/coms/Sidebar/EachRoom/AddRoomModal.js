import ReactDOM from "react-dom";
import { useState } from 'react'
import "./AddRoomModal.css";
import db from '../../../config/firebase'

const AddRoomModal = ({ isOpen, onCloseModal }) => {
  const [input, setInput] = useState('')
 
  if (!isOpen) return null;
  


  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div
          className="addRoomModal"
      //  which model to refer at ?
        >
          <form>
						<input
							value={input}
							onChange={e => setInput(e.target.value)}
							type='text'
							placeholder='enter new room name'
						/>
            //! after addroom by prompt, rewatch again
						{/* <button onClick={sendMessage} type='submit'>
							Add
						</button> */}
					</form>
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
