import { useState, useEffect } from 'react'
import { saveEventDataLocally, getLocalEventData } from '../db'
import emitter from '../emitter'
import isEqual from 'react-fast-compare'
type JsonResponse = any

async function getJSON(url) {
    const response = await fetch(url)
    const json = await response.json()

    return json
}

function useFetch<T>(url: string, cacheFirst: boolean = false): [T | undefined, boolean] {
    const [data, setData] = useState<T | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    async function fetchUrl() {
        try {
            //2: Cache data from API - Cache then network
            if (cacheFirst) {
                const cachedJson: JsonResponse = await getLocalEventData()
                setData(cachedJson)
                setLoading(false)

                const json = await getJSON(url)
                const hasUpdate = !isEqual(cachedJson, json)

                if (hasUpdate) {
                    await saveEventDataLocally(json, true)

                    //Fire db update event
                    emitter.emit('db-update')
                }
            } else {
                //2: Cache data from API - Network first w/ cache fallback
                const json = await getJSON(url)

                setData(json)
                setLoading(false)
            }
        } catch {
            const cachedJson: JsonResponse = await getLocalEventData()
            setData(cachedJson)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUrl()
    }, [])

    return [data, loading]
}
export { useFetch }
