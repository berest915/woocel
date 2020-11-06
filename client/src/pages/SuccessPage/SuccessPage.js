import Chat from "../../coms/Chat/Chat";
import Sidebar from "../../coms/Sidebar/Sidebar";
import "./SuccessPage.css";

const SuccessPage = () => {
  return (
    <>
      <div className="success">
        <div className="success__wrapper">
          
          <div style={{ display: 'flex', height: '100%' }}>
            <Sidebar />
            <Chat />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
