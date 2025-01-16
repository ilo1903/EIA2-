// Zugriff auf das Canvas-Element
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/**
 * Superklasse für alle beweglichen Objekte.
 */
abstract class MovableObject {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Aktualisiert die Position des Objekts (in Unterklassen spezifiziert).
     */
    abstract update(): void;

    /**
     * Zeichnet das Objekt auf dem Canvas (in Unterklassen spezifiziert).
     */
    abstract draw(): void;
}

/**
 * Klasse für Schneeflocken.
 */
class Snowflake extends MovableObject {
    radius: number;
    speed: number;

    constructor() {
        super(Math.random() * canvas.width, Math.random() * canvas.height); // Zufällige Startposition
        this.radius = Math.random() * 2 + 1; // Zufällige Größe
        this.speed = Math.random() * 2 + 1; // Zufällige Geschwindigkeit
    }

    update() {
        this.y += this.speed; // Bewegung nach unten
        if (this.y > canvas.height) {
            this.y = 0; // Neustart oben
            this.x = Math.random() * canvas.width; // Neue zufällige X-Position
        }
    }

    draw() {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

/**
 * Klasse für Vögel.
 */
class Bird extends MovableObject {
    speedX: number;
    speedY: number;
    color: string;

    constructor() {
        super(Math.random() * canvas.width, Math.random() * canvas.height); // Zufällige Startposition
        this.speedX = Math.random() * 2 - 1; // Zufällige Bewegung in X-Richtung
        this.speedY = Math.random() * 2 - 1; // Zufällige Bewegung in Y-Richtung

        // Zufällige Farben für die Vögel
        const colors = ["#ff4500", "#1e90ff", "#32cd32", "#ffd700", "#000000"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX; // Bewegung in X-Richtung
        this.y += this.speedY; // Bewegung in Y-Richtung

        // Begrenzung: Vogel prallt am Rand ab
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;

        // Körper des Vogels
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Kopf des Vogels
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y - 5, 5, 0, Math.PI * 2);
        ctx.fill();

        // Schnabel
        ctx.fillStyle = "#ffa500";
        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y - 5);
        ctx.lineTo(this.x + 20, this.y);
        ctx.lineTo(this.x + 15, this.y + 5);
        ctx.fill();
    }
}

/**
 * Zeichnet den statischen Hintergrund.
 */
function drawBackground() {
    // Himmel
    ctx.fillStyle = "#cce7ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sonne
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fill();

    // Berge
    ctx.fillStyle = "#c0c0c0";
    ctx.beginPath();
    ctx.moveTo(200, canvas.height);
    ctx.lineTo(400, 300);
    ctx.lineTo(600, canvas.height);
    ctx.closePath();
    ctx.fill();

    // Baum
    drawTree(150, canvas.height - 200, 80, 150);

    // Schneemann
    drawSnowman(300, canvas.height - 100);

    // Vogelhaus
    drawBirdhouse(600, canvas.height - 150);
}

/**
 * Zeichnet einen Baum mit einer Krone direkt auf dem Stamm.
 */
function drawTree(x: number, y: number, width: number, height: number) {
    // Stamm
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(x + width / 3, y - height / 3, width / 3, height / 3);

    // Krone
    const crownLevels = 3;
    const crownHeight = (2 * height) / 3;
    const layerHeight = crownHeight / crownLevels;

    for (let i = 0; i < crownLevels; i++) {
        const layerY = y - height / 3 - (i + 1) * layerHeight;
        const layerWidth = width + (crownLevels - i) * 20;

        ctx.fillStyle = "#228b22";
        ctx.beginPath();
        ctx.moveTo(x + width / 2 - layerWidth / 2, layerY);
        ctx.lineTo(x + width / 2, layerY - layerHeight);
        ctx.lineTo(x + width / 2 + layerWidth / 2, layerY);
        ctx.closePath();
        ctx.fill();
    }
}

/**
 * Zeichnet einen Schneemann.
 */
function drawSnowman(x: number, y: number) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.arc(x, y - 60, 30, 0, Math.PI * 2);
    ctx.arc(x, y - 100, 20, 0, Math.PI * 2);
    ctx.fill();

    // Augen
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x - 10, y - 110, 3, 0, Math.PI * 2);
    ctx.arc(x + 10, y - 110, 3, 0, Math.PI * 2);
    ctx.fill();

    // Nase
    ctx.fillStyle = "#ffa500";
    ctx.beginPath();
    ctx.moveTo(x, y - 100);
    ctx.lineTo(x + 10, y - 100);
    ctx.lineTo(x, y - 95);
    ctx.fill();
}

/**
 * Zeichnet ein Vogelhaus auf einem Holzbalken.
 */
function drawBirdhouse(x: number, y: number) {
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(x + 30, y, 20, 100);

    ctx.fillStyle = "#8b4513";
    ctx.fillRect(x, y - 100, 80, 100);

    ctx.fillStyle = "#d2691e";
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 100);
    ctx.lineTo(x + 40, y - 140);
    ctx.lineTo(x + 90, y - 100);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x + 40, y - 50, 15, 0, Math.PI * 2);
    ctx.fill();
}

// Bewegliche Objekte in einem Array
const movableObjects: MovableObject[] = [];

// Schneeflocken hinzufügen
for (let i = 0; i < 100; i++) {
    movableObjects.push(new Snowflake());
}

// Vögel hinzufügen
for (let i = 0; i < 20; i++) {
    movableObjects.push(new Bird());
}

/**
 * Animationsschleife.
 */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    movableObjects.forEach((object) => {
        object.update();
        object.draw();
    });

    requestAnimationFrame(animate);
}

// Animation starten
animate();