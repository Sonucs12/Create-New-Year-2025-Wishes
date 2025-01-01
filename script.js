document.getElementById('showMessage').addEventListener('click', function() {
    const message = document.getElementById('hiddenMessage');
    message.classList.toggle('d-none');
});

// Add bouncing emojis
const emojis = document.querySelectorAll('.emoji-grid span');
emojis.forEach((emoji, index) => {
    emoji.style.position = 'relative';
    setInterval(() => {
        emoji.style.transform = `translateY(${Math.sin(Date.now() / 500 + index) * 10}px)`;
    }, 100);
});

// Fireworks effect
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Function to set canvas dimensions
function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Set initial canvas dimensions
setCanvasDimensions();

// Update canvas dimensions on window resize
window.addEventListener('resize', setCanvasDimensions);

let fireworks = [];

class Firework {
    constructor(x, y, colors) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.size = Math.random() * 5 + 2;
        this.opacity = 1;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = Math.random() * -8 - 2;
        this.gravity = 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.size -= 0.01;
        this.opacity -= 0.01;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.colors}, ${this.opacity})`;
        ctx.fill();
    }
}

function createFireworks() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height; 
        const colors = `${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}`;
        fireworks.push(new Firework(x, y, colors));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.size <= 0 || firework.opacity <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

function startFireworks() {
    createFireworks();
}

// Continuous fireworks on load
function startContinuousFireworks() {
    setInterval(() => {
        createFireworks();
    }, 600); 
    animate();
}

// Trigger fireworks on button click
document.getElementById('generateFireworks').addEventListener('click', startFireworks);

// Trigger continuous fireworks on page load
window.addEventListener('load', startContinuousFireworks);

// Set body background to dark
const body = document.querySelector('body');
body.style.backgroundColor = '#000';
body.style.color = '#fff';