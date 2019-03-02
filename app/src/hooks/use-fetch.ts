import { useState, useEffect } from 'react'
import { openDb } from 'idb'
import { saveEventDataLocally, getLocalEventData } from '../db'

function useFetch<T>(url: string): [T | undefined, boolean] {
    const [data, setData] = useState<T | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    async function fetchUrl() {
        try {
            const response = await fetch(url)
            const json = await response.json()
            saveEventDataLocally(json)
            setData(json)
            setLoading(false)
        } catch {
            const cachedJson: any = await getLocalEventData()
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
