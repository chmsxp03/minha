const C='dalilak-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
// ملفات ocr/ كبيرة: من الذاكرة أولًا. بقية الملفات: الشبكة أولًا ثم الذاكرة (ليصل أي تحديث).
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
const keep=x=>{if(x.status===200){const y=x.clone();caches.open(C).then(c=>c.put(r,y)).catch(()=>{})}return x};
e.respondWith(r.url.includes('/ocr/')?caches.match(r).then(m=>m||fetch(r).then(keep)):fetch(r).then(keep).catch(()=>caches.match(r)))});
