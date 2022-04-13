// Floating point
let floats = [];
// 推的高度
const PUSH_HEIGHT = 10;
// 高度
const FLOAT_HEIGHT = 4;
// 下落高度
const DROP_DISTANCE = 1;

export const clearCanvas = (canvasEl) => {
    // Visualization
    const canvasWidth = canvasEl.width;
    const canvasHeight = canvasEl.height;
    const canvasCtx = canvasEl.getContext("2d");
  
    if (!canvasCtx) {
      return;
    }
  
    // Draw Canvas
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
}
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
      floats[index] = item > floats[index] ? item + FLOAT_HEIGHT + PUSH_HEIGHT : floats[index] - DROP_DISTANCE;

      floats[index] = Math.max(floats[index], FLOAT_HEIGHT);
    })
  
    const barWidth = (canvasWidth / dataArray.length) * 2.5
    let x = 0;
  
    for (let i = 0; i < floats.length; i++) {
      const floatHeight = floats[i];
  
      canvasCtx.fillStyle = 'red';
      canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, FLOAT_HEIGHT);
  
      x += barWidth + 1;
    }
  }
  
  export const drawCanvas = (canvasEl, dataArray) => {
    const canvasWidth = canvasEl.width;
    const canvasHeight = canvasEl.height;
    const canvasCtx = canvasEl.getContext("2d");
  
    if (!canvasCtx) {
      return;
    }
  
    const barWidth = (canvasWidth / dataArray.length) * 2.5
    let x = 0;
  
    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i];
  
      canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)';
      canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
  
      x += barWidth + 1;
    }
  }