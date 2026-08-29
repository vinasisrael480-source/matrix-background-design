const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Baybayin/Alibata characters
// ᜀ ᜁ ᜂ ᜃ ᜄ ᜅ ᜆ ᜇ ᜈ ᜉ ᜊ ᜋ ᜌ ᜍ ᜎ ᜏ
// ᜐ ᜑ ᜒ ᜓ ᜔ ᜕ ᜖ ᜗ ᜘ ᜙ ᜚ ᜛
const baybayin = 'ᜀᜁᜂᜃᜄᜅᜆᜇᜈᜉᜊᜋᜌᜍᜎᜏᜐᜑᜒᜓ᜔᜕᜖᜗᜘᜙᜚᜛';

const fontSize = 24;
const columns = Math.floor(canvas.width / fontSize);

// Array to track y position of each column
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
}

// Light blue color palette
const colors = [
    '#00d4ff', // Bright cyan
    '#0099cc', // Medium blue
    '#00a3cc', // Sea blue
    '#006699', // Dark cyan
    '#00ffff', // Electric cyan
    '#00ccff', // Sky blue
];

function draw() {
    // Create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Baybayin characters
    for (let i = 0; i < drops.length; i++) {
        // Random Baybayin character
        const char = baybayin[Math.floor(Math.random() * baybayin.length)];
        
        // Random color from blue palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styling
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px 'Arial Unicode MS', serif`;
        ctx.textAlign = 'center';
        ctx.globalAlpha = Math.random() * 0.7 + 0.3;
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i]);
        
        // Reset opacity
        ctx.globalAlpha = 1;
        
        // Random y increment
        drops[i] += fontSize * (Math.random() * 2 + 1);
        
        // Reset if falls off screen
        if (drops[i] > canvas.height) {
            drops[i] = -fontSize;
        }
    }

    // Add glow effect occasionally
    if (Math.random() > 0.95) {
        const randomCol = Math.floor(Math.random() * columns);
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#00ffff';
        ctx.font = `bold ${fontSize}px 'Arial Unicode MS', serif`;
        ctx.fillText(baybayin[Math.floor(Math.random() * baybayin.length)], randomCol * fontSize, drops[randomCol]);
        ctx.shadowBlur = 0;
    }
}

// Animation loop
function animate() {
    draw();
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
animate();
