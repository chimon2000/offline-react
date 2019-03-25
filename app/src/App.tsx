import React from 'react'
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
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import { getLocalEventData } from './db'
import { hot } from 'react-hot-loader'

import { CacheUpdateToast } from './components/CacheUpdateToast'
import { DbUpdateToast } from './components/DbUpdateToast'
import { useEvents } from './hooks/use-events'
import { addPostEvent } from './services/events'

export function App() {
  const { loading, events, setEvents } = useEvents()

  async function handleSubmit(data: CalendarEvent) {
    const newEvent = await addPostEvent(data)

    const updatedEvents = events.concat(newEvent)
    setEvents(updatedEvents)
  }

  const updateEventsFromDb = async () => {
    const events = await getLocalEventData()
    setEvents(events)
  }

  return (
    <ThemeProvider>
      <Container>
        {renderAppToasts({ updateEventsFromDb })}
        <Heading>Current Events {!loading && `(${events.length})`}</Heading>
        {renderEventFormModal({ handleSubmit })}
        {loading ? <div>Loading...</div> : <EventList events={events} />}
      </Container>
    </ThemeProvider>
  )
}

const renderAppToasts = ({ updateEventsFromDb }) => (
  <Toast.Container>
    {toast => (
      <React.Fragment>
        <CacheUpdateToast toast={toast} />
        <DbUpdateToast toast={toast} onClick={updateEventsFromDb} />
      </React.Fragment>
    )}
  </Toast.Container>
)

const renderEventFormModal = ({ handleSubmit }) => (
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
              handleSubmit(event)
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
