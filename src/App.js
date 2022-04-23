import React, { useEffect, useRef, useState } from "react";
import audioUrl from "./assets/test.flac";
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from "./styles.module.scss";

const App = () => {
  const { visualize, clearCanvas, stopVisualize, resetCanvas } = useAudioVisualization(
    "#canvas",
    50
  );

  const [newAudio, setNewAudio] = useState("");
  const [isStart, setIsStart] = useState(false);

  const audioRef = useRef(null);

  const onPlay = async () => {
    if (audioRef.current && !isStart) {
      await audioRef.current.play();
      const stream = audioRef.current.captureStream();
      visualize(stream);
      setIsStart(true);
    }
  }

  const onPause = async () => {
    resetCanvas();
  }

  const onUpload = (e) => {
    if (e.target.files) {
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setNewAudio(blobUrl);
    }
  };

  useEffect(() => {
    console.log(1)
    clearCanvas();
    resetCanvas();
    return () => {
      console.log(2);
      stopVisualize();
    }
    
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <canvas id="canvas" width={500} height={300} />
        </div>
        <div className={styles.controls}>
          <audio
            ref={audioRef}
            src={newAudio || audioUrl}
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
