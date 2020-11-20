import { useContext } from "react";
import "./UploadButton.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseApp } from "../../config/firebase";

const UploadButton = ({ roomId }) => {
  const classes = useStyles();

  const upload = async e => {
    let roomUrl;
    try {
      // Create a root reference
      const storageRef = firebaseApp.storage().ref();
      const file = e.target.files[0];
      // create dir reference for the uploaded file
      let fileStoragePath = `${roomId}/${file.name}`
      const fileRef = storageRef.child(fileStoragePath);


      await fileRef.put(file).then(() => {
        console.log("Files >> ", file.name);
      });

      await storageRef
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          roomUrl = url;
          console.log("url >> ", url);
        });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className={`${classes.root} uploadButton`}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={upload}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={upload}
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

export default UploadButton;

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
