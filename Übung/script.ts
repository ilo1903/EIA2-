const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Zufallszahlen generieren
const random = (min: number, max: number): number => Math.random() * (max - min) + min;

// Hintergrund-Bild speichern
let backgroundImage: ImageData;

// Statische Elemente zeichnen
function drawStaticElements() {
    // Himmel und Boden
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#f0f8ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Baum, Vogelhäuschen und Schneemann
    drawTree(150, canvas.height - 300);
    drawBirdhouse(500, canvas.height - 250);
    drawSnowman(canvas.width / 2, canvas.height - 120);

    // Hintergrund speichern
    backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Baum zeichnen
function drawTree(x: number, y: number) {
    ctx.fillStyle = '#8B4513'; // Stamm
    ctx.fillRect(x - 25, y, 50, 200);

    ctx.fillStyle = 'green'; // Blätter
    ctx.beginPath();
    ctx.moveTo(x - 100, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x, y - 200);
    ctx.closePath();
    ctx.fill();
}

// Vogelhäuschen zeichnen
function drawBirdhouse(x: number, y: number) {
    ctx.fillStyle = '#A0522D'; // Häuschen
    ctx.fillRect(x, y, 80, 100);

    ctx.fillStyle = '#8B0000'; // Dach
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y - 40);
    ctx.lineTo(x + 80, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'black'; // Eingang
    ctx.beginPath();
    ctx.arc(x + 40, y + 40, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8B4513'; // Sockel
    ctx.fillRect(x + 30, y + 100, 20, 50);
}

// Schneemann zeichnen
function drawSnowman(x: number, y: number) {
    ctx.fillStyle = 'white'; // Körper
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 55, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 100, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'black'; // Augen
    ctx.beginPath();
    ctx.arc(x - 7, y - 105, 3, 0, Math.PI * 2);
    ctx.arc(x + 7, y - 105, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'black'; // Mund
    ctx.beginPath();
    ctx.arc(x, y - 95, 10, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = 'orange'; // Nase
    ctx.beginPath();
    ctx.moveTo(x, y - 100);
    ctx.lineTo(x + 20, y - 97);
    ctx.lineTo(x, y - 95);
    ctx.closePath();
    ctx.fill();
}

// Klasse für Schneeflocken
class Snowflake {
    x: number;
    y: number;
    size: number;
    speed: number;

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

// Klasse für Vögel
class Bird {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height - 100);
        this.speedX = random(-2, 2);
        this.speedY = random(-1, 1);
        this.color = `hsl(${random(0, 360)}, 70%, 50%)`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height - 100) this.y = 0;
        if (this.y < 0) this.y = canvas.height - 100;
    }
}

// Animationselemente
const snowflakes: Snowflake[] = [];
const birds: Bird[] = [];

// Initialisiere Elemente
for (let i = 0; i < 100; i++) snowflakes.push(new Snowflake());
for (let i = 0; i < 10; i++) birds.push(new Bird());

// Animation starten
function animate() {
    ctx.putImageData(backgroundImage, 0, 0);

    // Schneeflocken aktualisieren
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });

    // Vögel aktualisieren
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
    drawStaticElements();
});

// Initialisierung
drawStaticElements();
animate();