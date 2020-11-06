import './Modal.css'

import ReactDOM from "react-dom";
import CloseIcon from '@material-ui/icons/Close';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
        <div className='modal'>
          <p>REC REDUX ROOMREC REDUX ROOMREC REDUX ROOMREC REDUX ROOMREC REDUX ROOM</p>
          <CloseIcon onClick={onClose} />
        </div>
    </> ,
    document.getElementById("portal")
  );
};
export default Modal;

