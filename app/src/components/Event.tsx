import React from 'react'
import { Card, Paragraph } from 'fannypack'

function Event({ event }: { event: { id; title; date; city; note } }) {
    return (
        <Card title={event.title}>
            <Paragraph>{event.date}</Paragraph>
            <Paragraph>{event.city}</Paragraph>
            <Paragraph>{event.note}</Paragraph>
        </Card>
    )
}

export default Event
