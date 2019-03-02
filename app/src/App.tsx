import React, { useState, useEffect } from 'react'
import { ThemeProvider, Heading, Container } from 'fannypack'
import { useFetch } from './hooks/use-fetch'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import { saveEventDataLocally } from './db'

const baseUrl = '/api'

export function App() {
    const [eventsJson, loading] = useFetch<any[]>(`${baseUrl}/getAll`)
    const [events, updateEvents] = useState([])
    useEffect(() => {
        updateEvents(eventsJson)
    }, [eventsJson])

    const addPostEvent = data => {
        const newEvent = { id: Date.now(), ...data }
        console.log(newEvent)
        const body = JSON.stringify(newEvent)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const updatedEvents = events.concat(newEvent)
        updateEvents(updatedEvents)
        saveEventDataLocally([newEvent])

        return fetch(`${baseUrl}/add`, {
            method: 'POST',
            headers: headers,
            body: body
        })
    }
    return (
        <ThemeProvider>
            <Container>
                <Heading>Current Events</Heading>
                {loading ? <div>Loading...</div> : <EventList events={events} />}
                <EventForm onSubmit={addPostEvent} />
            </Container>
        </ThemeProvider>
    )
}
