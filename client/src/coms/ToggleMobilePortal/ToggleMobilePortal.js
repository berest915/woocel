// react-dom + css
import ReactDOM from "react-dom";
import "./ToggleMobileModal.css";
// styled-components
import { ReButton } from "../../StyledComponents/StyledComponents";

const ToggleModalPortal = ({ isOpen, onCloseModal }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div className="toggleMobileModal">
          <div className="message__container">
            <p className="top-message">
              this chat application is only witting for web-platform.
            </p>
            <p className="bottom-message">
              mobile-view would be implemented in the near future using
              react-native, else you could either view on orientation-mode OR
              enable desktop site.
            </p>
            <ReButton onClick={onCloseModal}>Proceed Anyway</ReButton>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("ToggleMobilePortal")
  );
};

export default ToggleModalPortal;

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
