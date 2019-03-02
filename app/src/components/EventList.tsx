import React from 'react'
import Event from './Event'
import { Set, Columns, Column } from 'fannypack'

function EventList({ events }: { events: any[] }) {
    return (
        <Columns>
            {events &&
                events.map(event => (
                    <Column key={event.id} spread={6} spreadTablet={12}>
                        <Event event={event} />
                    </Column>
                ))}
        </Columns>
    )
}

export default EventList
