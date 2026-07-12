// Ganti versi ini SETIAP KALI lu nge-push perubahan besar ke GitHub!
const CACHE_NAME = 'alquran-cache-v29';

// 1. PRE-CACHE: Daftarkan file statis UI, KECUALI mesin OTA Update
const urlsToCache = [
  '/',
  '/index.html',
  '/kalender.html',
  '/kalender-jawa.html',
  '/yasin-tahlil.html',
  '/doa-tahlil.html',
  '/tahlil.json',
  '/doa-tahlil.json',
  '/hadroh.json',
  '/tasbih/index.html',
  '/tasbih/style.css',
  '/tasbih/core.js',
  '/tasbih/settings.js',
  '/tasbih/state.js',
  '/tasbih/ui.js',
  '/tasbih/click.mp3'
];

self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache usang:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); 
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  // ROUTER 1: NETWORK-FIRST STRATEGY (Khusus OTA Engine)
  // Memastikan update.json dan update-modal selalu fresh dari server GitHub
  if (event.request.url.includes('update.json') || event.request.url.includes('update-modal.html')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // ROUTER 2: BYPASS CACHE (Khusus Audio Streaming Murottal)
  // Mencegah file MP3 raksasa menyesaki memori cache dan menyebabkan QuotaExceededError
  if (event.request.url.endsWith('.mp3') && !event.request.url.includes('tasbih/click.mp3')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ROUTER 3: STALE-WHILE-REVALIDATE (Khusus File UI & API Kalender/Jadwal)
  // Sangat cepat karena merender cache lokal, sambil narik data baru di background
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(err => {
        console.error('Network gagal, fallback murni ke cache', err);
      });
      
      return cachedResponse || fetchPromise;
    })
  );
});
