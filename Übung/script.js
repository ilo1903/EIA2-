"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Context konnte nicht initialisiert werden.');
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Zufallszahl zwischen zwei Werten
const random = (min, max) => Math.random() * (max - min) + min;
// Hintergrundbild speichern
let backgroundImage;
// Klasse: Vogel
class Bird {
    constructor(x, y, isFlying) {
        this.x = x;
        this.y = y;
        this.isFlying = isFlying;
        this.speedX = random(-2, 2);
        this.speedY = isFlying ? random(-1, 1) : 0;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        if (this.isFlying) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0)
                this.x = canvas.width;
            if (this.x > canvas.width)
                this.x = 0;
            if (this.y < 0)
                this.y = canvas.height;
            if (this.y > canvas.height)
                this.y = 0;
        }
    }
}
// Klasse: Schneeflocke
class Snowflake {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.size = random(2, 5);
        this.speed = random(1, 3);
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = random(0, canvas.width);
        }
    }
}
// Hintergrund zeichnen und speichern
function drawBackground() {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
    backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
}
// Objekte für Animation
const birds = [];
const snowflakes = [];
// Szene initialisieren
function initializeScene() {
    for (let i = 0; i < 10; i++) {
        birds.push(new Bird(random(0, canvas.width), random(0, canvas.height - 100), true));
    }
    for (let i = 0; i < 100; i++) {
        snowflakes.push(new Snowflake());
    }
}
// Animationsschleife
function animate() {
    ctx.putImageData(backgroundImage, 0, 0);
    // Schneeflocken zeichnen
    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });
    // Vögel zeichnen
    birds.forEach(bird => {
        bird.update();
        bird.draw();
    });
    requestAnimationFrame(animate);
}
// Event: Fenstergröße ändern
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground();
    initializeScene();
});
// Starten
drawBackground();
initializeScene();
animate();
//# sourceMappingURL=script.js.map