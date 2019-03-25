import React from 'react'
import { Card, Paragraph } from 'fannypack'

function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <Card title={event.title}>
      <Paragraph>{event.date}</Paragraph>
      <Paragraph>{event.city}</Paragraph>
      <Paragraph>{event.note}</Paragraph>
    </Card>
  )
}

export default EventCard
