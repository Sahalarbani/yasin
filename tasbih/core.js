function triggerFeedback(isTargetReached) {
  if (isSoundOn) { sound.currentTime = 0; sound.play().catch(e=>{}); }
  if (isVibrate && typeof AndroidBridge !== "undefined") {
    try { if (isTargetReached) AndroidBridge.vibrateTargetReached(); else AndroidBridge.vibrateDevice(); } 
    catch (e) { console.log("Bridge error"); }
  }
}

// === MESIN HISTORY 2 LAPIS ===
function saveToHistory(amount, mode) {
  const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  const entry = { amount: amount, mode: mode, time: timeStr };
  
  // 1. Masukin ke layar utama dulu
  recentHistory.unshift(entry); 
  
  // 2. Kalau lebih dari 5, dorong yang paling lama ke Database JSON
  if (recentHistory.length > 5) {
    const movedItem = recentHistory.pop(); 
    fullHistory.unshift(movedItem); 
    localStorage.setItem("fullHistory", JSON.stringify(fullHistory));
  }
  
  localStorage.setItem("recentHistory", JSON.stringify(recentHistory)); 
  updateRecentHistoryUI();
}

// 3. Tombol "Bersihkan" di layar utama (Transfer Lapis 1 ke Lapis 2)
function clearRecentHistory() {
  if (recentHistory.length > 0) {
    // Pindahkan urut dari yang terlama biar database JSON-nya rapi
    for (let i = recentHistory.length - 1; i >= 0; i--) {
        fullHistory.unshift(recentHistory[i]);
    }
    recentHistory = [];
    localStorage.setItem("recentHistory", JSON.stringify(recentHistory));
    localStorage.setItem("fullHistory", JSON.stringify(fullHistory));
    updateRecentHistoryUI();
    showToast("Dipindah ke Database JSON.");
  }
}

// 4. FIX BUG: Tombol Hapus di Database JSON
function clearAllHistory() { 
  // Hapus konfirmasi bawaan WebView karena sering error, ganti hapus langsung
  fullHistory = []; 
  localStorage.removeItem("fullHistory"); 
  renderFullHistory();
  showToast("Database JSON Bersih!");
}

function incrementCount() {
  count++;
  if (count >= target) {
    triggerFeedback(true); showToast(`Target ${target} Tercapai!`);
    saveToHistory(count, currentModeName); count = 0; 
  } else { triggerFeedback(false); }
  
  localStorage.setItem("count", count); updateDisplay();
}

function manualReset() {
  if (count > 0) saveToHistory(count, currentModeName + " (Manual)"); 
  count = 0; localStorage.setItem("count", count); updateDisplay();
}

function openCustomModal(element) { 
  lastActivePill = element; customInput.value = target; customNameInput.value = ""; 
  openModal('customModal'); 
}

function saveCustomTarget() {
  let val = parseInt(customInput.value);
  let customName = customNameInput.value.trim() || "Custom";
  
  if (val > 0) {
    target = val; currentModeName = customName; count = 0; 
    localStorage.setItem("target", target); localStorage.setItem("count", count); localStorage.setItem("modeName", currentModeName);
    
    document.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
    if(lastActivePill) {
      lastActivePill.classList.add('active');
      lastActivePill.innerText = `${customName} (${val})`; 
    }
    updateDisplay(); closeModal('customModal');
  }
}

function setMode(name, newTarget, element) {
  target = newTarget; currentModeName = name; count = 0; 
  localStorage.setItem("target", target); localStorage.setItem("count", count); localStorage.setItem("modeName", currentModeName);
  
  document.querySelectorAll('.preset-pill').forEach(p => {
    p.classList.remove('active');
    if(p.innerText.includes("Subhanallah")) p.innerText = "Subhanallah (33)";
    if(p.innerText.includes("Alhamdulillah")) p.innerText = "Alhamdulillah (33)";
    if(p.innerText.includes("Allahu Akbar")) p.innerText = "Allahu Akbar (34)";
    if(p.innerText.includes("Custom")) p.innerText = "Atur Custom...";
  });
  
  element.classList.add('active'); updateDisplay();
}

function init() {
  if(isNightMode) document.body.classList.add("night"); else document.body.classList.remove("night");
  document.documentElement.style.setProperty('--accent-color', `hsl(${savedHue}, 100%, 50%)`);
  document.getElementById("hueSlider").value = savedHue;
  
  updateSwitchUI("sw-theme", isNightMode);
  updateSwitchUI("sw-sound", isSoundOn);
  updateSwitchUI("sw-vibrate", isVibrate);
  
  document.querySelectorAll('.preset-pill').forEach(p => {
    if(p.innerText.includes(currentModeName.split(" ")[0])) { 
      document.querySelectorAll('.preset-pill').forEach(pill => pill.classList.remove('active'));
      p.classList.add('active');
      if(currentModeName !== "Subhanallah" && currentModeName !== "Alhamdulillah" && currentModeName !== "Allahu Akbar") {
         p.innerText = `${currentModeName} (${target})`;
      }
    }
  });
  
  updateDisplay();
  updateRecentHistoryUI(); // Render layar awal
}

init();
setInterval(updateTime, 1000);
updateTime();