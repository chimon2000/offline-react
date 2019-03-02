importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js')

if (!workbox) {
    console.log('Not loaded')
} else {
    workbox.setConfig({ debug: true })
    workbox.core.skipWaiting()
    workbox.core.clientsClaim()

    workbox.precaching.precacheAndRoute([])

    workbox.precaching.precache([
        'src.f69400ca.js',
        'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs'
    ])

    const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
    })

    const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
    })

    workbox.routing.registerRoute(/\/api\/add/, networkWithBackgroundSync, 'POST')
}
