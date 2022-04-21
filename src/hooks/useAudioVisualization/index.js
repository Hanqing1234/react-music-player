import {useRef} from "react";
import {clearCanvas, drawBars, drawFloats} from "./drawUtils";

const useAudioVisualization = (selector, length = 50) => {
  const audioCtxRef = useRef();
  const analyserRef = useRef();

  // Draw canvas in each frame
  const drawEachFrame = (canvasEl, dataArray) => {
    // recursively call draw
    requestAnimationFrame(() => drawEachFrame(canvasEl, dataArray));

    if (analyserRef.current) {
      // Load data
      analyserRef.current.getByteFrequencyData(dataArray);
      // Update length
      const bars = dataArray.slice(0, Math.min(length, dataArray.length));
      // Draw canvas
      clearCanvas(canvasEl);
      drawBars(canvasEl, bars);
      drawFloats(canvasEl, bars);
    }
  }

  // Start visualization
  const visualize = (stream) => {
    const canvasEl = document.querySelector(selector);
    if (!canvasEl) {
      throw new Error('cannot find canvas');
    }

    // Create analyser
    audioCtxRef.current = new AudioContext()
    analyserRef.current = audioCtxRef.current.createAnalyser();

    // Create audio source
    const source = audioCtxRef.current.createMediaStreamSource(stream);
    // connect audio source to analyser
    source.connect(analyserRef.current);

    // Prepare data
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Start drawing recursion
    drawEachFrame(canvasEl, dataArray);
  }

  return { visualize, clearCanvas };
}

export default useAudioVisualization;