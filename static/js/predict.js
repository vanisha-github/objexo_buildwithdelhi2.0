// === Show uploaded image preview ===
function previewImage(event) {
  const preview = document.getElementById('imagePreview');
  preview.style.backgroundImage = `url(${URL.createObjectURL(event.target.files[0])})`;
  preview.classList.remove('hidden');
  preview.classList.add('active'); // smooth expand height
}

// === Animate result counts ===
function animateCounts() {
  const counts = document.querySelectorAll('.count');
  counts.forEach(countEl => {
    const target = +countEl.dataset.count;
    let current = 0;
    const increment = target > 10 ? 2 : 1;
    const timer = setInterval(() => {
      current += increment;
      countEl.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 100);
  });
}

// === Show results section ===
function showResults() {
  const results = document.getElementById('results');
  results.classList.remove('hidden');
  animateCounts();
  // Allow user to scroll freely (no auto-scroll)
}

// === Parallax Glow Movement ===
document.addEventListener('mousemove', (e) => {
  const glowLayer = document.querySelector('.glow-layer');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  glowLayer.style.transform = `translate(${x}px, ${y}px)`;
});

// === Meteor Animation ===
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');

  // Random starting position (offscreen left/right)
  const startX = Math.random() < 0.5 ? -50 : window.innerWidth + 50;
  const startY = Math.random() * window.innerHeight * 0.3;

  // Random end point diagonally offscreen
  const endX = Math.random() < 0.5 ? window.innerWidth + 200 : -200;
  const endY = window.innerHeight + 200;

  // Random angle tilt
  const angle = Math.random() * 60 - 30;

  // Random duration (speed)
  const duration = 2 + Math.random() * 2; // 2–4 seconds

  // Pass CSS vars
  meteor.style.setProperty('--startX', `${startX}px`);
  meteor.style.setProperty('--startY', `${startY}px`);
  meteor.style.setProperty('--endX', `${endX}px`);
  meteor.style.setProperty('--endY', `${endY}px`);
  meteor.style.setProperty('--angle', `${angle}deg`);
  meteor.style.setProperty('--duration', `${duration}s`);

  document.body.appendChild(meteor);
  setTimeout(() => meteor.remove(), duration * 1000);
}

// Spawn meteors periodically
setInterval(() => {
  if (Math.random() > 0.3) createMeteor();
}, 3000);
