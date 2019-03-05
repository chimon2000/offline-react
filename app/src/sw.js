if (!workbox) {
    console.log('Not loaded')
} else {
    workbox.setConfig({ debug: true })
    workbox.core.skipWaiting()
    workbox.core.clientsClaim()
    workbox.precaching.precacheAndRoute(self.__precacheManifest)

    registerBackgroundSync()
}

function registerBackgroundSync() {
    const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
    })

    const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
    })

    workbox.routing.registerRoute(/\/api\/add/, networkWithBackgroundSync, 'POST')
}

function registerCustomBackgroundSync() {
    const onSync = async ({ queue }) => {
        let entry

        while ((entry = await queue.shiftRequest())) {
            try {
                const response = await fetch(entry.request.clone())

                if ([504, 500].includes(response.status)) {
                    throw new Error('queue-replay-failed', { name: this._name })
                }

                console.log(`Request for '${entry.request.url}'` + `has been replayed in queue '${queue._name}'`)
            } catch (error) {
                await queue.unshiftRequest(entry)

                console.log(
                    `Request for '${entry.request.url}'` + `failed to replay, putting it back in queue '${queue._name}'`
                )
                throw new Error('queue-replay-failed', { name: this._name })
            }
        }
        console.log(`All requests in queue '${queue.name}' have successfully ` + `replayed; the queue is now empty!`)
    }
    const queue = new workbox.backgroundSync.Queue('myQueueName', { maxRetentionTime: 24 * 60, onSync: onSync })
    const backgroundSyncHandler = async ({ event }) => {
        try {
            const response = await fetch(event.request.clone())
            if ([504, 500].includes(response.status)) {
                throw new Error('Cannot reach server')
            }
            return response
        } catch (error) {
            console.error(error)
            return queue.pushRequest({ request: event.request })
        }
    }

    workbox.routing.registerRoute(/\/api\/add/, backgroundSyncHandler, 'POST')
}
