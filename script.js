/* ── Background hearts ── */
const emojis = ['💕','💗','💖','🌸','✨','🩷','💝','🌷','💓','⭐'];
const bgHearts = document.getElementById('bgHearts');

for (let i = 0; i < 22; i++) {
  const el = document.createElement('div');
  el.className = 'bg-heart';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + '%';
  el.style.animationDuration = (7 + Math.random() * 10) + 's';
  el.style.animationDelay = (Math.random() * 12) + 's';
  bgHearts.appendChild(el);
}

/* ── Heart tap counter ── */
let count = parseInt(localStorage.getItem('loveCount') || '0');
const counterEl = document.getElementById('counter');
const heartIcon = document.getElementById('heartIcon');
const heartEmojis = ['🩷','💕','💖','💗','💝','❤️'];

function updateCounter() {
  counterEl.textContent = count;
  counterEl.classList.add('bump');
  setTimeout(() => counterEl.classList.remove('bump'), 200);
  heartIcon.textContent = heartEmojis[count % heartEmojis.length];
  localStorage.setItem('loveCount', count);
}

function tapHeart(e) {
  count++;
  updateCounter();
  spawnParticles(e.clientX, e.clientY);
  if (count > 0 && count % 10 === 0) {
    openModal('🎉', 'Wow ' + count + ' kali!', 'Kamu ketuk ' + count + ' kali — itu tandanya kamu sayang banget sama aku! 💕');
  }
}

function spawnParticles(x, y) {
  const parts = ['💕','💗','🌸','✨','💖','🩷'];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = parts[Math.floor(Math.random() * parts.length)];
    const angle = (Math.PI * 2 / 6) * i + Math.random() * .4;
    const dist = 60 + Math.random() * 60;
    p.style.left = x + 'px';
    p.style.top  = y + 'px';
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }
}

/* ── Messages ── */
const messages = [
  "Kamu adalah bagian terbaik dari hariku. Saat kamu ada di sini, dunia terasa lebih berwarna 🌈",
  "Aku bersyukur banget bisa kenal sama kamu. Kamu spesial dan selalu ada di hatiku 💖",
  "Setiap detik bersamamu adalah momen yang selalu ingin aku ingat selamanya 🌸",
  "Kamu bikin hatiku hangat hanya dengan senyumanmu yang manis itu ✨",
  "Kalau cinta itu warna, kamu adalah semua warna yang paling indah 🎨💕",
  "Aku tidak butuh bintang di langit, karena kamu sudah lebih bersinar dari semuanya ⭐",
  "Terima kasih sudah jadi orang yang selalu bikin aku pengen jadi lebih baik 💝",
  "Hari-hariku menjadi cerita yang lebih indah sejak kamu hadir di hidupku 🌷",
];
let lastMsg = -1;

function showMessage() {
  let idx;
  do { idx = Math.floor(Math.random() * messages.length); } while (idx === lastMsg);
  lastMsg = idx;
  const el = document.getElementById('msgText');
  el.style.opacity = 0;
  setTimeout(() => { el.textContent = messages[idx]; el.style.opacity = 1; }, 300);
}

/* ── Reasons ── */
function toggleReason(el) {
  el.classList.toggle('lit');
  if (el.classList.contains('lit')) {
    spawnParticles(
      el.getBoundingClientRect().left + el.offsetWidth / 2,
      el.getBoundingClientRect().top + el.offsetHeight / 2
    );
  }
  const litCount = document.querySelectorAll('.reason-item.lit').length;
  if (litCount === 6) {
    openModal('🏆', 'Semua Alasan Terpilih!', 'Terima kasih sudah tahu betapa berharganya kamu bagiku! Semua alasan itu benar-benar dari hati 💖');
  }
}

/* ── Love Meter ── */
let meterVal = 0;
const meterBar = document.getElementById('meterBar');
const meterLabel = document.getElementById('meterLabel');

function chargeMeter() {
  meterVal = Math.min(100, meterVal + Math.floor(10 + Math.random() * 20));
  meterBar.style.width = meterVal + '%';
  meterLabel.textContent = meterVal + '%';
  if (meterVal >= 100) {
    meterVal = 100;
    openModal('💯', 'Cinta Penuh!', 'Cintaku untukmu sudah terisi penuh — dan sebenarnya tidak ada batas untuk rasa sayangku! 💕♾️');
  }
}

/* ── Modal ── */
function openModal(icon, title, text) {
  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

/* ── Init ── */
updateCounter();
counterEl.classList.remove('bump');
