import { openDB } from 'idb'

const dbPromise = createIndexedDB()

function createIndexedDB() {
  if (!('indexedDB' in window)) {
    return null
  }
  return openDB('dashboardr', 1, {
    upgrade(upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains('events')) {
        upgradeDb.createObjectStore('events', { keyPath: 'id' })
      }
    }
  })
}

export async function saveEventDataLocally(events, removeMissing = false) {
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

  if (removeMissing) {
    const cache = await store.getAll()
    const cacheIds = cache.map(cachedEvent => cachedEvent.id)
    const deletedIds = cacheIds.filter(
      id => !events.some(event => event.id === id)
    )

    await Promise.all(deletedIds.map(event => store.delete(event))).catch(
      () => {
        tx.abort()
        throw Error('Old events were not deleted from the store')
      }
    )
  }
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
