import Sidebar from "../../coms/Sidebar/Sidebar";
import "./SuccessPage.css";

const SuccessPage = () => {
  return (
    <>
      <div className="success">
        <div className="success__wrapper">
          {/* sidebar */}
          <div style={{ display: 'flex', height: '100%' }}>
            <Sidebar />
          </div>
          {/* chat-messages */}
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
