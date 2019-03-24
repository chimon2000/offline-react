import React, { useState, useEffect } from 'react'
import {
  ThemeProvider,
  Heading,
  Container,
  withToasts,
  Toast,
  Modal,
  DialogModal,
  Button,
  Pane
} from 'fannypack'
import { useFetch } from './hooks/use-fetch'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import { saveEventDataLocally, getLocalEventData } from './db'
import { hot } from 'react-hot-loader'

import { CacheUpdateToast } from './components/CacheUpdateToast'
import { DbUpdateToast } from './components/DbUpdateToast'

const baseUrl = '/api'

export function App() {
  const [eventsJson, loading] = useFetch<any[]>(`${baseUrl}/getAll`, true)
  const [events, updateEvents] = useState([])
  useEffect(() => {
    updateEvents(eventsJson)
  }, [eventsJson])

  const addPostEvent = data => {
    const newEvent = { id: Date.now(), ...data }

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

  const updateEventsFromDb = async () => {
    const events = await getLocalEventData()
    console.log({ events })
    updateEvents(events)
  }

  return (
    <ThemeProvider>
      <Container>
        <Toast.Container>
          {toast => (
            <React.Fragment>
              <CacheUpdateToast toast={toast} />
              <DbUpdateToast toast={toast} onClick={updateEventsFromDb} />
            </React.Fragment>
          )}
        </Toast.Container>
        <Heading>Current Events {!loading && `(${events.length})`}</Heading>
        {renderEventFormModal({ addPostEvent })}
        {loading ? <div>Loading...</div> : <EventList events={events} />}
      </Container>
    </ThemeProvider>
  )
}

const renderEventFormModal = ({ addPostEvent }) => (
  <Modal.Container>
    {(modal: any) => (
      <>
        <Pane paddingBottom="1rem">
          <Button use={Modal.Show} {...modal}>
            Add Event
          </Button>
        </Pane>
        <DialogModal title="Add an event" hideOnClickOutside={false} {...modal}>
          <EventForm
            onSubmit={event => {
              addPostEvent(event)
              modal.hide()
            }}
            onReset={modal.hide}
          />
        </DialogModal>
      </>
    )}
  </Modal.Container>
)

export default hot(module)(withToasts(App))
//
