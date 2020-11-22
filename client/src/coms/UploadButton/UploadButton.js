import "./UploadButton.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import db, { firebaseApp } from "../../config/firebase";

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function generateDownload(previewCanvas, crop) {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
  // ############################################################################## //
  // ############################################################################## //
  // ############################################################################## //
  // ############################################################################## //
  // ############################################################################## //
  canvas.toBlob(
    blob => {
      console.log(blobToFile(blob, "hey.png"));
      // const previewUrl = window.URL.createObjectURL(blob);
      // console.log("previewURL >> ", blob)
      // const anchor = document.createElement("a");
      // anchor.download = "cropPreview.png";
      // anchor.href = URL.createObjectURL(blob);
      // console.log('anchor href >> ', anchor.href)
      // anchor.click();

      // window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
}
function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}


//! 
const UploadButton = ({ roomId }) => {
  // modal
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [completedCrop, setCompletedCrop] = useState(null);
  const [finalFile, setFinalFile] = useState(null);

  //* initial crop properties
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: 1 / 1,
    x: 25,
    y: 25,
  });

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  // ############################################################################## //
  // ############################################################################## //
  // ############################################################################## //
  // ############################################################################## //
  const upload = async e => {
    try {
      // Create a root reference
      const storageRef = firebaseApp.storage().ref();

      // ******************************************* //
      const file = e.target.files[0];
      console.log(file);
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setUpImg(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }

      // ******************************************* //

      // create dir reference for the uploaded file
      let fileStoragePath = `${roomId}/${file.name}`;
      const fileRef = storageRef.child(fileStoragePath);

      // ############################################################################### //
      //! upload progress
      // let metadata = {
      //   contentType: file.type,
      // };
      // let uploadTask = fileRef.put(file, metadata);
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
          // console.log("url >> ", url);
          // console.log("fileStoragePath >> ", fileStoragePath);

          // let fileStoragePath = `${roomId}/${file.name}`;
          db.collection("rooms").doc(roomId).set(
            {
              roomAvatarUrl: url,
              path: fileStoragePath,
            },
            { merge: true }
          );
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
      {/* <ReactCrop
        className={`reactCrop ${!upImg && `hidden`}`}
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={c => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      <button
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() =>
            generateDownload(previewCanvasRef.current, completedCrop)
          }
        >
          Download cropped image
        </button> */}
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
