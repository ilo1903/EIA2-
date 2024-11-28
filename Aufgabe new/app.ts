// Setup for the canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d')!;

// Utility functions
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max));
const randomColor = () =>
  `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, ${Math.random().toFixed(2)})`;

// Abstract pattern creation
const drawRandomRectangles = () => {
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = randomColor();
    ctx.fillRect(random(0, canvas.width), random(0, canvas.height), random(50, 300), random(50, 300));
  }
};

const drawRandomCircles = () => {
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(random(0, canvas.width), random(0, canvas.height), random(10, 100), 0, Math.PI * 2);
    ctx.fillStyle = randomColor();
    ctx.fill();
  }
};

const drawRandomLines = () => {
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.moveTo(random(0, canvas.width), random(0, canvas.height));
    ctx.lineTo(random(0, canvas.width), random(0, canvas.height));
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = random(1, 10);
    ctx.stroke();
  }
};

const drawDynamicGrid = () => {
  const cols = randomInt(5, 15);
  const rows = randomInt(5, 15);
  const cellWidth = canvas.width / cols;
  const cellHeight = canvas.height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      ctx.strokeStyle = randomColor();
      ctx.lineWidth = random(1, 5);
      ctx.strokeRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
  }
};

const drawComplexShapes = () => {
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(random(0, canvas.width), random(0, canvas.height));
    for (let j = 0; j < 5; j++) {
      ctx.lineTo(random(0, canvas.width), random(0, canvas.height));
    }
    ctx.closePath();
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = random(1, 5);
    ctx.stroke();
  }
};

// Generate layered abstract art
const generateArt = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, randomColor());
  gradient.addColorStop(1, randomColor());
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Layer different abstract elements
  drawRandomRectangles();
  drawRandomCircles();
  drawRandomLines();
  drawDynamicGrid();
  drawComplexShapes();
};

// Run the art generator
generateArt();

// Optionally, regenerate art on click
canvas.addEventListener('click', generateArt);