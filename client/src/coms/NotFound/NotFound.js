import { useHistory } from "react-router-dom";
import './NotFound.css'

import Button from "@material-ui/core/Button";

const NotFound = () => {
  const history = useHistory();

  return (
    <>
          <div className="notFound__container">
            <p className='error'>ERROR 404</p>
            <p className='detail'>Page Not Found</p>
            <Button className="google-btn" onClick={() => history.push('/')}>
              Redirect to Homepage
            </Button>
          </div>
    
    </>
  );
};

export default NotFound;
