const CACHE_VERSION = 'joao-dev-assets-v1'
const CACHEABLE_DESTINATIONS = new Set(['video', 'image', 'font', 'script', 'style'])

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('joao-dev-') && key !== CACHE_VERSION)
        .map((key) => caches.delete(key)),
    )).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || request.headers.has('range')) return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(request).then((response) => response || Response.error())),
    )
    return
  }

  if (!CACHEABLE_DESTINATIONS.has(request.destination)) return

  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(request)
      if (cached) return cached

      const response = await fetch(request)
      if (response.ok) await cache.put(request, response.clone())
      return response
    }),
  )
})
