function openModal(modalId) { document.getElementById(modalId).classList.add("show"); }
function closeModal(modalId) { document.getElementById(modalId).classList.remove("show"); }

function openFullHistory() {
  closeModal('settingsModal');
  renderFullHistory();
  openModal('fullHistoryModal');
}

function updateSwitchUI(id, state) {
  const sw = document.getElementById(id);
  if(state) sw.classList.add("active"); else sw.classList.remove("active");
}

// ===== HELPER: Konversi HEX ↔ HUE =====
function hexToHue(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 30;
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60);
  }
  return h;
}

function hueToHex(hue) {
  const h = hue / 360;
  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = 0.5 < 0.5 ? 0.5 * (1 + 1) : 0.5 + 0.5 - 0.5 * 0.5;
  const p = 2 * 0.5 - q;
  const r = hueToRgb(p, q, h + 1/3);
  const g = hueToRgb(p, q, h);
  const b = hueToRgb(p, q, h - 1/3);
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

// Logika Slider Warna (Hue Slider)
function updateHue(val) {
  savedHue = val;
  localStorage.setItem("accentHue", val);
  localStorage.setItem("appAccentColor", hueToHex(val));
  document.documentElement.style.setProperty('--accent-color', `hsl(${val}, 100%, 50%)`);
  // Push ke parent (index.html) agar halaman lain ikut berubah
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'SYNC_COLOR', colorHex: hueToHex(val) }, '*');
  }
  updateDisplay(); // trigger animasi
}

function toggleThemeSetting() {
  isNightMode = !isNightMode; localStorage.setItem("isNightMode", isNightMode);
  if(isNightMode) document.body.classList.add("night"); else document.body.classList.remove("night");
  updateSwitchUI("sw-theme", isNightMode); updateDisplay(); 
}

function toggleSoundSetting() { 
  isSoundOn = !isSoundOn; localStorage.setItem("isSoundOn", isSoundOn); updateSwitchUI("sw-sound", isSoundOn); 
}
function toggleVibrateSetting() { 
  isVibrate = !isVibrate; localStorage.setItem("isVibrate", isVibrate); updateSwitchUI("sw-vibrate", isVibrate); 
}
function toggleZenSetting() {
  isZenMode = !isZenMode; updateSwitchUI("sw-zen", isZenMode);
  if(isZenMode) { document.body.classList.add("zen-active"); closeModal("settingsModal"); } 
  else { document.body.classList.remove("zen-active"); }
}