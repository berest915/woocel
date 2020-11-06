import { useState } from "react";
import './ToggleModal.css'
import Modal from "../ChatModal/Modal";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { IconButton } from "@material-ui/core";

const ToggleModal = () => {
  const [open, setIsOpen] = useState(true);

  return (
    <>
      <div className='toggleModal'>
        <IconButton onClick={() => setIsOpen(true)}>
          <InfoOutlinedIcon fontSize='large' />
        </IconButton>
        
        <Modal open={open} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default ToggleModal;
