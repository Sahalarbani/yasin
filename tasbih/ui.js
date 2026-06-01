function updateTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("time").innerText = `${h}:${m}:${s}`;
}

function updateDisplay() {
  countEl.innerText = count;
  targetDisplay.innerText = "Target: " + target;
  document.getElementById("heroMode").innerText = currentModeName;
  document.getElementById("heroProgress").innerText = count + " dari " + target + " hitungan";
  let percentage = (count / target) * 100;
  if (percentage > 100) percentage = 100;
  progressRing.style.background = `conic-gradient(var(--accent-color) ${percentage}%, var(--progress-bg) ${percentage}%)`;
}

// Nampilin History Lapis 1 (Layar Utama)
function updateRecentHistoryUI() {
  recentHistoryList.innerHTML = "";
  recentHistory.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `<span>${item.amount}x <span class="hist-target">(${item.mode})</span></span> <span>${item.time}</span>`;
    recentHistoryList.appendChild(li);
  });
}

// Nampilin History Lapis 2 (Modal JSON)
function renderFullHistory() {
  fullHistoryList.innerHTML = "";
  if (fullHistory.length === 0) {
    fullHistoryList.innerHTML = "<li style='border:none; color:var(--text-sec);'>Database riwayat kosong.</li>";
    return;
  }
  fullHistory.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<span>${index + 1}. ${item.amount}x <span class="hist-target">(${item.mode})</span></span> <span>${item.time}</span>`;
    fullHistoryList.appendChild(li);
  });
}

function showToast(msg) {
  toast.innerText = msg; 
  toast.classList.add("show");
  setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

function toggleScreenLock() {
  isLocked = !isLocked;
  const lockBtn = document.getElementById("lockBtn");
  if (isLocked) {
    document.body.classList.add("locked");
    lockBtn.innerHTML = '<i class="bi bi-lock-fill"></i>';
    showToast("Layar Dikunci. Pakai Tombol Volume.");
  } else {
    document.body.classList.remove("locked");
    lockBtn.innerHTML = '<i class="bi bi-unlock-fill"></i>';
    showToast("Layar Dibuka.");
  }
}
