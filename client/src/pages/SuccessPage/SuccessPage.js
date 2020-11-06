import Chat from "../../coms/Chat/Chat";
import Sidebar from "../../coms/Sidebar/Sidebar";
import "./SuccessPage.css";

const SuccessPage = () => {
  return (
    <>
      <div className="success">
        <div className="success__wrapper">
          <Sidebar /> 
          <Chat />
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
