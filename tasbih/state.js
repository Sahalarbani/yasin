// ====== STATE & DATA JSON ======
let count = parseInt(localStorage.getItem("count")) || 0;
let target = parseInt(localStorage.getItem("target")) || 33;

// Database 2 Lapis
let recentHistory = JSON.parse(localStorage.getItem("recentHistory")) || []; // Lapis 1 (Layar)
let fullHistory = JSON.parse(localStorage.getItem("fullHistory")) || []; // Lapis 2 (JSON)

let currentModeName = localStorage.getItem("modeName") || "Subhanallah";
let lastActivePill = null;

// ====== PENGATURAN ======
let isSoundOn = localStorage.getItem("isSoundOn") === "false" ? false : true; 
let isVibrate = localStorage.getItem("isVibrate") === "false" ? false : true;
let isNightMode = localStorage.getItem("isNightMode") === "false" ? false : true;
let savedHue = localStorage.getItem("accentHue") || "210";
let isZenMode = false;
let isLocked = false; 

// ====== SAMBUNGAN KE HTML (DOM) ======
const countEl = document.getElementById("count");
const progressRing = document.getElementById("progressRing");
const targetDisplay = document.getElementById("targetDisplay");
const sound = document.getElementById("clickSound");
const toast = document.getElementById("toastNotif");
const customInput = document.getElementById("customInput");
const customNameInput = document.getElementById("customNameInput");
const recentHistoryList = document.getElementById("recentHistoryList");
const fullHistoryList = document.getElementById("fullHistoryList");

