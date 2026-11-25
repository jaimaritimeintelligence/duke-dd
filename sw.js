const CACHE='fduke-dd2026-v2.0.1';
const SHELL=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','duke.jpg','ship1.jpg','ship3.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>{}))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(u.pathname.endsWith('config.js')){e.respondWith(fetch(e.request).then(res=>{const cl=res.clone();caches.open(CACHE).then(c=>c.put('config.js',cl));return res}).catch(()=>caches.match('config.js')));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&/\.(jpg|png)$/.test(u.pathname)){const cl=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cl))}return res}).catch(()=>caches.match('index.html'))))});
