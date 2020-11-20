import { useContext } from "react";
import "./UploadButton.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import db, { firebaseApp } from "../../config/firebase";

const UploadButton = ({ roomId }) => {
  const classes = useStyles();

  const upload = async e => {
    let roomUrl;
    try {
      // Create a root reference
      const storageRef = firebaseApp.storage().ref();
      const file = e.target.files[0];

      // create dir reference for the uploaded file
      let fileStoragePath = `${roomId}/${file.name}`;
      const fileRef = storageRef.child(fileStoragePath);

      // upload progress
      let metadata = {
        contentType: file.type,
      };
      let uploadTask = fileRef.put(file, metadata);
     

      // ############################################################################### //
      //! Listen for state changes, errors, and completion of the upload.
      // uploadTask.on(
      //   firebaseApp.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      //   function (snapshot) {
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     var progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case firebaseApp.storage.TaskState.PAUSED: // or 'paused'
      //         console.log("Upload is paused");
      //         break;
      //       case firebaseApp.storage.TaskState.RUNNING: // or 'running'
      //         console.log("Upload is running");
      //         break;
      //     }
      //   },
      //   function (error) {
      //     // A full list of error codes is available at
      //     // https://firebase.google.com/docs/storage/web/handle-errors
      //     switch (error.code) {
      //       case "storage/unauthorized":
      //         // User doesn't have permission to access the object
      //         break;
      //       case "storage/canceled":
      //         // User canceled the upload
      //         break;
      //       case "storage/unknown":
      //         // Unknown error occurred, inspect error.serverResponse
      //         break;
      //     }
      //   },
      //   function () {
      //     // Upload completed successfully, now we can get the download URL
      //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      //       console.log("File available at", downloadURL);
      //     });
      //   }
      // );
      // ############################################################################### //

      //! upload file
      await fileRef
        .put(file)
        .then(() => {
          console.log("Files >> ", file.name);
        })
        .catch(err => {
          console.log("failed to upload file, error >> ", err);
        });

      //! download url for the uploaded file
      await fileRef
        .getDownloadURL()
        .then(url => {
          roomUrl = url;
          console.log("url >> ", url);
          console.log('fileStoragePath >> ', fileStoragePath)

          // let fileStoragePath = `${roomId}/${file.name}`;
          db.collection("rooms")
            .doc(roomId)
            .set({
              roomAvatarUrl: url,
              path: fileStoragePath
            }, { merge: true})

        })
        .catch(err =>
          console.log(
            "failed to get downloadURL for uploaded file, error >> ",
            err
          )
        );
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
