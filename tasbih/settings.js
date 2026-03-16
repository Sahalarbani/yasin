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

// Logika Slider Warna (Hue Slider)
function updateHue(val) {
  savedHue = val;
  localStorage.setItem("accentHue", val);
  document.documentElement.style.setProperty('--accent-color', `hsl(${val}, 100%, 50%)`);
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