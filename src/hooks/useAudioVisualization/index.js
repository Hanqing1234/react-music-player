import {useRef} from "react";
import {clearCanvas as utilsClearCanvas, drawBars, drawFloats} from "./drawUtils";

const useAudioVisualization = (selector, length = 50) => {
  const audioCtxRef = useRef();
  const analyserRef = useRef();
  const requestAnimateFrameIdRef = useRef();

  // Draw canvas in each frame
  const drawEachFrame = (canvasEl, dataArray) => {
    // recursively call draw
    requestAnimateFrameIdRef.current = requestAnimationFrame(() => drawEachFrame(canvasEl, dataArray));

    if (analyserRef.current) {
      // Load data
      analyserRef.current.getByteFrequencyData(dataArray);
      // Update length
      const bars = dataArray.slice(0, Math.min(length, dataArray.length));
      // Draw canvas
      utilsClearCanvas(canvasEl);
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
  // reset canvas
  const resetCanvas = () => {
    const canvasEl = document.querySelector(selector);
    if (canvasEl) {
      const emptyDataArray = (new Uint8Array(length)).map(() => 4);
      drawFloats(canvasEl, emptyDataArray);
    }
  }

  const clearCanvas = () => {
    const canvasEl = document.querySelector(selector);
    if (canvasEl) {
      utilsClearCanvas(canvasEl);
    }
  };

  const stopVisualize = () => {
    if(requestAnimateFrameIdRef.current) {
      Window.cancelAnimationFrame(requestAnimateFrameIdRef.current);
      resetCanvas();
    }
  };

  return {
    visualize,
    stopVisualize,
    resetCanvas,
    clearCanvas,
    requestAnimateFrameId: requestAnimateFrameIdRef.current,
  };

}

export default useAudioVisualization;