// react, react-router-dom + css
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// components
import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContinuePage from "./pages/ContinuePage/ContinuePage";
// react contexts
import AuthState from "./context/auth/AuthState";

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// // Increase pixel density for crop preview quality on retina screens.
// const pixelRatio = window.devicePixelRatio || 1;

// function getResizedCanvas(canvas, newWidth, newHeight) {
//   const tmpCanvas = document.createElement("canvas");
//   tmpCanvas.width = newWidth;
//   tmpCanvas.height = newHeight;

//   const ctx = tmpCanvas.getContext("2d");
//   ctx.drawImage(
//     canvas,
//     0,
//     0,
//     canvas.width,
//     canvas.height,
//     0,
//     0,
//     newWidth,
//     newHeight
//   );

//   return tmpCanvas;
// }

// function generateDownload(previewCanvas, crop) {
//   if (!crop || !previewCanvas) {
//     return;
//   }

//   const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

//   canvas.toBlob(
//     blob => {
//       const previewUrl = window.URL.createObjectURL(blob);

//       const anchor = document.createElement("a");
//       anchor.download = "cropPreview.png";
//       anchor.href = URL.createObjectURL(blob);
//       anchor.click();

//       window.URL.revokeObjectURL(previewUrl);
//     },
//     "image/png",
//     1
//   );
// }

function App() {
  // const [upImg, setUpImg] = useState();
  // const imgRef = useRef(null);
  // const previewCanvasRef = useRef(null);

  // const [completedCrop, setCompletedCrop] = useState(null);

  // //* initial crop properties
  // const [crop, setCrop] = useState({
  //   unit: "%",
  //   width: 50,
  //   aspect: 1 / 1,
  //   x: 25,
  //   y: 25,
  // });

  // const onSelectFile = e => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //       setUpImg(reader.result);
  //     });
  //     //!
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // const onLoad = useCallback(img => {
  //   imgRef.current = img;
  // }, []);

  // useEffect(() => {
  //   if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
  //     return;
  //   }

  //   const image = imgRef.current;
  //   const canvas = previewCanvasRef.current;
  //   const crop = completedCrop;

  //   const scaleX = image.naturalWidth / image.width;
  //   const scaleY = image.naturalHeight / image.height;
  //   const ctx = canvas.getContext("2d");

  //   canvas.width = crop.width * pixelRatio;
  //   canvas.height = crop.height * pixelRatio;

  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  //   ctx.imageSmoothingQuality = "high";

  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width,
  //     crop.height
  //   );
  // }, [completedCrop]);

  return (
    <>
      {/* <div
        style={{
          height: "100vh",
          backgroundColor: "var(--content-space-color--)",
        }}
      >
        <div>
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
        <ReactCrop
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

        <AuthState>
        <div className="app">
          <Router>
            <div className="app__header">
              <div className="layout">
                <Navbar />
              </div>
            </div>

            <div className="app__body">
              <div className="page">
                <Switch>
                  <Route exact path="/" component={LoginPage} />
                  <Route path="/continue" component={ContinuePage} />
                  <Route path="/app" component={SuccessPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      </AuthState>
      {/* </div> */}
    </>
  );
}

export default App;
