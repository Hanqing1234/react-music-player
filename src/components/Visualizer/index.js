import { useRef} from "react";
import useAudioVisualization from "../../hooks/useAudioVisualization";
import audioUrl from '../../assets/test.flac';

const Visualizer = () => {
  const {visualize} = useAudioVisualization('#canvas', 50);

  const audioRef = useRef(null);

  const onPlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      const stream = (audioRef.current).captureStream();
      visualize(stream)
    }
  }

  return (
    <div>
      <audio ref={audioRef} src={audioUrl} onPlay={onPlay} controls />
      <canvas id="canvas" width={500} height={300}/>
    </div>
  )
}

export default Visualizer;