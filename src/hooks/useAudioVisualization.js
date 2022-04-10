import {useRef} from "react";

const drawCanvas = (canvasCtx, dataArray, canvasWidth, canvasHeight, bufferLength) => {
  const barWidth = (canvasWidth / bufferLength) * 2.5
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];

    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)';
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

const useAudioVisualization = (selector) => {
  const audioCtxRef = useRef();
  const analyserRef = useRef();

  const draw = (canvasCtx, dataArray, canvasWidth, canvasHeight, bufferLength) => {
    // recursively call draw
    requestAnimationFrame(() => draw(canvasCtx, dataArray, canvasWidth, canvasHeight, bufferLength));

    if (!analyserRef.current) {
      return;
    }

    analyserRef.current.getByteFrequencyData(dataArray);

    // draw the audio visualization
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawCanvas(canvasCtx, dataArray, canvasWidth, canvasHeight, bufferLength);
  }

  const visualize = (stream) => {
    const canvasEl = document.querySelector(selector);
    if (!canvasEl) {
      throw new Error('can not find canvas');
    }

    // create analyser
    audioCtxRef.current = new AudioContext()
    analyserRef.current = audioCtxRef.current.createAnalyser();

    // get source of the audio
    const source = audioCtxRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    // visualizer
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // visualizer
    const WIDTH = canvasEl.width;
    const HEIGHT = canvasEl.height;
    const canvasCtx = canvasEl.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    // clear canvas
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    draw(canvasCtx, dataArray, WIDTH, HEIGHT, bufferLength);
  }

  return { visualize }
}

export default useAudioVisualization;