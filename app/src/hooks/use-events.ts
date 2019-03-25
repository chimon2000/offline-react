import { useState, useEffect } from 'react'
import { useFetch } from './use-fetch'
import { baseUrl } from '../config/env'

export function useEvents() {
  const [eventsJson, loading] = useFetch<any[]>(`${baseUrl}/getAll`)
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents(eventsJson)
  }, [eventsJson])

  return { loading, events, setEvents }
}
