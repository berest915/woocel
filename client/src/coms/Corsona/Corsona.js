import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import db, { firebaseApp } from "../../config/firebase";

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

function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}

const Corsona = ({ roomId, onCloseModal }) => {
  const [readyFile, setReadyFile] = useState(null);
  const [triggered, setTriggered] = useState(false)
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [completedCrop, setCompletedCrop] = useState(null);

  const generateDownload = async (previewCanvas, crop) => {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    const canvasFile = canvas.toBlob(
      blob => {
        setReadyFile(blobToFile(blob, "hey.png"));
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
    // **************************************************************** //
  
    

     


    // **************************************************************** //
  };



  useEffect(async() => {
    if(!readyFile || !triggered ){
      return
    }
    // Create a root reference
    const storageRef = firebaseApp.storage().ref();
    // create dir reference for the uploaded file
    console.log(readyFile);
    let fileStoragePath = `${roomId}/${readyFile.name}`;
    const fileRef = storageRef.child(fileStoragePath);

    
     //! upload file
     await fileRef
     .put(readyFile)
     .then(() => {
       console.log("File was uploaded >> ", readyFile.name);
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
  }, [readyFile])










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

  const uploadFile = e => {
    // const file = e.target.files[0];
    // console.log(file);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUpImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="corsona">
        <div className="upload-btn">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={uploadFile}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={uploadFile}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>

        <div className="upload-crop">
          <ReactCrop
            className={`reactCrop ${!upImg && `hidden`}`}
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
          />
        </div>

        <div className="upload-preview">
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
        </div>

        <div className="upload-download">
          <button
            type="button"
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() =>{
              generateDownload(previewCanvasRef.current, completedCrop)
              setTriggered(true)
            }
            }
          >
            Download cropped image
          </button>
        </div>
        
        <button className="modalCloseButton" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default Corsona;
