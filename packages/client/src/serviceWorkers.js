const staticAssets = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/images/avatar.jpeg',
  '/running-walk-icon.svg',
]

const STATIC_CACHE_NAME = 'static-data-v1'
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1'

self.addEventListener('install', async () => {
  const cache = await caches.open(STATIC_CACHE_NAME)
  console.log('install')
  cache.addAll(staticAssets)
})

self.addEventListener('activate', e => {
  console.log('activate')
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  const { request } = event
  event.respondWith(cacheData(request))
})

async function cacheData(request) {
  const cashedRequest = await caches.match(request)
  return cashedRequest || networkFirst(request)
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    return await cache.match(request)
  }
}
