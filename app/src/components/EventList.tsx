import React from 'react'
import EventCard from './EventCard'
import { Columns, Column } from 'fannypack'

function EventList({ events }: { events: CalendarEvent[] }) {
  return (
    <Columns paddingBottom=".5rem">
      {events &&
        events.map(event => (
          <Column key={event.id} spread={6} spreadTablet={12}>
            <EventCard event={event} />
          </Column>
        ))}
    </Columns>
  )
}

export default EventList
