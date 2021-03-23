// css
import "./NotFoundPage.css";
// components
import NotFound from "../../coms/NotFound/NotFound";

const NotFoundPage = () => {
  return (
    <>
      <div className="notFound">
        <div className="notFound__wrapper">
          <NotFound />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
