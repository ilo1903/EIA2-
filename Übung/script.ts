const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

if (!ctx) {
    throw new Error('Context konnte nicht initialisiert werden.');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ** Hilfsfunktion für Zufallszahlen **
const random = (min: number, max: number): number => Math.random() * (max - min) + min;

// ** Hintergrund mit Farbverlauf **
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Himmelblau
    gradient.addColorStop(1, '#f0f8ff'); // Schneeweiß
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ** Zeichnet den Baum **
function drawTree(x: number, y: number) {
    ctx.fillStyle = '#8B4513'; 
    ctx.fillRect(x - 25, y, 50, 200);

    ctx.beginPath();
    ctx.moveTo(x - 100, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x, y - 200);
    ctx.closePath();
    ctx.fillStyle = 'green'; 
    ctx.fill();
}

// ** Zeichnet das Vogelhäuschen auf dem Boden **
function drawBirdhouse(x: number, y: number) {
    ctx.fillStyle = '#A0522D'; 
    ctx.fillRect(x, y, 80, 100);

    // Dach
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y - 40);
    ctx.lineTo(x + 80, y);
    ctx.closePath();
    ctx.fillStyle = '#8B0000'; 
    ctx.fill();

    // Eingang
    ctx.beginPath();
    ctx.arc(x + 40, y + 40, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();

    // Holzsockel
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 30, y + 100, 20, 50);
}

// ** Zeichnet den Schneemann **
function drawSnowman(x: number, y: number) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y - 55, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y - 100, 20, 0, Math.PI * 2);
    ctx.fill();

    // Augen
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - 7, y - 105, 3, 0, Math.PI * 2);
    ctx.arc(x + 7, y - 105, 3, 0, Math.PI * 2);
    ctx.fill();

    // Mund
    ctx.beginPath();
    ctx.arc(x, y - 95, 10, 0, Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Karottennase
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(x, y - 100);
    ctx.lineTo(x + 20, y - 97);
    ctx.lineTo(x, y - 95);
    ctx.closePath();
    ctx.fill();
}

// ** Zeichnet Vögel **
function drawBird(x: number, y: number) {
    ctx.fillStyle = `hsl(${random(0, 360)}, 70%, 50%)`;
    
    // Körper
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Flügel
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(x - 10, y, 10, 6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Auge
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + 5, y - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Schnabel
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 20, y - 5);
    ctx.lineTo(x + 10, y + 5);
    ctx.closePath();
    ctx.fill();
}


// ** Zeichnet den Schnee **
function drawSnowflakes() {
    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(random(0, canvas.width), random(0, canvas.height - 200), random(2, 5), 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

// ** Hauptfunktion zur Erstellung der Szene **
function drawScene() {
    drawBackground();
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    drawTree(150, canvas.height - 300);
    drawBirdhouse(500, canvas.height - 250);
    drawSnowman(canvas.width / 2, canvas.height - 120);

    for (let i = 0; i < 20; i++) {
        drawBird(random(0, canvas.width), random(50, canvas.height - 200));
    }

    drawSnowflakes();
}

// Passt die Canvas-Größe an, wenn das Fenster geändert wird
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawScene();
});

// Zeichnet die Szene beim Laden
drawScene();






