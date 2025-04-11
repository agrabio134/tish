// Burger Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
    document.querySelector('.line1').classList.toggle('line1-toggle');
    document.querySelector('.line2').classList.toggle('line2-toggle');
    document.querySelector('.line3').classList.toggle('line3-toggle');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        document.querySelector('.line1').classList.remove('line1-toggle');
        document.querySelector('.line2').classList.remove('line2-toggle');
        document.querySelector('.line3').classList.remove('line3-toggle');
    });
});

// News Ticker Pause on Hover
const ticker = document.querySelector('.ticker');
ticker.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
});
ticker.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-slide-in, .animate-pop, .animate-pulse, .animate-wiggle');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.style.opacity = '1';
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Trigger on load


// Bubble Trail Effect
const canvas = document.getElementById('bubble-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const bubbles = [];

document.addEventListener('mousemove', (e) => {
    // Create a new bubble at the cursor position
    const bubble = {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 5, // Random size between 5 and 15
        opacity: 0.8,
        life: 1, // Life of the bubble (0 to 1)
    };
    bubbles.push(bubble);

    // Limit the number of bubbles to prevent performance issues
    if (bubbles.length > 50) {
        bubbles.shift();
    }
});

// Animate the bubbles
function animateBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble, index) => {
        // Update bubble properties
        bubble.y -= 1; // Move upward
        bubble.life -= 0.02; // Fade out over time
        bubble.opacity = bubble.life * 0.8;

        // Remove bubble if its life is over
        if (bubble.life <= 0) {
            bubbles.splice(index, 1);
            return;
        }

        // Draw the bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animateBubbles);
}

animateBubbles();

// Audio Toggle
const audio = document.getElementById('background-audio');
const audioToggleBtn = document.getElementById('audio-toggle');

// Check if audio is supported and playable
audio.addEventListener('canplay', () => {
    audio.play().catch(err => {
        console.log('Autoplay failed:', err);
        audioToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});

audioToggleBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audioToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i> ';
    } else {
        audio.pause();
        audioToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});