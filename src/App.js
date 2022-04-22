import React, { useEffect, useRef, useState } from "react";
import audioUrl from "./assets/test.flac";
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from "./styles.module.scss";

const App = () => {
  const { visualize, clearCanvas, stopVisualize } = useAudioVisualization(
    "#canvas",
    50
  );

  const [newAudioUrl, setNewAudioUrl] = useState("");

  const audioRef = useRef(null);

  const onPlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      const stream = audioRef.current.captureStream();
      visualize(stream);
    }
  };

  const onPause = async () => {
    stopVisualize();
  };

  const onUpload = (e) => {
    if (e.target.files) {
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setNewAudioUrl(blobUrl);
    }
  };

  useEffect(() => {
    clearCanvas(document.querySelector("#canvas"));
  }, [clearCanvas]);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <canvas id="canvas" width={500} height={300} />
        </div>
        <div className={styles.controls}>
          <audio
            ref={audioRef}
            src={newAudioUrl || audioUrl}
            onPlay={onPlay}
            onPause={onPause}
            controls
          />
        </div>
        <div>
          <label>
            <span>Upload audio</span>
            <input type="file" onChange={onUpload} accept="audio/*"/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
