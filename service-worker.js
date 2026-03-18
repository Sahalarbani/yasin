// Ganti versi ini SETIAP KALI lu nge-push perubahan besar ke GitHub!
const CACHE_NAME = 'alquran-cache-v7';

// Daftarkan semua file yang wajib di-cache agar bisa offline dan fast-loading
const urlsToCache = [
  '/',
  '/index.html',
  '/tahlil.json',
  '/hadroh.json',
  '/update.json',
  '/update-modal.html',
  '/tasbih/index.html',
  '/tasbih/style.css',
  '/tasbih/core.js',
  '/tasbih/settings.js',
  '/tasbih/state.js',
  '/tasbih/ui.js',
  '/tasbih/click.mp3'
];

// 1. Fase Install: Sedot semua file dan paksa aktif
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. Fase Activate: Hapus Cache Sampah (INI YANG BIKIN APK GAK PERLU CLEAR DATA)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Kalau nama cache-nya beda sama CACHE_NAME yang baru, buang ke tong sampah!
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

// 3. Fase Fetch: Strategi Stale-While-Revalidate (Super Cepat + Selalu Update)
self.addEventListener('fetch', event => {
  // Hanya tangani request HTTP/HTTPS
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      
      // Eksekusi background fetch ke server GitHub
      const fetchPromise = fetch(event.request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(err => {
        console.error('Network gagal, menggunakan murni cache', err);
      });
      
      return cachedResponse || fetchPromise;
    })
  );
});
