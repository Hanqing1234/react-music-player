// Floating point
let floats = [];

const PUSH_HEIGHT = 10;

const FLOAT_HEIGHT = 4;

const DROP_DISTANCE = 1;

const BORDER_WIDTH = 1;

const HEIGHT_RATIO = 1;

export const clearCanvas = (canvasEl) => {
  // Visualization
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  // Draw Canvas
  canvasCtx.fillStyle = "rgb(100, 100, 100)";
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
};
export const drawFloats = (canvasEl, dataArray) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  // Find max value，initialize the height of the float
  dataArray.forEach((item, index) => {
    // Default height
    floats[index] = floats[index] || FLOAT_HEIGHT;
    // Set the current height of the float
    floats[index] =
      item > floats[index]
        ? item + FLOAT_HEIGHT + PUSH_HEIGHT
        : floats[index] - DROP_DISTANCE;

    floats[index] = Math.max(floats[index], FLOAT_HEIGHT);
  });

  const barWidth = canvasWidth / dataArray.length;
  let x = 0;

  for (let i = 0; i < floats.length; i++) {
    const floatHeight = floats[i] * HEIGHT_RATIO;

    canvasCtx.fillStyle = "00C66C";
    canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, FLOAT_HEIGHT);

    x += barWidth + BORDER_WIDTH;
  }
};

export const drawBars = (canvasEl, dataArray) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  const barWidth = canvasWidth / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] * HEIGHT_RATIO;

    // Add gradient color
    const gradient = canvasCtx.createLinearGradient(
      canvasWidth / 2,
      canvasHeight / 3,
      canvasWidth / 2,
      canvasHeight
    );
    gradient.addColorStop(0, "#69b5ee");
    gradient.addColorStop(0.5, "#4c60cb");
    gradient.addColorStop(1, "#69b5ee");

    // draw bar
    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    x += barWidth + BORDER_WIDTH;
  }
};
