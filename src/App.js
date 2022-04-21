import React, { useEffect, useRef} from 'react';
import audioUrl from "./assets/test.flac";
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';

const App = () => {
  const {visualize, clearCanvas} = useAudioVisualization('#canvas', 50);

  const audioRef = useRef(null);

  const onPlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      const stream = audioRef.current.captureStream();
      visualize(stream)
    }
  }

  useEffect(() => {
    clearCanvas(document.querySelector('#canvas'))
  }, [clearCanvas]);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <canvas id="canvas" width={400} height={160}/>
        </div>
        <div className={styles.audio}>
          <audio ref={audioRef} src={audioUrl} onPlay={onPlay} controls />
        </div>
      </div>
    </div>
  );
}

export default App;
