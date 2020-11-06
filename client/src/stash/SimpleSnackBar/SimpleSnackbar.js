import { useState } from "react";
import "./SimpleSnackbar.css";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

export default function SimpleSnackbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const messageDiv = (
    <div className="snackerFlex">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="width">Room</span>
        <span className="spanInfo">REC Redux</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="width">Last Seen by</span>
        <span className="spanInfo">19:28 Thurs, 21 Jan 2020</span>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton onClick={handleClick} style={{ padding: 0 }}>
        <InfoRoundedIcon fontSize="large" />
      </IconButton>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
        message={<>{messageDiv}</>}
        // message="Note archived"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
