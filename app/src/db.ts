import { openDb } from 'idb'

const dbPromise = createIndexedDB()

function createIndexedDB() {
    if (!('indexedDB' in window)) {
        return null
    }
    return openDb('dashboardr', 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains('events')) {
            upgradeDb.createObjectStore('events', { keyPath: 'id' })
        }
    })
}
export async function saveEventDataLocally(events) {
    console.log('Adding events to idb', events)

    if (!('indexedDB' in window)) {
        return null
    }
    const db = await dbPromise
    const tx = db.transaction('events', 'readwrite')
    const store = tx.objectStore('events')

    await Promise.all(events.map(event => store.put(event))).catch(() => {
        tx.abort()
        throw Error('Events were not added to the store')
    })
}

export async function getLocalEventData() {
    if (!('indexedDB' in window)) {
        return null
    }
    const db = await dbPromise
    const tx = db.transaction('events', 'readonly')
    const store = tx.objectStore('events')

    return store.getAll()
}
